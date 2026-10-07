export type Berufsgruppe = "Arztpraxis" | "Zahnarztpraxis" | "Klinik" | "Heilpraktikerpraxis" | "[[OFFEN]]";
const labels: Record<string, Record<Berufsgruppe, string>> = {
  de: {Arztpraxis: "Arztpraxis", Zahnarztpraxis: "Zahnarztpraxis", Klinik: "Klinik", Heilpraktikerpraxis: "Heilpraktikerpraxis", "[[OFFEN]]": "[[OFFEN: Berufsgruppe bestätigen]]"},
  en: {Arztpraxis: "Medical practice", Zahnarztpraxis: "Dental practice", Klinik: "Clinic", Heilpraktikerpraxis: "Heilpraktiker practice (non-physician)", "[[OFFEN]]": "[[OFFEN: Confirm professional category]]"},
  es: {Arztpraxis: "Consulta médica", Zahnarztpraxis: "Consulta dental", Klinik: "Clínica", Heilpraktikerpraxis: "Consulta de Heilpraktiker (no médico)", "[[OFFEN]]": "[[OFFEN: Confirmar categoría profesional]]"}
};
export function professionLabel(group: Berufsgruppe, locale: string) { return (labels[locale] ?? labels.en)[group]; }
