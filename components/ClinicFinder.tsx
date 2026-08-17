"use client";

import {ArrowUpRight, Building2, MapPin, Search} from "lucide-react";
import {useMemo, useState} from "react";
import {useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import type {Clinic} from "@/content/clinics";

type FinderLabels = {
  search: string;
  placeholder: string;
  country: string;
  allCountries: string;
  noResults: string;
  details: string;
  profileSoon: string;
  partnerPractice: string;
  locations: string;
  mapLabel: string;
  centralPartner: string;
};

const bounds = {west: 5.5, east: 15.5, south: 46, north: 55.3};

function mapPosition(clinic: Clinic) {
  const x = ((clinic.coordinates.lng - bounds.west) / (bounds.east - bounds.west)) * 100;
  const y = ((bounds.north - clinic.coordinates.lat) / (bounds.north - bounds.south)) * 100;
  return {left: `${x}%`, top: `${y}%`};
}

export function ClinicFinder({clinics, labels}: {clinics: Clinic[]; labels: FinderLabels}) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState(clinics[0]?.slug ?? "");
  const countryNames = useMemo(() => new Intl.DisplayNames([locale], {type: "region"}), [locale]);
  const countries = [...new Set(clinics.map((clinic) => clinic.countryCode))];
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return clinics.filter((clinic) =>
      (!needle || [clinic.name, clinic.practitioner, clinic.city, clinic.region, countryNames.of(clinic.countryCode)]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(needle)) &&
      (!country || clinic.countryCode === country)
    );
  }, [clinics, country, countryNames, locale, query]);

  const selectedClinic = filtered.find((clinic) => clinic.slug === selected) ?? filtered[0];

  function selectClinic(clinic: Clinic) {
    setSelected(clinic.slug);
    document.getElementById(`clinic-${clinic.slug}`)?.scrollIntoView({block: "nearest", behavior: "smooth"});
  }

  return (
    <div className="clinic-finder">
      <aside className="clinic-results" aria-label={labels.locations}>
        <div className="clinic-search-panel">
          <label className="search-field">
            <span>{labels.search}</span>
            <span className="search-input-wrap"><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} /></span>
          </label>
          <label className="country-filter">
            <span>{labels.country}</span>
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
              <option value="">{labels.allCountries}</option>
              {countries.map((code) => <option value={code} key={code}>{countryNames.of(code)}</option>)}
            </select>
          </label>
        </div>
        <div className="clinic-list-heading">
          <span>{filtered.length} {labels.locations}</span>
          <span>DACH</span>
        </div>
        <div className="clinic-list">
          {filtered.map((clinic, index) => (
            <article
              className={`clinic-result ${selectedClinic?.slug === clinic.slug ? "is-selected" : ""}`}
              id={`clinic-${clinic.slug}`}
              key={clinic.slug}
              onMouseEnter={() => setSelected(clinic.slug)}
            >
              <button className="clinic-result-select" type="button" onClick={() => selectClinic(clinic)} aria-label={`${clinic.name}, ${clinic.city}`}>
                <span className="clinic-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="clinic-result-copy">
                  <span className="clinic-result-label">{clinic.modelClinic ? labels.centralPartner : labels.partnerPractice}</span>
                  <strong>{clinic.name}</strong>
                  <span><MapPin size={14} aria-hidden="true" />{clinic.city}, {countryNames.of(clinic.countryCode)}</span>
                </span>
              </button>
              {clinic.profileAvailable ? (
                <Link className="clinic-profile-link" href={`/network/${clinic.slug}`} aria-label={`${labels.details}: ${clinic.name}`}>
                  {labels.details}<ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ) : <span className="clinic-profile-pending">{labels.profileSoon}</span>}
            </article>
          ))}
          {!filtered.length && <div className="clinic-empty"><Building2 size={22} /><p>{labels.noResults}</p></div>}
        </div>
      </aside>

      <div className="clinic-map" aria-label={labels.mapLabel}>
        <div className="clinic-map-header">
          <div><span className="eyebrow">DACH Network</span><strong>{labels.mapLabel}</strong></div>
          <span className="clinic-map-count">{filtered.length}</span>
        </div>
        <div className="clinic-map-canvas">
          <svg viewBox="0 0 720 680" role="img" aria-label={labels.mapLabel}>
            <path className="map-country" d="M200 67l74-34 92 24 62-25 80 44 26 69 57 43-15 74 28 52-36 73-80 19-45 58-85-22-68 33-63-44-8-78-45-58 35-61-29-80z" />
            <path className="map-country" d="M228 483l83-10 61 18 68-24 73 26 15 49-62 30-81-5-71 31-75-22-33-48z" />
            <path className="map-country" d="M423 478l69-42 80 4 48-27 51 30-30 45-96 28-83 4z" />
            <text x="385" y="270">DE</text>
            <text x="324" y="538">CH</text>
            <text x="532" y="480">AT</text>
          </svg>
          {filtered.map((clinic) => (
            <button
              className={`clinic-map-point ${selectedClinic?.slug === clinic.slug ? "is-active" : ""}`}
              style={mapPosition(clinic)}
              type="button"
              key={clinic.slug}
              onClick={() => selectClinic(clinic)}
              aria-label={`${clinic.name}, ${clinic.city}`}
            ><span /></button>
          ))}
          {selectedClinic && (
            <div className="clinic-map-preview">
              <span>{selectedClinic.modelClinic ? labels.centralPartner : labels.partnerPractice}</span>
              <strong>{selectedClinic.name}</strong>
              <small>{selectedClinic.city}, {countryNames.of(selectedClinic.countryCode)}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
