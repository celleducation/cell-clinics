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
- Die vier zusätzlichen Profile sind vom Nutzer als live und inhaltlich korrekt
  bestätigt. Die Sitemap bleibt bei neun Routen × drei Sprachen = 27 URLs.
- A6: Kein Close-Button in den Klinik-Überschriften vorhanden. Das vorhandene
  `×` ist ein dekoratives Partnerschaftszeichen, bereits `aria-hidden`.
  Kein funktionsloser Schließen-Button ergänzt; Nutzer hat dies bestätigt.
- FAQ ausdrücklich als sichtbare Änderung freigegeben: fünf bestehende Fragen
  und Antworten in DE/EN/ES aus `7f427d5:messages/*.json` unverändert wiederhergestellt.
  Das frühere native Details/Accordion aus Commit `f289d6e` wird wiederverwendet.
  Accordion und FAQPage werden aus demselben lokalisierten Datensatz erzeugt.
  Die ärztlichen Aussagen und vorhandenen Kosten-/Dauerformulierungen bleiben
  wortgleich; diese Wiederherstellung ist keine neue fachliche Einzelprüfung.
  `scripts/test-faq-copy.mjs` prüft die exakte Übereinstimmung mit dem Altbestand.
- Formulare: Honeypot, signierte serverseitige Mindest-Ausfüllzeit (3 Sekunden)
  und IP-Limit (5 POST-Versuche/Stunde je Node-Prozess) umgesetzt. Beide APIs
  weisen fehlende Einwilligung und unbekannte Felder zurück. B2B-Notizfeld
  entfernt; Checkbox nicht vorausgewählt, Datenschutz-Link direkt am Formular.
  Browserseitige Versand-Fallbacks entfernt, damit keine API-Sperre umgangen wird.
- Folgeaufgabe, ausdrücklich KEIN PR-Blocker: Das IP-Limit ist prozesslokal
  und als Zwischenstand akzeptiert. Für ein globales Vercel-Limit später einen
  gemeinsamen Speicher oder eine Regel beim Hoster verwenden. Keine zusätzliche
  Infrastruktur in dieser Runde provisionieren.
- Produktionskonfiguration prüfen: `FORM_GUARD_SECRET` (mindestens 32 Zeichen,
  auf allen Instanzen gleich) oder bestehender `RESEND_API_KEY` erforderlich;
  bei fehlendem Secret oder vertrauenswürdiger IP bleiben Formulare gesperrt.
  Ohne Resend verwenden beide Formulare den bestehenden FormSubmit-Versand
  nach den serverseitigen Prüfungen. Kein E-Mail-End-to-End-Test ohne Freigabe.
- Ein Notiz-/Gesundheitsdatenkanal existiert nicht mehr. Absichtlicher Missbrauch
  verbleibender Kontaktfelder kann technisch nicht vollständig ausgeschlossen
  werden; keine gegenteilige Garantie formulieren.
- www-Domainprüfung: siehe eigener Abschnitt unten. Code enthält die 301-Regel;
  erfolgreiche Live-Abnahme bleibt bis nach Merge und Production-Deployment offen.
- KEIN PR durch den Agenten. Nutzer erstellt ihn selbst nach dem Login.
  Umsetzung endet am Branch `codex/seo-form-hardening`; kein direkter Push nach
  main, kein eigenständiger Merge oder Deploy. Live-Kontrolle separat nachgelagert.

## Verbleibende Arbeit außerhalb dieses technischen Zwischenstands

- Bestehendes Erscheinungsbild außerhalb der freigegebenen Breadcrumbs,
  FAQ-Wiederherstellung und beauftragten Formularkorrekturen beibehalten.
- Datengetriebener Profilumbau und weitere Verzeichnisfunktionen aus Teil B
  sind noch nicht umgesetzt. Keine zusätzlichen Leistungen oder 600-Wörter-
  Fülltexte ohne belastbare Inhalte erzeugen.
- Terminologieumstellung und redaktionelle Prüfung bestehender Patiententexte
  gesondert durchführen; vorhandene Inhalte nicht als medizinisch oder juristisch
  neu geprüft ausgeben. Keine vollständige rechtliche Konformität behaupten.
- Externe Rich-Results-/Schema-Prüfung und Live-Kontrolle nach gesonderter
  Veröffentlichungsfreigabe. Lokale Tests ersetzen diese nicht.
- Bestehende Lint-Fehler bleiben ausdrücklich draußen, separater PR:
  `components/ClinicFinder.tsx:92` setzt Suchzustand unmittelbar in `useEffect`
  zurück; `components/SiteHeader.tsx:24` setzt den Menüzustand in einem
  pathname-Effekt zurück. Beide: `react-hooks/set-state-in-effect`, potenziell
  unnötige Folgerenderings. Zusätzlich eine bestehende PostCSS-Export-Warnung.
- Datenschutzprüfung des bestehenden Formularversands über Resend/FormSubmit
  und der serverseitigen Standortsuche separat abstimmen. Es wurden weder neue
  Anbieter noch neue Zwecke eingeführt. Keine echten Testanfragen versenden.
- FormSubmit bleibt als bestehender Versandweg für Patienten und Partner
  serverseitig NACH allen Prüfungen erhalten; Wiederherstellung des Partner-
  Versands am 18.09.2026 ausdrücklich freigegeben. Anbieter-/Datenschutzprüfung
  weiterhin separat. Kein externer Dienst für die neue Spamprüfung.

## Abgrenzung

Die ursprüngliche Branch-Beschränkung wurde durch die spätere ausdrückliche
Freigabe „ja push auf main“ ersetzt. Kein PR durch den Agenten. Search Console, Bing Webmaster
Tools, Google Business Profiles und Änderungen an Partner-Websites bleiben außen vor.

## Formularreparatur vom 18.09.2026

- Resend-Umstellung vorbereitet: `cell-education.com` am 18.09.2026 im
  angemeldeten Resend-Konto als Verified bestätigt. Beide Formularrouten
  verwenden standardmäßig `Cell Clinics <forms@cell-education.com>` und
  `info@cell-education.com` als Empfänger. Bei konfiguriertem Resend erfolgt
  kein Zweitversand über FormSubmit; Erfolg setzt eine Resend-Mail-ID voraus.
  Schlüssel wird vom Nutzer direkt in Vercel als Production-Secret hinterlegt,
  nicht im Chat oder Repository. Aktivierung, Deployment und neue Live-Abnahme
  bleiben bis zur Bestätigung dieser Konfiguration offen.
- OFFEN: Der ausdrückliche Live-Technik-Test nach Deployment `26e4da7` konnte
  weiterhin nicht zugestellt werden. Vercel protokolliert für den Patienten-
  Test um 14:53 MESZ eine Antwort HTTP 403 von FormSubmit; die eigene API
  übersetzt diese korrekt in 502. Auch der zweite freigegebene Partner-Test
  zeigt einen Versandfehler. Keine Annahme oder Zustellung behaupten.
  Die Ergänzung der Website-Angabe allein löst die Provider-Ablehnung nicht.
  Nächster Schritt erfordert Provider-Freigabe oder die Einrichtung des bereits
  unterstützten Resend-Versands mit verifiziertem Absender durch den Betreiber.
  Kein browserseitiger Bypass, keine Wiederholungs-Testsendungen ohne Freigabe.
- Nachkontrolle der Nutzer-Tests um 14:44 MESZ: Beide POST-Anfragen liefen durch
  die Schutzprüfungen, scheiterten aber beim Provider mit HTTP 502. Die vorherige
  Live-Kontrolle prüfte nur die Challenge-GETs, nicht den tatsächlichen Versand.
  Für die serverseitige Übergabe wird nun die feste öffentliche Website als
  `_url`, Origin und Referer mitgegeben (FormSubmit-Hilfe). Beide APIs verwenden
  denselben Versandhelfer und verlangen eine explizite positive Bestätigung.
  Diagnoseprotokolle enthalten nur feste Fehlercodes, keine Formulardaten.
  Zwei synthetische Live-Testanfragen wurden vom Nutzer ausdrücklich freigegeben;
  eine Providerannahme ist noch kein Nachweis des tatsächlichen Posteingangs.
- Ursache: Auf Vercel waren keine Umgebungsvariablen eingerichtet. Die neue
  Challenge-Prüfung blieb deshalb sicher gesperrt; die UI zeigte irreführend
  bereits vor einer Anfrage einen Versandfehler. Zusätzlich fehlte beim
  Partnerformular der bisherige FormSubmit-Versand, obwohl Resend nicht
  eingerichtet war.
- `FORM_GUARD_SECRET` wurde im Vercel-Projekt als Production-Secret gespeichert.
  Es wird mit dem nächsten Production-Deployment aktiv; Preview ist damit
  nicht automatisch konfiguriert. Keine Schlüsselwerte im Repository.
- Vorbereitungsfehler und Versandfehler werden getrennt angezeigt, mit
  Wiederholen-Button und E-Mail-Kontakt. Honeypot, Mindestzeit, Einwilligung,
  strikte Feldauswahl und IP-Limit bleiben erhalten. Breadcrumbs unverändert.
- Build, gezieltes Linting, lokale SEO-/API-Prüfung und Offline-Regressionstests
  erfolgreich. Providerantworten werden nur simuliert; keine echte Anfrage
  und kein E-Mail-End-to-End-Test versendet. Live-Prüfung nach Deployment.

## www-Domainzuordnung – geprüfter Stand und noch erforderlicher Zugriff

- Am 18.09.2026, 10:45:58 UTC: `curl -sI https://www.cell-clinics.com/de`
  und derselbe Aufruf ohne www liefern beide HTTP 200, `server: Vercel`,
  `x-matched-path: /de` und denselben ETag `833ca4f4c70370766f98b529bf1473ac`.
  DNS: www zeigt per CNAME auf `cname.vercel-dns.com`; Apex-A: `216.198.79.1`.
- Öffentlich ist damit Vercel als Auslieferer belegt, NICHT die Zuordnung
  beider Domains zum konkreten Projekt. Keine lokale `.vercel`-Projektverknüpfung
  oder verfügbare Vercel-CLI. Dashboard-Aufruf führt zur Login-Seite; ohne
  authentifizierten Projektzugriff ist die Domain-Konfiguration nicht einsehbar.
- Folgeprüfung durch den Projektinhaber: Vercel → Projekt → Settings → Domains:
  Ist `www.cell-clinics.com` diesem Projekt und der richtigen Produktionsumgebung
  zugewiesen? Wenn ja, kann die vorhandene Next-Regel nach Deploy die 301 liefern;
  ein zusätzliches Dashboard-Redirect ist nicht grundsätzlich erforderlich.
  Wenn nein, muss die Domainzuordnung beim Hoster korrigiert oder die Weiterleitung
  im tatsächlich zuständigen Projekt/Host gesetzt werden; unser Code erreicht
  die Anfrage sonst nicht. Ob dies hier erforderlich ist, bleibt bis zum Login offen.
- Ein Vercel-Domainredirect ist alternativ unter Domains → Edit → Redirect to
  konfigurierbar. Bei jeder Variante die geforderte **301** (nicht 307/308) und
  unveränderte Pfade/Querys live prüfen. Keine Domain-Konfiguration geändert.
  Quellen: [Vercel Domain-Zuordnung und Redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting),
  [Next.js Redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

## Einordnung der Fundstellen

- Die folgenden Tabellen trennen übergreifende Aussagen von Profiltexten und
  enthalten DE/EN/ES einschließlich Metadaten, Alt-Texten und ungenutztem Bestand.
  Der öffentliche Datensatz enthält sechs freigeschaltete Profile. SchönGesund,
  CURAPRAX und MEDIVIUM sind gemäß Nutzerbestätigung nicht ärztlich geführt.
  Deren Katalogschlüssel sind `mihribanCiftci`, `larsGienger`, `medivium`.
- `components/SiteFooter.tsx:32` rendert `footer.description` auch auf ALLEN
  Praxisprofilen; `patient.footerDescription` nur auf der Patientenseite.
  Diese globale Plattform-/Netzwerkaussage ist keine eigenständige Aussage des
  jeweiligen Praxisinhabers, kann aber auch dort entsprechend verstanden werden.
- `app/[locale]/network/[slug]/page.tsx:32` verwendet Profil-Metadaten,
  Zeile 49 lädt die Profiltexte. `lib/seo.ts` übernimmt Metadaten in Canonical/OG;
  die Aussage ist deshalb auch in Social-Vorschauen zu prüfen.
  Zeile 114 der Profilroute unterscheidet bereits MedicalBusiness/LocalBusiness
  für die drei Heilpraktikerprofile von MedicalOrganization/MedicalClinic für
  die anderen Profile; Schema-Typen behaupten keine persönliche Einzelprüfung.
- Ärztliche Umsetzung an Alpstein (`implementation.*` auf der Startseite) und
  die Leitung durch Dr. Kay Bredehorst (`leadership.*`, `leadershipProfile.*`)
  nicht mit einer Behauptung ärztlicher Führung jeder Partnerpraxis gleichsetzen.
- Unabhängig vom späteren Wording-Beschluss bleiben alle Fundstellen unverändert.
  Vorschlag zur Prüfung: **„ärztlich und therapeutisch geführte Partnerpraxen“**.
  Insbesondere `patient.faq.a2` in allen Sprachen sowie Patienten-Hero und
  Patienten-Footer enthalten weiterhin pauschale ärztliche Aussagen.

<!-- professional-language-inventory:start -->
## Fundstellen Berufsbezeichnungen – vollständiger Katalog-Suchlauf

Stand nach Wiederherstellung des freigegebenen FAQ am 18.09.2026. Zeilen beziehen sich auf diesen Branch-Stand. Bewusst breite Erfassung: ärztliche Führung/Begleitung, medizinische Leitung, Arzt-/Heilpraktikerbezeichnungen sowie medizinischer Kontext. Ein Treffer ist keine Feststellung einer Falschaussage. Schulungen, allgemeine medizinische Standards, fachärztliche Qualifikationen und die tatsächliche medizinische Plattformleitung sind gesondert von pauschaler Praxisführung zu beurteilen. Auch aktuell ungenutzte Katalogschlüssel sind enthalten; keine dieser Aussagen wurde für diese Bestandsaufnahme geändert.

### Übergreifende Aussagen und Kontext (DE/EN/ES)

#### DE

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/de.json:29` | `meta.title` | Cell Clinics \| Ärztlich geführte Plattform für Zellmedizin |
| `messages/de.json:52` | `hero.label` | Ärztlich geführte Implementierungsplattform |
| `messages/de.json:54` | `hero.body` | Cell Clinics bietet klinische Frameworks, ärztliche Schulungen, diagnostische Systeme und Implementierungsunterstützung für Kliniken, Ärzte und Gesundheitsanbieter, die moderne Programme für Zellmedizin aufbauen möchten. |
| `messages/de.json:55` | `hero.trust1` | Ärztlich geführt |
| `messages/de.json:60` | `hero.panelText` | Schulungen · Diagnostik · Ärzte · Klinische Systeme |
| `messages/de.json:76` | `implementation.body1` | Als zentrale Partnerklinik innerhalb des Cell Clinics Frameworks zeigt dieser Standort, wie ärztlich geführte Zellmedizin, biologische Diagnostik, regenerative Medizin und ein hochwertiges klinisches Umfeld in einem operativen Zentrum zusammengeführt werden können. |
| `messages/de.json:79` | `implementation.feature2` | Ärztlich geführte Versorgung |
| `messages/de.json:84` | `implementation.demonstratesBody2` | Dazu gehören ärztliche Schulungen, diagnostische Standards, klinische Behandlungspfade und operative Implementierungsunterstützung. |
| `messages/de.json:86` | `implementation.point2` | Ärztlich geführte Implementierung |
| `messages/de.json:92` | `implementation.poweredBody2` | Ziel ist nicht, Kliniken zu standardisieren, sondern ein bewährtes Framework bereitzustellen, das an lokale medizinische Expertise, Patientengruppen und klinische Ziele angepasst werden kann. |
| `messages/de.json:101` | `ecosystem.title` | Alles, was Sie für eine erfolgreiche zellmedizinische Praxis brauchen |
| `messages/de.json:102` | `ecosystem.body1` | Werden Sie Teil einer Implementierungsplattform, die speziell für Ärztinnen und Ärzte, Kliniken und Gesundheitsanbieter entwickelt wurde. |
| `messages/de.json:105` | `ecosystem.card1Body` | Umfassende ärztliche Schulungen durch Circle, Campus, Infusionsseminare, Webinare und kontinuierliche wissenschaftliche Updates. |
| `messages/de.json:113` | `ecosystem.card5Body` | Werden Sie Teil einer internationalen Gemeinschaft aus Ärztinnen und Ärzten, Kliniken, Forschern und Longevity-Experten. |
| `messages/de.json:128` | `platform.body` | Cell Clinics verbindet Schulungen, Diagnostik, klinische Systeme, Produkte und ein internationales Ärztenetzwerk zu einer durchgängigen Implementierungsplattform. Jede Komponente unterstützt Gesundheitsanbieter entlang der gesamten Patient Journey. |
| `messages/de.json:131` | `platform.module1Body` | Wissenschaftliche Seminare und kontinuierliche ärztliche Schulungen. |
| `messages/de.json:137` | `platform.module4Body` | Innovative Lösungen für die zellmedizinische Versorgung. |
| `messages/de.json:139` | `platform.module5Body` | Internationale Zusammenarbeit mit Ärzten und Experten. |
| `messages/de.json:147` | `systems.title` | Vier Implementierungspfade für zellmedizinische Programme. |
| `messages/de.json:158` | `leadership.label` | Medizinische Leitung |
| `messages/de.json:159` | `leadership.title` | Medizinische Leitung |
| `messages/de.json:160` | `leadership.body` | Das Cell Clinics Framework basiert auf jahrzehntelanger Erfahrung mit ärztlichen Schulungen, der Entwicklung klinischer Frameworks und fundierter Expertise in der Zellmedizin. |
| `messages/de.json:161` | `leadership.stat1` | Ärztliche Schulungen |
| `messages/de.json:164` | `leadership.stat2Body` | Evidenzbasierte Abläufe verbinden Befunderhebung, ärztliche Interpretation und therapeutische Umsetzung. |
| `messages/de.json:166` | `leadership.stat3Body` | Schulungen und fachlicher Austausch schaffen einen gemeinsamen medizinischen Standard über Ländergrenzen hinweg. |
| `messages/de.json:167` | `leadership.stat4` | Zellmedizinische Expertise |
| `messages/de.json:169` | `leadership.cardLabel` | Wissenschaftliche & medizinische Leitung |
| `messages/de.json:170` | `leadership.cardBody` | Ärztliche Schulungen und klinische Framework-Entwicklung für die Implementierung zellmedizinischer Programme. |
| `messages/de.json:205` | `form.professionPhysician` | Arzt/Ärztin |
| `messages/de.json:224` | `footer.description` | Eine ärztlich geführte Implementierungsplattform für Kliniken, die strukturierte Programme für Zellmedizin aufbauen. |
| `messages/de.json:238` | `home.whatBody` | Schulungen, Diagnostik, klinische Systeme, Produkte und ein internationales Netzwerk werden in einer ärztlich geführten Plattform verbunden. |
| `messages/de.json:244` | `platformPage.title` | Ärztlich geführte Implementierungsplattform |
| `messages/de.json:274` | `networkPage.directoryTitle` | Ein Netzwerk. Medizinische Betreuung vor Ort. |
| `messages/de.json:664` | `partnershipsPage.title` | Alles für den erfolgreichen Aufbau einer zellmedizinischen Praxis |
| `messages/de.json:665` | `partnershipsPage.lead` | Werden Sie Teil einer Implementierungsplattform für Ärztinnen und Ärzte, Kliniken und Gesundheitsanbieter. |
| `messages/de.json:677` | `companyPage.education` | Ärztliche Schulungen, Leitlinien und Protokolle. |
| `messages/de.json:687` | `leadershipPage.eyebrow` | Medizinische Leitung |
| `messages/de.json:688` | `leadershipPage.title` | Wissenschaftliche und medizinische Autorität |
| `messages/de.json:689` | `leadershipPage.lead` | Das Cell Clinics Framework basiert auf jahrzehntelanger Erfahrung mit ärztlichen Schulungen und zellmedizinischer Expertise. |
| `messages/de.json:690` | `leadershipPage.role` | Medizinische Leitung für ärztliche Schulungen und klinische Framework-Entwicklung. |
| `messages/de.json:717` | `audience.professionals` | Für Ärzte & Kliniken |
| `messages/de.json:727` | `patient.hero.title` | Bionic Cell Therapy. Ärztlich begleitet, in Ihrer Nähe. |
| `messages/de.json:728` | `patient.hero.body` | Cell Clinics sind Arztpraxen und Kliniken, die Bionic Cell Therapy nach einheitlichen medizinischen Standards anbieten – individuell abgestimmt auf Ihre Gesundheit, Ihre Diagnostik und Ihre Ziele. |
| `messages/de.json:729` | `patient.hero.note` | Persönlich, diagnostikbasiert und ärztlich geführt |
| `messages/de.json:734` | `patient.therapy.intro` | Jede Funktion Ihres Körpers beginnt in der Zelle – Energie, Regeneration, Abwehr. Die Bionic Cell Therapy setzt genau dort an: Auf Basis moderner Diagnostik wird ein individuelles Therapiekonzept erstellt, das Ihre Zellfunktion gezielt unterstützen kann – von Mikronährstoff-Infusionen bis zu begleitenden Therapieverfahren. Immer ärztlich geführt, immer auf Sie abgestimmt. |
| `messages/de.json:738` | `patient.therapy.card4Body` | Als Ergänzung zu bestehenden Behandlungen – in Abstimmung mit Ihren behandelnden Ärztinnen und Ärzten. |
| `messages/de.json:742` | `patient.process.step1Body` | Wählen Sie eine Partnerpraxis aus unserem Netzwerk. Jede Cell Clinic wird nach dem gleichen medizinischen Programm geschult und begleitet – Sie wissen also immer, was Sie erwartet. |
| `messages/de.json:743` | `patient.process.step2Body` | Ihre Ärztin oder Ihr Arzt nimmt sich Zeit: für Ihre Vorgeschichte, Ihre Beschwerden und Ihre Ziele. Daraus entsteht das Bild Ihrer individuellen Ausgangslage. |
| `messages/de.json:745` | `patient.process.step4Body` | Die Behandlung findet direkt in Ihrer Cell Clinic statt und wird ärztlich begleitet. Verlaufskontrollen zeigen die Entwicklung und ermöglichen eine laufende Anpassung des Konzepts. |
| `messages/de.json:748` | `patient.finder.intro` | Unser Netzwerk wächst laufend. Alle Cell Clinics werden von qualifizierten Behandlerinnen und Behandlern geführt und sind Teil eines strukturierten Fachprogramms. |
| `messages/de.json:760` | `patient.trust.item1Body` | Jede Cell Clinic wird von qualifizierten Behandlerinnen und Behandlern geführt. Ärztliche Leistungen bleiben Ärztinnen und Ärzten vorbehalten. |
| `messages/de.json:761` | `patient.trust.item2Body` | Das medizinische Programm wird unter der Leitung von Dr. Kay Bredehorst entwickelt und laufend aktualisiert. |
| `messages/de.json:763` | `patient.trust.item4Body` | Wissenschaftlicher Austausch und kontinuierlicher fachlicher Dialog im internationalen Cell Clinics Netzwerk. |
| `messages/de.json:766` | `patient.faq.intro` | Die wichtigsten Antworten zur ärztlich begleiteten Behandlung in einer Cell Clinic. |
| `messages/de.json:767` | `patient.faq.a1` | Grundsätzlich für Erwachsene, die ihre Gesundheit auf zellulärer Ebene unterstützen möchten – ob bei anhaltender Erschöpfung, zur Regeneration oder präventiv. Ob und welche Behandlung für Sie infrage kommt, entscheidet immer Ihre Ärztin oder Ihr Arzt nach Anamnese und Diagnostik. |
| `messages/de.json:768` | `patient.faq.a2` | Jede Behandlung findet in einer ärztlich geführten Praxis oder Klinik statt und folgt einem einheitlichen medizinischen Programm. Ihre Ärztin oder Ihr Arzt klärt Sie vorab persönlich über Ablauf, Nutzen und mögliche Risiken auf. |
| `messages/de.json:771` | `patient.faq.a5` | Cell Clinics sind Teil eines Netzwerks, das nach einem gemeinsamen medizinischen Programm arbeitet: einheitliche Diagnostik-Standards, abgestimmte Therapieprotokolle und laufende ärztliche Schulungen über die Cell Education. So begegnet Ihnen an jedem Standort derselbe strukturierte Ansatz. |
| `messages/de.json:774` | `patient.footerDescription` | Ein ärztlich geführtes Netzwerk für individuell abgestimmte Bionic Cell Therapy. |
| `messages/de.json:775` | `patient.footerDisclaimer` | Hinweis: Die Inhalte dieser Seite dienen der allgemeinen Information und ersetzen keine ärztliche Beratung, Diagnose oder Behandlung. Ob eine Therapie für Sie geeignet ist, entscheidet ausschließlich Ihre behandelnde Ärztin bzw. Ihr behandelnder Arzt. Individuelle Behandlungsergebnisse können variieren. |

#### EN

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/en.json:29` | `meta.title` | Cell Clinics \| Physician-Guided Cellular Medicine Platform |
| `messages/en.json:30` | `meta.description` | Explore physician-guided cellular medicine for your practice: training, diagnostics and clinical programmes from Cell Clinics. Ask about becoming a partner. |
| `messages/en.json:52` | `hero.label` | Physician-Guided Implementation Platform |
| `messages/en.json:54` | `hero.body` | Cell Clinics provides clinical frameworks, physician education, diagnostic systems and implementation support for healthcare providers building advanced cellular medicine programs. |
| `messages/en.json:55` | `hero.trust1` | Physician-Guided |
| `messages/en.json:60` | `hero.panelText` | Education · Diagnostics · Physicians · Clinical Systems |
| `messages/en.json:76` | `implementation.body1` | As a central partner clinic within the Cell Clinics framework, this site demonstrates how physician-guided cellular medicine, biological diagnostics, regenerative medicine and premium clinical care can come together inside one operational center. |
| `messages/en.json:79` | `implementation.feature2` | Expert-Guided Care |
| `messages/en.json:84` | `implementation.demonstratesBody2` | This includes physician education, diagnostic frameworks, clinical pathways and implementation support. |
| `messages/en.json:86` | `implementation.point2` | Physician-guided implementation |
| `messages/en.json:92` | `implementation.poweredBody2` | The objective is not to standardize clinics, but to provide a proven framework that can be adapted to local medical expertise, patient populations and clinical objectives. |
| `messages/en.json:102` | `ecosystem.body1` | Join an implementation platform designed for physicians, clinics and healthcare professionals. |
| `messages/en.json:105` | `ecosystem.card1Body` | Comprehensive physician education through Circle, Campus, infusion training, webinars and continuous scientific updates. |
| `messages/en.json:113` | `ecosystem.card5Body` | Become part of an international community of physicians, clinics, researchers and longevity experts. |
| `messages/en.json:128` | `platform.body` | Cell Clinics connects education, diagnostics, clinical systems, products and an international physician network into one implementation platform. Every component is designed to support healthcare providers throughout the entire patient journey. |
| `messages/en.json:131` | `platform.module1Body` | Scientific education and continuous physician training. |
| `messages/en.json:158` | `leadership.label` | Medical Leadership |
| `messages/en.json:159` | `leadership.title` | Medical Leadership |
| `messages/en.json:160` | `leadership.body` | The Cell Clinics framework is built upon decades of physician education, clinical framework development and cellular medicine expertise. |
| `messages/en.json:161` | `leadership.stat1` | Physician Education |
| `messages/en.json:164` | `leadership.stat2Body` | Evidence-based workflows connect assessment, physician interpretation and therapeutic implementation. |
| `messages/en.json:166` | `leadership.stat3Body` | Education and expert exchange establish a shared medical standard across international markets. |
| `messages/en.json:170` | `leadership.cardBody` | Medical education and clinical framework development for cellular medicine implementation. |
| `messages/en.json:205` | `form.professionPhysician` | Physician |
| `messages/en.json:224` | `footer.description` | A physician-guided implementation platform for clinics building cellular medicine programs. |
| `messages/en.json:238` | `home.whatBody` | Education, diagnostics, clinical systems, products and an international network are connected in one physician-guided platform. |
| `messages/en.json:244` | `platformPage.title` | Physician-Guided Implementation Platform |
| `messages/en.json:274` | `networkPage.directoryTitle` | One network. Local medical care. |
| `messages/en.json:665` | `partnershipsPage.lead` | Join an implementation platform designed for physicians, clinics and healthcare professionals. |
| `messages/en.json:677` | `companyPage.education` | Physician education, guidelines and protocols. |
| `messages/en.json:687` | `leadershipPage.eyebrow` | Medical Leadership |
| `messages/en.json:689` | `leadershipPage.lead` | The Cell Clinics framework is built on decades of physician education and cellular medicine expertise. |
| `messages/en.json:690` | `leadershipPage.role` | Medical leadership for physician education and clinical framework development. |
| `messages/en.json:714` | `audience.professionals` | For physicians & clinics |
| `messages/en.json:718` | `patient.hero.title` | Bionic Cell Therapy. Physician-guided, close to home. |
| `messages/en.json:718` | `patient.hero.body` | Cell Clinics are medical practices and clinics offering Bionic Cell Therapy according to shared medical standards — individually aligned with your health, diagnostic findings and goals. |
| `messages/en.json:718` | `patient.hero.note` | Personal, diagnostics-based and physician-led |
| `messages/en.json:720` | `patient.therapy.intro` | Every function in your body begins at the cellular level — energy, regeneration and defence. Bionic Cell Therapy starts there. Modern diagnostics inform an individual therapy concept designed to support cellular function, from micronutrient infusions to complementary therapeutic approaches. Always physician-led and tailored to you. |
| `messages/en.json:724` | `patient.therapy.card4Body` | As a complement to existing treatment, coordinated with the physicians already involved in your care. |
| `messages/en.json:728` | `patient.process.step1Body` | Choose a partner practice from our network. Every Cell Clinic is trained and supported through the same medical programme, so you know what to expect. |
| `messages/en.json:729` | `patient.process.step2Title` | Initial consultation & medical history |
| `messages/en.json:729` | `patient.process.step2Body` | Your physician takes time to understand your medical history, concerns and goals. Together, these create a clear picture of your individual starting point. |
| `messages/en.json:731` | `patient.process.step4Body` | Treatment takes place directly at your Cell Clinic under medical supervision. Follow-up assessments monitor progress and allow the concept to be adjusted over time. |
| `messages/en.json:733` | `patient.finder.intro` | Our network continues to grow. Every Cell Clinic is led by qualified practitioners and participates in a structured professional programme. |
| `messages/en.json:735` | `patient.trust.item1Body` | Every Cell Clinic is led by qualified practitioners. Services reserved for physicians remain in medical hands. |
| `messages/en.json:735` | `patient.trust.item2Body` | The medical programme is developed and continuously updated under the leadership of Dr Kay Bredehorst. |
| `messages/en.json:737` | `patient.faq.intro` | Clear answers about physician-guided treatment at a Cell Clinic. |
| `messages/en.json:738` | `patient.faq.a1` | It may be considered by adults who want to support their health at the cellular level, whether for persistent fatigue, recovery or preventive care. Your physician will always decide whether and which treatment is appropriate after reviewing your medical history and diagnostic findings. |
| `messages/en.json:739` | `patient.faq.a2` | Every treatment takes place in a physician-led practice or clinic and follows a shared medical programme. Before treatment, your physician will discuss the process, potential benefits and possible risks with you personally. |
| `messages/en.json:742` | `patient.faq.a5` | Cell Clinics belong to a network working within a shared medical programme: consistent diagnostic standards, aligned therapy protocols and ongoing physician education through Cell Education. This provides the same structured approach at every location. |
| `messages/en.json:745` | `patient.footerDescription` | A physician-led network for individually tailored Bionic Cell Therapy. |
| `messages/en.json:746` | `patient.footerDisclaimer` | Please note: The content on this page is for general information only and does not replace medical advice, diagnosis or treatment. Only your treating physician can decide whether a therapy is suitable for you. Individual treatment outcomes may vary. |

#### ES

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/es.json:29` | `meta.title` | Cell Clinics \| Plataforma médica para medicina celular |
| `messages/es.json:52` | `hero.label` | Plataforma de implementación guiada por médicos |
| `messages/es.json:54` | `hero.body` | Cell Clinics ofrece marcos clínicos, formación médica, sistemas diagnósticos y apoyo a la implementación para clínicas, médicos y proveedores sanitarios que desean desarrollar programas avanzados de medicina celular. |
| `messages/es.json:55` | `hero.trust1` | Guiado por médicos |
| `messages/es.json:60` | `hero.panelText` | Educación · Diagnóstico · Médicos · Sistemas clínicos |
| `messages/es.json:76` | `implementation.body1` | Como clínica asociada central dentro del marco de Cell Clinics, este centro muestra cómo la medicina celular guiada por médicos, el diagnóstico biológico, la medicina regenerativa y una atención clínica premium pueden integrarse en un único entorno operativo. |
| `messages/es.json:84` | `implementation.demonstratesBody2` | Incluye formación médica, marcos diagnósticos, vías clínicas y soporte de implementación. |
| `messages/es.json:86` | `implementation.point2` | Implementación guiada por médicos |
| `messages/es.json:92` | `implementation.poweredBody2` | El objetivo no es estandarizar las clínicas, sino ofrecer un marco probado que pueda adaptarse a la experiencia médica local, las poblaciones de pacientes y los objetivos clínicos. |
| `messages/es.json:102` | `ecosystem.body1` | Únase a una plataforma de implementación diseñada para médicos, clínicas y profesionales sanitarios. |
| `messages/es.json:105` | `ecosystem.card1Body` | Formación médica integral a través de Circle, Campus, capacitación en infusiones, webinars y actualizaciones científicas continuas. |
| `messages/es.json:113` | `ecosystem.card5Body` | Forme parte de una comunidad internacional de médicos, clínicas, investigadores y expertos en longevidad. |
| `messages/es.json:128` | `platform.body` | Cell Clinics conecta educación, diagnóstico, sistemas clínicos, productos y una red internacional de médicos en una sola plataforma de implementación. Cada componente está diseñado para acompañar a los proveedores sanitarios a lo largo de todo el recorrido del paciente. |
| `messages/es.json:131` | `platform.module1Body` | Formación científica y capacitación médica continua. |
| `messages/es.json:139` | `platform.module5Body` | Colaboración internacional entre expertos y médicos. |
| `messages/es.json:158` | `leadership.label` | Liderazgo médico |
| `messages/es.json:159` | `leadership.title` | Liderazgo médico |
| `messages/es.json:160` | `leadership.body` | El marco de Cell Clinics se basa en décadas de formación médica, desarrollo de marcos clínicos y experiencia en medicina celular. |
| `messages/es.json:161` | `leadership.stat1` | Formación médica |
| `messages/es.json:164` | `leadership.stat2Body` | Los procesos basados en evidencia conectan la evaluación, la interpretación médica y la implementación terapéutica. |
| `messages/es.json:166` | `leadership.stat3Body` | La formación y el intercambio profesional establecen un estándar médico común entre distintos países. |
| `messages/es.json:170` | `leadership.cardBody` | Formación médica y desarrollo de marcos clínicos para la implementación de medicina celular. |
| `messages/es.json:205` | `form.professionPhysician` | Médico/a |
| `messages/es.json:224` | `footer.description` | Una plataforma de implementación guiada por médicos para clínicas que desarrollan programas de medicina celular. |
| `messages/es.json:238` | `home.whatBody` | Formación, diagnóstico, sistemas clínicos, productos y una red internacional se conectan en una plataforma guiada por médicos. |
| `messages/es.json:244` | `platformPage.title` | Plataforma de implementación guiada por médicos |
| `messages/es.json:274` | `networkPage.directoryTitle` | Una red. Atención médica local. |
| `messages/es.json:665` | `partnershipsPage.lead` | Únase a una plataforma de implementación diseñada para médicos, clínicas y profesionales sanitarios. |
| `messages/es.json:677` | `companyPage.education` | Formación médica, directrices y protocolos. |
| `messages/es.json:687` | `leadershipPage.eyebrow` | Liderazgo médico |
| `messages/es.json:689` | `leadershipPage.lead` | El marco de Cell Clinics se basa en décadas de formación médica y experiencia en medicina celular. |
| `messages/es.json:690` | `leadershipPage.role` | Dirección médica para la formación profesional y el desarrollo de marcos clínicos. |
| `messages/es.json:714` | `audience.professionals` | Para médicos y clínicas |
| `messages/es.json:718` | `patient.hero.title` | Bionic Cell Therapy. Con acompañamiento médico, cerca de usted. |
| `messages/es.json:718` | `patient.hero.body` | Las Cell Clinics son consultas y clínicas que ofrecen Bionic Cell Therapy conforme a criterios médicos comunes, adaptada a su salud, sus resultados diagnósticos y sus objetivos. |
| `messages/es.json:718` | `patient.hero.note` | Personal, basada en el diagnóstico y dirigida por médicos |
| `messages/es.json:720` | `patient.therapy.intro` | Cada función del organismo comienza en la célula: la energía, la regeneración y las defensas. Bionic Cell Therapy parte de ahí. A partir de diagnósticos modernos se diseña un concepto terapéutico individual que puede contribuir al funcionamiento celular, desde infusiones de micronutrientes hasta procedimientos complementarios. Siempre bajo dirección médica y adaptado a cada persona. |
| `messages/es.json:724` | `patient.therapy.card4Body` | Como complemento de tratamientos existentes y en coordinación con los profesionales médicos que ya le atienden. |
| `messages/es.json:728` | `patient.process.step1Body` | Elija una consulta asociada de nuestra red. Todas las Cell Clinics reciben formación y acompañamiento conforme al mismo programa médico, para que sepa qué puede esperar. |
| `messages/es.json:729` | `patient.process.step2Body` | Su médico dedica tiempo a conocer sus antecedentes, sus molestias y sus objetivos. Así se obtiene una imagen clara de su situación individual. |
| `messages/es.json:731` | `patient.process.step4Body` | El tratamiento se realiza directamente en su Cell Clinic bajo supervisión médica. Los controles permiten observar la evolución y adaptar el concepto cuando sea necesario. |
| `messages/es.json:733` | `patient.finder.intro` | Nuestra red sigue creciendo. Cada Cell Clinic está dirigida por profesionales cualificados y participa en un programa profesional estructurado. |
| `messages/es.json:735` | `patient.trust.item1Title` | Dirección profesional |
| `messages/es.json:735` | `patient.trust.item1Body` | Cada Cell Clinic está dirigida por profesionales cualificados. Los servicios reservados a médicos permanecen en manos médicas. |
| `messages/es.json:735` | `patient.trust.item2Body` | El programa médico se desarrolla y actualiza de forma continua bajo la dirección del Dr. Kay Bredehorst. |
| `messages/es.json:737` | `patient.faq.intro` | Respuestas claras sobre el tratamiento con acompañamiento médico en una Cell Clinic. |
| `messages/es.json:738` | `patient.faq.a1` | Puede considerarse en adultos que desean apoyar su salud a nivel celular, ya sea ante cansancio persistente, durante la recuperación o de forma preventiva. Su médico decidirá siempre si existe una opción adecuada tras revisar su historia clínica y sus resultados diagnósticos. |
| `messages/es.json:739` | `patient.faq.a2` | Cada tratamiento se realiza en una consulta o clínica dirigida por médicos y sigue un programa médico común. Antes de comenzar, su médico le explicará personalmente el procedimiento, los posibles beneficios y los riesgos. |
| `messages/es.json:742` | `patient.faq.a5` | Las Cell Clinics forman parte de una red que trabaja con un programa médico común: criterios diagnósticos consistentes, protocolos terapéuticos coordinados y formación médica continua a través de Cell Education. Así se mantiene el mismo enfoque estructurado en cada centro. |
| `messages/es.json:745` | `patient.footerDescription` | Una red dirigida por médicos para Bionic Cell Therapy adaptada a cada persona. |
| `messages/es.json:746` | `patient.footerDisclaimer` | Aviso: El contenido de esta página es meramente informativo y no sustituye el asesoramiento, el diagnóstico ni el tratamiento médico. Solo su médico puede determinar si una terapia es adecuada para usted. Los resultados individuales pueden variar. |

### Einzelne freigeschaltete Praxisprofile (DE/EN/ES)

#### DE

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/de.json:292` | `clinicProfiles.alpstein.profileLabel` | Medizinisches Profil |
| `messages/de.json:294` | `clinicProfiles.alpstein.profileBody` | Die Klinik verbindet evidenzbasierte Diagnostik mit biologischer und integrativer Medizin. Medizinische Befunde werden nicht isoliert, sondern im Zusammenhang betrachtet und bilden die strukturierte Grundlage für eine individuelle Therapieplanung. |
| `messages/de.json:297` | `clinicProfiles.alpstein.cellClinicsBody` | Die Alpstein Clinic bringt ihre integrative klinische Expertise und den Standort in Gais ein. Cell Clinics stellt das von uns entwickelte Konzept der Bionic Cell Therapy, den Schulungs- und Protokollrahmen sowie die Begleitung der klinischen Implementierung bereit. Diagnostik und Therapieentscheidungen liegen bei den behandelnden Ärztinnen und Ärzten der Klinik. |
| `messages/de.json:303` | `clinicProfiles.alpstein.area2Body` | Integrative Therapieansätze, eingebettet in einen individuellen medizinischen Behandlungsplan. |
| `messages/de.json:307` | `clinicProfiles.alpstein.area4Body` | Humanmedizinische und zahnmedizinische Aspekte werden bei medizinischer Relevanz gemeinsam betrachtet. |
| `messages/de.json:310` | `clinicProfiles.alpstein.approachBody` | Die Alpstein Clinic beschreibt ihre klinische Arbeit in vier miteinander verbundenen Phasen. Die Abfolge wird an die individuelle medizinische Situation angepasst. |
| `messages/de.json:314` | `clinicProfiles.alpstein.stage2Body` | Relevante Belastungen reduzieren, sofern medizinisch angezeigt. |
| `messages/de.json:319` | `clinicProfiles.alpstein.leadershipLabel` | Medizinische Leitung |
| `messages/de.json:321` | `clinicProfiles.alpstein.leadershipBody` | Das medizinische Team arbeitet unter der Leitung von Dr. med. Ralf Oettmeier, Chefarzt und Medizinischer Direktor. Unterschiedliche Fachperspektiven werden in einem integrativen Behandlungsrahmen zusammengeführt. |
| `messages/de.json:324` | `clinicProfiles.alpstein.settingBody` | Die Klinik liegt am historischen Dorfplatz von Gais, zwischen Säntismassiv und Bodensee. Die ruhige Lage und die bewusst gestalteten Räume bilden den Rahmen für die medizinische Betreuung. |
| `messages/de.json:327` | `clinicProfiles.alpstein.contactBody` | Bei medizinischen Fragen, Terminwünschen und Informationen zur Behandlung wenden Sie sich bitte direkt an die Klinik. |
| `messages/de.json:328` | `clinicProfiles.alpstein.sourceNote` | Das Profil basiert auf veröffentlichten Angaben der Alpstein Clinic. Die medizinische Eignung wird individuell durch die behandelnden Ärztinnen und Ärzte beurteilt. |
| `messages/de.json:335` | `clinicProfiles.medivium.metaDescription` | Lernen Sie MEDIVIUM in Stuttgart kennen: Diagnostik und Infusionskonzepte mit Heilpraktiker Enrico Thiele. Informieren Sie sich und fragen Sie ein Gespräch an. |
| `messages/de.json:345` | `clinicProfiles.medivium.fact4` | Enrico Thiele · Heilpraktiker |
| `messages/de.json:351` | `clinicProfiles.medivium.cellClinicsBody` | MEDIVIUM verbindet seine Erfahrung in Diagnostik, Infusionskonzepten und Prävention mit dem von Cell Clinics entwickelten Konzept der Bionic Cell Therapy. Cell Clinics stellt Schulungen, Protokollrahmen und Implementierungsbegleitung bereit. Enrico Thiele arbeitet dabei als Heilpraktiker innerhalb seiner beruflichen Befugnisse; ärztliche Leistungen bleiben Ärztinnen und Ärzten vorbehalten. |
| `messages/de.json:374` | `clinicProfiles.medivium.leadershipTitle` | Enrico Thiele · Heilpraktiker |
| `messages/de.json:375` | `clinicProfiles.medivium.leadershipBody` | Enrico Thiele ist Heilpraktiker und Ansprechpartner bei MEDIVIUM. Seine Arbeit verbindet mehr als 25 Jahre praktische Erfahrung mit einem klar strukturierten Vorgehen für Performance, Regeneration und Longevity. |
| `messages/de.json:382` | `clinicProfiles.medivium.sourceNote` | Das Profil basiert auf den von MEDIVIUM freigegebenen Partnerangaben. Enrico Thiele ist Heilpraktiker. Die individuelle Eignung von Maßnahmen wird im persönlichen Gespräch beurteilt. |
| `messages/de.json:384` | `clinicProfiles.medivium.portraitAlt` | Enrico Thiele, Heilpraktiker bei MEDIVIUM |
| `messages/de.json:450` | `clinicProfiles.majaKoebelAink.fact1` | Fachärztin für MKG-Chirurgie |
| `messages/de.json:451` | `clinicProfiles.majaKoebelAink.fact2` | Fachärztin für Anästhesie |
| `messages/de.json:460` | `clinicProfiles.majaKoebelAink.cellClinicsBody` | Dr. Maja Köbel-Aink bringt ihre fachärztliche Erfahrung in MKG-Chirurgie, Anästhesie und regenerativen Verfahren in das Netzwerk ein. Cell Clinics ergänzt diesen Schwerpunkt durch Schulungen, strukturierte Protokollrahmen und den fachlichen Austausch zur Bionic Cell Therapy. Diagnostik und Therapieentscheidungen liegen bei den behandelnden Fachärztinnen und Fachärzten. |
| `messages/de.json:461` | `clinicProfiles.majaKoebelAink.areasLabel` | Medizinische Schwerpunkte |
| `messages/de.json:479` | `clinicProfiles.majaKoebelAink.stage3Body` | Verfahren und Anästhesie werden passend zur medizinischen Situation individuell abgestimmt. |
| `messages/de.json:481` | `clinicProfiles.majaKoebelAink.stage4Body` | Der Eingriff und die anschließende Heilungsphase werden fachärztlich begleitet. |
| `messages/de.json:482` | `clinicProfiles.majaKoebelAink.leadershipLabel` | Ihre Fachärztin |
| `messages/de.json:484` | `clinicProfiles.majaKoebelAink.leadershipBody` | Dr. Maja Köbel-Aink ist Fachärztin für Mund-, Kiefer- und Gesichtschirurgie sowie Anästhesie. In Lübeck arbeitet sie gemeinsam mit einem spezialisierten Facharzt- und Praxisteam. |
| `messages/de.json:491` | `clinicProfiles.majaKoebelAink.sourceNote` | Das Profil basiert auf den veröffentlichten Angaben der MKG-Chirurgie Lübeck. Die Eignung und Auswahl einer Behandlung wird nach persönlicher Untersuchung durch die behandelnden Fachärztinnen und Fachärzte beurteilt. |
| `messages/de.json:492` | `clinicProfiles.majaKoebelAink.mainImageAlt` | Dr. Maja Köbel-Aink, Fachärztin für MKG-Chirurgie und Anästhesie |
| `messages/de.json:493` | `clinicProfiles.majaKoebelAink.portraitAlt` | Fachärzteteam der MKG-Chirurgie Lübeck |
| `messages/de.json:494` | `clinicProfiles.majaKoebelAink.contextImageAlt` | Fachärzteteam und Praxis der MKG-Chirurgie Lübeck |
| `messages/de.json:505` | `clinicProfiles.larsGienger.fact1` | Heilpraktiker |
| `messages/de.json:515` | `clinicProfiles.larsGienger.cellClinicsBody` | CURAPRAX verbindet Bionic Cell Therapy mit einer fundierten individuellen Diagnostik und einem ganzheitlichen Blick auf Mitochondrienfunktion, Zellalterung und Energiestoffwechsel. Cell Clinics ergänzt den Praxisansatz durch Schulungen, strukturierte Protokollrahmen und den fachlichen Austausch. Die Auswahl und Durchführung der Behandlung erfolgt im persönlichen therapeutischen Kontext. |
| `messages/de.json:539` | `clinicProfiles.larsGienger.leadershipBody` | Lars Gienger ist Heilpraktiker, Osteopath und Physiotherapeut mit über 20 Jahren Erfahrung als praktisch tätiger Therapeut. Seine Arbeit verbindet fundiertes Fachwissen mit einem klar strukturierten Vorgehen für Regeneration, Leistungsfähigkeit und Longevity. |
| `messages/de.json:560` | `clinicProfiles.mihribanCiftci.fact1` | Heilpraktikerin |
| `messages/de.json:567` | `clinicProfiles.mihribanCiftci.profileImageAlt` | Zellmedizinische Illustration von Cell Clinics |
| `messages/de.json:570` | `clinicProfiles.mihribanCiftci.cellClinicsBody` | Cell Clinics ergänzt den ganzheitlichen Ansatz der Praxis durch Schulungen, strukturierte Protokollrahmen und den fachlichen Austausch zu zellmedizinischen Zusammenhängen. Mihriban Ciftci arbeitet im Rahmen ihrer heilpraktischen Tätigkeit; ärztlich vorbehaltene Leistungen verbleiben in ärztlicher Verantwortung. |
| `messages/de.json:580` | `clinicProfiles.mihribanCiftci.area4Body` | Schulungen und strukturierte Cell Clinics Protokollrahmen ergänzen den Blick auf zellmedizinische Zusammenhänge. |
| `messages/de.json:593` | `clinicProfiles.mihribanCiftci.leadershipTitle` | Mihriban Ciftci · Heilpraktikerin |
| `messages/de.json:594` | `clinicProfiles.mihribanCiftci.leadershipBody` | Mihriban Ciftci führt SchönGesund als Heilpraktikerin in Stuttgart. Im Mittelpunkt steht ihre Verbindung von Ästhetik, Wohlbefinden und Schönheit von innen. |
| `messages/de.json:601` | `clinicProfiles.mihribanCiftci.sourceNote` | Das Profil basiert auf den von der Praxis bereitgestellten Angaben sowie öffentlichen Praxisangaben. Mihriban Ciftci ist Heilpraktikerin. Die individuelle Eignung von Maßnahmen wird persönlich beurteilt; ärztlich vorbehaltene Leistungen erfolgen durch Ärztinnen und Ärzte. |
| `messages/de.json:602` | `clinicProfiles.mihribanCiftci.mainImageAlt` | Porträt von Mihriban Ciftci, Heilpraktikerin bei SchönGesund |
| `messages/de.json:624` | `clinicProfiles.nikiciuk.cellClinicsBody` | Die Praxis bringt ihre fachärztliche Erfahrung in Innerer Medizin und Rheumatologie in das Netzwerk ein. Cell Clinics ergänzt diesen Schwerpunkt durch Schulungen, strukturierte Protokollrahmen und den fachlichen Austausch rund um zellmedizinische Zusammenhänge. Diagnostik und sämtliche Therapieentscheidungen verantwortet der behandelnde Facharzt. |
| `messages/de.json:625` | `clinicProfiles.nikiciuk.areasLabel` | Medizinische Schwerpunkte |
| `messages/de.json:637` | `clinicProfiles.nikiciuk.approachBody` | Eine rasche Diagnosestellung und ein früher Therapiebeginn können bei entzündlich-rheumatischen Erkrankungen entscheidend sein. Der Ablauf richtet sich nach der individuellen medizinischen Situation. |
| `messages/de.json:645` | `clinicProfiles.nikiciuk.stage4Body` | Regelmäßige Kontrollen begleiten die Entwicklung und ermöglichen medizinisch notwendige Anpassungen. |
| `messages/de.json:646` | `clinicProfiles.nikiciuk.leadershipLabel` | Ihr Facharzt |
| `messages/de.json:648` | `clinicProfiles.nikiciuk.leadershipBody` | Boguslaw Krystian Nikiciuk ist Facharzt für Innere Medizin und Rheumatologie. Gemeinsam mit seinem qualifizierten Praxisteam behandelt und berät er Patientinnen und Patienten nach modernen fachärztlichen Standards. |
| `messages/de.json:650` | `clinicProfiles.nikiciuk.settingTitle` | Fachärztliche Versorgung in Neuruppin |
| `messages/de.json:654` | `clinicProfiles.nikiciuk.contactBody` | Für Terminwünsche, medizinische Anliegen und Informationen zur Behandlung wenden Sie sich bitte direkt an das Praxisteam. |
| `messages/de.json:655` | `clinicProfiles.nikiciuk.sourceNote` | Das Profil basiert auf den veröffentlichten Angaben der Praxis für Rheumatologie Boguslaw Krystian Nikiciuk. Diagnostik und Therapie werden individuell durch den behandelnden Facharzt festgelegt. |

#### EN

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/en.json:292` | `clinicProfiles.alpstein.profileLabel` | Medical profile |
| `messages/en.json:294` | `clinicProfiles.alpstein.profileBody` | The clinic connects evidence-based diagnostics with biological and integrative medicine. Medical findings are considered in context rather than as isolated values, creating a structured basis for individual treatment planning. |
| `messages/en.json:297` | `clinicProfiles.alpstein.cellClinicsBody` | Alpstein Clinic contributes its integrative clinical expertise and its location in Gais. Cell Clinics provides our Bionic Cell Therapy concept, the education and protocol framework, and clinical implementation support. Diagnostic and treatment decisions remain with the clinic's treating physicians. |
| `messages/en.json:303` | `clinicProfiles.alpstein.area2Body` | Integrative therapeutic approaches selected within an individual medical plan. |
| `messages/en.json:306` | `clinicProfiles.alpstein.area4Title` | Medical & dental context |
| `messages/en.json:307` | `clinicProfiles.alpstein.area4Body` | Human medicine and dentistry are considered together where medically relevant. |
| `messages/en.json:310` | `clinicProfiles.alpstein.approachBody` | Alpstein Clinic describes its clinical work through four connected phases. The sequence is adapted to the individual medical situation. |
| `messages/en.json:319` | `clinicProfiles.alpstein.leadershipLabel` | Medical direction |
| `messages/en.json:321` | `clinicProfiles.alpstein.leadershipBody` | The medical team works under the direction of Dr med. Ralf Oettmeier, Chief Physician and Medical Director. Different medical perspectives are coordinated within an integrative treatment framework. |
| `messages/en.json:327` | `clinicProfiles.alpstein.contactBody` | For medical questions, appointments and information about treatment, please contact the clinic directly. |
| `messages/en.json:328` | `clinicProfiles.alpstein.sourceNote` | Profile based on information published by Alpstein Clinic. Medical suitability is assessed individually by the treating physicians. |
| `messages/en.json:335` | `clinicProfiles.medivium.metaDescription` | Discover MEDIVIUM in Stuttgart: diagnostics and structured infusion concepts with Enrico Thiele, Heilpraktiker. Contact the practice for a consultation. |
| `messages/en.json:345` | `clinicProfiles.medivium.fact4` | Enrico Thiele · Heilpraktiker |
| `messages/en.json:351` | `clinicProfiles.medivium.cellClinicsBody` | MEDIVIUM combines its experience in diagnostics, infusion concepts and prevention with the Bionic Cell Therapy concept developed by Cell Clinics. Cell Clinics provides education, the protocol framework and implementation support. Enrico Thiele works as a German Heilpraktiker within his professional scope; services reserved for physicians remain in medical hands. |
| `messages/en.json:374` | `clinicProfiles.medivium.leadershipTitle` | Enrico Thiele · Heilpraktiker |
| `messages/en.json:375` | `clinicProfiles.medivium.leadershipBody` | Enrico Thiele is a German Heilpraktiker and the practitioner at MEDIVIUM. His work combines more than 25 years of practical experience with a clearly structured approach to performance, recovery and longevity. |
| `messages/en.json:382` | `clinicProfiles.medivium.sourceNote` | This profile is based on partner information approved by MEDIVIUM. Enrico Thiele is a German Heilpraktiker, not a physician. Suitability of individual measures is assessed during a personal consultation. |
| `messages/en.json:384` | `clinicProfiles.medivium.portraitAlt` | Enrico Thiele, Heilpraktiker at MEDIVIUM |
| `messages/en.json:446` | `clinicProfiles.majaKoebelAink.heroBody` | Specialist oral and maxillofacial surgery with a holistic perspective: Dr Maja Köbel-Aink combines surgical expertise, anaesthesiology and biological treatment concepts in a personal practice setting. |
| `messages/en.json:451` | `clinicProfiles.majaKoebelAink.fact2` | Specialist in anaesthesiology |
| `messages/en.json:460` | `clinicProfiles.majaKoebelAink.cellClinicsBody` | Dr Maja Köbel-Aink contributes her specialist experience in oral and maxillofacial surgery, anaesthesiology and regenerative procedures. Cell Clinics complements this expertise with seminars, structured protocol frameworks and professional exchange on Bionic Cell Therapy. Diagnostic and treatment decisions remain with the treating medical specialists. |
| `messages/en.json:461` | `clinicProfiles.majaKoebelAink.areasLabel` | Medical focus areas |
| `messages/en.json:479` | `clinicProfiles.majaKoebelAink.stage3Body` | The procedure and anaesthesia are individually aligned with the medical situation. |
| `messages/en.json:481` | `clinicProfiles.majaKoebelAink.stage4Body` | The procedure and subsequent healing phase are supported by medical specialists. |
| `messages/en.json:482` | `clinicProfiles.majaKoebelAink.leadershipLabel` | Your specialist |
| `messages/en.json:484` | `clinicProfiles.majaKoebelAink.leadershipBody` | Dr Maja Köbel-Aink is a specialist in oral and maxillofacial surgery and anaesthesiology. In Lübeck, she works alongside a specialised medical and practice team. |
| `messages/en.json:491` | `clinicProfiles.majaKoebelAink.sourceNote` | This profile is based on information published by the Lübeck oral and maxillofacial surgery practice. Treatment suitability and selection are assessed by the treating specialists after personal examination. |
| `messages/en.json:492` | `clinicProfiles.majaKoebelAink.mainImageAlt` | Dr Maja Köbel-Aink, specialist in oral and maxillofacial surgery and anaesthesiology |
| `messages/en.json:493` | `clinicProfiles.majaKoebelAink.portraitAlt` | Specialist team at the Lübeck oral and maxillofacial surgery practice |
| `messages/en.json:494` | `clinicProfiles.majaKoebelAink.contextImageAlt` | Specialist team and Lübeck practice |
| `messages/en.json:498` | `clinicProfiles.larsGienger.metaDescription` | Explore CURAPRAX in Bretten with Lars Gienger: naturopathy, functional medicine, osteopathy and physiotherapy. Contact the practice to request personal advice. |
| `messages/en.json:501` | `clinicProfiles.larsGienger.heroBody` | Naturopathy, functional medicine, osteopathy and physiotherapy under one roof: at CURAPRAX, Lars Gienger combines many years of practical experience with precise diagnostics and clearly structured treatment planning. |
| `messages/en.json:505` | `clinicProfiles.larsGienger.fact1` | Naturopathic practitioner |
| `messages/en.json:525` | `clinicProfiles.larsGienger.area4Body` | Infusion and injection concepts are incorporated into the personal treatment plan following medical history and diagnostics. |
| `messages/en.json:529` | `clinicProfiles.larsGienger.stage1Title` | Medical history |
| `messages/en.json:539` | `clinicProfiles.larsGienger.leadershipBody` | Lars Gienger is a naturopathic practitioner, osteopath and physiotherapist with more than 20 years of hands-on therapeutic experience. His work combines sound expertise with a clearly structured approach to regeneration, performance and longevity. |
| `messages/en.json:546` | `clinicProfiles.larsGienger.sourceNote` | This profile is based on practice information supplied and approved for publication by CURAPRAX. Suitable measures are determined following an individual medical history and diagnostic assessment. |
| `messages/en.json:556` | `clinicProfiles.mihribanCiftci.heroBody` | A holistic view of aesthetics and wellbeing: at SchönGesund, Mihriban Ciftci combines naturopathic support with the guiding idea that radiance and beauty begin from within. |
| `messages/en.json:560` | `clinicProfiles.mihribanCiftci.fact1` | Naturopathic practitioner |
| `messages/en.json:566` | `clinicProfiles.mihribanCiftci.profileBody` | At SchönGesund, wellbeing, vitality and aesthetic goals are considered as part of the whole person. Mihriban Ciftci takes time to understand each individual starting point and develops naturopathic support suited to personal goals and circumstances. |
| `messages/en.json:570` | `clinicProfiles.mihribanCiftci.cellClinicsBody` | Cell Clinics complements the practice’s holistic approach through education, structured protocol frameworks and professional exchange on cellular medicine. Mihriban Ciftci works within the scope of naturopathic practice; services reserved for physicians remain under medical responsibility. |
| `messages/en.json:576` | `clinicProfiles.mihribanCiftci.area2Body` | Personal goals and circumstances form the basis for tailored naturopathic support. |
| `messages/en.json:589` | `clinicProfiles.mihribanCiftci.stage3Body` | Suitable naturopathic support is agreed transparently and personally. |
| `messages/en.json:593` | `clinicProfiles.mihribanCiftci.leadershipTitle` | Mihriban Ciftci · Naturopathic practitioner |
| `messages/en.json:594` | `clinicProfiles.mihribanCiftci.leadershipBody` | Mihriban Ciftci leads SchönGesund as a naturopathic practitioner in Stuttgart. Her work centres on connecting aesthetics, wellbeing and beauty from within. |
| `messages/en.json:597` | `clinicProfiles.mihribanCiftci.settingBody` | The personal private practice offers a calm setting for consultation and individually tailored naturopathic support. |
| `messages/en.json:601` | `clinicProfiles.mihribanCiftci.sourceNote` | This profile is based on information supplied by the practice and publicly available practice information. Mihriban Ciftci is a naturopathic practitioner. Suitability is assessed individually; services reserved for physicians are provided by medical doctors. |
| `messages/en.json:602` | `clinicProfiles.mihribanCiftci.mainImageAlt` | Portrait of Mihriban Ciftci, naturopathic practitioner at SchönGesund |
| `messages/en.json:611` | `clinicProfiles.nikiciuk.heroBody` | Specialist internal medicine and rheumatology in Neuruppin: Boguslaw Krystian Nikiciuk and his team support people with inflammatory rheumatic diseases from early diagnosis through long-term treatment. |
| `messages/en.json:624` | `clinicProfiles.nikiciuk.cellClinicsBody` | The practice contributes specialist expertise in internal medicine and rheumatology to the network. Cell Clinics complements this focus through education, structured protocol frameworks and professional exchange around cellular medicine. The treating specialist remains responsible for diagnostics and all treatment decisions. |
| `messages/en.json:630` | `clinicProfiles.nikiciuk.area2Body` | Joint ultrasound, joint aspiration, laboratory testing and collaborative X-ray diagnostics provide a sound basis for medical decisions. |
| `messages/en.json:637` | `clinicProfiles.nikiciuk.approachBody` | Prompt diagnosis and early treatment can be decisive in inflammatory rheumatic disease. Each pathway is adapted to the individual medical situation. |
| `messages/en.json:638` | `clinicProfiles.nikiciuk.stage1Title` | Medical history |
| `messages/en.json:645` | `clinicProfiles.nikiciuk.stage4Body` | Regular reviews monitor progress and enable medically necessary adjustments. |
| `messages/en.json:646` | `clinicProfiles.nikiciuk.leadershipLabel` | Your specialist |
| `messages/en.json:648` | `clinicProfiles.nikiciuk.leadershipBody` | Boguslaw Krystian Nikiciuk is a specialist in internal medicine and rheumatology. Together with his qualified practice team, he treats and advises patients according to modern specialist standards. |
| `messages/en.json:650` | `clinicProfiles.nikiciuk.settingTitle` | Specialist care in Neuruppin |
| `messages/en.json:651` | `clinicProfiles.nikiciuk.settingBody` | Located on Neuruppin's lakeside promenade, the practice combines specialist rheumatology diagnostics with personal, continuous care. |
| `messages/en.json:654` | `clinicProfiles.nikiciuk.contactBody` | For appointments, medical concerns and information about treatment, please contact the practice team directly. |
| `messages/en.json:655` | `clinicProfiles.nikiciuk.sourceNote` | This profile is based on information published by the rheumatology practice of Boguslaw Krystian Nikiciuk. Diagnostics and treatment are determined individually by the treating specialist. |

#### ES

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/es.json:292` | `clinicProfiles.alpstein.profileLabel` | Perfil médico |
| `messages/es.json:294` | `clinicProfiles.alpstein.profileBody` | La clínica combina diagnóstico basado en la evidencia con medicina biológica e integrativa. Los hallazgos médicos se interpretan en su contexto y constituyen una base estructurada para planificar el tratamiento individual. |
| `messages/es.json:297` | `clinicProfiles.alpstein.cellClinicsBody` | Alpstein Clinic aporta su experiencia clínica integrativa y su sede en Gais. Cell Clinics proporciona nuestro concepto de Bionic Cell Therapy, el marco de formación y protocolos, y el acompañamiento para la implementación clínica. Las decisiones diagnósticas y terapéuticas corresponden a los médicos responsables de la clínica. |
| `messages/es.json:303` | `clinicProfiles.alpstein.area2Body` | Enfoques integrativos incorporados a un plan médico individual. |
| `messages/es.json:307` | `clinicProfiles.alpstein.area4Body` | Los aspectos médicos y odontológicos se valoran conjuntamente cuando resulta pertinente. |
| `messages/es.json:310` | `clinicProfiles.alpstein.approachBody` | Alpstein Clinic organiza su trabajo clínico en cuatro fases conectadas, adaptadas a la situación médica individual. |
| `messages/es.json:314` | `clinicProfiles.alpstein.stage2Body` | Reducir cargas relevantes cuando esté médicamente indicado. |
| `messages/es.json:319` | `clinicProfiles.alpstein.leadershipLabel` | Dirección médica |
| `messages/es.json:321` | `clinicProfiles.alpstein.leadershipBody` | El equipo médico trabaja bajo la dirección del Dr. med. Ralf Oettmeier, médico jefe y director médico. Las distintas perspectivas se coordinan dentro de un marco terapéutico integrativo. |
| `messages/es.json:327` | `clinicProfiles.alpstein.contactBody` | Para cuestiones médicas, citas e información sobre tratamientos, contacte directamente con la clínica. |
| `messages/es.json:328` | `clinicProfiles.alpstein.sourceNote` | Perfil basado en la información publicada por Alpstein Clinic. La idoneidad médica se valora de forma individual por el equipo tratante. |
| `messages/es.json:335` | `clinicProfiles.medivium.metaDescription` | Conozca MEDIVIUM en Stuttgart: diagnóstico e infusiones con Enrico Thiele, Heilpraktiker. Contacte con la consulta y solicite información sobre su atención. |
| `messages/es.json:345` | `clinicProfiles.medivium.fact4` | Enrico Thiele · Heilpraktiker |
| `messages/es.json:351` | `clinicProfiles.medivium.cellClinicsBody` | MEDIVIUM combina su experiencia en diagnóstico, conceptos de infusión y prevención con el concepto de Bionic Cell Therapy desarrollado por Cell Clinics. Cell Clinics proporciona la formación, el marco de protocolos y el acompañamiento para la implementación. Enrico Thiele ejerce como Heilpraktiker alemán dentro de sus competencias profesionales; los servicios reservados a médicos permanecen en manos médicas. |
| `messages/es.json:374` | `clinicProfiles.medivium.leadershipTitle` | Enrico Thiele · Heilpraktiker |
| `messages/es.json:375` | `clinicProfiles.medivium.leadershipBody` | Enrico Thiele es Heilpraktiker alemán y terapeuta en MEDIVIUM. Su trabajo combina más de 25 años de experiencia práctica con un enfoque claramente estructurado para el rendimiento, la recuperación y la longevidad. |
| `messages/es.json:382` | `clinicProfiles.medivium.sourceNote` | Este perfil se basa en la información de socio aprobada por MEDIVIUM. Enrico Thiele es Heilpraktiker alemán, no médico. La idoneidad de cada medida se valora en una consulta personal. |
| `messages/es.json:384` | `clinicProfiles.medivium.portraitAlt` | Enrico Thiele, Heilpraktiker de MEDIVIUM |
| `messages/es.json:450` | `clinicProfiles.majaKoebelAink.fact1` | Especialista en cirugía maxilofacial |
| `messages/es.json:451` | `clinicProfiles.majaKoebelAink.fact2` | Especialista en anestesiología |
| `messages/es.json:460` | `clinicProfiles.majaKoebelAink.cellClinicsBody` | La Dra. Maja Köbel-Aink aporta su experiencia en cirugía maxilofacial, anestesiología y procedimientos regenerativos. Cell Clinics complementa este enfoque mediante seminarios, marcos de protocolos estructurados e intercambio profesional sobre Bionic Cell Therapy. Las decisiones diagnósticas y terapéuticas corresponden a los especialistas responsables. |
| `messages/es.json:461` | `clinicProfiles.majaKoebelAink.areasLabel` | Áreas médicas |
| `messages/es.json:479` | `clinicProfiles.majaKoebelAink.stage3Body` | El procedimiento y la anestesia se adaptan individualmente a la situación médica. |
| `messages/es.json:482` | `clinicProfiles.majaKoebelAink.leadershipLabel` | Su especialista |
| `messages/es.json:484` | `clinicProfiles.majaKoebelAink.leadershipBody` | La Dra. Maja Köbel-Aink es especialista en cirugía oral y maxilofacial y anestesiología. En Lübeck trabaja junto a un equipo médico y de consulta especializado. |
| `messages/es.json:492` | `clinicProfiles.majaKoebelAink.mainImageAlt` | Dra. Maja Köbel-Aink, especialista en cirugía maxilofacial y anestesiología |
| `messages/es.json:493` | `clinicProfiles.majaKoebelAink.portraitAlt` | Equipo de especialistas de la consulta de cirugía maxilofacial de Lübeck |
| `messages/es.json:494` | `clinicProfiles.majaKoebelAink.contextImageAlt` | Equipo de especialistas y consulta de Lübeck |
| `messages/es.json:505` | `clinicProfiles.larsGienger.fact1` | Profesional naturista |
| `messages/es.json:539` | `clinicProfiles.larsGienger.leadershipBody` | Lars Gienger es profesional naturista, osteópata y fisioterapeuta con más de 20 años de experiencia terapéutica práctica. Su trabajo combina conocimientos sólidos con un enfoque estructurado para la regeneración, el rendimiento y la longevidad. |
| `messages/es.json:556` | `clinicProfiles.mihribanCiftci.heroBody` | Una visión integral de la estética y el bienestar: en SchönGesund, Mihriban Ciftci combina el acompañamiento naturista con la idea de que la luminosidad y la belleza comienzan desde el interior. |
| `messages/es.json:560` | `clinicProfiles.mihribanCiftci.fact1` | Profesional naturista |
| `messages/es.json:566` | `clinicProfiles.mihribanCiftci.profileBody` | En SchönGesund, el bienestar, la vitalidad y los objetivos estéticos se contemplan dentro de la situación global de cada persona. Mihriban Ciftci dedica tiempo a comprender el punto de partida individual y plantea un acompañamiento naturista adaptado a cada objetivo y circunstancia. |
| `messages/es.json:570` | `clinicProfiles.mihribanCiftci.cellClinicsBody` | Cell Clinics complementa el enfoque integral de la consulta mediante formación, marcos de protocolos estructurados e intercambio profesional sobre medicina celular. Mihriban Ciftci trabaja dentro del ámbito naturista; los servicios reservados a médicos permanecen bajo responsabilidad médica. |
| `messages/es.json:576` | `clinicProfiles.mihribanCiftci.area2Body` | Los objetivos y circunstancias personales constituyen la base de un acompañamiento naturista adaptado. |
| `messages/es.json:589` | `clinicProfiles.mihribanCiftci.stage3Body` | El acompañamiento naturista adecuado se acuerda de forma transparente y personal. |
| `messages/es.json:593` | `clinicProfiles.mihribanCiftci.leadershipTitle` | Mihriban Ciftci · Profesional naturista |
| `messages/es.json:594` | `clinicProfiles.mihribanCiftci.leadershipBody` | Mihriban Ciftci dirige SchönGesund como profesional naturista en Stuttgart. Su trabajo une estética, bienestar y belleza desde el interior. |
| `messages/es.json:597` | `clinicProfiles.mihribanCiftci.settingBody` | La consulta privada ofrece un entorno tranquilo para el asesoramiento y un acompañamiento naturista individualizado. |
| `messages/es.json:601` | `clinicProfiles.mihribanCiftci.sourceNote` | Este perfil se basa en información facilitada por la consulta y en información pública de la consulta. Mihriban Ciftci es profesional naturista. La idoneidad se valora individualmente; los servicios reservados a médicos son realizados por profesionales médicos. |
| `messages/es.json:602` | `clinicProfiles.mihribanCiftci.mainImageAlt` | Retrato de Mihriban Ciftci, profesional naturista en SchönGesund |
| `messages/es.json:624` | `clinicProfiles.nikiciuk.cellClinicsBody` | La consulta aporta a la red su experiencia especializada en medicina interna y reumatología. Cell Clinics complementa este enfoque mediante formación, marcos de protocolos estructurados e intercambio profesional sobre medicina celular. El especialista responsable mantiene la responsabilidad sobre el diagnóstico y todas las decisiones terapéuticas. |
| `messages/es.json:630` | `clinicProfiles.nikiciuk.area2Body` | La ecografía articular, las punciones, las pruebas de laboratorio y la radiología en colaboración proporcionan una base médica sólida. |
| `messages/es.json:637` | `clinicProfiles.nikiciuk.approachBody` | Un diagnóstico rápido y un tratamiento temprano pueden ser decisivos en las enfermedades reumáticas inflamatorias. El proceso se adapta a cada situación médica. |
| `messages/es.json:645` | `clinicProfiles.nikiciuk.stage4Body` | Los controles regulares acompañan la evolución y permiten realizar los ajustes médicos necesarios. |
| `messages/es.json:646` | `clinicProfiles.nikiciuk.leadershipLabel` | Su especialista |
| `messages/es.json:648` | `clinicProfiles.nikiciuk.leadershipBody` | Boguslaw Krystian Nikiciuk es especialista en medicina interna y reumatología. Junto con su equipo cualificado, trata y asesora a sus pacientes de acuerdo con estándares especializados modernos. |
| `messages/es.json:654` | `clinicProfiles.nikiciuk.contactBody` | Para citas, consultas médicas e información sobre tratamientos, contacte directamente con el equipo de la consulta. |
| `messages/es.json:655` | `clinicProfiles.nikiciuk.sourceNote` | Este perfil se basa en la información publicada por la consulta de reumatología de Boguslaw Krystian Nikiciuk. El especialista responsable determina individualmente el diagnóstico y el tratamiento. |

### Nicht freigeschaltetes Profil – nur Katalogbestand

#### DE

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/de.json:389` | `clinicProfiles.monikaBrueck.metaDescription` | Entdecken Sie die Hautarztpraxis Dr. Monika Brück in Palma: Dermatologie, Hautkrebsvorsorge und ästhetische Medizin. Fragen Sie eine persönliche Beratung an. |
| `messages/de.json:396` | `clinicProfiles.monikaBrueck.fact1` | Fachärztin für Dermatologie |
| `messages/de.json:402` | `clinicProfiles.monikaBrueck.profileBody` | Die Hautarztpraxis Dr. Monika Brück in Palma de Mallorca verbindet allgemeine Dermatologie, moderne Hautkrebsdiagnostik und ästhetische Medizin. Im Mittelpunkt stehen ausführliche Information, eine individuelle Beratung und schonende Behandlungsverfahren, die auf die persönliche Situation abgestimmt werden. |
| `messages/de.json:405` | `clinicProfiles.monikaBrueck.cellClinicsBody` | Die Praxis bringt ihre dermatologische und ästhetisch-medizinische Expertise in das Netzwerk ein. Cell Clinics stellt das von uns entwickelte Konzept der Bionic Cell Therapy, den Schulungs- und Protokollrahmen sowie die Implementierungsbegleitung bereit. Die ärztliche Beurteilung und Behandlung verantwortet Dr. Monika Brück. |
| `messages/de.json:418` | `clinicProfiles.monikaBrueck.approachBody` | Die Praxis verbindet medizinische Verantwortung, regelmäßige Schulungen und ein tiefes Verständnis für die individuellen Wünsche und Bedürfnisse ihrer Patientinnen und Patienten. |
| `messages/de.json:422` | `clinicProfiles.monikaBrueck.stage2Body` | Moderne Diagnostik schafft eine fundierte medizinische Grundlage. |
| `messages/de.json:427` | `clinicProfiles.monikaBrueck.leadershipLabel` | Ihre Ärztin |
| `messages/de.json:429` | `clinicProfiles.monikaBrueck.leadershipBody` | Dr. Monika Brück ist Fachärztin für Dermatologie mit Schwerpunkten in dermatologischer Onkologie, Allergologie und Anti-Aging-Therapien. Nach mehr als 20 Jahren eigener Praxis in Reutlingen arbeitet sie heute in Palma de Mallorca. |
| `messages/de.json:436` | `clinicProfiles.monikaBrueck.sourceNote` | Das Profil basiert auf den veröffentlichten Angaben der Hautarztpraxis Dr. Monika Brück. Die medizinische Eignung einer Behandlung wird individuell durch die behandelnde Ärztin beurteilt. |
| `messages/de.json:437` | `clinicProfiles.monikaBrueck.mainImageAlt` | Dr. Monika Brück in ihrer Hautarztpraxis auf Mallorca |
| `messages/de.json:438` | `clinicProfiles.monikaBrueck.portraitAlt` | Porträt von Dr. Monika Brück, Fachärztin für Dermatologie |
| `messages/de.json:439` | `clinicProfiles.monikaBrueck.contextImageAlt` | Hautarztpraxis Dr. Monika Brück in Palma de Mallorca |

#### EN

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/en.json:405` | `clinicProfiles.monikaBrueck.cellClinicsBody` | The practice contributes its expertise in dermatology and aesthetic medicine to the network. Cell Clinics provides our Bionic Cell Therapy concept, the education and protocol framework, and implementation support. Dr Monika Brück remains responsible for medical assessment and treatment. |
| `messages/en.json:418` | `clinicProfiles.monikaBrueck.approachBody` | The practice combines medical responsibility, continuous professional development and a deep understanding of each patient's individual wishes and needs. |
| `messages/en.json:422` | `clinicProfiles.monikaBrueck.stage2Body` | Modern diagnostics provide a sound medical foundation. |
| `messages/en.json:427` | `clinicProfiles.monikaBrueck.leadershipLabel` | Your physician |
| `messages/en.json:436` | `clinicProfiles.monikaBrueck.sourceNote` | This profile is based on information published by Dr Monika Brück's dermatology practice. Treatment suitability is assessed individually by the treating physician. |

#### ES

| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |
| --- | --- | --- |
| `messages/es.json:396` | `clinicProfiles.monikaBrueck.fact1` | Especialista en dermatología |
| `messages/es.json:405` | `clinicProfiles.monikaBrueck.cellClinicsBody` | La consulta aporta a la red su experiencia en dermatología y medicina estética. Cell Clinics proporciona nuestro concepto de Bionic Cell Therapy, el marco de formación y protocolos, y el acompañamiento para la implementación. La Dra. Monika Brück es responsable de la valoración y del tratamiento médico. |
| `messages/es.json:418` | `clinicProfiles.monikaBrueck.approachBody` | La consulta combina responsabilidad médica, formación continua y una profunda comprensión de los deseos y necesidades individuales de cada paciente. |
| `messages/es.json:422` | `clinicProfiles.monikaBrueck.stage2Body` | El diagnóstico moderno proporciona una base médica sólida. |
| `messages/es.json:427` | `clinicProfiles.monikaBrueck.leadershipLabel` | Su médica |
| `messages/es.json:429` | `clinicProfiles.monikaBrueck.leadershipBody` | La Dra. Monika Brück es especialista en dermatología con experiencia en oncología dermatológica, alergología y terapias antienvejecimiento. Tras dirigir su propia consulta en Reutlingen durante más de 20 años, actualmente ejerce en Palma de Mallorca. |
| `messages/es.json:436` | `clinicProfiles.monikaBrueck.sourceNote` | Este perfil se basa en la información publicada por la consulta dermatológica de la Dra. Monika Brück. La idoneidad de cada tratamiento se valora individualmente por la médica tratante. |
| `messages/es.json:438` | `clinicProfiles.monikaBrueck.portraitAlt` | Retrato de la Dra. Monika Brück, especialista en dermatología |

### Ergänzende, nicht lokalisierte Datenquellen (gemeinsam für DE/EN/ES)

`content/clinics.ts` enthält Verzeichnisdaten einschließlich nicht freigeschalteter Profile; `content/site.ts` enthält englische Modul-Beschreibungen (Katalogbestand, nicht automatisch sichtbarer Text). Diese Kontexttreffer sind separat von pauschalen Aussagen zu beurteilen.

| Datei:Zeile | Unveränderter Quelltext |
| --- | --- |
| `content/clinics.ts:33` | "An integrative medical centre in the Appenzell region combining comprehensive diagnostics with biological and regenerative medicine.", |
| `content/clinics.ts:35` | "Alpstein Clinic takes an integrative view of health and brings together medical diagnostics, biological medicine and an interdisciplinary clinical team in Gais, Switzerland.", |
| `content/clinics.ts:92` | website: "https://www.jameda.de/mihriban-ciftci/heilpraktiker/stuttgart", |
| `content/clinics.ts:141` | name: "Hautarztpraxis Dr. Monika Brück", |
| `content/clinics.ts:142` | practitioner: "Dr. Monika Brück · Fachärztin für Dermatologie", |
| `content/clinics.ts:155` | website: "https://www.hautarzt-mallorca.com", |
| `content/clinics.ts:156` | contactEmail: "info@hautarzt-mallorca.com", |
| `content/clinics.ts:163` | practitioner: "Dr. Maja Köbel-Aink · Fachärztin für MKG-Chirurgie und Anästhesie", |
| `content/clinics.ts:182` | practitioner: "Lars Gienger · Heilpraktiker, Osteopath und Physiotherapeut", |
| `content/clinics.ts:204` | practitioner: "Boguslaw Krystian Nikiciuk · Facharzt für Innere Medizin und Rheumatologie", |
| `content/clinics.ts:210` | summary: "Internistische Facharztpraxis für die Diagnostik und Behandlung entzündlich-rheumatischer Erkrankungen in allen Stadien.", |
| `content/clinics.ts:225` | name: "Zahnarztpraxis Dr. Michael Maak und Kollegen", |
| `content/clinics.ts:237` | practitioner: "Dr. rer. nat. Anke Stockhausen · Apothekerin und Heilpraktikerin", |
| `content/clinics.ts:247` | name: "Zahnarztpraxis Dr. Neumeyer & Partner", |
| `content/clinics.ts:259` | practitioner: "Claudia Curth · Fachärztin für Allgemeinmedizin und Naturheilverfahren", |
| `content/clinics.ts:269` | name: "Internistische Hausarztpraxis am Dom", |
| `content/clinics.ts:270` | practitioner: "Matthias Salewski · Facharzt für Innere Medizin und Nephrologie", |
| `content/clinics.ts:281` | practitioner: "Doctor medic Elena Bucur · Zahnärztin, Implantologie und zahnärztliche Chirurgie", |
| `content/site.ts:17` | {title: "Education", body: "Scientific education and continuous physician training.", icon: GraduationCap}, |
| `content/site.ts:21` | {title: "Global Network", body: "International exchange between physicians and experts.", icon: Globe2}, |
| `content/site.ts:57` | {title: "Cell Education", body: "Scientific education and physician training.", icon: BookOpen}, |
| `content/site.ts:58` | {title: "Clinical Systems", body: "Implementation-ready medical frameworks.", icon: Boxes}, |

<!-- professional-language-inventory:end -->
