"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";
import {useFormChallenge} from "./useFormChallenge";

type Status = "idle" | "sending" | "success" | "error";

export function PatientInquiryForm() {
  const t = useTranslations("patient.form");
  const privacyT = useTranslations("footer");
  const apiT = useTranslations("formApi");
  const {token, failed, retry} = useFormChallenge("/api/patient-inquiry");
  const [status, setStatus] = useState<Status>("idle");
  const [emailFallback, setEmailFallback] = useState("mailto:info@cell-education.com");

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
      `Postcode / City: ${data.location || ""}`
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
      if (!response.ok) throw new Error("Submission failed");
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
      <input type="hidden" name="formToken" value={token} />
      <input className="honeypot" type="text" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="patient-form-grid">
        <label>{t("name")}<input name="name" autoComplete="name" required /></label>
        <label>{t("email")}<input name="email" type="email" autoComplete="email" required /></label>
        <label>{t("location")}<input name="location" autoComplete="postal-code" required /></label>
      </div>
      <label className="consent"><input type="checkbox" name="consent" required /> <span>{t("consent")} <a href="https://cell-education.com/datenschutz">{privacyT("privacy")}</a></span></label>
      <button className="button button-primary form-submit" type="submit" disabled={!token || status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      <p className="form-privacy">{t("privacy")}</p>
      {failed && status !== "error" ? <div className="form-privacy" role="status">
        <p>{apiT("unavailable")}</p>
        <button className="button button-secondary" type="button" onClick={retry}>{apiT("retry")}</button>
        <p><a href="mailto:info@cell-education.com">info@cell-education.com</a></p>
      </div> : null}
      {status === "error" ? <p className="form-error" role="alert">{t("error")} <a href={emailFallback}>info@cell-education.com</a></p> : null}
    </form>
  );
}
