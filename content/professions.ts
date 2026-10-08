export type Berufsgruppe = "Arztpraxis" | "Zahnarztpraxis" | "Klinik" | "Heilpraktikerpraxis" | "unknown";
const labels: Record<string, Record<Berufsgruppe, string>> = {
  de: {Arztpraxis: "Arztpraxis", Zahnarztpraxis: "Zahnarztpraxis", Klinik: "Klinik", Heilpraktikerpraxis: "Heilpraktikerpraxis", "unknown": ""},
  en: {Arztpraxis: "Medical practice", Zahnarztpraxis: "Dental practice", Klinik: "Clinic", Heilpraktikerpraxis: "Heilpraktiker practice (non-physician)", "unknown": ""},
  es: {Arztpraxis: "Consulta médica", Zahnarztpraxis: "Consulta dental", Klinik: "Clínica", Heilpraktikerpraxis: "Consulta de Heilpraktiker (no médico)", "unknown": ""}
};
export function professionLabel(group: Berufsgruppe, locale: string) { return (labels[locale] ?? labels.en)[group]; }
