"use client";
import {useLocale} from "next-intl";
import {useState} from "react";
import "@/lib/consent";
export function CookieSettings() {
  const locale = useLocale();
  const [unavailable, setUnavailable] = useState(false);
  const labels = locale === "de" ? ["Cookie-Einstellungen", "Cookie-Einstellungen sind derzeit nicht verfügbar. Optionale Dienste bleiben ohne Zustimmung deaktiviert."] : locale === "es" ? ["Configuración de cookies", "La configuración no está disponible. Los servicios opcionales permanecen desactivados sin consentimiento."] : ["Cookie settings", "Cookie settings are currently unavailable. Optional services remain disabled without consent."];
  return <><button type="button" className="cookie-settings-link" onClick={() => {
    if (window.revisitCkyConsent) { setUnavailable(false); window.revisitCkyConsent(); }
    else setUnavailable(true);
  }}>{labels[0]}</button>{unavailable && <span role="status"> {labels[1]}</span>}</>;
}
