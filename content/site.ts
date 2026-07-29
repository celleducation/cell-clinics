import {
  Activity,
  BookOpen,
  Boxes,
  ClipboardCheck,
  Dna,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Network,
  PackageCheck,
  Stethoscope
} from "lucide-react";

export const partnerModules = [
  {title: "Education", body: "Scientific education and continuous physician training.", icon: GraduationCap},
  {title: "Clinical Systems", body: "Standardized clinical frameworks and treatment concepts.", icon: Boxes},
  {title: "Diagnostics", body: "Evidence-based diagnostic concepts and interpretation.", icon: FlaskConical},
  {title: "Products", body: "Curated cellular medicine solutions for clinical use.", icon: PackageCheck},
  {title: "Global Network", body: "International exchange between physicians and experts.", icon: Globe2},
  {title: "Practice Growth", body: "Implementation resources for sustainable clinical adoption.", icon: Activity}
] as const;

export const clinicalSystems = [
  {
    slug: "mitochondrial-performance",
    title: "Mitochondrial Performance",
    body: "Frameworks for energy production, cellular respiration and metabolic performance.",
    image: "/images/cellclinic-mitochondria.png",
    icon: HeartPulse
  },
  {
    slug: "genetic-cellular-context",
    title: "Genetic & Cellular Context",
    body: "Biological individuality and precision direction for structured clinical decisions.",
    image: "/images/cellclinic-genetics.png",
    icon: Dna
  },
  {
    slug: "regeneration-recovery",
    title: "Regeneration & Recovery",
    body: "Clinical concepts for inflammatory balance, resilience and biological recovery.",
    image: "/images/cellclinic-therapy.png",
    icon: Stethoscope
  },
  {
    slug: "therapeutic-access",
    title: "Therapeutic Access",
    body: "Structured pathways connecting clinical interpretation with therapeutic implementation.",
    image: "/images/cellclinic-protocols.png",
    icon: ClipboardCheck
  }
] as const;

export const platformModules = [
  {title: "Cell Education", body: "Scientific education and physician training.", icon: BookOpen},
  {title: "Clinical Systems", body: "Implementation-ready medical frameworks.", icon: Boxes},
  {title: "Diagnostics", body: "Structured biological interpretation.", icon: FlaskConical},
  {title: "Products", body: "Curated therapeutic solutions.", icon: PackageCheck},
  {title: "Global Hub", body: "International expert collaboration.", icon: Network},
  {title: "Partner Clinics", body: "Clinical implementation in daily practice.", icon: Stethoscope}
] as const;
