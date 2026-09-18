import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {patientInquirySchema} from "@/lib/patient-inquiry";
import {checkFormSubmission, formChallenge, readFormBody} from "@/lib/form-guard";
import {sendViaFormSubmit} from "@/lib/formsubmit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(request: NextRequest) { return formChallenge(request, "patient"); }

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  const body = await readFormBody(request);
  const blocked = checkFormSubmission(request, body, "patient");
  if (blocked) return blocked;
  const parsed = patientInquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({error: "Invalid submission"}, {status: 400});
  const {name, email, location, consent} = parsed.data;
  const data = {name, email, location, consent};
  const submissionDate = new Date().toISOString();
  const rows = Object.entries({...data, submissionDate})
    .map(([key, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #e5ebf2">${escapeHtml(value)}</td></tr>`)
    .join("");
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: process.env.PARTNER_INQUIRY_FROM || "Cell Clinics <forms@cell-clinics.com>",
        to: process.env.PARTNER_INQUIRY_TO || "info@cell-education.com",
        replyTo: data.email,
        subject: "New Cell Clinics Patient Inquiry",
        html: `<h1>New Cell Clinics Patient Inquiry</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`
      });
      if (!result.error) return NextResponse.json({ok: true});
    } catch {
      // Continue with the independent fallback delivery below.
    }
  }

  const delivered = await sendViaFormSubmit({
      Name: data.name,
      Email: data.email,
      "Postcode / City": data.location,
      "Submission Date": submissionDate
  }, "New Cell Clinics Patient Inquiry", data.email);
  if (!delivered) return NextResponse.json({error: "Email delivery failed"}, {status: 502});
  return NextResponse.json({ok: true});
}
