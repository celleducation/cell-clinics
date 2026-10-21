type Materials = {
  label: string; title: string; intro: string; bookTitle: string; bookBody: string;
  points: string[]; caption: string; resourcesTitle: string;
  resources: {image: string; title: string; body: string}[];
  supportTitle: string; support: {title: string; body: string}[]; equipment: {title: string; body: string};
  note: string; cta: string;
};

export const partnerMaterials: Record<string, Materials> = {
  "de": {
    "label": "Das bekommen Sie als Partnerpraxis",
    "title": "Das Wissen. Die Unterlagen. Die Begleitung.",
    "intro": "Sie müssen nicht jedes Dokument selbst entwickeln. Vom digitalen Nachschlagewerk bis zur Patientenkommunikation erhalten Sie konkrete Materialien für den Aufbau und den Alltag Ihrer Praxis.",
    "bookTitle": "Rund 800 Seiten Wissen. Digital an Ihrer Seite.",
    "bookBody": "Das Kompendium von Cell Education vermittelt Grundlagen der Zellbiochemie und Wissen zu Bionic Cell Therapy.",
    "points": [
      "Digitales Nachschlagewerk",
      "Strukturierte Schulungsunterlagen",
      "Fachliche Orientierung für Teilnehmende"
    ],
    "caption": "Digitales Kompendium von Cell Education · 800 Seiten. Symbolische Darstellung.",
    "resourcesTitle": "Unterlagen, mit denen Sie arbeiten können.",
    "resources": [
      {
        "image": "protocols",
        "title": "Therapieprotokolle",
        "body": "Strukturierte Unterlagen zur fachlichen Einordnung, Dokumentation und Planung. Entscheidungen bleiben bei der behandelnden Praxis."
      },
      {
        "image": "history",
        "title": "Anamnese & Dokumentation",
        "body": "Ein ausfüllbarer Anamnesebogen mit Angaben zu Vorgeschichte, Beruf, Bewegung und Ernährung — als Grundlage für Diagnostik und individuelle Planung."
      },
      {
        "image": "consent",
        "title": "Aufklärung & Einwilligung",
        "body": "Muster für die individuelle Patientenaufklärung. Sie ersetzen weder das persönliche Aufklärungsgespräch noch die Prüfung für die konkrete Anwendung."
      },
      {
        "image": "billing",
        "title": "Honorar & Abrechnung",
        "body": "Eine ausfüllbare Honorarvereinbarung nach § 2 GOÄ und eine Musterrechnung mit beispielhaften Ziffern und Faktoren für deutsche Partnerpraxen."
      },
      {
        "image": "website",
        "title": "Ihre Praxis im Netzwerk",
        "body": "Eine eigene Partnerseite mit Porträt, Schwerpunkten und Kontaktmöglichkeit sowie ein Eintrag auf der Netzwerkkarte. Dazu Materialien für Ihre Patientenkommunikation."
      }
    ],
    "equipment": {
      "title": "Produkte & Geräte",
      "body": "Burg-Pharmacy ist pharmazeutischer Partner und Referent bei Schulungen. Schulungsteilnahme und Arzneimittelversorgung sind voneinander unabhängig; es besteht keine Bindung an eine Apotheke."
    },
    "supportTitle": "Begleitung für Ihre Praxis",
    "support": [
      {
        "title": "Seminare",
        "body": "Schulungen von Cell Education vermitteln Wissen. Teilnehmende erhalten eine Teilnahmebestätigung, keine berufliche Qualifikation oder Behandlungsbefugnis."
      },
      {
        "title": "Persönlicher Einstieg",
        "body": "Ihr Ansprechpartner begleitet die individuell vereinbarten Schritte der Zusammenarbeit."
      },
      {
        "title": "Kollegialer Austausch",
        "body": "Anonymisierte Fallbesprechungen und fachlicher Austausch bieten Raum für Praxisfragen."
      },
      {
        "title": "Fortlaufende Begleitung",
        "body": "Protokoll-Updates, Community und Events begleiten die Weiterentwicklung Ihrer Praxis."
      }
    ],
    "note": "Vorlagen müssen an die Praxis und die geltenden Vorgaben angepasst werden. Ärztinnen, Ärzte, Zahnärztinnen, Zahnärzte und Heilpraktiker behandeln ausschließlich im Rahmen ihrer beruflichen Befugnisse. Andere Berufsgruppen erhalten Wissen, keine Behandlungsbefugnis. Ärztliche Leistungen bleiben Ärztinnen und Ärzten vorbehalten. Die Verantwortung für Behandlung, Aufklärung, Abrechnung und die eigene Website bleibt bei der Praxis. Wir leisten keine Rechtsberatung.",
    "cta": "Partnerleistungen im Gespräch kennenlernen"
  },
  "en": {
    "label": "Your partner practice resources",
    "title": "The knowledge. The materials. The support.",
    "intro": "You do not have to create every document yourself. From a digital reference work to patient communication, practical resources support the development and everyday running of your practice.",
    "bookTitle": "Around 800 pages of knowledge. Available digitally.",
    "bookBody": "The Cell Education compendium provides foundations of cell biochemistry and knowledge about Bionic Cell Therapy.",
    "points": [
      "Digital reference work",
      "Structured training resources",
      "Professional orientation for participants"
    ],
    "caption": "Cell Education digital compendium · 800 pages. Symbolic illustration.",
    "resourcesTitle": "Materials you can work with.",
    "resources": [
      {
        "image": "protocols",
        "title": "Therapy protocols",
        "body": "Structured resources for professional assessment, documentation and planning. Decisions remain with the treating practice."
      },
      {
        "image": "history",
        "title": "History & documentation",
        "body": "A fillable medical history form covering background, occupation, activity and nutrition to support diagnostics and individual planning."
      },
      {
        "image": "consent",
        "title": "Patient information & consent",
        "body": "Templates for individual patient information. They replace neither a personal consent discussion nor review for the specific application."
      },
      {
        "image": "billing",
        "title": "Fees & billing",
        "body": "A fillable fee agreement under § 2 GOÄ and a sample invoice with illustrative codes and factors for practices in Germany."
      },
      {
        "image": "website",
        "title": "Your practice in the network",
        "body": "Your own partner page with a portrait, areas of focus and contact options, plus a network map listing and patient communication materials."
      }
    ],
    "equipment": {
      "title": "Products & devices",
      "body": "Burg-Pharmacy is a pharmaceutical partner and training speaker. Training attendance and medicine supply are independent; no commitment to a pharmacy is required."
    },
    "supportTitle": "Support for your practice",
    "support": [
      {
        "title": "Training",
        "body": "Cell Education training conveys knowledge. Participants receive confirmation of attendance, not a professional qualification or authority to treat."
      },
      {
        "title": "A personal introduction",
        "body": "Your contact supports the individually agreed steps of cooperation."
      },
      {
        "title": "Peer exchange",
        "body": "Anonymised case discussions and professional exchange provide space for practice questions."
      },
      {
        "title": "Ongoing support",
        "body": "Protocol updates, community and events support the continued development of your practice."
      }
    ],
    "note": "Templates must be adapted to the practice and applicable requirements. Physicians, dentists and Heilpraktiker treat only within their professional scope. Other professions receive knowledge, not authority to treat. Services reserved for physicians remain reserved for physicians. Each practice is responsible for treatment, consent, billing and its own website. We do not provide legal advice.",
    "cta": "Discuss the partner resources"
  },
  "es": {
    "label": "Recursos para su consulta asociada",
    "title": "Conocimiento. Materiales. Acompañamiento.",
    "intro": "No necesita elaborar cada documento desde cero. Desde una obra de consulta digital hasta la comunicación con pacientes, dispone de recursos concretos para desarrollar su consulta.",
    "bookTitle": "Unas 800 páginas de conocimiento. En formato digital.",
    "bookBody": "El compendio de Cell Education transmite fundamentos de bioquímica celular y conocimientos sobre Bionic Cell Therapy.",
    "points": [
      "Obra de consulta digital",
      "Materiales estructurados para cursos",
      "Orientación profesional para participantes"
    ],
    "caption": "Compendio digital de Cell Education · 800 páginas. Representación simbólica.",
    "resourcesTitle": "Materiales para el trabajo diario.",
    "resources": [
      {
        "image": "protocols",
        "title": "Protocolos terapéuticos",
        "body": "Materiales estructurados para la valoración profesional, documentación y planificación. Las decisiones corresponden a la consulta tratante."
      },
      {
        "image": "history",
        "title": "Anamnesis y documentación",
        "body": "Un formulario rellenable sobre antecedentes, profesión, actividad física y alimentación como base para el diagnóstico y la planificación individual."
      },
      {
        "image": "consent",
        "title": "Información y consentimiento",
        "body": "Modelos para informar individualmente al paciente. No sustituyen la conversación personal ni la revisión para la aplicación concreta."
      },
      {
        "image": "billing",
        "title": "Honorarios y facturación",
        "body": "Un acuerdo de honorarios rellenable conforme al § 2 GOÄ y una factura modelo con códigos y factores ilustrativos para consultas en Alemania."
      },
      {
        "image": "website",
        "title": "Su consulta en la red",
        "body": "Una página propia con retrato, especialidades y contacto, presencia en el mapa de la red y materiales de comunicación con pacientes."
      }
    ],
    "equipment": {
      "title": "Productos y dispositivos",
      "body": "Burg-Pharmacy participa como colaborador farmacéutico y ponente. La asistencia a cursos y el suministro de medicamentos son independientes; no existe vinculación obligatoria a una farmacia."
    },
    "supportTitle": "Acompañamiento para su consulta",
    "support": [
      {
        "title": "Formación",
        "body": "Los cursos de Cell Education transmiten conocimientos. Se entrega una constancia de asistencia, no una cualificación profesional ni autorización para tratar."
      },
      {
        "title": "Incorporación personal",
        "body": "Su contacto acompaña los pasos de colaboración acordados individualmente."
      },
      {
        "title": "Intercambio profesional",
        "body": "Los casos anonimizados y el intercambio profesional permiten tratar cuestiones de la consulta."
      },
      {
        "title": "Apoyo continuo",
        "body": "Las actualizaciones de protocolos, la comunidad y los eventos acompañan el desarrollo de su consulta."
      }
    ],
    "note": "Los modelos deben adaptarse a la consulta y los requisitos aplicables. Médicos, dentistas y Heilpraktiker tratan únicamente dentro de sus competencias. Otras profesiones reciben conocimientos, no autorización para tratar. Los servicios reservados a médicos siguen reservados a médicos. Cada consulta responde del tratamiento, consentimiento, facturación y su propia web. No prestamos asesoramiento jurídico.",
    "cta": "Conocer los recursos para socios"
  }
};
