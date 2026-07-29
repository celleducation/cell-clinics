import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import {PageHero} from "@/components/PageHero";
import {ClinicalSystems} from "@/components/ClinicalSystems";
import {ButtonLink} from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Clinical Systems",
  description: "Four implementation pathways for physician-guided cellular medicine programs."
};

export default async function ClinicalSystemsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("systems.label")}
        title={t("systems.title")}
        lead={t("platformPage.lead")}
        primary={{label: t("cta.requestInfo"), href: "/partnerships/apply"}}
        image="/images/cellclinic-systems.png"
      />
      <section className="section">
        <div className="container">
          <ClinicalSystems />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container final-cta-inner">
          <h2 className="section-title">{t("ecosystem.ctaTitle")}</h2>
          <p className="lead">{t("ecosystem.ctaBody")}</p>
          <ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
