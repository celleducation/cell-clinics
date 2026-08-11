import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {z} from "zod";

const schema = z.object({
  name: z.string().min(2).max(160),
  email: z.string().email().max(200),
  location: z.string().min(2).max(160),
  interest: z.string().min(2).max(160),
  consent: z.string().optional(),
  companyFax: z.string().max(0).optional()
});

function escapeHtml(value: unknown) {
  return String(value || "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({error: "Invalid submission"}, {status: 400});
  if (parsed.data.companyFax) return NextResponse.json({ok: true});
  if (!process.env.RESEND_API_KEY) return NextResponse.json({error: "Email service not configured"}, {status: 503});

  const {companyFax: _, ...data} = parsed.data;
  const rows = Object.entries({...data, submissionDate: new Date().toISOString()})
    .map(([key, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(value)}</td></tr>`)
    .join("");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.PARTNER_INQUIRY_FROM || "Cell Clinics <forms@cell-clinics.com>",
    to: process.env.PARTNER_INQUIRY_TO || "info@cell-education.com",
    replyTo: data.email,
    subject: "New Cell Clinics Patient Inquiry",
    html: `<h1>New Cell Clinics Patient Inquiry</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`
  });
  if (result.error) return NextResponse.json({error: "Email delivery failed"}, {status: 502});
  return NextResponse.json({ok: true});
}
