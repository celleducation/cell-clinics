"use client";

import {useLocale} from "next-intl";
import {usePathname} from "@/i18n/navigation";
import {Link} from "@/i18n/navigation";
import {localizedPath} from "@/i18n/paths";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="locale-switcher" aria-label="Language">
      {(["en", "de", "es"] as const).map((item) => (
        <Link key={item} href={localizedPath(item, pathname).slice(item.length + 1) || "/"} locale={item} data-active={locale === item}>
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
