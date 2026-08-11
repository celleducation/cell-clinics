"use client";

import {useLocale} from "next-intl";
import {usePathname} from "@/i18n/navigation";
import {Link} from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const patientSlugs = {en: "patients", de: "patienten", es: "pacientes"} as const;
  const isPatientPage = Object.values(patientSlugs).some((slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`));

  return (
    <nav className="locale-switcher" aria-label="Language">
      {(["en", "de", "es"] as const).map((item) => (
        <Link key={item} href={isPatientPage ? `/${patientSlugs[item]}` : pathname} locale={item} data-active={locale === item}>
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
