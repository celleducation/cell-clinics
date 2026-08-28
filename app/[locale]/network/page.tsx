import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import {ClinicFinder} from "@/components/ClinicFinder";
import {clinics} from "@/content/clinics";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "networkPage"});
  return {title: t("title"), description: t("lead")};
}

export default async function NetworkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("networkPage");

  return (
    <>
      <section className="network-hero section-soft">
        <div className="container network-hero-inner">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="display">{t("title")}</h1>
          </div>
          <p className="lead">{t("lead")}</p>
        </div>
      </section>
      <section className="section network-directory">
        <div className="container">
          <div className="network-directory-intro">
            <span className="eyebrow">{t("directoryLabel")}</span>
            <h2 className="section-title">{t("directoryTitle")}</h2>
            <p>{t("directoryBody")}</p>
          </div>
          <ClinicFinder clinics={clinics} labels={{
            search: t("searchLabel"),
            placeholder: t("searchPlaceholder"),
            country: t("countryLabel"),
            allCountries: t("allCountries"),
            noResults: t("noResults"),
            details: t("details"),
            partnerPractice: t("partnerPractice"),
            locations: t("locations"),
            mapLabel: t("mapLabel"),
            centralPartner: t("centralPartner"),
            radius: t("radiusLabel"),
            useLocation: t("useLocation"),
            locating: t("locating"),
            locationError: t("locationError"),
            distanceAway: t("distanceAway"),
            nearestTitle: t("nearestTitle"),
            nearestBody: t("nearestBody"),
            expandRadius: t("expandRadius"),
            region: t("regionLabel")
          }} />
        </div>
      </section>
    </>
  );
}
