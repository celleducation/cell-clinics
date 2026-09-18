import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import {partnerInquirySchema} from "@/lib/partner-inquiry";
import {checkFormSubmission, formChallenge, readFormBody} from "@/lib/form-guard";
import {sendViaFormSubmit} from "@/lib/formsubmit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(request: NextRequest) { return formChallenge(request, "partner"); }

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
  const blocked = checkFormSubmission(request, body, "partner");
  if (blocked) return blocked;
  const parsed = partnerInquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({error: "Invalid submission"}, {status: 400});
  const {clinicName, website, country, clinicType, profession, primaryContact, email, phone, consent} = parsed.data;
  const data = {clinicName, website, country, clinicType, profession, primaryContact, email, phone, consent};
  const rows = Object.entries({...data, submissionDate: new Date().toISOString()})
    .filter(([, value]) => value !== undefined && value !== "")
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
    const delivered = await sendViaFormSubmit({
      "Clinic Name": clinicName, Website: website, Country: country,
      "Primary Contact": primaryContact, Email: email, Phone: phone,
      Profession: profession, "Clinic Type": clinicType,
      "Submission Date": new Date().toISOString()
    }, "New Cell Clinics Partner Application", email);
    if (!delivered) return NextResponse.json({error: "Email delivery failed"}, {status: 502});
  }

  return NextResponse.json({ok: true});
}
