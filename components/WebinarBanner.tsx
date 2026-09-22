"use client";

import {useEffect, useState} from "react";
import {useLocale} from "next-intl";
import {ArrowUpRight} from "lucide-react";
import {usePathname} from "@/i18n/navigation";

const endsAt = Date.parse("2026-10-06T19:30:00+02:00");
const registrationUrl = "https://cell-education.com/event/cell-clinics-konzeptvorstellung-06-10-26-44/register";
const copy = {
  de: {date: "Kostenloses Live-Webinar · 6. Oktober, 18:00 Uhr (MESZ)", title: "Das Cell Clinics Konzept kennenlernen.", cta: "Jetzt anmelden", label: "Webinar für Ärzte und Kliniken"},
  en: {date: "Free live webinar · 6 October, 18:00 CEST · In German", title: "Discover the Cell Clinics concept.", cta: "Register now", label: "Webinar for physicians and clinics"},
  es: {date: "Webinar gratuito · 6 de octubre, 18:00 CEST · En alemán", title: "Conoce el concepto Cell Clinics.", cta: "Inscríbete", label: "Webinar para médicos y clínicas"}
};

export function WebinarBanner() {
  const locale = useLocale();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const text = copy[locale as keyof typeof copy] ?? copy.en;
  const isProfessionalPage = pathname === "/" || /^\/(partnerships|clinical-systems|platform)(\/|$)/.test(pathname);

  useEffect(() => {
    // Check in the browser so static pages expire without another deployment.
    const update = () => setActive(Date.now() < endsAt);
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!active || !isProfessionalPage) return null;

  return (
    <aside className="webinar-banner" aria-label={text.label}>
      <div className="container webinar-banner-inner">
        <p><strong>{text.date}</strong><span>{text.title}</span></p>
        <a href={registrationUrl} className="webinar-banner-link">
          {text.cta}<ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
