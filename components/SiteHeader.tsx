"use client";

import Image from "next/image";
import {Menu, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {ButtonLink} from "./ui/ButtonLink";
import {LocaleSwitcher} from "./LocaleSwitcher";
import {Link, usePathname} from "@/i18n/navigation";

const navItems = [
  {key: "platform", href: "/platform"},
  {key: "clinicalSystems", href: "/clinical-systems"},
  {key: "network", href: "/network"},
  {key: "partnerships", href: "/partnerships"},
  {key: "company", href: "/company"},
  {key: "contact", href: "/contact"}
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="site-logo" href="/" aria-label="Cell Clinics home">
          <Image src="/cell-clinics-logo.svg" alt="Cell Clinics" width={875} height={153} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link className="nav-link" data-active={isActive(item.href)} key={item.key} href={item.href}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitcher />
          <ButtonLink href="/partnerships/apply">{t("cta.heroPrimary")}</ButtonLink>
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
          <Link
            className="nav-link"
            data-active={isActive(item.href)}
            key={item.key}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {t(`nav.${item.key}`)}
          </Link>
        ))}
        <LocaleSwitcher />
        <ButtonLink href="/partnerships/apply">{t("cta.heroPrimary")}</ButtonLink>
      </nav>
    </header>
  );
}
