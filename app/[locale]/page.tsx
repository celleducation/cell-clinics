import Image from "next/image";
import type {Metadata} from "next";
import {Check} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PartnerPillars, PartnerProgram, PartnerDeliverables} from "@/components/PartnerStory";
import {PharmacyPartnership} from "@/components/PharmacyPartnership";
import {CellScienceArt} from "@/components/CellScienceArt";
import {ClinicalSystems} from "@/components/ClinicalSystems";
import {PhotographicHero} from "@/components/PhotographicHero";
import {ClinicVideo} from "@/components/ClinicVideo";
import {PartnerApplicationForm} from "@/components/PartnerApplicationForm";
import {pageMetadata, ORGANIZATION_ID, jsonLd} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "meta"});
  const title = t("title");
  const description = t("description");

  return pageMetadata({locale, title, description});
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const trust = [t("hero.trust1"), t("hero.trust2"), t("hero.trust3"), t("hero.trust4")];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Cell Clinics",
    url: "https://cell-clinics.com",
    logo: "https://cell-clinics.com/cell-clinics-logo.png",
    email: "info@cell-education.com",
    description: t("meta.description"),
    areaServed: ["DE", "CH", "AT", "ES"],
    knowsAbout: t.raw("seo.knowsAbout"),
    contactPoint: {"@type": "ContactPoint", email: "info@cell-education.com", contactType: "business inquiries", availableLanguage: ["de", "en", "es"]},
    parentOrganization: {"@type": "Organization", name: "Cell Education", url: "https://www.cell-education.com"}
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd([structuredData, {
        "@context": "https://schema.org", "@type": "WebSite", "@id": `https://cell-clinics.com/${locale}/#website`,
        name: "Cell Clinics", url: `https://cell-clinics.com/${locale}`, inLanguage: locale,
        publisher: {"@id": ORGANIZATION_ID}
      }])}} />
      <PhotographicHero
        audience="home"
        eyebrow={t("hero.label")}
        title={t("hero.title")}
        body={t("hero.body")}
        image="/images/editorial/clinical-portrait.webp"
      >
        <ButtonLink href="#application" size="large">{t("cta.heroPrimary")}</ButtonLink>
        <ButtonLink href="#systems" variant="secondary" size="large">{t("cta.viewSystems")}</ButtonLink>
      </PhotographicHero>
      <div className="home-trust-strip">
        <div className="container trust-row">
          {trust.map((item) => <div className="trust-item" key={item}><Check size={17} /> <span>{item}</span></div>)}
        </div>
      </div>

      <PartnerPillars locale={locale} />

      <section className="section section-alt" id="systems">
        <div className="container">
          <div className="cell-science-heading">
            <SectionHeading eyebrow={t("systems.label")} title={t("systems.title")} />
            <CellScienceArt kind="senescence" locale={locale} />
          </div>
          <ClinicalSystems compact />
          <div className="section-action">
            <ButtonLink href="#application" variant="secondary">{t("cta.discussImplementation")}</ButtonLink>
          </div>
        </div>
      </section>

      <PartnerProgram locale={locale} />

      <PartnerDeliverables locale={locale} />
      <PharmacyPartnership locale={locale} />

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
              <ButtonLink href="#application" variant="secondary">{t("cta.partnerWithUs")}</ButtonLink>
            </div>
          </div>
          <div className="model-gallery">
            <Image src="/clinics/alpstein/interior-1.webp" alt={t("seo.images.alpsteinInterior")} width={900} height={760} />
            <Image src="/clinics/alpstein/recovery.webp" alt={t("seo.images.alpsteinRecovery")} width={900} height={760} />
            <Image src="/clinics/alpstein/landscape.webp" alt={t("seo.images.appenzell")} width={900} height={760} />
          </div>
        </div>
      </section>

      <section className="section section-soft" id="leadership">
        <div className="container leadership-teaser">
          <div>
            <SectionHeading eyebrow={t("leadership.label")} title={t("leadership.title")} intro={t("leadership.body")} />
            <div className="credential-list">
              {[1, 2, 3, 4].map((item) => (
                <div className="credential-item" key={item} tabIndex={0}>
                  <Check size={17} />
                  <div>
                    <strong>{t(`leadership.stat${item}`)}</strong>
                    <p>{t(`leadership.stat${item}Body`)}</p>
                  </div>
                </div>
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

      <section className="section section-alt clinic-video-section" aria-labelledby="clinic-video-title">
        <div className="container clinic-video-layout">
          <div>
            <span className="eyebrow">{t("lab.label")}</span>
            <h2 id="clinic-video-title" className="section-title">{t("lab.title")}</h2>
            <p className="lead">{t("lab.body1")}</p>
          </div>
          <ClinicVideo
            title={t("lab.title")}
            privacyNote={t("video.privacy")}
            externalLabel={t("video.external")}
          />
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
              aria-hidden="true"
              width={1242}
              height={1755}
            />
            <Image
              className="playbook-sheet playbook-sheet-middle"
              src="/images/partner-playbook/partner-playbook-week-one.png"
              alt=""
              aria-hidden="true"
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
