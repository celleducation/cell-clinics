import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "es"],
  defaultLocale: "en",
  // Metadata owns translated alternates; avoid incorrect HTTP Link headers
  // such as /en/patienten emitted by prefix-only middleware routing.
  alternateLinks: false,
  localePrefix: "always"
});

export type Locale = (typeof routing.locales)[number];
