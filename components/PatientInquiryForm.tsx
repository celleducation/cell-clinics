"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

type SubmissionResult = {
  success?: boolean | string;
};

export function PatientInquiryForm() {
  const t = useTranslations("patient.form");
  const [status, setStatus] = useState<Status>("idle");
  const [emailFallback, setEmailFallback] = useState("mailto:info@cell-education.com");

  async function submitViaFormSubmit(data: Record<string, string>) {
    const response = await fetch("https://formsubmit.co/ajax/info@cell-education.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        Name: data.name,
        Email: data.email,
        "Postcode / City": data.location,
        Interest: data.interest,
        "Submission Date": new Date().toISOString(),
        _subject: "New Cell Clinics Patient Inquiry",
        _replyto: data.email,
        _template: "table",
        _captcha: "false"
      })
    });
    const result = await response.json().catch(() => ({})) as SubmissionResult;
    const failed = !response.ok || result.success === false || result.success === "false";
    if (failed) throw new Error("FormSubmit delivery failed");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries(), ([key, value]) => [key, String(value)])
    ) as Record<string, string>;
    const emailBody = [
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Postcode / City: ${data.location || ""}`,
      `Interest: ${data.interest || ""}`
    ].join("\n");
    setEmailFallback(
      `mailto:info@cell-education.com?subject=${encodeURIComponent("New Cell Clinics Patient Inquiry")}&body=${encodeURIComponent(emailBody)}`
    );

    try {
      const response = await fetch("/api/patient-inquiry", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!response.ok) await submitViaFormSubmit(data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="form-success card" role="status"><h3>{t("success")}</h3></div>;
  }

  return (
    <form className="patient-form card" onSubmit={submit}>
      <input className="honeypot" type="text" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="patient-form-grid">
        <label>{t("name")}<input name="name" autoComplete="name" required /></label>
        <label>{t("email")}<input name="email" type="email" autoComplete="email" required /></label>
        <label>{t("location")}<input name="location" autoComplete="postal-code" required /></label>
        <label>{t("interest")}<select name="interest" required defaultValue=""><option value="" disabled>{t("choose")}</option><option>{t("energy")}</option><option>{t("recovery")}</option><option>{t("prevention")}</option><option>{t("supportive")}</option></select></label>
      </div>
      <label className="consent"><input type="checkbox" name="consent" required /> <span>{t("consent")}</span></label>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      <p className="form-privacy">{t("privacy")}</p>
      {status === "error" ? <p className="form-error" role="alert">{t("error")} <a href={emailFallback}>info@cell-education.com</a></p> : null}
    </form>
  );
}
