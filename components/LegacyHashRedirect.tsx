"use client";

import {useEffect} from "react";
import {useLocale} from "next-intl";
import {useRouter} from "@/i18n/navigation";

const legacyRoutes: Record<string, string> = {
  "#platform": "/platform",
  "#clinical-systems": "/clinical-systems",
  "#systems": "/clinical-systems",
  "#partnerships": "/partnerships",
  "#partner": "/partnerships/apply",
  "#contact": "/contact"
};

export function LegacyHashRedirect() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const destination = legacyRoutes[window.location.hash];
    if (destination) router.replace(destination, {locale});
  }, [locale, router]);

  return null;
}
