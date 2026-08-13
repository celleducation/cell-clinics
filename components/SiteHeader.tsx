"use client";

import Image from "next/image";
import {Menu, X} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import {ButtonLink} from "./ui/ButtonLink";
import {LocaleSwitcher} from "./LocaleSwitcher";
import {Link, usePathname} from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const patientSlug = locale === "de" ? "patienten" : locale === "es" ? "pacientes" : "patients";
  const patientHref = `/${patientSlug}`;
  const isPatientPage = pathname === patientHref || pathname.startsWith(`${patientHref}/`);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="site-logo" href="/" aria-label="Cell Clinics home">
          <Image src="/cell-clinics-logo.png" alt="Cell Clinics" width={2064} height={391} priority />
        </Link>
        <nav className="desktop-nav audience-switcher" aria-label={t("audience.label")}>
          <Link className={!isPatientPage ? "active" : ""} href="/">{t("audience.professionals")}</Link>
          <Link className={isPatientPage ? "active" : ""} href={patientHref}>{t("audience.patients")}</Link>
        </nav>
        <div className="header-actions">
          <LocaleSwitcher />
          <ButtonLink href={isPatientPage ? "#find-clinic" : "#application"}>
            {isPatientPage ? t("patient.cta.findClinic") : t("cta.partnerWithUs")}
          </ButtonLink>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-panel" hidden={!open} aria-label="Mobile navigation">
        <div className="audience-switcher mobile-audience" aria-label={t("audience.label")}>
          <Link className={!isPatientPage ? "active" : ""} href="/" onClick={() => setOpen(false)}>{t("audience.professionals")}</Link>
          <Link className={isPatientPage ? "active" : ""} href={patientHref} onClick={() => setOpen(false)}>{t("audience.patients")}</Link>
        </div>
        <LocaleSwitcher />
        <ButtonLink href={isPatientPage ? "#find-clinic" : "#application"} onClick={() => setOpen(false)}>
          {isPatientPage ? t("patient.cta.findClinic") : t("cta.partnerWithUs")}
        </ButtonLink>
      </nav>
    </header>
  );
}
