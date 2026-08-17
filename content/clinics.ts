export type Clinic = {
  slug: string;
  name: string;
  practitioner: string;
  city: string;
  region: string;
  countryCode: "DE" | "AT" | "CH";
  profileAvailable?: boolean;
  modelClinic?: boolean;
  coordinates: {lat: number; lng: number};
  summary?: string;
  intro?: string;
  images?: string[];
  website?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
};

export const clinics: Clinic[] = [
  {
    slug: "alpstein",
    name: "Alpstein Clinic",
    practitioner: "Annette Heusser",
    city: "Gais",
    region: "Appenzell Ausserrhoden",
    countryCode: "CH",
    profileAvailable: true,
    modelClinic: true,
    coordinates: {lat: 47.3612, lng: 9.4524},
    summary:
      "An integrative medical centre in the Appenzell region combining comprehensive diagnostics with biological and regenerative medicine.",
    intro:
      "Alpstein Clinic takes an integrative view of health and brings together medical diagnostics, biological medicine and an interdisciplinary clinical team in Gais, Switzerland.",
    images: [
      "/clinics/alpstein/interior-1.webp",
      "/clinics/alpstein/recovery.webp",
      "/clinics/alpstein/landscape.webp"
    ],
    website: "https://alpstein-clinic.ch",
    contactEmail: "info@alpstein-clinic.ch",
    phone: "+41 71 791 81 00",
    address: "Dorfplatz 5, 9056 Gais, Switzerland"
  },
  {
    slug: "julia-napolitano-gil-esslingen",
    name: "Dr. Julia Napolitano Gil",
    practitioner: "Dr. Julia Napolitano Gil",
    city: "Esslingen",
    region: "Baden-Württemberg",
    countryCode: "DE",
    coordinates: {lat: 48.7406, lng: 9.3108}
  },
  {
    slug: "ivan-goecze-mintraching",
    name: "Dr. Ivan Göcze",
    practitioner: "Dr. Ivan Göcze",
    city: "Mintraching",
    region: "Bayern",
    countryCode: "DE",
    coordinates: {lat: 48.9534, lng: 12.2401}
  },
  {
    slug: "marc-stracke-luebeck",
    name: "Dr. Marc Stracke",
    practitioner: "Dr. Marc Stracke",
    city: "Lübeck",
    region: "Schleswig-Holstein",
    countryCode: "DE",
    coordinates: {lat: 53.8655, lng: 10.6866}
  },
  {
    slug: "imke-frei-koenigstein",
    name: "Imke Frei",
    practitioner: "Imke Frei",
    city: "Königstein im Taunus",
    region: "Hessen",
    countryCode: "DE",
    coordinates: {lat: 50.1791, lng: 8.4668}
  },
  {
    slug: "mirihban-ciftci-stuttgart",
    name: "Mirihban Ciftci",
    practitioner: "Mirihban Ciftci",
    city: "Stuttgart",
    region: "Baden-Württemberg",
    countryCode: "DE",
    coordinates: {lat: 48.7758, lng: 9.1829}
  },
  {
    slug: "marco-hartl-regensburg",
    name: "Dr. Marco Hartl",
    practitioner: "Dr. Marco Hartl",
    city: "Regensburg",
    region: "Bayern",
    countryCode: "DE",
    coordinates: {lat: 49.0134, lng: 12.1016}
  },
  {
    slug: "heidelinde-klein-appenzeller-land",
    name: "Dr. Heidelinde Klein",
    practitioner: "Dr. Heidelinde Klein",
    city: "Appenzeller Land",
    region: "Appenzell",
    countryCode: "CH",
    coordinates: {lat: 47.331, lng: 9.4099}
  },
  {
    slug: "enrico-thiele-stuttgart",
    name: "Enrico Thiele",
    practitioner: "Enrico Thiele",
    city: "Stuttgart",
    region: "Baden-Württemberg",
    countryCode: "DE",
    coordinates: {lat: 48.781, lng: 9.194}
  },
  {
    slug: "maja-koebel-aink-luebeck",
    name: "Dr. Maja Köbel-Aink",
    practitioner: "Dr. Maja Köbel-Aink",
    city: "Lübeck",
    region: "Schleswig-Holstein",
    countryCode: "DE",
    coordinates: {lat: 53.873, lng: 10.701}
  },
  {
    slug: "youn-ju-lee-kassel",
    name: "Dr. Youn-Ju Lee",
    practitioner: "Dr. Youn-Ju Lee",
    city: "Kassel",
    region: "Hessen",
    countryCode: "DE",
    coordinates: {lat: 51.3127, lng: 9.4797}
  }
];

export function getClinic(slug: string) {
  return clinics.find((clinic) => clinic.slug === slug);
}
