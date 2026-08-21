"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import type {MouseEvent} from "react";
import {usePathname} from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations();
  const pathname = usePathname();
  const isPatientPage = /\/(patients|patienten|pacientes)(\/|$)/.test(pathname);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.hash;
    const target = hash ? document.querySelector(hash) : null;

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({behavior: "auto", block: "start"});
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/cell-clinics-logo.png" alt="Cell Clinics" width={2064} height={391} />
            </div>
            <p>{isPatientPage ? t("patient.footerDescription") : t("footer.description")}</p>
            <p className="footer-parent-brand">{t("footer.productOf")}</p>
            <a className="footer-education-logo" href="https://cell-education.com" target="_blank" rel="noreferrer" aria-label="Cell Education">
              <Image src="/images/cell-education-logo.svg" alt="Cell Education" width={220} height={54} />
            </a>
          </div>
          <nav className="footer-nav" aria-label="Platform">
            <strong>{isPatientPage ? t("patient.hero.label") : t("nav.platform")}</strong>
            {isPatientPage ? <>
              <a href="#therapy" onClick={handleSectionClick}>{t("patient.nav.therapy")}</a>
              <a href="#process" onClick={handleSectionClick}>{t("patient.nav.process")}</a>
              <a href="#find-clinic" onClick={handleSectionClick}>{t("patient.cta.findClinic")}</a>
            </> : <>
              <a href="#platform" onClick={handleSectionClick}>{t("nav.platform")}</a>
              <a href="#systems" onClick={handleSectionClick}>{t("nav.clinicalSystems")}</a>
              <a href="#proof" onClick={handleSectionClick}>{t("home.proofLabel")}</a>
              <a href="#application" onClick={handleSectionClick}>{t("cta.partnerWithUs")}</a>
            </>}
          </nav>
          <nav className="footer-nav" aria-label="Contact">
            <strong>{t("nav.contact")}</strong>
            <a href="mailto:info@cell-education.com">info@cell-education.com</a>
            <a href={isPatientPage ? "#find-clinic" : "#application"} onClick={handleSectionClick}>{isPatientPage ? t("patient.cta.findClinic") : t("cta.requestInfo")}</a>
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
