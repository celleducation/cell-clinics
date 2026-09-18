# SEO-PR: Nachforderung und Abnahme

## Exakt 27 Sitemap-URLs: neun Routen in drei Sprachen

Alle Pfade liegen unter `https://cell-clinics.com`.

| Route | Deutsch | Englisch | Spanisch |
| --- | --- | --- | --- |
| Startseite | `/de` | `/en` | `/es` |
| Patienten | `/de/patienten` | `/en/patients` | `/es/pacientes` |
| Praxisverzeichnis | `/de/network` | `/en/network` | `/es/network` |
| Alpstein | `/de/network/alpstein` | `/en/network/alpstein` | `/es/network/alpstein` |
| MEDIVIUM | `/de/network/medivium-stuttgart` | `/en/network/medivium-stuttgart` | `/es/network/medivium-stuttgart` |
| SchönGesund (neu in Sitemap) | `/de/network/mihriban-ciftci-stuttgart` | `/en/network/mihriban-ciftci-stuttgart` | `/es/network/mihriban-ciftci-stuttgart` |
| Dr. Maja Köbel-Aink (neu in Sitemap) | `/de/network/maja-koebel-aink-luebeck` | `/en/network/maja-koebel-aink-luebeck` | `/es/network/maja-koebel-aink-luebeck` |
| CURAPRAX (neu in Sitemap) | `/de/network/lars-gienger-bretten` | `/en/network/lars-gienger-bretten` | `/es/network/lars-gienger-bretten` |
| Rheumatologie Nikiciuk (neu in Sitemap) | `/de/network/boguslaw-nikiciuk-neuruppin` | `/en/network/boguslaw-nikiciuk-neuruppin` | `/es/network/boguslaw-nikiciuk-neuruppin` |

Die vier Ergänzungen waren bereits im Ausgangs-Commit `7f427d5` mit
`profileAvailable: true`, bestehenden Texten und Bildern verfügbar. Die bisher
fest codierte Sitemap führte dagegen nur Alpstein und MEDIVIUM auf. Jetzt
werden alle sechs freigeschalteten Profile aus dem unveränderten Praxisbestand
übernommen: 3 allgemeine Routen + 6 Profile = 9 × 3 = 27. Keine neue Praxis,
Rechtstext- oder Therapieseite angelegt. Das nicht freigeschaltete Profil von
Dr. Monika Brück bleibt ausgeschlossen. Legacy-Routen leiten weiter und stehen
nicht in der Sitemap.

Der Nutzer hat die vier zusätzlichen Profile am 18.09.2026 ausdrücklich als
live und inhaltlich korrekt bestätigt. Er erstellt den PR selbst nach dem Login.
Der Agent veröffentlicht ausschließlich den Branch `codex/seo-form-hardening`.

## Status der Nachforderung

- A3: exakte 301-www-Regel im Next-Konfigurationscode, Pfad/Query bleiben erhalten.
  Lokal geprüft; Live vor Veröffentlichung am 18.09.2026 weiterhin **200**.
  Vercel-Dashboard verlangt Login; konkrete Projektzuordnung nicht einsehbar.
  Öffentliche DNS-/Headerbefunde und bedingte Hoster-Schritte stehen in SEO-TODO.md.
  Noch keine erfolgreiche Live-Abnahme behauptet.
- A6: Kein Close-Button in `h2`, weder Alpstein noch MEDIVIUM. `×` bezeichnet
  die Partnerschaft und ist bereits `aria-hidden`. Automatischer Test verbietet
  interaktive Elemente in allen Überschriften der 27 Seiten. Keine Attrappe ergänzt.
- A10 Breadcrumbs: sichtbare Navigation und Schema auf allen 24 aktiven
  Unterseiten, aus denselben Daten. Kein Breadcrumb auf den drei Startseiten.
- A10 FAQ: nach ausdrücklicher Freigabe fünf bestehende Fragen/Antworten aus
  `7f427d5` in DE/EN/ES wortgleich wiederhergestellt. Frühere native Details-
  Accordion-Struktur aus `f289d6e` wiederverwendet; sichtbarer Text und FAQPage
  werden aus demselben Datensatz erzeugt. Keine eigenen medizinischen Texte.
- A11: `max-image-preview:large` sowohl in robots als auch googlebot.
- Formulare: Honeypot, signierter Zeitnachweis (3 Sekunden, 24 Stunden Gültigkeit),
  IP- und Formbindung, serverseitiger Versuchszähler mit 429/Retry-After,
  begrenzte Speichernutzung und Request-Größe. Keine Drittanbieter-Spamprüfung.
- B2B: Zustimmung im Server-Schema zwingend, Checkbox nicht vorausgewählt,
  bestehender Datenschutz-Link direkt im Formular; Notizfeld in UI und Schema
  entfernt. Keine automatische Weiterleitung an einen Versanddienst bei 4xx/5xx.
- Keine medizinischen Bestandsaussagen eigenmächtig umformuliert. Der vom Nutzer
  genannte Plattform-/Praxisführungs-Prüfpunkt ist mit Datei/Zeile für DE/EN/ES
  in SEO-TODO.md aufgelistet, getrennt nach übergreifendem und Profil-Kontext.

## Vor Merge/Deployment offen

1. Globales IP-Limit als spätere Folgeaufgabe, ausdrücklich kein PR-Blocker:
   Der neue Zähler gilt pro Node-Prozess und ist als Zwischenstand akzeptiert.
   Auf Vercel braucht
   eine instanzübergreifende Quote einen gemeinsamen eigenen Speicher oder eine
   Regel beim bestehenden Hoster. Keine instanzübergreifende Wirkung behaupten.
   Keine zusätzliche Infrastruktur in dieser Runde provisioniert.
2. `FORM_GUARD_SECRET` oder vorhandenen `RESEND_API_KEY` auf Produktion prüfen.
   Fehlende Konfiguration sperrt die Formulare sicher; Resend für B2B erforderlich.
3. Vercel-Projektzuordnung von www nach Login prüfen; Weiterleitung nach Deploy
   wirklich über die öffentliche www-Domain testen.
4. Zwei bestehende Lint-Fehler bleiben ausdrücklich einem separaten PR vorbehalten:
   - `ClinicFinder.tsx:92`: `setSearchLocation(null)` direkt in einem Effekt.
   - `SiteHeader.tsx:24`: `setOpen(false)` direkt im pathname-Effekt.
   Beide `react-hooks/set-state-in-effect`; unnötige Folgerenderings möglich.
   Zusätzlich bestehende Warnung `import/no-anonymous-default-export` in PostCSS.

## Prüfablauf

Lokal, ohne E-Mail-Versand:

```sh
node scripts/test-form-guard.mjs
node scripts/test-patient-inquiry.mjs
node scripts/test-faq-copy.mjs
npm run build -- --webpack
# Nur lokaler Testwert, niemals als Produktionssecret verwenden:
FORM_GUARD_SECRET=local-test-secret-only-not-for-deployment FORM_TRUSTED_IP_HEADER=x-form-test-ip npm run start -- --port 3012
node scripts/audit-seo.mjs http://localhost:3012
node scripts/test-form-api.mjs http://localhost:3012
```

Nach Merge UND erfolgreichem Production-Deployment, gegen echte Live-Domains:

```sh
curl -sI 'https://www.cell-clinics.com/de/network/alpstein?source=seo'
curl -s 'https://cell-clinics.com/de'
curl -s 'https://cell-clinics.com/en'
curl -s 'https://cell-clinics.com/es'
node scripts/audit-seo.mjs https://cell-clinics.com
```

Das Skript verwendet curl für alle 27 öffentlichen URLs und prüft unter anderem
initiales `lang`, hreflang inklusive Selbstreferenz/x-default, Canonical, OG,
robots, Breadcrumbs, sichtbare FAQ/Schema-Parität und Sitemap. Im Live-Modus wird www wirklich per HTTPS
abgerufen, nicht mit einem lokalen Host-Header simuliert. Erwartung: **301**
und vollständiges Ziel inklusive Pfad/Query. Keine Testanfragen an öffentliche
Formulare versenden. Lokale Testergebnisse ersetzen diese Live-Abnahme nicht.
