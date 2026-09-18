import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";
import {localizedPath} from "@/i18n/paths";
import {SITE_URL, languageAlternates} from "@/lib/seo";
import {indexableRoutes} from "@/content/seo-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.flatMap(({path, lastModified}) => routing.locales.map((locale) => ({
    url: `${SITE_URL}${localizedPath(locale, path)}`,
    lastModified,
    alternates: {languages: languageAlternates(path)}
  })));
}
