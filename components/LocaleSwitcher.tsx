"use client";

import {useLocale} from "next-intl";
import {usePathname} from "@/i18n/navigation";
import {Link} from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="locale-switcher" aria-label="Language">
      {(["en", "de", "es"] as const).map((item) => (
        <Link key={item} href={pathname} locale={item} data-active={locale === item}>
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
