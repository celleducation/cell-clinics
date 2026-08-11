"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isPatientPage = /\/(patients|patienten|pacientes)(\/|$)/.test(pathname);
  const patientSlug = locale === "de" ? "patienten" : locale === "es" ? "pacientes" : "patients";

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/cell-clinics-logo.svg" alt="Cell Clinics" width={875} height={153} />
            </div>
            <p>{isPatientPage ? t("patient.footerDescription") : t("footer.description")}</p>
            <p>{t("footer.groupLine")}</p>
          </div>
          <nav className="footer-nav" aria-label="Platform">
            <strong>{isPatientPage ? t("patient.hero.label") : t("nav.platform")}</strong>
            {isPatientPage ? <>
              <a href="#therapy">{t("patient.nav.therapy")}</a>
              <a href="#process">{t("patient.nav.process")}</a>
              <a href="#find-clinic">{t("patient.cta.findClinic")}</a>
            </> : <>
              <a href="#platform">{t("nav.platform")}</a>
              <a href="#systems">{t("nav.clinicalSystems")}</a>
              <a href="#proof">{t("home.proofLabel")}</a>
              <a href="#application">{t("cta.partnerWithUs")}</a>
            </>}
          </nav>
          <nav className="footer-nav" aria-label="Contact">
            <strong>{t("nav.contact")}</strong>
            <a href="mailto:info@cell-education.com">info@cell-education.com</a>
            <a href={isPatientPage ? `/${locale}/${patientSlug}#find-clinic` : "#application"}>{isPatientPage ? t("patient.cta.findClinic") : t("cta.requestInfo")}</a>
            <a href="https://cell-education.com" target="_blank" rel="noreferrer">Cell Education ↗</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <a href="mailto:info@cell-education.com">info@cell-education.com</a>
          <span>
            <a href="https://cell-education.com/datenschutz">{t("footer.privacy")}</a>
            {" · "}
            <a href="https://cell-education.com/impressum">{t("footer.terms")}</a>
          </span>
        </div>
        {isPatientPage ? <p className="patient-disclaimer">{t("patient.footerDisclaimer")}</p> : null}
      </div>
    </footer>
  );
}
