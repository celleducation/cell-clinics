# SEO – verbindlicher Stand und offene Arbeit

Stand: 18.09.2026. Diese Datei wird nicht als Website-Inhalt ausgeliefert.
Fehlende Angaben werden ausschließlich hier erfasst, nie als Platzhalter im UI
oder im Schema. Die nachfolgenden Nutzervorgaben ersetzen entgegenstehende
Punkte des ursprünglichen SEO-Auftrags.

## Verbindliche Entscheidungen

- Redaktionelle oder rechtlich relevante Unstimmigkeiten zunächst ausschließlich
  hier dokumentieren. Bestehende Website-Aussagen nicht eigenmächtig ersetzen;
  Änderungen benötigen eine ausdrückliche Freigabe.
- Kein Prüfvermerk, kein Prüfdatenfeld, keine leere Prüfzeile und kein
  `lastReviewed`/`reviewedBy`. Eine Autoren-Byline und die bestehende medizinische
  Leitung dürfen keine erfolgte Einzelprüfung suggerieren.
- Keine neuen Rechtstextseiten. Footer-Links zu cell-education.com bleiben.
- Keine Ergänzung von Praxisleistungen, Öffnungszeiten oder Kosten aus Annahmen.
  Bestehende Praxisbeschreibungen bleiben erhalten; fehlende Kontakte werden
  nicht gerendert. Das gilt auch für die bereits vorhandenen weiteren Profile.
- Dokumentbasierte Therapietexte und neue Therapieseiten sind nach der letzten
  Rückmeldung des Nutzers aus dem aktuellen Umfang herausgenommen. Keine
  Quellenunterlagen anfordern, keine leeren Entwurfsseiten anlegen.
- Falls dieser Ausbau später ausdrücklich wieder aufgenommen wird: nur aus
  freigegebenem Material, `draft: true`, keine öffentlichen Links, keine
  Sitemap-Einträge und keine Indexierung bis zur fachlichen/juristischen Freigabe.
- Patientengerichtete neue Inhalte: keine Heil-/Erfolgsversprechen, Produktnamen,
  Dosierungen, Mengen, Therapiezyklen, Preise, aus Fachinformationen übernommene
  Indikations-/Krankheitslisten, Testimonials oder Zertifizierungssprache.
- Keine direkte Google-Maps-/YouTube-Einbettung, keine extern geladenen Fonts
  oder CDN-Skripte. Patientenformular ausschließlich für Kontaktdaten und
  Einwilligung, nicht für Symptome, Beschwerden oder medizinischen Freitext.

## Fehlende Angaben – ausdrücklich nicht veröffentlichen

- Keine freigegebenen Öffnungszeiten oder zusätzlichen Leistungs-/Kostendaten
  der Praxen vorhanden. Keine erfundenen Schema-Ergänzungen und keine leeren
  Felder dafür anlegen. Fehlende Social-Profile ebenfalls nicht ergänzen.
- Keine abgestimmten Cell-Clinics-Rechtstexte. Externe Rechtstextlinks beibehalten.
- Eine neue Autoren-Byline für neue medizinische Texte setzt tatsächliche
  Autorenschaft voraus; der aktuelle Verzicht auf neue Texte bleibt maßgeblich.

## Freigabe offen: Plattformleitung und Führung der Partnerpraxen

- Vom Nutzer benanntes mögliches Irreführungsrisiko nach UWG: Die Startseite
  bezeichnet Cell Clinics als „ärztlich geführte Plattform“, während MEDIVIUM
  laut bestehendem Profil von Enrico Thiele als Heilpraktiker geführt wird.
  Dies ist ein offener Prüfpunkt, keine abgeschlossene rechtliche Bewertung.
- Medizinische Leitung der Plattform und Berufsqualifikation beziehungsweise
  Leitung der einzelnen Partnerpraxis klar voneinander unterscheiden. Eine
  Plattformleitung belegt keine ärztliche Führung jeder angeschlossenen Praxis.
- Formulierungsvorschlag des Nutzers, noch nicht zur Veröffentlichung freigegeben:
  „ärztlich und therapeutisch geführte Partnerpraxen“. Im jeweiligen Kontext
  prüfen, ob damit unterschiedliche Praxisformen eindeutig gemeint sind und
  nicht eine gemeinsame ärztliche und therapeutische Leitung jeder Praxis.
- Prüfumfang: Startseiten-Metadaten, Hero, `home.whatBody`, Footer sowie die
  pauschalen Aussagen zu ärztlicher Führung/Begleitung im Patientenbereich
  (`patient.hero`, `patient.therapy`, `patient.process`, `patient.footerDescription`).
  Entsprechungen in DE/EN/ES und daraus abgeleitete Social-Metadaten/Schema-Angaben
  einbeziehen. Praxisspezifische Aussagen und die Sektion „Medizinische Leitung“
  separat beurteilen; keine pauschale Suchen-und-Ersetzen-Änderung.
- Website-Texte bleiben bis zur ausdrücklichen Freigabe unverändert.

## Nachforderung vor PR – 18.09.2026

- Sichtbare Breadcrumbs sind nun ausdrücklich freigegeben und auf allen
  24 aktiven Unterseiten umgesetzt (acht Unterseiten × drei Sprachen).
  Sichtbare Navigation und BreadcrumbList verwenden dieselbe Datenquelle.
- A6: Kein Close-Button in den Klinik-Überschriften vorhanden. Das vorhandene
  `×` ist ein dekoratives Partnerschaftszeichen, bereits `aria-hidden`.
  Kein funktionsloser Schließen-Button ergänzt. Falls ein anderes Element
  gemeint ist, konkreten Screenshot/Link zur Zuordnung anfordern.
- FAQ: Auf der aktuellen Patientenseite ist auch im Ausgangs-Commit kein
  Accordion gerendert. Deshalb kein FAQPage-Schema für unsichtbare Inhalte.
  Früher ungenutzte Texte mit unbestätigten Kosten-/Dauerangaben nicht reaktivieren.
  Nutzer wurde auf diese Abweichung hingewiesen; Freigabe geeigneter sichtbarer
  FAQ-Inhalte steht aus, sofern das FAQ überhaupt wieder aufgenommen wird.
- Formulare: Honeypot, signierte serverseitige Mindest-Ausfüllzeit (3 Sekunden)
  und IP-Limit (5 POST-Versuche/Stunde je Node-Prozess) umgesetzt. Beide APIs
  weisen fehlende Einwilligung und unbekannte Felder zurück. B2B-Notizfeld
  entfernt; Checkbox nicht vorausgewählt, Datenschutz-Link direkt am Formular.
  Browserseitige Versand-Fallbacks entfernt, damit keine API-Sperre umgangen wird.
- Vor Merge/Deploy klären: Das IP-Limit ist NICHT instanzübergreifend. Für ein
  globales Vercel-Limit fehlt ein gemeinsam genutzter eigener Speicher oder eine
  Host-seitige Regel. Keine neue Infrastruktur ohne Freigabe provisionieren.
- Produktionskonfiguration prüfen: `FORM_GUARD_SECRET` (mindestens 32 Zeichen,
  auf allen Instanzen gleich) oder bestehender `RESEND_API_KEY` erforderlich;
  bei fehlendem Secret oder vertrauenswürdiger IP bleiben Formulare gesperrt.
  Partner-Versand benötigt Resend. Kein E-Mail-End-to-End-Test ohne Freigabe.
- Ein Notiz-/Gesundheitsdatenkanal existiert nicht mehr. Absichtlicher Missbrauch
  verbleibender Kontaktfelder kann technisch nicht vollständig ausgeschlossen
  werden; keine gegenteilige Garantie formulieren.
- www-Live-Test am 18.09.2026 weiterhin HTTP 200. Code enthält 301-Regel;
  endgültige Abnahme erst nach Deployment. Produktionsprüfung mit echtem
  HTTPS-www-Aufruf und curl gegen alle 27 öffentlichen Sprachseiten vorgesehen.
- PR gegen main ausdrücklich beauftragt; kein direkter Push nach main und kein
  eigenständiger Merge. Wegen der offenen Deployment-Voraussetzungen als Draft.

## Verbleibende Arbeit außerhalb dieses technischen Zwischenstands

- Bestehendes Erscheinungsbild außerhalb der freigegebenen Breadcrumbs und
  ausdrücklich beauftragten Formularkorrekturen beibehalten.
- Kein sichtbares FAQ-Accordion und kein FAQPage-Schema (siehe Nachforderung). Nicht gerenderte alte
  Patiententexte mit unbestätigten Kosten-/Dauerangaben wurden entfernt; der
  vorherige Stand ist in Git wiederherstellbar.
- Datengetriebener Profilumbau und weitere Verzeichnisfunktionen aus Teil B
  sind noch nicht umgesetzt. Keine zusätzlichen Leistungen oder 600-Wörter-
  Fülltexte ohne belastbare Inhalte erzeugen.
- Terminologieumstellung und redaktionelle Prüfung bestehender Patiententexte
  gesondert durchführen; vorhandene Inhalte nicht als medizinisch oder juristisch
  neu geprüft ausgeben. Keine vollständige rechtliche Konformität behaupten.
- Externe Rich-Results-/Schema-Prüfung und Live-Kontrolle nach gesonderter
  Veröffentlichungsfreigabe. Lokale Tests ersetzen diese nicht.
- Bestehende Lint-Fehler separat entscheiden, nicht eigenmächtig repariert:
  `components/ClinicFinder.tsx:92` setzt Suchzustand unmittelbar in `useEffect`
  zurück; `components/SiteHeader.tsx:24` setzt den Menüzustand in einem
  pathname-Effekt zurück. Beide: `react-hooks/set-state-in-effect`, potenziell
  unnötige Folgerenderings. Zusätzlich eine bestehende PostCSS-Export-Warnung.
- Datenschutzprüfung des bestehenden Formularversands über Resend/FormSubmit
  und der serverseitigen Standortsuche separat abstimmen. Es wurden weder neue
  Anbieter noch neue Zwecke eingeführt. Keine echten Testanfragen versenden.
- FormSubmit bleibt nur als bereits vorhandener serverseitiger Patienten-
  Versand-Fallback NACH allen Prüfungen erhalten; Anbieter-/Datenschutzprüfung
  weiterhin separat. Kein externer Dienst für die neue Spamprüfung.

## Abgrenzung

Nur beauftragten PR-Branch veröffentlichen, main nicht direkt ändern. Deployment
und Merge erst nach Freigabe. Search Console, Bing Webmaster
Tools, Google Business Profiles und Änderungen an Partner-Websites bleiben außen vor.
