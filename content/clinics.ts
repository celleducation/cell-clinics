export type Clinic = {
  slug: string;
  name: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  languages: string[];
  focus: string[];
  modelClinic?: boolean;
  coordinates: {x: number; y: number};
  summary: string;
  intro: string;
  images: string[];
  contactEmail: string;
};

export const clinics: Clinic[] = [
  {
    slug: "alpstein",
    name: "Alpstein Clinic",
    city: "Gais",
    region: "Swiss Appenzell region",
    country: "Switzerland",
    countryCode: "CH",
    languages: ["German", "English"],
    focus: ["Diagnostics", "Regeneration", "Longevity"],
    modelClinic: true,
    coordinates: {x: 52, y: 46},
    summary:
      "A central partner clinic translating physician-guided cellular medicine into structured diagnostics, regenerative care and longevity programs.",
    intro:
      "Alpstein Clinic serves as a central model clinic for the Cell Clinics framework. Located in the Swiss Appenzell region, it demonstrates how physician-guided cellular medicine, biological diagnostics, regenerative medicine and premium clinical care can come together inside one operational center.",
    images: [
      "/clinics/alpstein/interior-1.webp",
      "/clinics/alpstein/recovery.webp",
      "/clinics/alpstein/landscape.webp"
    ],
    contactEmail: "info@cell-education.com"
  }
];

export function getClinic(slug: string) {
  return clinics.find((clinic) => clinic.slug === slug);
}
