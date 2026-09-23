type Materials = {
  label: string; title: string; intro: string; bookTitle: string; bookBody: string;
  points: string[]; caption: string; resourcesTitle: string;
  resources: {image: string; title: string; body: string}[];
  supportTitle: string; support: {title: string; body: string}[]; equipment: {title: string; body: string};
  note: string; cta: string;
};

export const partnerMaterials: Record<string, Materials> = {
  de: {
    label: "Das bekommen Sie als Partnerpraxis",
    title: "Das Wissen. Die Unterlagen. Die Begleitung.",
    intro: "Sie müssen nicht jedes Dokument selbst entwickeln. Vom digitalen Nachschlagewerk bis zur Patientenkommunikation erhalten Sie konkrete Materialien für den Aufbau und den Alltag Ihrer Praxis.",
    bookTitle: "Rund 800 Seiten Wissen. Digital an Ihrer Seite.",
    bookBody: "Das Kompendium Bionische Zelltherapie bündelt die Grundlagen und die praktische Anwendung: Indikation, Diagnostik, Dosierung, Kombination und Durchführung.",
    points: ["Auf Tablet, Computer und Smartphone abrufbar", "Anwendungsanleitungen und indikationsbezogene Protokolle", "Laufende Erweiterungen und automatische Updates"],
    caption: "Digitales Kompendium · Der Umfang entspricht gedruckt rund 800 Seiten. Buchdarstellung zur Illustration.",
    resourcesTitle: "Unterlagen, mit denen Sie arbeiten können.",
    resources: [
      {image: "protocols", title: "Therapieprotokolle", body: "Ausgearbeitete Unterlagen zu Mitochondropathie, metabolischem Syndrom, Darmtherapie und SIBO / IMO sowie zu Technologien und ketogener Ernährung."},
      {image: "history", title: "Anamnese & Dokumentation", body: "Ein ausfüllbarer Anamnesebogen mit Angaben zu Vorgeschichte, Beruf, Bewegung und Ernährung — als Grundlage für Diagnostik und individuelle Planung."},
      {image: "consent", title: "Aufklärung & Einwilligung", body: "Anwendungsspezifische Musterbögen, etwa zu Curcumin, Resveratrol und Mito-Boost. Mit Informationen zu Risiken, Wechselwirkungen, Off-Label-Status und Evidenzlage."},
      {image: "billing", title: "Honorar & Abrechnung", body: "Eine ausfüllbare Honorarvereinbarung nach § 2 GOÄ und eine Musterrechnung mit beispielhaften Ziffern und Faktoren für deutsche Partnerpraxen."},
      {image: "website", title: "Ihre Praxis im Netzwerk", body: "Eine eigene Partnerseite mit Porträt, Schwerpunkten und Kontaktmöglichkeit sowie ein Eintrag auf der Netzwerkkarte. Dazu Materialien für Ihre Patientenkommunikation."}
    ],
    equipment: {title: "Produkte & Geräte", body: "Bezugswege der Burg-Apotheke, Beratung zur Geräteauswahl und Partnerkonditionen — Produkte und Geräte werden separat bezogen."},
    supportTitle: "Begleitung für Ihre Praxis",
    support: [
      {title: "Weiterbildung", body: "Schulung und Zertifikat durch Dr. Bredehorst vermitteln die Grundlagen für Ihre Praxis."},
      {title: "Persönlicher Einstieg", body: "Ihr Ansprechpartner und das Partner Playbook begleiten Sie durch den 30-Tage-Onboardingplan."},
      {title: "Kollegialer Austausch", body: "Wöchentliche Fallbesprechungen und regelmäßige Calls bieten Raum für Ihre Praxisfragen."},
      {title: "Fortlaufende Begleitung", body: "Protokoll-Updates, Community und Events begleiten die Weiterentwicklung Ihrer Praxis."}
    ],
    note: "Gezeigt sind Beispiele aus den Partnermaterialien. Vorlagen sind an die jeweilige Praxis und die geltenden Vorgaben anzupassen. Die Verantwortung für Indikation, Behandlung, Aufklärung und Abrechnung bleibt bei der behandelnden Praxis. Den konkreten Leistungsumfang stimmen wir im Partnergespräch ab.",
    cta: "Partnerleistungen im Gespräch kennenlernen"
  },
  en: {
    label: "Your partner practice resources", title: "The knowledge. The materials. The support.",
    intro: "You do not have to create every document yourself. From a digital reference work to patient communication, practical resources support the development and everyday running of your practice.",
    bookTitle: "Around 800 pages of knowledge. Available digitally.",
    bookBody: "The Bionic Cell Therapy compendium brings together foundations and practical application: indications, diagnostics, dosing, combinations and implementation.",
    points: ["Accessible on tablet, computer and smartphone", "Application guidance and indication-specific protocols", "Ongoing additions and automatic updates"],
    caption: "Digital compendium · Equivalent to around 800 printed pages. Book shown for illustration.",
    resourcesTitle: "Materials you can work with.",
    resources: [
      {image: "protocols", title: "Therapy protocols", body: "Prepared resources on mitochondrial dysfunction, metabolic syndrome, gut therapy and SIBO / IMO, alongside technologies and ketogenic nutrition."},
      {image: "history", title: "History & documentation", body: "A fillable medical history form covering background, occupation, activity and nutrition to support diagnostics and individual planning."},
      {image: "consent", title: "Patient information & consent", body: "Application-specific templates, including curcumin, resveratrol and Mito-Boost, addressing risks, interactions, off-label status and the evidence base."},
      {image: "billing", title: "Fees & billing", body: "A fillable fee agreement under § 2 GOÄ and a sample invoice with illustrative codes and factors for practices in Germany."},
      {image: "website", title: "Your practice in the network", body: "Your own partner page with a portrait, areas of focus and contact options, plus a network map listing and patient communication materials."}
    ],
    equipment: {title: "Products & devices", body: "Burg-Apotheke ordering channels, device selection guidance and partner terms — products and devices are sourced separately."},
    supportTitle: "Support for your practice",
    support: [
      {title: "Training", body: "Training and a certificate from Dr. Bredehorst provide the foundations for your practice."},
      {title: "A personal introduction", body: "Your dedicated contact and the Partner Playbook guide you through the 30-day onboarding plan."},
      {title: "Peer exchange", body: "Weekly case discussions and regular calls provide space for questions from your practice."},
      {title: "Ongoing support", body: "Protocol updates, community and events support the continued development of your practice."}
    ],
    note: "Examples from the partner resources, shown in German. Templates must be adapted to your practice and applicable requirements. Clinical decisions, treatment, consent and billing remain the practice’s responsibility. The specific scope is agreed during the partnership discussion.",
    cta: "Discuss the partner resources"
  },
  es: {
    label: "Recursos para su consulta asociada", title: "Conocimiento. Materiales. Acompañamiento.",
    intro: "No necesita elaborar cada documento desde cero. Desde una obra de consulta digital hasta la comunicación con pacientes, dispone de recursos concretos para desarrollar su consulta.",
    bookTitle: "Unas 800 páginas de conocimiento. En formato digital.",
    bookBody: "El compendio de Terapia Celular Biónica reúne fundamentos y aplicación práctica: indicaciones, diagnóstico, dosificación, combinaciones y realización.",
    points: ["Accesible en tableta, ordenador y teléfono", "Guías de aplicación y protocolos por indicación", "Ampliaciones continuas y actualizaciones automáticas"],
    caption: "Compendio digital · Equivale a unas 800 páginas impresas. El libro se muestra como ilustración.",
    resourcesTitle: "Materiales para el trabajo diario.",
    resources: [
      {image: "protocols", title: "Protocolos terapéuticos", body: "Documentación sobre disfunción mitocondrial, síndrome metabólico, terapia intestinal y SIBO / IMO, así como tecnologías y alimentación cetogénica."},
      {image: "history", title: "Anamnesis y documentación", body: "Un formulario rellenable sobre antecedentes, profesión, actividad física y alimentación como base para el diagnóstico y la planificación individual."},
      {image: "consent", title: "Información y consentimiento", body: "Modelos específicos, por ejemplo para curcumina, resveratrol y Mito-Boost, con riesgos, interacciones, uso fuera de indicación y evidencia disponible."},
      {image: "billing", title: "Honorarios y facturación", body: "Un acuerdo de honorarios rellenable conforme al § 2 GOÄ y una factura modelo con códigos y factores ilustrativos para consultas en Alemania."},
      {image: "website", title: "Su consulta en la red", body: "Una página propia con retrato, especialidades y contacto, presencia en el mapa de la red y materiales de comunicación con pacientes."}
    ],
    equipment: {title: "Productos y dispositivos", body: "Canales de Burg-Apotheke, asesoramiento para elegir dispositivos y condiciones para socios; los productos y dispositivos se adquieren por separado."},
    supportTitle: "Acompañamiento para su consulta",
    support: [
      {title: "Formación", body: "La formación y el certificado del Dr. Bredehorst aportan las bases para su consulta."},
      {title: "Incorporación personal", body: "Su contacto fijo y el Partner Playbook le guían por el plan de incorporación de 30 días."},
      {title: "Intercambio profesional", body: "Las reuniones semanales de casos y las llamadas periódicas permiten resolver dudas de la práctica."},
      {title: "Apoyo continuo", body: "Las actualizaciones de protocolos, la comunidad y los eventos acompañan el desarrollo de su consulta."}
    ],
    note: "Ejemplos de materiales para socios, mostrados en alemán. Las plantillas deben adaptarse a cada consulta y a la normativa aplicable. La responsabilidad clínica, el consentimiento y la facturación corresponden a la consulta. El alcance concreto se acuerda en la conversación de colaboración.",
    cta: "Conocer los recursos para socios"
  }
};
