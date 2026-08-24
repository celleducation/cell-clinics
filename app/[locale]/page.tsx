import Image from "next/image";
import type {Metadata} from "next";
import {Check} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ModuleGrid} from "@/components/ModuleGrid";
import {ClinicalSystems} from "@/components/ClinicalSystems";
import {PartnerApplicationForm} from "@/components/PartnerApplicationForm";
import {partnerModules} from "@/content/site";

const localeNames: Record<string, string> = {
  de: "de_DE",
  en: "en_US",
  es: "es_ES"
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "meta"});
  const title = t("title");
  const description = t("description");

  return {
    title: {absolute: title},
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {de: "/de", en: "/en", es: "/es", "x-default": "/en"}
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Cell Clinics",
      locale: localeNames[locale] || "en_US",
      type: "website",
      images: [{url: "/images/cellclinic-platform.png", width: 1400, height: 1080, alt: "Cell Clinics"}]
    },
    twitter: {card: "summary_large_image", title, description, images: ["/images/cellclinic-platform.png"]}
  };
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const trust = [t("hero.trust1"), t("hero.trust2"), t("hero.trust3"), t("hero.trust4")];
  const modules = partnerModules.map((item, index) => ({
    ...item,
    title: t(`ecosystem.card${index + 1}Title`),
    body: t(`ecosystem.card${index + 1}Body`)
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cell Clinics",
    url: "https://cell-clinics.com",
    logo: "https://cell-clinics.com/cell-clinics-logo.png",
    email: "info@cell-education.com",
    description: t("meta.description"),
    parentOrganization: {"@type": "Organization", name: "Cell Education", url: "https://www.cell-education.com"}
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, "\\u003c")}} />
      <section className="home-hero section-soft">
        <div className="container home-hero-grid">
          <div>
            <span className="eyebrow">{t("hero.label")}</span>
            <h1 className="display">{t("hero.title")}</h1>
            <p className="lead">{t("hero.body")}</p>
            <div className="button-row">
              <ButtonLink href="#application" size="large">{t("cta.heroPrimary")}</ButtonLink>
              <ButtonLink href="#systems" variant="secondary" size="large">{t("cta.viewSystems")}</ButtonLink>
            </div>
          </div>
          <div className="home-hero-art">
            <Image src="/images/cellclinic-platform.png" alt="" width={1400} height={1080} priority />
          </div>
        </div>
        <div className="container trust-row">
          {trust.map((item) => <div className="trust-item" key={item}><Check size={17} /> <span>{item}</span></div>)}
        </div>
      </section>

      <section className="section" id="platform">
        <div className="container">
          <SectionHeading eyebrow={t("home.whatLabel")} title={t("home.whatTitle")} intro={t("home.whatBody")} />
          <ModuleGrid items={modules.slice(0, 4)} />
          <div className="section-action">
            <ButtonLink href="#systems" variant="secondary">{t("cta.explorePlatform")}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="systems">
        <div className="container">
          <SectionHeading eyebrow={t("systems.label")} title={t("systems.title")} />
          <ClinicalSystems compact />
          <div className="section-action">
            <ButtonLink href="#application" variant="secondary">{t("cta.discussImplementation")}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section model-clinic-section" id="proof">
        <div className="container model-clinic-grid">
          <div className="model-clinic-copy">
            <span className="eyebrow">{t("implementation.label")}</span>
            <h2 className="section-title">{t("implementation.title")}</h2>
            <p className="lead">{t("implementation.body1")}</p>
            <div className="clinic-brand-row">
              <Image src="/clinics/alpstein/logo.webp" alt="Alpstein Clinic" width={330} height={140} />
              <span>{t("implementation.poweredBy")}</span>
            </div>
            <div className="button-row">
              <ButtonLink href="#application" variant="secondary">{t("implementation.cta")}</ButtonLink>
            </div>
          </div>
          <div className="model-gallery">
            <Image src="/clinics/alpstein/interior-1.webp" alt="Alpstein Clinic interior" width={900} height={760} />
            <Image src="/clinics/alpstein/recovery.webp" alt="Alpstein Clinic recovery area" width={900} height={760} />
            <Image src="/clinics/alpstein/landscape.webp" alt="Appenzell landscape" width={900} height={760} />
          </div>
        </div>
      </section>

      <section className="section section-soft" id="leadership">
        <div className="container leadership-teaser">
          <div>
            <SectionHeading eyebrow={t("leadership.label")} title={t("leadership.title")} intro={t("leadership.body")} />
            <div className="credential-list">
              {[t("leadership.stat1"), t("leadership.stat2"), t("leadership.stat3"), t("leadership.stat4")].map((item) => (
                <div key={item}><Check size={17} />{item}</div>
              ))}
            </div>
            <div className="button-row">
              <ButtonLink href="https://www.cell-education.com" variant="secondary">{t("cta.learnEducation")}</ButtonLink>
            </div>
          </div>
          <div className="leadership-portrait">
            <Image src="/images/kay-bredehorst.jpg" alt="Dr. Kay Bredehorst" width={900} height={1100} />
            <div><strong>Dr. Kay Bredehorst</strong><span>{t("leadershipPage.role")}</span></div>
          </div>
        </div>
      </section>

      <section className="section onboarding-section" id="onboarding">
        <div className="container onboarding-grid">
          <div className="onboarding-copy">
            <span className="eyebrow">{t("onboarding.label")}</span>
            <h2 className="section-title">{t("onboarding.title")}</h2>
            <p className="lead">{t("onboarding.body")}</p>
            <div className="onboarding-steps">
              {[1, 2, 3, 4].map((step) => (
                <div className="onboarding-step" key={step}>
                  <span>{String(step).padStart(2, "0")}</span>
                  <div>
                    <strong>{t(`onboarding.step${step}Title`)}</strong>
                    <p>{t(`onboarding.step${step}Body`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="onboarding-support">
              <Check size={18} />
              <span>{t("onboarding.support")}</span>
            </div>
            <ButtonLink href="#application" variant="secondary">{t("cta.requestInfo")}</ButtonLink>
          </div>

          <div className="playbook-mockup" aria-label={t("onboarding.mockupLabel")}>
            <div className="playbook-glow" />
            <Image
              className="playbook-sheet playbook-sheet-back"
              src="/images/partner-playbook/partner-playbook-checklist.png"
              alt=""
              width={1242}
              height={1755}
            />
            <Image
              className="playbook-sheet playbook-sheet-middle"
              src="/images/partner-playbook/partner-playbook-week-one.png"
              alt=""
              width={1242}
              height={1755}
            />
            <Image
              className="playbook-sheet playbook-sheet-front"
              src="/images/partner-playbook/partner-playbook-cover.png"
              alt={t("onboarding.mockupLabel")}
              width={1242}
              height={1755}
            />
            <div className="playbook-badge">
              <span>30</span>
              <small>{t("onboarding.days")}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section application-section" id="application">
        <div className="container application-onepager">
          <div className="application-intro">
            <span className="eyebrow">{t("form.label")}</span>
            <h2 className="section-title">{t("form.title")}</h2>
            <p className="lead">{t("form.body")}</p>
            <p className="application-note">{t("form.note")}</p>
          </div>
          <PartnerApplicationForm />
        </div>
      </section>
    </>
  );
}
