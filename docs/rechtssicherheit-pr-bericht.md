# Rechtssicherheit – PR-Bericht

Stand: 07.10.2026. Branch `legal/rechtssicherheit-2026-10`. **Review-Entwurf, nicht vor Klärung der offenen Stellen mergen. Keine juristische Freigabe.**

## Umfang

- Datenflüsse zuerst untersucht: vollständige Tabelle in [datenfluesse.md](datenfluesse.md).
- Eigene Datenschutzseiten DE/EN/ES, Footer und beide Formulare verlinkt, Sitemap ergänzt.
- **Kein eigenes Impressum**; `https://cell-education.com/impressum` bleibt.
- Beauftragte Korrekturen C1–C17 in drei Sprachen. C9 war in EN/ES bereits vorsichtig formuliert. C12 war bereits dynamisch (`displayedClinics.length`), kein unnötiger Umbau.
- Pflichtfeld `berufsgruppe` für alle 22 Einträge; übersetzte Berufsgruppe auf Finderkarten und allen 13 vorhandenen Profilunterseiten. Drei unklare Zuordnungen nicht geraten.
- CookieYes conditional im Root-Layout (`next/script`, `beforeInteractive`, erstes explizit eingebundenes Anbieter-Skript im head). Ohne Site-ID kein Banner; `.env.example` enthält nur leere Werte.
- GA/Meta lediglich vorbereitet, **keine IDs gesetzt und keine Anbieter aktiviert**. Consent Mode v2 zunächst denied; Netzwerk-Skripte erst nach Kategorie-Zustimmung. Widerruf sperrt und lädt die Seite neu, um bereits geladenen Anbietercode zu stoppen.
- Cookie-Einstellungen in DE/EN/ES. Vimeo-Code und lokales Vorschaubild unverändert. C6 Formularvermittlung und C16 Partnerfreigaben unverändert.

## Vor dem Merge zu klären: OFFEN

Alle wörtlichen Marker inklusive Datei/Zeile und Sprachfassung stehen im [vollständigen Prüfanhang](rechtssicherheit-pr-anhang.md#alle-offen-fundstellen). Themenliste:

1. **Berufsgruppen:** `ivan-goecze-mintraching`, `imke-frei-koenigstein`, `youn-ju-lee-kassel`. Ein Name mit Dr.-Titel belegt die Berufsgruppe nicht. In `content/clinics.ts` vorläufig `[[OFFEN]]`, auf Karten als Bestätigungsbedarf gekennzeichnet. Übrige Zuordnungen beruhen auf den vorhandenen Profilbeschreibungen, nicht auf neu behaupteten Zertifizierungen.
2. **Vercel:** Anschrift, AVV, Hostingregion, Log-Speicherfristen, zusätzliche Dashboard-Dienste/Log Drains, DPF-Registerstatus und tatsächlich vereinbarte Transfergarantien. Im Code keine Analytics/SpeedInsights/KV/Blob/EdgeConfig gefunden; private Dashboard-Konfiguration nicht verifiziert.
3. **Versand:** produktiv aktiver Resend-Schlüssel, Empfänger-Overrides, juristische Anbieter, AVV, Unterauftragnehmer, Drittlandgarantien. Code enthält weiterhin den FormSubmit-Fallback; nicht stillschweigend entfernt. Keine Aussage, dass dieser produktiv aktiv sei.
4. **Löschung:** Postfach, Versanddienste, Backups, gesetzliche Aufbewahrung; Einwilligungsnachweis des Patientenformulars im FormSubmit-Fallback.
5. **`_tccl_visitor`:** Setzer, Zweck, Laufzeit, Auswertung. Kein Setzer im Repo gefunden, technische Notwendigkeit nicht belegt. Code setzt es nie und löscht zugängliche Cookies dieses Namens ohne Statistik-Zustimmung. Das sperrt keinen unbekannten externen Setzer; HttpOnly-/fremde Pfad-Cookies lassen sich so nicht entfernen. Hoster/Browserbefund separat klären.
6. **Nominatim:** Betreiber, Bedingungen und Logfristen; Suchtexte verlassen den eigenen Server, GPS-Koordinaten nicht.
7. **Vimeo:** Anbieter, Aufbewahrung, Transfergarantien; Zwei-Klick unverändert.
8. **CookieYes:** öffentliche Site-ID fehlt; notwendige Cookie-Namen/Laufzeiten, Consent-Retention, AVV/Unterauftragnehmer und Dashboard-Kategorien bestätigen. Echter Test vor Bannerklick und nach „Alle ablehnen“ steht aus.
9. **Spätere GA/Meta-Aktivierung:** vorher Datenschutzerklärung, Verträge und konkrete Cookie-Angaben vervollständigen. Keine IDs im aktuellen Branch.

CookieYes: Die angefragte „anonymisierte Kennung“ ist vorsichtig als **pseudonyme Consent-Kennung/maskierte IP** beschrieben, weil vollständige Anonymität nicht belegt ist. Rechtsgrundlage wie beauftragt Art. 6 Abs. 1 lit. c i.V.m. Art. 7 Abs. 1 DSGVO; UK-Angemessenheit anhand der EU-Quelle geprüft (Quellen in der Datenflusstabelle).

## CookieYes-Konfiguration (Dashboard, noch auszuführen)

1. Site für cell-clinics.com mit DE/EN/ES anlegen/prüfen; öffentliche ID in `NEXT_PUBLIC_COOKIEYES_ID`, anschließend neu bauen/deployen.
2. „Notwendig“ (`necessary`): NEXT_LOCALE und bestätigte Consent-Cookies. „Statistik“ (`analytics`) und „Marketing“ (`advertisement`) optional, standardmäßig aus. Gleichwertige Ablehnmöglichkeit bereitstellen.
3. Keine GA-/Meta-IDs konfigurieren. Keine automatische Vimeo-Freigabe über Kategorien: bestehende lokale Vorschau/Zwei-Klick-Lösung beibehalten.
4. Banner im head und reales CookieYes-Event sowie `revisitCkyConsent()` prüfen. Kategorien/Consent-Laufzeit lassen sich nicht allein durch diesen Repository-Code im CookieYes-Konto setzen.
5. Frisches Browserprofil: vor Klick Cookies/Netzwerk protokollieren; „Alle ablehnen“ klicken und erneut protokollieren; keine Statistik-/Marketing-Cookies oder Anbieteranfragen. Nach Reload Ablehnung weiterhin wirksam. Einstellungen wieder öffnen und Widerruf testen.

## Testergebnis

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | Erfolgreich, TypeScript erfolgreich, 105 statische Seiten im bestehenden Gesamtprojekt inkl. Datenschutz |
| `node --test tests/consent.test.mjs` | 4/4 bestanden; isolierte VM ohne Netzwerk: fehlende IDs, initial denied/Reject-Event, getrennte Statistik-/Marketing-Freigabe und Widerruf |
| `git diff --check` | Erfolgreich |
| `npm run lint` | Zwei bestehende Fehler unverändert: `components/ClinicFinder.tsx:93` setSearchLocation synchron im Effect; `components/SiteHeader.tsx:24` setOpen synchron im Effect. Bestehende Warnung `postcss.config.mjs:1` anonymer Default-Export. Keine neuen Lint-Fehler |
| Lokale Datenschutzseiten | DE/EN/ES HTTP 200, passendes html lang, Canonical und BreadcrumbList vorhanden |
| Sitemap | 51 URLs mit Alternates (48 bestehende + 3 Datenschutz-URLs); keine Impressumsroute hinzugefügt |
| Browser-DOM ohne CookieYes-ID | Startseite: nur lokale Script-src, kein iframe vor Videoklick. Datenschutz: Fonts/Bilder/Skripte lokal; Canonical/hreflang verweisen lediglich auf die öffentliche Origin. Keine GA/Meta/CookieYes-Skripte |
| Cookie-Einstellungen ohne ID | Statusmeldung angezeigt, optionale Dienste bleiben aus |
| HTTP ohne Cookie-Header | Auf DE/EN/ES ausschließlich `Set-Cookie: NEXT_LOCALE=<locale>; Path=/; SameSite=lax`, Sessioncookie ohne Max-Age/Expires |
| Vollständiger Browser-Cookie-/Netzwerktest | **Nicht vollständig verifiziert:** Browser-Prüfschnittstelle liefert document.cookie/Performance-Netzwerkdaten nicht. HTTP-Header und DOM sind kein vollständiges HAR/Cookie-Inventar |
| Echtes Banner / „Alle ablehnen“ | **OFFEN / nicht bestanden behauptet:** keine CookieYes-ID verfügbar. VM-Test simuliert Kategorie-Event, ersetzt keinen echten CookieYes-E2E-Test |
| Vimeo | Kein Diff an `HomeVimeo.tsx` oder `ClinicVideo.tsx` |
| Live-Test nach Deploy | Nicht ausgeführt: kein Merge/Produktionsdeploy in diesem Auftrag |

Keine Testanfragen über die Formulare versendet. Lokale Formularwarnung ohne Produktionssecrets ist kein Versandnachweis.

## C13 und verbleibende Texte

- `content/health-point.ts:19`, `:45`, `:71`: Onkologie-Absätze DE/EN/ES ohne Infusionen, Präparate oder Wirkstoffe; unverändert. In anderen Leistungsabschnitten werden Infusionskonzepte genannt (`:16`, `:42`, `:68`), nicht im Onkologie-Absatz.
- Die ausdrücklich begrenzte Änderungsliste lässt weitere pauschale ärztliche Aussagen bestehen, etwa Hero-Trust1, Patienten-Hero-Note, FAQ-Intro, Footer-Beschreibungen und ältere nicht in der Sitemap verlinkte Inhalte. Nicht eigenmächtig ersetzt; bitte gesondert freigeben.
- [Vollständige Suchliste mit Datei und Zeile](rechtssicherheit-pr-anhang.md#alle-verbleibenden-suchtreffer), einschließlich aller beauftragten Suchbegriffe (auch false positives), sowie [alle geänderten Strings je Sprache](rechtssicherheit-pr-anhang.md#geänderte-locale-strings-je-sprache). Content-Diffs mit Sprachkontext sind im selben Anhang enthalten. Neue Datenschutz-/Berufsgruppen-/Cookie-Texte sind dort über ihre Quelldateien referenziert.

Das beseitigt nicht automatisch alle rechtlichen Risiken. Die aufgeführten offenen Daten und verbleibenden Aussagen benötigen die Freigabe vor dem Merge.
