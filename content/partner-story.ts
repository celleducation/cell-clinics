export type PartnerStory = {
  pillars: {label: string; title: string; intro: string; items: {title: string; body: string; detail: string}[]; note: string};
  program: {label: string; title: string; intro: string; steps: {title: string; body: string}[]; note: string};
  deliverables: {label: string; title: string; intro: string; items: {title: string; body: string}[]; cta: string};
};

export const partnerStories: Record<string, PartnerStory> = {
  de: {
    pillars: {
      label: "Das Praxismodell", title: "Eine Praxis. Zwei Standbeine.",
      intro: "Behandlung vor Ort und ein ergänzendes Institut: zwei Bereiche, die Sie passend zu Ihrer Praxis entwickeln können.",
      items: [
        {title: "Ihre Praxis vor Ort", body: "Hier stehen das persönliche Gespräch, die Diagnostik und die individuell geplante Behandlung im Mittelpunkt.", detail: "Ärztlich begleitete Programme · Persönliche Betreuung · Verlaufskontrollen"},
        {title: "Ihr ergänzendes Institut", body: "Schaffen Sie Raum für Beratung und Wissensvermittlung — mit digitalen Formaten und Angeboten für Privatpersonen, Unternehmen oder Organisationen.", detail: "Videoberatung · Bildungsangebote · Begleitung bei Struktur und Umsetzung"}
      ],
      note: "Welche Leistungen und digitalen Formate zu Ihrer Praxis passen, klären wir gemeinsam. Medizinische Verantwortung und die jeweiligen beruflichen Vorgaben bleiben maßgeblich."
    },
    program: {
      label: "Ein Programmbeispiel · 12 Wochen", title: "Vom Befund zu einem persönlichen Plan.",
      intro: "Ein Programm verbindet einzelne Leistungen zu einem nachvollziehbaren Ablauf. Ausgangspunkt sind die individuelle Situation und die ärztliche Einschätzung.",
      steps: [
        {title: "Zuhören", body: "Anamnese, Anliegen und persönliche Ziele gemeinsam besprechen."},
        {title: "Einordnen", body: "Individuell ausgewählte Diagnostik durchführen und Befunde ärztlich bewerten."},
        {title: "Planen", body: "Geeignete Maßnahmen, Termine und nächste Schritte abstimmen."},
        {title: "Begleiten", body: "Die Umsetzung betreuen und Rückmeldungen im Verlauf berücksichtigen."},
        {title: "Überprüfen", body: "Den Verlauf besprechen und entscheiden, wie es weitergeht."}
      ],
      note: "Beispielhafter Ablauf, kein festes Behandlungspaket. Dauer, Diagnostik und Maßnahmen richten sich nach der medizinischen Indikation. Ergebnisse sind individuell."
    },
    deliverables: {
      label: "Für Ihren Praxisalltag", title: "Nicht bei null anfangen.",
      intro: "Von der Fortbildung bis zum Patientenmaterial: konkrete Unterstützung für den Aufbau Ihres Angebots.",
      items: [
        {title: "Schulungen & Austausch", body: "Fortbildungen und Fallbesprechungen für die Anwendung im Praxisalltag."},
        {title: "Protokolle & Patienteninformationen", body: "Strukturierte Unterlagen als Grundlage für ärztliche Planung und verständliche Gespräche."},
        {title: "Abläufe & Vorlagen", body: "Materialien für die Vorbereitung und Organisation Ihres Praxisangebots."},
        {title: "Ihr Außenauftritt", body: "Kommunikationsmaterialien, mit denen Sie Ihr Angebot erklären können."},
        {title: "Produkte & Bestellwege", body: "Orientierung zu verfügbaren Produkten und den zugehörigen Bezugswegen."},
        {title: "Einführung & Begleitung", body: "Ein strukturierter Einstieg und Unterstützung bei der Weiterentwicklung."}
      ], cta: "Über meine Praxis sprechen"
    }
  },
  en: {
    pillars: {
      label: "The practice model", title: "One practice. Two complementary pillars.",
      intro: "In-person care and a complementary institute: two areas you can develop around your practice.",
      items: [
        {title: "Your local practice", body: "Personal consultations, diagnostics and individually planned treatment remain at the centre of care.", detail: "Physician-led programmes · Personal care · Follow-up reviews"},
        {title: "Your complementary institute", body: "Create space for consultation and education, with digital formats and services for individuals, businesses or organisations.", detail: "Video consultations · Educational formats · Support with structure and implementation"}
      ], note: "Together, we assess which services and digital formats fit your practice. Medical responsibility and applicable professional requirements remain essential."
    },
    program: {
      label: "An example programme · 12 weeks", title: "From findings to a personal plan.",
      intro: "A programme connects individual services into a clear process, starting with each person's circumstances and a physician's assessment.",
      steps: [
        {title: "Listen", body: "Discuss medical history, concerns and personal goals."},
        {title: "Assess", body: "Select appropriate diagnostics and evaluate the findings medically."},
        {title: "Plan", body: "Agree on suitable measures, appointments and next steps."},
        {title: "Support", body: "Accompany implementation and consider feedback along the way."},
        {title: "Review", body: "Discuss progress and decide what comes next."}
      ], note: "An illustrative process, not a fixed treatment package. Duration, diagnostics and measures depend on medical indication. Individual results vary."
    },
    deliverables: {
      label: "For everyday practice", title: "You do not have to start from scratch.",
      intro: "From training to patient materials: practical support for developing your services.",
      items: [
        {title: "Training & exchange", body: "Continuing education and case discussions for everyday clinical practice."},
        {title: "Protocols & patient information", body: "Structured resources to support medical planning and clear conversations."},
        {title: "Workflows & templates", body: "Materials to help prepare and organise your practice offering."},
        {title: "Practice communication", body: "Communication materials to help explain your services."},
        {title: "Products & ordering", body: "Guidance on available products and their supply channels."},
        {title: "Introduction & support", body: "A structured start and support as your practice develops."}
      ], cta: "Discuss my practice"
    }
  },
  es: {
    pillars: {
      label: "El modelo de consulta", title: "Una consulta. Dos pilares complementarios.",
      intro: "Atención presencial y un instituto complementario: dos áreas que puede desarrollar en torno a su consulta.",
      items: [
        {title: "Su consulta presencial", body: "La conversación personal, el diagnóstico y el tratamiento individualizado constituyen el centro de la atención.", detail: "Programas dirigidos por médicos · Atención personal · Seguimiento"},
        {title: "Su instituto complementario", body: "Cree un espacio para el asesoramiento y la formación, con formatos digitales y propuestas para particulares, empresas u organizaciones.", detail: "Videoconsultas · Formación · Apoyo en la estructura y la puesta en marcha"}
      ], note: "Valoramos juntos qué servicios y formatos digitales encajan en su consulta. La responsabilidad médica y los requisitos profesionales aplicables siguen siendo esenciales."
    },
    program: {
      label: "Ejemplo de programa · 12 semanas", title: "De los resultados a un plan personal.",
      intro: "Un programa conecta los servicios en un proceso comprensible, partiendo de la situación individual y de la valoración médica.",
      steps: [
        {title: "Escuchar", body: "Conversar sobre los antecedentes, las inquietudes y los objetivos personales."},
        {title: "Valorar", body: "Seleccionar las pruebas adecuadas y evaluar médicamente los resultados."},
        {title: "Planificar", body: "Acordar las medidas, las citas y los próximos pasos."},
        {title: "Acompañar", body: "Apoyar la puesta en práctica y tener en cuenta las observaciones durante el proceso."},
        {title: "Revisar", body: "Revisar la evolución y decidir cómo continuar."}
      ], note: "Proceso ilustrativo, no un paquete de tratamiento fijo. La duración, las pruebas y las medidas dependen de la indicación médica. Los resultados son individuales."
    },
    deliverables: {
      label: "Para el día a día", title: "No tiene que empezar de cero.",
      intro: "Desde la formación hasta los materiales para pacientes: apoyo concreto para desarrollar sus servicios.",
      items: [
        {title: "Formación e intercambio", body: "Formación continua y discusión de casos para la práctica clínica."},
        {title: "Protocolos e información", body: "Recursos estructurados para la planificación médica y las conversaciones con pacientes."},
        {title: "Procesos y plantillas", body: "Materiales para preparar y organizar la propuesta de su consulta."},
        {title: "Comunicación", body: "Materiales de comunicación para explicar sus servicios."},
        {title: "Productos y pedidos", body: "Orientación sobre productos disponibles y sus canales de suministro."},
        {title: "Inicio y acompañamiento", body: "Un comienzo estructurado y apoyo para el desarrollo de su consulta."}
      ], cta: "Hablar sobre mi consulta"
    }
  }
};
