import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://cell-clinics.com";
  const patientSlugs: Record<string, string> = {de: "patienten", en: "patients", es: "pacientes"};

  return routing.locales.flatMap((locale) => [
    {url: `${base}/${locale}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1},
    {url: `${base}/${locale}/${patientSlugs[locale]}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9},
    {url: `${base}/${locale}/network`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8},
    {url: `${base}/${locale}/network/alpstein`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75},
    {url: `${base}/${locale}/network/medivium-stuttgart`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75}
  ]);
}
