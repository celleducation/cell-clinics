# Datenflüsse – Bestandsaufnahme vor Änderungen

## Nachtrag GTM

Auf ausdrücklichen Nutzerwunsch ist nun Google Tag Manager `GTM-TFZJGN3F` regulär eingebunden: Head-Skript und Body-noscript-Iframe verbinden sich mit `www.googletagmanager.com` (IP-Adresse und HTTP-Anfragedaten). Keine zusätzliche Consent-Sperre im Anwendungscode; CookieYes/GTM-Konfiguration liegt bei Agentur/Betreiber. [[OFFEN: Container-Tags, weitere Empfänger, Consent-Konfiguration, Rechtsgrundlagen und Speicherfristen prüfen]]. Die ursprüngliche Tabelle unten beschreibt den Zustand vor dieser Ergänzung.

Stand: 07.10.2026. Codeprüfung und öffentlicher Headerabruf; keine Einsicht in private Hosting-/Dienstkonten. Keine Formulare abgesendet.

| Stelle | Daten / Verarbeitung | Empfänger / Speicher | Dauer / Rechtsgrundlage / offene Prüfung |
|---|---|---|---|
| Hosting | HTTP-Anfragen, IP, Zeit, URL, Browser; `server: Vercel` am 07.10. bestätigt | Vercel; Server-Logs außerhalb des Repos | Art. 6 Abs. 1 lit. f; [[OFFEN: Log-Retention, Hostingvertrag, Region, Vercel-Anschrift und DPF-Registerstatus prüfen]] |
| Vercel-Zusatzdienste | Keine Imports/Dependencies für Analytics, Speed Insights, Edge Config, KV, Blob oder Log Drains gefunden | Dashboard-Konfiguration nicht einsehbar | [[OFFEN: Zusatzdienste, Integrationen und Log Drains im Vercel-Projekt prüfen]] |
| Partnerformular | Klinikname, Website (optional), Land, Kliniktyp, Beruf, Ansprechpartner, E-Mail, Telefon (optional), Einwilligung, Zeitstempel | `/api/partner-inquiry` → Resend bei gesetztem `RESEND_API_KEY`, sonst FormSubmit → `PARTNER_INQUIRY_TO` (Standard info@cell-education.com); keine Datenbank im Code | Art. 6 Abs. 1 lit. b; [[OFFEN: aktiven Provider, abweichenden Empfänger, AVV, Unterauftragnehmer, Drittlandgarantien und Löschfristen bestätigen]] |
| Patientenformular | Name, E-Mail, PLZ/Ort, Einwilligung, Zeitstempel; kein Symptom-/Nachrichtenfeld | `/api/patient-inquiry` → derselbe Versandweg; Resend erhält Einwilligung, FormSubmit-Payload nicht | Art. 6 Abs. 1 lit. a; [[OFFEN: Einwilligungsnachweis im Fallback, Aufbewahrung und Empfänger bestätigen]]; Vermittlungsablauf C6 unverändert |
| Formularschutz | IP für signierte Challenge, Formularart, Zufallswert, Zeitpunkt; Honeypot; HMAC-IP-Schlüssel mit Zähler | Eigener Node-Prozess; keine Klartext-IP im Zähler, keine Formularinhalte im Fehlerlog | 1 h Zählfenster, Bereinigung bei nächstem Zugriff/Prozessende; Token 24 h gültig, Mindestzeit 3 s; Art. 6 Abs. 1 lit. f. Gemeinsamer Speicher/Hoster-Limit bleibt Folgeaufgabe |
| `NEXT_LOCALE` | Sprachpräferenz | First-party Cookie; Next-intl | Session-Cookie (Header ohne Max-Age/Expires); SameSite=Lax, Path=/; § 25 Abs. 2 TDDDG, Art. 6 Abs. 1 lit. f |
| `_tccl_visitor` | Kein Setzer/Leser oder zugehöriger Dienst im aktiven Repo gefunden | Unbekannt; nicht im geprüften Response-Header | [[OFFEN: Herkunft, Zweck, Laufzeit und Auswertung im betroffenen Browser/Hoster ermitteln]]; keine technische Notwendigkeit belegt; kein Setzen durch diesen Branch |
| Standortbutton | Browser fragt Standortfreigabe ab; Koordinaten in React-State, lokale Distanzrechnung | Nur Browser im Anwendungscode; kein Reverse-Geocoding | Bis Navigation/Reload; Art. 6 Abs. 1 lit. a; browserseitiger Standortdienst liegt außerhalb des Anwendungscodes |
| Ortssuche | Freitext PLZ/Ort, Land, Accept-Language; eigener Server sieht IP | `/api/geocode` → nominatim.openstreetmap.org; kein Weiterreichen der Besucher-IP, aber Suchtext/Sprachheader und Server-IP | Ergebnis-Cache 86400 s; Art. 6 Abs. 1 lit. f; [[OFFEN: Nominatim-Betreiber-/Logfristen prüfen]] |
| Netzwerkdarstellung | Praxisdaten und Koordinaten aus `content/clinics.ts`; aktive Darstellung ist eine Liste | Lokal; keine Kartenkachel- oder Karten-SDK-Anfragen im Code | Keine externe Karte eingebettet |
| Vimeo | Lokales JPEG vor Klick; nach Klick Iframe mit dnt=1; IP/Browserdaten an Vimeo | player.vimeo.com und vom Player nachgeladene Anbieter | Einwilligung durch beschrifteten Klick; [[OFFEN: Vimeo-Speicherfristen/Transfers prüfen]]; Zwei-Klick-Lösung unverändert |
| YouTube | Externer Link, kein Player | Erst nach Öffnen youtube.com | Eigenständiger externer Aufruf |
| Fonts/Bilder/Skripte | Next/font Google lädt beim Build; Browser erhält lokale Fontdateien. Bilder und App-Skripte lokal | Eigene Origin; Build-Abruf bei Google nicht durch Besucher | Keine Google-Fonts-Browseranfrage aus dieser Konfiguration |
| CookieYes (geplante Ergänzung) | Consent-Entscheidung, Zeitpunkt, Consent-ID, laut Anbieter maskierte IP | CookieYes Limited, UK; CDN und Consent-Backend erst bei konfigurierter Site-ID | Art. 6 Abs. 1 lit. c i.V.m. Art. 7 Abs. 1; § 25 Abs. 2 TDDDG; [[OFFEN: Site-ID, Dashboard-Kategorien, Cookie-/Logfristen, AVV und Unterauftragnehmer]] |
| GA/Meta (nur Vorbereitung) | Kein Dienst aktivieren, keine IDs im Branch | Laden erst bei gesetzter ID und passender ausdrücklicher Zustimmung | Vor Aktivierung Datenschutz, Cookie-Laufzeiten und Verträge ergänzen; Widerruf sperrt weitere Nutzung |

## Quellen / Grenzen

- Formulare: `app/api/{partner-inquiry,patient-inquiry}/route.ts`, `lib/{partner-inquiry,patient-inquiry,form-guard,formsubmit}.ts`.
- Suche: `components/ClinicFinder.tsx`, `app/api/geocode/route.ts`.
- Layout: `app/[locale]/layout.tsx`; Videos: `components/{HomeVimeo,ClinicVideo}.tsx`.
- CookieYes API: https://www.cookieyes.com/documentation/retrieving-consent-data-using-api-getckyconsent/
- CookieYes Events: https://www.cookieyes.com/documentation/events-on-cookie-banner-interactions/
- CookieYes Daten: https://www.cookieyes.com/documentation/does-cookieyes-collect-any-data-from-my-websites-visitors/
- UK-Angemessenheit: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en (erneuert Dezember 2025).

Dies ist eine technische Bestandsaufnahme, keine Bestätigung rechtlicher Vollständigkeit. Offene Vertrags-/Löschfragen müssen vor Merge geklärt werden.
