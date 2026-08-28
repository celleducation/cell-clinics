"use client";

import {ArrowUpRight, Building2, LocateFixed, MapPin, Search} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
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
  partnerPractice: string;
  locations: string;
  mapLabel: string;
  centralPartner: string;
  radius: string;
  useLocation: string;
  locating: string;
  locationError: string;
  distanceAway: string;
  nearestTitle: string;
  nearestBody: string;
  expandRadius: string;
  region: string;
};

type UserLocation = {lat: number; lng: number};

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/ß/g, "ss");
}

function distanceInKm(from: UserLocation, to: UserLocation) {
  const earthRadius = 6371;
  const toRadians = (value: number) => value * Math.PI / 180;
  const latitudeDelta = toRadians(to.lat - from.lat);
  const longitudeDelta = toRadians(to.lng - from.lng);
  const latitude1 = toRadians(from.lat);
  const latitude2 = toRadians(to.lat);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadius * Math.asin(Math.sqrt(haversine));
}

export function ClinicFinder({clinics, labels}: {clinics: Clinic[]; labels: FinderLabels}) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [radius, setRadius] = useState("100");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [searchLocation, setSearchLocation] = useState<UserLocation | null>(null);
  const [searchState, setSearchState] = useState<"idle" | "loading" | "error">("idle");
  const [locationState, setLocationState] = useState<"idle" | "loading" | "error">("idle");
  const countryNames = useMemo(() => new Intl.DisplayNames([locale], {type: "region"}), [locale]);
  const countries = [...new Set(clinics.map((clinic) => clinic.countryCode))];
  const needle = normalizeSearchValue(query.trim());
  const textMatches = useMemo(() => clinics.filter((clinic) =>
    !needle || [clinic.name, clinic.practitioner, clinic.city, clinic.region, countryNames.of(clinic.countryCode)]
      .some((value) => normalizeSearchValue(value || "").includes(needle))
  ), [clinics, countryNames, needle]);
  const activeLocation = needle ? searchLocation : userLocation;

  useEffect(() => {
    if (needle.length < 2) {
      setSearchLocation(null);
      setSearchState("idle");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setSearchState("loading");
      try {
        const params = new URLSearchParams({q: query.trim()});
        if (country) params.set("country", country);
        const response = await fetch(`/api/geocode?${params.toString()}`, {signal: controller.signal});
        if (!response.ok) throw new Error("Geocoding failed");
        const result = await response.json() as {location?: UserLocation | null};
        setSearchLocation(result.location || null);
        setSearchState(result.location ? "idle" : "error");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSearchLocation(null);
          setSearchState("error");
        }
      }
    }, 450);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [country, needle, query]);

  const filtered = useMemo(() => {
    return clinics.map((clinic) => ({
      ...clinic,
      distance: activeLocation ? distanceInKm(activeLocation, clinic.coordinates) : null
    })).filter((clinic) =>
      (!needle || (searchLocation
        ? true
        : textMatches.some((match) => match.slug === clinic.slug))) &&
      (!country || clinic.countryCode === country) &&
      (!activeLocation || clinic.distance === null || clinic.distance <= Number(radius))
    ).sort((a, b) => {
      if (a.distance === null || b.distance === null) return 0;
      return a.distance - b.distance;
    });
  }, [activeLocation, clinics, country, needle, radius, searchLocation, textMatches]);
  const nearestClinics = useMemo(() => {
    if (filtered.length || !activeLocation || searchState === "loading") return [];
    return clinics
      .filter((clinic) => !country || clinic.countryCode === country)
      .map((clinic) => ({...clinic, distance: distanceInKm(activeLocation, clinic.coordinates)}))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }, [activeLocation, clinics, country, filtered.length, searchState]);
  const displayedClinics = filtered.length ? filtered : nearestClinics;
  const expandedRadius = nearestClinics.length
    ? [25, 50, 100, 200, 500].find((value) => value >= nearestClinics[0].distance)
    : null;

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState("error");
      return;
    }

    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        setQuery("");
        setSearchLocation(null);
        setUserLocation({lat: coords.latitude, lng: coords.longitude});
        setLocationState("idle");
      },
      () => setLocationState("error"),
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 300000}
    );
  };

  return (
    <div className="clinic-finder">
      <aside className="clinic-results" aria-label={labels.locations}>
        <div className="clinic-search-panel">
          <label className="search-field">
            <span>{labels.search}</span>
            <span className="search-input-wrap"><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => {
              setQuery(event.target.value);
              setSearchLocation(null);
            }} placeholder={labels.placeholder} aria-busy={searchState === "loading"} /></span>
          </label>
          <label className="country-filter">
            <span>{labels.country}</span>
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
              <option value="">{labels.allCountries}</option>
              {countries.map((code) => <option value={code} key={code}>{countryNames.of(code)}</option>)}
            </select>
          </label>
          <fieldset className="radius-filter">
            <legend>{labels.radius}</legend>
            <div className="radius-options">
              {[25, 50, 100, 200, 500].map((value) => (
                <button
                  className={radius === String(value) ? "is-active" : ""}
                  type="button"
                  key={value}
                  aria-pressed={radius === String(value)}
                  onClick={() => setRadius(String(value))}
                >
                  {value} km
                </button>
              ))}
            </div>
          </fieldset>
          <button className="location-button" type="button" onClick={requestLocation} disabled={locationState === "loading"}>
            <LocateFixed size={18} aria-hidden="true" />
            {locationState === "loading" ? labels.locating : labels.useLocation}
          </button>
        </div>
        {locationState === "error" && <p className="location-error" role="status">{labels.locationError}</p>}
        <div className="clinic-list-heading">
          <span>{displayedClinics.length} {labels.locations}</span>
          <span>{labels.region}</span>
        </div>
        <div className="clinic-list">
          {!!nearestClinics.length && (
            <div className="clinic-nearest-note" role="status">
              <div>
                <strong>{labels.nearestTitle}</strong>
                <p>{labels.nearestBody}</p>
              </div>
              {expandedRadius && (
                <button type="button" onClick={() => setRadius(String(expandedRadius))}>
                  {labels.expandRadius} {expandedRadius} km
                </button>
              )}
            </div>
          )}
          {displayedClinics.map((clinic, index) => (
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
                  {clinic.listingOnly && <span className="clinic-practitioners">{clinic.practitioner}</span>}
                  <span><MapPin size={14} aria-hidden="true" />{clinic.city}, {countryNames.of(clinic.countryCode)}{clinic.distance !== null ? ` · ${Math.round(clinic.distance)} ${labels.distanceAway}` : ""}</span>
                </span>
              </div>
              {clinic.profileAvailable ? (
                <Link className="clinic-profile-link" href={`/network/${clinic.slug}`} aria-label={`${labels.details}: ${clinic.name}`}>
                  {labels.details}<ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          ))}
          {!displayedClinics.length && (
            <div className="clinic-empty" role="status">
              {searchState === "loading" ? <Search size={22} /> : <Building2 size={22} />}
              <p>{searchState === "loading" ? labels.locating : labels.noResults}</p>
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}
