import type {Clinic} from "@/content/clinics";
import {professionLabel} from "@/content/professions";

export function ClinicProfileLabel({clinic, locale}: {clinic: Clinic; locale: string}) {
  return <span className="eyebrow">{[professionLabel(clinic.berufsgruppe, locale), clinic.city].filter(Boolean).join(" · ")}</span>;
}
