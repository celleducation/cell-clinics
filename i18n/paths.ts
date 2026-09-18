import type {Locale} from "./routing";

export const patientSlugs: Record<Locale, string> = {
  de: "patienten", en: "patients", es: "pacientes"
};

// Shared by metadata, language switching and the sitemap. Never link a
// translated detail page back to the homepage as its language equivalent.
export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path === "/" ? "" : path;
  if (Object.values(patientSlugs).some((slug) => normalized === `/${slug}`)) {
    return `/${locale}/${patientSlugs[locale]}`;
  }
  return `/${locale}${normalized}`;
}
