"use client";

import Image from "next/image";
import {Menu, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {ButtonLink} from "./ui/ButtonLink";
import {LocaleSwitcher} from "./LocaleSwitcher";
import {Link} from "@/i18n/navigation";

const navItems = [
  {key: "platform", href: "#platform"},
  {key: "clinicalSystems", href: "#systems"},
  {key: "proof", href: "#proof"}
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="site-logo" href="/" aria-label="Cell Clinics home">
          <Image src="/cell-clinics-logo.svg" alt="Cell Clinics" width={875} height={153} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a className="nav-link" key={item.key} href={item.href}>
              {item.key === "proof" ? t("home.proofLabel") : t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitcher />
          <ButtonLink href="#application">{t("cta.partnerWithUs")}</ButtonLink>
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
        {navItems.map((item) => (
          <a
            className="nav-link"
            key={item.key}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.key === "proof" ? t("home.proofLabel") : t(`nav.${item.key}`)}
          </a>
        ))}
        <LocaleSwitcher />
        <a className="button button-primary" href="#application" onClick={() => setOpen(false)}>
          {t("cta.partnerWithUs")}
        </a>
      </nav>
    </header>
  );
}
