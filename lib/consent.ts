export type ConsentCategory = "necessary" | "statistics" | "marketing";
const categoryIds = {necessary: "necessary", statistics: "analytics", marketing: "advertisement"} as const;
declare global {
  interface Window {
    getCkyConsent?: () => {isUserActionCompleted?: boolean; categories?: Record<string, boolean>};
    revisitCkyConsent?: () => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {queue?: unknown[][]; callMethod?: (...args: unknown[]) => void; push?: Window["fbq"]; loaded?: boolean; version?: string};
    _fbq?: Window["fbq"];
  }
}
let accepted: Set<string> | undefined;
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  // CookieYes may also be installed through GTM, without the direct site-ID env.
  if (typeof window === "undefined") return false;
  if (accepted) return accepted.has(categoryIds[category]);
  const consent = window.getCkyConsent?.();
  return consent?.isUserActionCompleted === true && consent.categories?.[categoryIds[category]] === true;
}
export function subscribeConsent(callback: () => void) {
  const update = (event: Event) => {
    const detail = (event as CustomEvent<{accepted?: unknown}>).detail;
    accepted = Array.isArray(detail?.accepted) ? new Set(detail.accepted.filter((item): item is string => typeof item === "string")) : undefined;
    callback();
  };
  document.addEventListener("cookieyes_consent_update", update);
  document.addEventListener("cookieyes_banner_loaded", update);
  callback();
  return () => {
    document.removeEventListener("cookieyes_consent_update", update);
    document.removeEventListener("cookieyes_banner_loaded", update);
  };
}

// No _tccl_visitor producer exists in this application. Never create it.
// Clear accessible legacy cookies when optional consent is absent/withdrawn.
export function clearOptionalCookies(pattern: RegExp) {
  const names = document.cookie.split(";").map((part) => part.trim().split("=")[0]).filter((name) => pattern.test(name));
  const parts = window.location.hostname.split(".");
  const domains = ["", ...parts.map((_, index) => parts.slice(index).join(".")).filter((domain) => domain.includes("."))];
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
  }
}
