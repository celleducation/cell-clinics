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

type Coordinate = [number, number];

const mapView = {width: 720, height: 650, padding: 28};
const bounds = {west: 5.45, east: 17.25, south: 45.72, north: 55.15};

// Simplified geographic borders in longitude/latitude. They retain the real
// proportions of the DACH region without loading a third-party map service.
const countryShapes: {code: Clinic["countryCode"]; coordinates: Coordinate[]}[] = [
  {
    code: "DE",
    coordinates: [
      [9.92, 54.98], [9.43, 54.81], [8.93, 54.83], [8.61, 54.90], [8.44, 54.75],
      [8.60, 54.45], [8.12, 54.37], [8.00, 53.71], [7.11, 53.70], [6.90, 53.48],
      [7.10, 52.85], [6.95, 52.23], [6.69, 51.85], [6.17, 51.86], [6.03, 51.47],
      [6.22, 51.14], [5.99, 50.76], [6.14, 50.14], [6.28, 49.91], [6.18, 49.47],
      [6.67, 49.20], [7.01, 49.21], [7.32, 49.00], [7.57, 48.33], [7.57, 47.60],
      [8.23, 47.62], [8.56, 47.80], [9.18, 47.66], [9.59, 47.52], [10.16, 47.48],
      [10.47, 47.56], [11.08, 47.39], [11.43, 47.52], [12.10, 47.68], [12.62, 47.67],
      [13.03, 47.47], [13.20, 47.49], [13.60, 48.88], [13.84, 48.77], [14.34, 48.56],
      [14.71, 48.58], [14.69, 48.97], [14.40, 50.17], [14.85, 50.87], [14.61, 51.00],
      [14.73, 51.58], [14.57, 52.24], [14.18, 52.60], [14.36, 53.09], [14.15, 53.93],
      [13.69, 54.31], [12.96, 54.44], [12.52, 54.47], [12.07, 54.25], [11.74, 54.19],
      [11.19, 54.39], [10.95, 54.36], [10.88, 53.96], [10.24, 54.32], [9.92, 54.98]
    ]
  },
  {
    code: "CH",
    coordinates: [
      [5.96, 46.13], [6.02, 46.73], [6.50, 46.43], [6.84, 47.28], [7.19, 47.50],
      [7.55, 47.59], [8.23, 47.62], [8.56, 47.80], [9.18, 47.66], [9.59, 47.52],
      [9.63, 47.35], [9.48, 47.10], [10.43, 46.89], [10.36, 46.48], [9.92, 46.32],
      [9.42, 46.30], [9.18, 46.17], [8.97, 46.04], [8.49, 46.01], [8.32, 46.12],
      [7.75, 45.92], [7.27, 45.99], [6.84, 46.43], [6.50, 46.43], [5.96, 46.13]
    ]
  },
  {
    code: "AT",
    coordinates: [
      [9.53, 47.27], [9.60, 47.06], [10.12, 46.85], [10.48, 46.89], [10.98, 46.83],
      [11.16, 46.95], [11.93, 46.91], [12.44, 46.69], [12.81, 46.68], [13.03, 46.57],
      [13.70, 46.52], [14.51, 46.43], [15.14, 46.66], [15.68, 46.66], [16.01, 46.85],
      [16.57, 46.50], [16.95, 46.84], [16.88, 47.01], [17.15, 48.01], [16.98, 48.60],
      [16.50, 48.79], [16.07, 48.80], [15.25, 49.04], [14.90, 48.93], [14.34, 48.56],
      [13.60, 48.88], [13.24, 48.42], [12.88, 48.29], [12.12, 47.68], [11.43, 47.52],
      [10.98, 47.40], [10.47, 47.56], [9.90, 47.58], [9.53, 47.27]
    ]
  }
];

const countryLabels: {code: Clinic["countryCode"]; coordinate: Coordinate}[] = [
  {code: "DE", coordinate: [10.3, 51.2]},
  {code: "CH", coordinate: [8.2, 46.45]},
  {code: "AT", coordinate: [14.1, 47.45]}
];

function project([lng, lat]: Coordinate) {
  const innerWidth = mapView.width - mapView.padding * 2;
  const innerHeight = mapView.height - mapView.padding * 2;
  return {
    x: mapView.padding + ((lng - bounds.west) / (bounds.east - bounds.west)) * innerWidth,
    y: mapView.padding + ((bounds.north - lat) / (bounds.north - bounds.south)) * innerHeight
  };
}

function shapePath(coordinates: Coordinate[]) {
  return coordinates.map((coordinate, index) => {
    const point = project(coordinate);
    return `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }).join(" ") + " Z";
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
          <svg viewBox={`0 0 ${mapView.width} ${mapView.height}`} role="img" aria-label={labels.mapLabel}>
            <defs>
              <linearGradient id="map-de" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fbfdff" /><stop offset="1" stopColor="#edf5fb" /></linearGradient>
              <linearGradient id="map-ch" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f8fcff" /><stop offset="1" stopColor="#eaf6fb" /></linearGradient>
              <linearGradient id="map-at" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fdfefe" /><stop offset="1" stopColor="#eef7fc" /></linearGradient>
            </defs>
            {countryShapes.map((country) => (
              <path className={`map-country map-country-${country.code.toLowerCase()}`} d={shapePath(country.coordinates)} key={country.code} />
            ))}
            {countryLabels.map((label) => {
              const point = project(label.coordinate);
              return <text x={point.x} y={point.y} textAnchor="middle" key={label.code}>{label.code}</text>;
            })}
            {filtered.map((clinic) => {
              const point = project([clinic.coordinates.lng, clinic.coordinates.lat]);
              const active = selectedClinic?.slug === clinic.slug;
              return (
                <g
                  className={`clinic-map-point ${active ? "is-active" : ""}`}
                  transform={`translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`}
                  role="button"
                  tabIndex={0}
                  key={clinic.slug}
                  onClick={() => selectClinic(clinic)}
                  onMouseEnter={() => setSelected(clinic.slug)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectClinic(clinic);
                    }
                  }}
                  aria-label={`${clinic.name}, ${clinic.city}`}
                >
                  <circle className="clinic-map-point-halo" r={active ? 14 : 11} />
                  <circle className="clinic-map-point-core" r="4.5" />
                </g>
              );
            })}
          </svg>
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
