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
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = {...Object.fromEntries(new FormData(form).entries()), turnstileToken};
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
      <div className="form-progress"><span>{t("apply.step")} {step}/2</span><div><i data-active={step >= 1}/><i data-active={step >= 2}/></div></div>
      <section hidden={step !== 1}>
        <h2>{t("apply.step1Title")}</h2>
        <div className="form-grid">
          <label>{t("form.clinicName")}<input name="clinicName" required /></label>
          <label>{t("form.email")}<input name="email" type="email" required /></label>
          <label>{t("form.country")}<input name="country" required /></label>
        </div>
        <button className="button button-primary" type="button" onClick={() => setStep(2)}>{t("apply.next")}</button>
      </section>
      <section hidden={step !== 2}>
        <h2>{t("apply.step2Title")}</h2>
        <div className="form-grid">
          <label>{t("form.website")}<input name="website" type="url" placeholder={t("form.websitePlaceholder")} /></label>
          <label>{t("form.primaryContact")}<input name="primaryContact" required /></label>
          <label>{t("form.phone")}<input name="phone" type="tel" /></label>
          <label>{t("form.profession")}<select name="profession" required defaultValue=""><option value="" disabled>{t("form.profession")}</option><option>{t("form.professionPhysician")}</option><option>{t("form.professionOwner")}</option><option>{t("form.professionLongevity")}</option><option>{t("form.professionHealth")}</option><option>{t("form.professionFunctional")}</option><option>{t("form.professionOther")}</option></select></label>
          <label>{t("form.clinicType")}<input name="clinicType" required placeholder={t("form.clinicTypePlaceholder")} /></label>
          <label className="form-span">{t("form.notes")}<textarea name="notes" rows={5} placeholder={t("form.notesPlaceholder")} /></label>
        </div>
        {turnstileSiteKey && <div id="partner-turnstile" className="turnstile" />}
        <label className="consent"><input type="checkbox" name="consent" required /> <span>{t("apply.consent")}</span></label>
        <div className="form-actions">
          <button className="button button-secondary" type="button" onClick={() => setStep(1)}>{t("apply.previous")}</button>
          <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? t("form.sending") : t("apply.submit")}</button>
        </div>
        {status === "error" && <p className="form-error" role="alert">{t("formApi.error")}</p>}
      </section>
    </form>
  );
}
