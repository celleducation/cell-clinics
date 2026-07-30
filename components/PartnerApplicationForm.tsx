"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {render: (element: HTMLElement, options: {sitekey: string; callback: (token: string) => void}) => string};
  }
}

export function PartnerApplicationForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailFallback, setEmailFallback] = useState("mailto:info@cell-education.com");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = String(formData.get("website") || "").trim();
    if (website && !/^https?:\/\//i.test(website)) {
      formData.set("website", `https://${website}`);
    }
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );
    data.turnstileToken = turnstileToken;
    const emailBody = [
      `Clinic Name: ${data.clinicName || ""}`,
      `Website: ${data.website || ""}`,
      `Country: ${data.country || ""}`,
      `Primary Contact: ${data.primaryContact || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Profession: ${data.profession || ""}`,
      `Clinic Type: ${data.clinicType || ""}`,
      `Notes: ${data.notes || ""}`
    ].join("\n");
    setEmailFallback(
      `mailto:info@cell-education.com?subject=${encodeURIComponent("New Cell Clinics Partner Application")}&body=${encodeURIComponent(emailBody)}`
    );
    try {
      const response = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="form-success card" role="status"><h2>{t("form.success")}</h2></div>;
  }

  return (
    <form className="partner-form card" onSubmit={submit}>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => {
            const target = document.querySelector<HTMLElement>("#partner-turnstile");
            if (target && window.turnstile) {
              window.turnstile.render(target, {sitekey: turnstileSiteKey, callback: setTurnstileToken});
            }
          }}
        />
      )}
      <input className="honeypot" type="text" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label>{t("form.clinicName")}<input name="clinicName" autoComplete="organization" required /></label>
        <label>{t("form.website")}<input name="website" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder="www.example.com" /></label>
        <label>{t("form.country")}<input name="country" autoComplete="country-name" required /></label>
        <label>{t("form.primaryContact")}<input name="primaryContact" autoComplete="name" required /></label>
        <label>{t("form.email")}<input name="email" type="email" autoComplete="email" required /></label>
        <label>{t("form.phone")}<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>{t("form.profession")}<select name="profession" required defaultValue=""><option value="" disabled>{t("form.profession")}</option><option>{t("form.professionPhysician")}</option><option>{t("form.professionOwner")}</option><option>{t("form.professionLongevity")}</option><option>{t("form.professionHealth")}</option><option>{t("form.professionFunctional")}</option><option>{t("form.professionOther")}</option></select></label>
        <label>{t("form.clinicType")}<input name="clinicType" required placeholder={t("form.clinicTypePlaceholder")} /></label>
        <label className="form-span">{t("form.notes")}<textarea name="notes" rows={4} placeholder={t("form.notesPlaceholder")} /></label>
      </div>
      {turnstileSiteKey && <div id="partner-turnstile" className="turnstile" />}
      <label className="consent"><input type="checkbox" name="consent" required /> <span>{t("apply.consent")}</span></label>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("form.sending") : t("apply.submit")}
      </button>
      {status === "error" && (
        <div className="form-error" role="alert">
          <p>{t("formApi.error")}</p>
          <a className="text-link" href={emailFallback}>{t("formApi.emailFallback")}</a>
        </div>
      )}
    </form>
  );
}
