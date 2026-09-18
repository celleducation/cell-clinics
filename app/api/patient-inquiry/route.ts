import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {patientInquirySchema} from "@/lib/patient-inquiry";
import {checkFormSubmission, formChallenge, readFormBody} from "@/lib/form-guard";

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

  const fallback = await fetch("https://formsubmit.co/ajax/info@cell-education.com", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({
      Name: data.name,
      Email: data.email,
      "Postcode / City": data.location,
      "Submission Date": submissionDate,
      _subject: "New Cell Clinics Patient Inquiry",
      _replyto: data.email,
      _template: "table",
      _captcha: "false"
    })
  }).catch(() => null);

  if (!fallback?.ok) return NextResponse.json({error: "Email delivery failed"}, {status: 502});
  const fallbackResult = await fallback.json().catch(() => ({})) as {success?: boolean | string};
  if (fallbackResult.success === false || fallbackResult.success === "false") {
    return NextResponse.json({error: "Email delivery failed"}, {status: 502});
  }
  return NextResponse.json({ok: true});
}
