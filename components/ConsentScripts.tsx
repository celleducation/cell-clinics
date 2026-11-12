"use client";
import {useEffect} from "react";
import {clearOptionalCookies, hasConsent, subscribeConsent} from "@/lib/consent";

export function ConsentScripts() {
  useEffect(() => {
    const ga = process.env.NEXT_PUBLIC_GA_ID;
    const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    let gaLoaded = false;
    let metaLoaded = false;
    const load = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id; script.async = true; script.src = src;
      document.head.appendChild(script);
    };
    return subscribeConsent(() => {
      const statistics = hasConsent("statistics");
      const marketing = hasConsent("marketing");
      if (!statistics) clearOptionalCookies(/^(_tccl_visitor|_ga(?:_|$)|_gid$|_gat)/);
      if (!marketing) clearOptionalCookies(/^(_fbp|_fbc)$/);
      if (ga) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${ga}`] = !statistics;
        window.gtag?.("consent", "update", {analytics_storage: statistics ? "granted" : "denied", ad_storage: marketing ? "granted" : "denied", ad_user_data: marketing ? "granted" : "denied", ad_personalization: marketing ? "granted" : "denied"});
        if (statistics && !gaLoaded) {
          gaLoaded = true;
          window.gtag?.("js", new Date());
          window.gtag?.("config", ga);
          load("consented-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`);
        }
      }
      if (meta && marketing && !metaLoaded) {
        metaLoaded = true;
        if (!window.fbq) {
          const fbq: NonNullable<Window["fbq"]> = (...args: unknown[]) => { if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue!.push(args); };
          fbq.queue = []; fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0";
          window.fbq = window._fbq = fbq;
        }
        window.fbq("consent", "grant"); window.fbq("init", meta); window.fbq("track", "PageView");
        load("consented-meta", "https://connect.facebook.net/en_US/fbevents.js");
      }
      if (!marketing) window.fbq?.("consent", "revoke");
      // Stop already-loaded vendor code after withdrawal. A fresh document
      // reads CookieYes' persisted refusal and does not load either vendor.
      if ((!statistics && gaLoaded) || (!marketing && metaLoaded)) window.location.reload();
    });
  }, []);
  return null;
}
