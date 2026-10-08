"use client";
import {useLocale} from "next-intl";
import {useEffect, useState} from "react";
import "@/lib/consent";
export function CookieSettings() {
  const locale = useLocale();
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const ready = () => setUnavailable(false);
    document.addEventListener("cookieyes_banner_loaded", ready);
    return () => document.removeEventListener("cookieyes_banner_loaded", ready);
  }, []);
  const labels = locale === "de" ? ["Cookie-Einstellungen", "Die Cookie-Einstellungen konnten nicht geöffnet werden. Bitte laden Sie die Seite neu oder kontaktieren Sie uns."] : locale === "es" ? ["Configuración de cookies", "No se pudo abrir la configuración de cookies. Recargue la página o contacte con nosotros."] : ["Cookie settings", "Cookie settings could not be opened. Please reload the page or contact us."];
  return <><button type="button" className="cookie-settings-link" onClick={() => {
    if (typeof window.revisitCkyConsent === "function") { setUnavailable(false); window.revisitCkyConsent(); }
    else setUnavailable(true);
  }}>{labels[0]}</button>{unavailable && <span role="status"> {labels[1]}</span>}</>;
}
