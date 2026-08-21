import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {BatteryCharging, Check, HeartPulse, ShieldCheck, Stethoscope} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {FeatureCard} from "@/components/ui/FeatureCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PatientInquiryForm} from "@/components/PatientInquiryForm";
import {ClinicFinder} from "@/components/ClinicFinder";
import {clinics} from "@/content/clinics";

const slugs: Record<string, string> = {de: "patienten", en: "patients", es: "pacientes"};

function validRoute(locale: string, patientSlug: string) {
  return slugs[locale] === patientSlug;
}

export function generateStaticParams() {
  return Object.entries(slugs).map(([locale, patientSlug]) => ({locale, patientSlug}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; patientSlug: string}>}): Promise<Metadata> {
  const {locale, patientSlug} = await params;
  if (!validRoute(locale, patientSlug)) return {};
  const t = await getTranslations({locale, namespace: "patient.meta"});
  return {title: t("title"), description: t("description")};
}

export default async function PatientPage({params}: {params: Promise<{locale: string; patientSlug: string}>}) {
  const {locale, patientSlug} = await params;
  if (!validRoute(locale, patientSlug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("patient");
  const networkT = await getTranslations("networkPage");
  const therapyCards = [BatteryCharging, HeartPulse, ShieldCheck, Stethoscope].map((icon, index) => ({
    icon,
    title: t(`therapy.card${index + 1}Title`),
    body: t(`therapy.card${index + 1}Body`)
  }));

  return (
    <>
      <section className="patient-hero section-soft">
        <div className="container patient-hero-grid">
          <div className="patient-hero-copy">
            <span className="eyebrow">{t("hero.label")}</span>
            <h1 className="display">{t("hero.title")}</h1>
            <p className="lead">{t("hero.body")}</p>
            <div className="button-row">
              <ButtonLink href="#find-clinic" size="large">{t("cta.findNearby")}</ButtonLink>
              <ButtonLink href="#process" variant="secondary" size="large">{t("cta.howItWorks")}</ButtonLink>
            </div>
          </div>
          <div className="patient-hero-art">
            <Image src="/images/cellclinic-mitochondria.png" alt="" width={1200} height={900} priority />
          </div>
        </div>
      </section>

      <section className="section" id="therapy">
        <div className="container">
          <SectionHeading eyebrow={t("therapy.label")} title={t("therapy.title")} intro={t("therapy.intro")} />
          <div className="patient-feature-grid">
            {therapyCards.map(({icon, title, body}) => <FeatureCard icon={icon} title={title} key={title}>{body}</FeatureCard>)}
          </div>
        </div>
      </section>

      <section className="section section-alt patient-process" id="process">
        <div className="container">
          <SectionHeading eyebrow={t("process.label")} title={t("process.title")} intro={t("process.intro")} />
          <div className="patient-steps">
            {[1, 2, 3, 4].map((step) => (
              <article className="patient-step card" key={step}>
                <span className="patient-step-number">{String(step).padStart(2, "0")}</span>
                <h3>{t(`process.step${step}Title`)}</h3>
                <p>{t(`process.step${step}Body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="find-clinic">
        <div className="container">
          <SectionHeading eyebrow={t("finder.label")} title={t("finder.title")} intro={t("finder.intro")} />
          <ClinicFinder clinics={clinics} labels={{
            search: networkT("searchLabel"),
            placeholder: networkT("searchPlaceholder"),
            country: networkT("countryLabel"),
            allCountries: networkT("allCountries"),
            noResults: networkT("noResults"),
            details: networkT("details"),
            profileSoon: networkT("profileSoon"),
            partnerPractice: networkT("partnerPractice"),
            locations: networkT("locations"),
            mapLabel: networkT("mapLabel"),
            centralPartner: networkT("centralPartner"),
            radius: networkT("radiusLabel"),
            useLocation: networkT("useLocation"),
            locating: networkT("locating"),
            locationError: networkT("locationError"),
            distanceAway: networkT("distanceAway")
          }} />
          <div className="patient-network-inquiry section-soft">
            <div>
              <span className="eyebrow">{t("finder.label")}</span>
              <h3>{t("finder.formTitle")}</h3>
              <p>{t("finder.formBody")}</p>
            </div>
            <PatientInquiryForm />
          </div>
        </div>
      </section>

      <section className="section section-soft patient-trust">
        <div className="container">
          <SectionHeading eyebrow={t("trust.label")} title={t("trust.title")} />
          <div className="patient-trust-grid">
            {[1, 2, 3, 4].map((item) => (
              <article key={item}>
                <Check size={19} />
                <div><h3>{t(`trust.item${item}Title`)}</h3><p>{t(`trust.item${item}Body`)}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section patient-final-cta">
        <div className="container patient-cta-card">
          <span className="eyebrow">{t("cta.label")}</span>
          <h2 className="section-title">{t("cta.title")}</h2>
          <p className="lead">{t("cta.body")}</p>
          <ButtonLink href="#find-clinic" size="large">{t("cta.findClinic")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
