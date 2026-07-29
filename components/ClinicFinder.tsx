"use client";

import {MapPin, Search} from "lucide-react";
import {useMemo, useState} from "react";
import {useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import type {Clinic} from "@/content/clinics";

export function ClinicFinder({
  clinics,
  labels
}: {
  clinics: Clinic[];
  labels: {search: string; placeholder: string; focus: string; language: string; all: string; noResults: string; details: string};
}) {
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const [focus, setFocus] = useState("");
  const [language, setLanguage] = useState("");
  const focusOptions = [...new Set(clinics.flatMap((clinic) => clinic.focus))];
  const languageOptions = [...new Set(clinics.flatMap((clinic) => clinic.languages))];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return clinics.filter((clinic) =>
      (!needle || [clinic.name, clinic.city, clinic.region, clinic.country, ...clinic.focus, ...clinic.languages]
        .join(" ")
        .toLowerCase()
        .includes(needle)) &&
      (!focus || clinic.focus.includes(focus)) &&
      (!language || clinic.languages.includes(language))
    );
  }, [clinics, focus, language, query]);

  return (
    <div className="clinic-finder">
      <div className="clinic-map card" aria-label="Map of partner clinics">
        <svg viewBox="0 0 800 520" role="img" aria-label="Europe clinic network map">
          <path
            d="M175 66l88-24 75 25 42 49 84-15 76 44 58 70-13 85-56 20-37 76-103 27-75-37-90 4-68-60-17-92 45-64-9-108z"
            fill="#edf7fc"
            stroke="#cddbe8"
            strokeWidth="2"
          />
          <path d="M255 152l87 27 74-22 68 47-29 90-89 48-103-24-40-74 32-92z" fill="#f8fbfd" stroke="#dce7ef" />
          {filtered.map((clinic) => (
            <a href={`/${locale}/network/${clinic.slug}`} key={clinic.slug} aria-label={clinic.name}>
              <circle cx={`${clinic.coordinates.x}%`} cy={`${clinic.coordinates.y}%`} r="13" fill="#16264a" />
              <circle cx={`${clinic.coordinates.x}%`} cy={`${clinic.coordinates.y}%`} r="22" fill="none" stroke="#7fd3f0" strokeWidth="4" opacity=".55" />
            </a>
          ))}
        </svg>
      </div>
      <div className="clinic-results">
        <label className="search-field">
          <span>{labels.search}</span>
          <span className="search-input-wrap"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} /></span>
        </label>
        <div className="finder-filters">
          <label>{labels.focus}<select value={focus} onChange={(event) => setFocus(event.target.value)}><option value="">{labels.all}</option>{focusOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>{labels.language}<select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="">{labels.all}</option>{languageOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="clinic-list">
          {filtered.map((clinic) => (
            <article className="clinic-result card" key={clinic.slug}>
              <MapPin size={22} />
              <div>
                <h3>{clinic.name}</h3>
                <p>{clinic.city}, {clinic.country}</p>
                <div className="chip-list">{clinic.focus.map((focus) => <span className="chip" key={focus}>{focus}</span>)}</div>
              </div>
              <Link href={`/network/${clinic.slug}`}>{labels.details}</Link>
            </article>
          ))}
          {!filtered.length && <p>{labels.noResults}</p>}
        </div>
      </div>
    </div>
  );
}
