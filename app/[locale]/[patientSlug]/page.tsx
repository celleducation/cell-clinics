import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {BatteryCharging, Check, HeartPulse, ShieldCheck, Stethoscope} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {FeatureCard} from "@/components/ui/FeatureCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PatientInquiryForm} from "@/components/PatientInquiryForm";
import {CellScienceLearning} from "@/components/CellScienceArt";
import {ClinicFinder} from "@/components/ClinicFinder";
import {PhotographicHero} from "@/components/PhotographicHero";
import {clinics} from "@/content/clinics";
import {patientSlugs as slugs} from "@/i18n/paths";
import type {Locale} from "@/i18n/routing";
import {pageMetadata, jsonLd} from "@/lib/seo";

function validRoute(locale: string, patientSlug: string) {
  return slugs[locale as Locale] === patientSlug;
}

export function generateStaticParams() {
  return Object.entries(slugs).map(([locale, patientSlug]) => ({locale, patientSlug}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; patientSlug: string}>}): Promise<Metadata> {
  const {locale, patientSlug} = await params;
  if (!validRoute(locale, patientSlug)) return {};
  const t = await getTranslations({locale, namespace: "patient.meta"});
  const title = t("title");
  const description = t("description");
  return pageMetadata({locale, path: `/${patientSlug}`, title, description, image: "/images/cellclinic-mitochondria.png"});
}

export default async function PatientPage({params}: {params: Promise<{locale: string; patientSlug: string}>}) {
  const {locale, patientSlug} = await params;
  if (!validRoute(locale, patientSlug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("patient");
  const networkT = await getTranslations("networkPage");
  const faqItems = [1, 2, 3, 4, 5].map((item) => ({
    question: t(`faq.q${item}`), answer: t(`faq.a${item}`)
  }));
  const therapyCards = [BatteryCharging, HeartPulse, ShieldCheck, Stethoscope].map((icon, index) => ({
    icon,
    title: t(`therapy.card${index + 1}Title`),
    body: t(`therapy.card${index + 1}Body`)
  }));

  return (
    <>
      <PhotographicHero
        audience="patient"
        eyebrow={t("hero.label")}
        title={t("hero.title")}
        body={t("hero.body")}
        image="/images/editorial/patient-cell-membrane.webp"
      >
        <ButtonLink href="#find-clinic" size="large">{t("cta.findNearby")}</ButtonLink>
        <ButtonLink href="#process" variant="secondary" size="large">{t("cta.howItWorks")}</ButtonLink>
      </PhotographicHero>

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
            partnerPractice: networkT("partnerPractice"),
            locations: networkT("locations"),
            mapLabel: networkT("mapLabel"),
            centralPartner: networkT("centralPartner"),
            radius: networkT("radiusLabel"),
            useLocation: networkT("useLocation"),
            locating: networkT("locating"),
            locationError: networkT("locationError"),
            distanceAway: networkT("distanceAway"),
            nearestTitle: networkT("nearestTitle"),
            nearestBody: networkT("nearestBody"),
            expandRadius: networkT("expandRadius"),
            region: networkT("regionLabel")
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

      <section className="section patient-therapy-story" id="therapy">
        <div className="container">
          <SectionHeading eyebrow={t("therapy.label")} title={t("therapy.title")} intro={t("therapy.intro")} />
          <CellScienceLearning locale={locale} />
          <div className="patient-feature-grid">
            {therapyCards.map(({icon, title, body}) => <FeatureCard icon={icon} title={title} key={title}>{body}</FeatureCard>)}
          </div>
        </div>
      </section>

      <section className="section section-alt patient-process" id="process">
        <div className="patient-process-image" aria-hidden="true">
          <Image src="/images/editorial/patient-treatment-background.webp" alt="" aria-hidden="true" fill sizes="100vw" />
        </div>
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

      <section className="section section-soft patient-trust">
        <div className="container patient-trust-layout">
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

      <section className="section patient-faq" id="faq">
        <div className="container patient-faq-grid">
          <SectionHeading eyebrow={t("faq.label")} title={t("faq.title")} intro={t("faq.intro")} />
          <div className="faq-list">
            {faqItems.map(({question, answer}) => (
              <details className="faq-item" key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqItems.map(({question, answer}) => ({
            "@type": "Question", name: question,
            acceptedAnswer: {"@type": "Answer", text: answer}
          }))
        })}} />
      </section>

      <section className="section patient-final-cta">
        <div className="patient-final-image" aria-hidden="true">
          <Image src="/images/editorial/patient-nucleus.webp" alt="" aria-hidden="true" fill sizes="(max-width: 767px) 100vw, 65vw" />
        </div>
        <div className="container patient-final-copy">
          <span className="eyebrow">{t("cta.label")}</span>
          <h2 className="section-title">{t("cta.title")}</h2>
          <p className="lead">{t("cta.body")}</p>
          <ButtonLink href="#find-clinic" size="large">{t("cta.findClinic")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
