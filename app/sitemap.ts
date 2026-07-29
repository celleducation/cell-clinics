import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";
import {clinics} from "@/content/clinics";
import {clinicalSystems} from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://cell-clinics.com";
  const staticRoutes = [
    "",
    "/platform",
    "/clinical-systems",
    "/clinical-systems/diagnostics",
    "/clinical-systems/protocols",
    "/network",
    "/partnerships",
    "/partnerships/ecosystem",
    "/partnerships/program",
    "/partnerships/apply",
    "/company",
    "/company/leadership",
    "/company/news",
    "/contact"
  ];
  const dynamicRoutes = [
    ...clinics.map(({slug}) => `/network/${slug}`),
    ...clinicalSystems.map(({slug}) => `/clinical-systems/${slug}`)
  ];

  return routing.locales.flatMap((locale) =>
    [...staticRoutes, ...dynamicRoutes].map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7
    }))
  );
}
