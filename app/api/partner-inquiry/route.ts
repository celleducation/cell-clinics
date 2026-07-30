import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {z} from "zod";

const inquirySchema = z.object({
  clinicName: z.string().min(2).max(160),
  website: z.string().max(240).optional().or(z.literal("")),
  country: z.string().min(2).max(100),
  clinicType: z.string().min(2).max(120),
  profession: z.string().min(2).max(120),
  primaryContact: z.string().min(2).max(160),
  email: z.string().email().max(200),
  phone: z.string().max(80).optional(),
  notes: z.string().max(3000).optional(),
  companyFax: z.string().max(0).optional(),
  turnstileToken: z.string().optional()
});

const requests = new Map<string, number[]>();

function escapeHtml(value: unknown) {
  return String(value || "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((timestamp) => now - timestamp < 60 * 60 * 1000);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({error: "Too many requests"}, {status: 429});

  const parsed = inquirySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({error: "Invalid submission"}, {status: 400});
  if (parsed.data.companyFax) return NextResponse.json({ok: true});

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: parsed.data.turnstileToken || "",
        remoteip: ip
      })
    });
    const result = (await verification.json()) as {success?: boolean};
    if (!result.success) return NextResponse.json({error: "Spam verification failed"}, {status: 400});
  }

  const {companyFax: _, turnstileToken: __, ...data} = parsed.data;
  const rows = Object.entries({...data, submissionDate: new Date().toISOString()})
    .map(([key, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(value)}</td></tr>`)
    .join("");

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.PARTNER_INQUIRY_FROM || "Cell Clinics <forms@cell-clinics.com>",
      to: process.env.PARTNER_INQUIRY_TO || "info@cell-education.com",
      replyTo: data.email,
      subject: "New Cell Clinics Partner Application",
      html: `<h1>New Cell Clinics Partner Application</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`
    });
    if (result.error) {
      console.error("Partner inquiry email failed", result.error);
      return NextResponse.json({error: "Email delivery failed"}, {status: 502});
    }
  } else {
    const formSubmitResponse = await fetch(
      process.env.FORMSUBMIT_ENDPOINT || "https://formsubmit.co/ajax/info@cell-education.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "Clinic Name": data.clinicName,
          Website: data.website || "—",
          Country: data.country,
          "Primary Contact": data.primaryContact,
          Email: data.email,
          Phone: data.phone || "—",
          Profession: data.profession,
          "Clinic Type": data.clinicType,
          Notes: data.notes || "—",
          "Submission Date": new Date().toISOString(),
          _subject: "New Cell Clinics Partner Application",
          _replyto: data.email,
          _template: "table",
          _captcha: "false"
        })
      }
    );

    const formSubmitResult = await formSubmitResponse
      .json()
      .catch(() => ({})) as {success?: boolean | string; message?: string};
    const formSubmitFailed =
      !formSubmitResponse.ok ||
      formSubmitResult.success === false ||
      formSubmitResult.success === "false";

    if (formSubmitFailed) {
      console.error("FormSubmit delivery failed", formSubmitResult);
      return NextResponse.json({error: "Email delivery failed"}, {status: 502});
    }

    const activationRequired = /activat|confirm/i.test(formSubmitResult.message || "");
    return NextResponse.json({ok: true, activationRequired});
  }

  return NextResponse.json({ok: true});
}
