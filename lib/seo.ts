import type {Metadata} from "next";
import {routing, type Locale} from "@/i18n/routing";
import {localizedPath} from "@/i18n/paths";

export const SITE_URL = "https://cell-clinics.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const ogLocales: Record<Locale, string> = {de: "de_DE", en: "en_US", es: "es_ES"};

export function brandTitle(title: string): string {
  const parts = title.split("|").map((part) => part.trim()).filter(Boolean);
  // Preserve the explicitly requested brand-first homepage title.
  if (parts[0] === "Cell Clinics" && parts.length === 2 && !/\bCell Clinics\b/i.test(parts[1])) return parts.join(" | ");
  const topics = parts.map((part) => part.replace(/\bCell Clinics\b/gi, "").trim()).filter(Boolean);
  return [...topics, "Cell Clinics"].join(" | ");
}

export function languageAlternates(path = "") {
  return {
    "de-DE": `${SITE_URL}${localizedPath("de", path)}`,
    en: `${SITE_URL}${localizedPath("en", path)}`,
    "es-ES": `${SITE_URL}${localizedPath("es", path)}`,
    "x-default": `${SITE_URL}${localizedPath("en", path)}`
  };
}

export function pageMetadata({locale, path = "", title, description, image = "/images/cellclinic-platform.png", imageWidth, imageHeight, imageAlt, noindex = false}: {
  locale: string; path?: string; title: string; description: string; image?: string; imageWidth?: number; imageHeight?: number; imageAlt?: string; noindex?: boolean;
}): Metadata {
  const language = routing.locales.includes(locale as Locale) ? locale as Locale : "en";
  const brandedTitle = brandTitle(title);
  const url = `${SITE_URL}${localizedPath(language, path)}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: {absolute: brandedTitle},
    description,
    alternates: {canonical: url, languages: languageAlternates(path)},
    openGraph: {
      title: brandedTitle, description, url, siteName: "Cell Clinics", type: "website",
      locale: ogLocales[language],
      alternateLocale: routing.locales.filter((item) => item !== language).map((item) => ogLocales[item]),
      images: [{url: image, width: imageWidth, height: imageHeight, alt: imageAlt}]
    },
    twitter: {card: "summary_large_image", title: brandedTitle, description, images: [{url: image, alt: imageAlt}]},
    ...(noindex ? {robots: {index: false, follow: true, googleBot: {index: false, follow: true}}} : {})
  };
}

export function breadcrumbSchema(locale: string, items: {name: string; path: string}[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: `${SITE_URL}${localizedPath(locale as Locale, item.path)}`
    }))
  };
}

function withoutEmptyValues(value: unknown): unknown {
  if (value == null || (typeof value === "string" && !value.trim())) return undefined;
  if (Array.isArray(value)) {
    const items = value.map(withoutEmptyValues).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).map(([key, item]) => [key, withoutEmptyValues(item)] as const)
      .filter(([, item]) => item !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value;
}

export function jsonLd(value: unknown): string {
  const serialized = JSON.stringify(withoutEmptyValues(value));
  if (!serialized) throw new Error("Do not render an empty structured-data block");
  return serialized.replace(/</g, "\\u003c");
}
