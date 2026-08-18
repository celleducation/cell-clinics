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

export function ClinicFinder({clinics, labels}: {clinics: Clinic[]; labels: FinderLabels}) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
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
              className="clinic-result"
              id={`clinic-${clinic.slug}`}
              key={clinic.slug}
            >
              <div className="clinic-result-select">
                <span className="clinic-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="clinic-result-copy">
                  <span className="clinic-result-label">{clinic.modelClinic ? labels.centralPartner : labels.partnerPractice}</span>
                  <strong>{clinic.name}</strong>
                  <span><MapPin size={14} aria-hidden="true" />{clinic.city}, {countryNames.of(clinic.countryCode)}</span>
                </span>
              </div>
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

    </div>
  );
}
