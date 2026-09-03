export type Clinic = {
  slug: string;
  name: string;
  practitioner: string;
  city: string;
  region: string;
  countryCode: "DE" | "AT" | "CH" | "ES";
  profileAvailable?: boolean;
  listingOnly?: boolean;
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
    slug: "mihriban-ciftci-stuttgart",
    name: "SchönGesund",
    practitioner: "Mihriban Ciftci",
    city: "Stuttgart",
    region: "Baden-Württemberg",
    countryCode: "DE",
    coordinates: {lat: 48.8106, lng: 9.2513},
    address: "Obere Waiblinger Straße 107 a, 70374 Stuttgart",
    phone: "+49 1575 6691906",
    website: "https://www.jameda.de/mihriban-ciftci/heilpraktiker/stuttgart",
    profileAvailable: true,
    images: [
      "/clinics/mihriban-ciftci/portrait.jpg",
      "/clinics/mihriban-ciftci/interior.jpg",
      "/clinics/mihriban-ciftci/logo.jpg"
    ]
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
    slug: "medivium-stuttgart",
    name: "MEDIVIUM",
    practitioner: "Enrico Thiele",
    city: "Stuttgart",
    region: "Baden-Württemberg",
    countryCode: "DE",
    profileAvailable: true,
    coordinates: {lat: 48.7448, lng: 9.2317},
    summary: "Präzise Diagnostik, strukturierte Infusionskonzepte und moderne Prävention für Performance, Regeneration und Longevity.",
    intro: "MEDIVIUM entwickelt aus über 25 Jahren Praxiserfahrung individuelle Gesundheitsstrategien mit messbarer Entwicklung.",
    images: [
      "/clinics/medivium/ha4a6318.jpg",
      "/clinics/medivium/enrico-thiele.webp",
      "/clinics/medivium/logo.png"
    ],
    website: "https://www.medivium.de",
    contactEmail: "info@medivium.de",
    phone: "+49 711 1622244",
    address: "Kirchheimer Straße 42, 70619 Stuttgart, Deutschland"
  },
  {
    slug: "monika-brueck-mallorca",
    name: "Hautarztpraxis Dr. Monika Brück",
    practitioner: "Dr. Monika Brück · Fachärztin für Dermatologie",
    city: "Palma de Mallorca",
    region: "Balearen",
    countryCode: "ES",
    profileAvailable: false,
    coordinates: {lat: 39.5904, lng: 2.6268},
    summary: "Dermatologie, Hautkrebsvorsorge und ästhetische Medizin mit mehr als 20 Jahren Erfahrung in Palma de Mallorca.",
    intro: "Dr. Monika Brück verbindet moderne dermatologische Diagnostik mit individueller Beratung und sanften ästhetischen Verfahren.",
    images: [
      "/clinics/monika-brueck/hero.webp",
      "/clinics/monika-brueck/monika-brueck.jpeg",
      "/clinics/monika-brueck/practice.jpg"
    ],
    website: "https://www.hautarzt-mallorca.com",
    contactEmail: "info@hautarzt-mallorca.com",
    phone: "+34 971 905 202",
    address: "Camí dels Reis 308, Edificio 3A Norte, 07011 Palma, Baleares, Spanien"
  },
  {
    slug: "maja-koebel-aink-luebeck",
    name: "Dr. Maja Köbel-Aink",
    practitioner: "Dr. Maja Köbel-Aink · Fachärztin für MKG-Chirurgie und Anästhesie",
    city: "Lübeck",
    region: "Schleswig-Holstein",
    countryCode: "DE",
    profileAvailable: true,
    coordinates: {lat: 53.8634, lng: 10.6675},
    summary: "Mund-, Kiefer- und Gesichtschirurgie mit biologischen Konzepten, Implantologie und regenerativer PRGF-Behandlung.",
    images: [
      "/clinics/maja-koebel-aink/portrait-hd.png",
      "/clinics/maja-koebel-aink/team-hd.png",
      "/clinics/maja-koebel-aink/prgf-hd.png"
    ],
    website: "https://kieferchirurgie-luebeck.de/",
    phone: "+49 451 899 3272",
    address: "Hansestraße 43 A, 23558 Lübeck, Deutschland"
  },
  {
    slug: "lars-gienger-bretten",
    name: "CURAPRAX",
    practitioner: "Lars Gienger · Heilpraktiker, Osteopath und Physiotherapeut",
    city: "Bretten",
    region: "Baden-Württemberg",
    countryCode: "DE",
    profileAvailable: true,
    coordinates: {lat: 49.0369, lng: 8.7062},
    summary: "Naturheilkunde, funktionelle Medizin, Osteopathie und Physiotherapie mit strukturierter Diagnostik und individueller Behandlungsplanung.",
    intro: "Lars Gienger verbindet bei CURAPRAX über 20 Jahre praktische Erfahrung mit präziser Diagnostik, moderner Prävention und einem klar strukturierten Vorgehen.",
    images: [
      "/clinics/lars-gienger/lars-gienger.jpeg",
      "/clinics/lars-gienger/reception.jpeg",
      "/clinics/lars-gienger/infusion-room.jpeg",
      "/clinics/lars-gienger/treatment-room.jpeg"
    ],
    website: "https://www.curaprax.de",
    contactEmail: "curaprax@gmx.de",
    phone: "+49 7252 900 88 74",
    address: "Bahnhofstraße 24, 75015 Bretten, Deutschland"
  },
  {
    slug: "boguslaw-nikiciuk-neuruppin",
    name: "Praxis für Rheumatologie Boguslaw Krystian Nikiciuk",
    practitioner: "Boguslaw Krystian Nikiciuk · Facharzt für Innere Medizin und Rheumatologie",
    city: "Neuruppin",
    region: "Brandenburg",
    countryCode: "DE",
    profileAvailable: true,
    coordinates: {lat: 52.9244, lng: 12.8066},
    summary: "Internistische Facharztpraxis für die Diagnostik und Behandlung entzündlich-rheumatischer Erkrankungen in allen Stadien.",
    intro: "Boguslaw Krystian Nikiciuk und sein Team verbinden rheumatologische Frühdiagnostik mit individuell abgestimmter, leitlinienorientierter Behandlung und kontinuierlicher Betreuung.",
    images: [
      "/clinics/nikiciuk/portrait.jpg",
      "/clinics/nikiciuk/cell-mitochondria.png",
      "/clinics/nikiciuk/cell-receptors.png",
      "/clinics/nikiciuk/logo.png"
    ],
    website: "https://rheumatologie-neuruppin.de/",
    contactEmail: "praxis@rheumatologie-neuruppin.de",
    phone: "+49 3391 40 45 882",
    address: "An der Seepromenade 24, 16816 Neuruppin, Deutschland"
  },
  {
    slug: "hopmann-maak-lemfoerde",
    name: "Zahnarztpraxis Dr. Michael Maak und Kollegen",
    practitioner: "Dr. Michael Maak · Dr. Sabine Hopmann",
    city: "Lemförde",
    region: "Niedersachsen",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 52.4657, lng: 8.3768},
    website: "https://www.hopmann-maak.de/"
  },
  {
    slug: "res-vitalis-tegernsee",
    name: "ResVitalis",
    practitioner: "Dr. rer. nat. Anke Stockhausen · Apothekerin und Heilpraktikerin",
    city: "Tegernsee",
    region: "Bayern",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 47.7098, lng: 11.7582},
    website: "https://res-vitalis.de/"
  },
  {
    slug: "dres-neumeyer-eschlkam",
    name: "Zahnarztpraxis Dr. Neumeyer & Partner",
    practitioner: "Dr. Stefan Neumeyer · Dr. Stefanie Neumeyer-Wühr",
    city: "Eschlkam",
    region: "Bayern",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 49.2983, lng: 12.9157},
    website: "https://www.dres-neumeyer.de/"
  },
  {
    slug: "claudia-curth-hamburg",
    name: "Praxis für Ganzheitliche Medizin",
    practitioner: "Claudia Curth · Fachärztin für Allgemeinmedizin und Naturheilverfahren",
    city: "Hamburg",
    region: "Hamburg",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 53.653, lng: 10.112},
    website: "https://www.ganzheitliche-medizin-hamburg-curth.de/"
  },
  {
    slug: "matthias-salewski-koeln",
    name: "Internistische Hausarztpraxis am Dom",
    practitioner: "Matthias Salewski · Facharzt für Innere Medizin und Nephrologie",
    city: "Köln",
    region: "Nordrhein-Westfalen",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 50.9413, lng: 6.9583},
    website: "https://www.internist-am-dom.de/home"
  },
  {
    slug: "elena-bucur-karlsruhe",
    name: "Praxisklinik Bucur",
    practitioner: "Doctor medic Elena Bucur · Zahnärztin, Implantologie und zahnärztliche Chirurgie",
    city: "Karlsruhe",
    region: "Baden-Württemberg",
    countryCode: "DE",
    listingOnly: true,
    coordinates: {lat: 48.9722, lng: 8.4044},
    website: "https://www.praxisklinik-bucur.de/"
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
