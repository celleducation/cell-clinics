import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import {PageHero} from "@/components/PageHero";
import {ModuleGrid} from "@/components/ModuleGrid";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {platformModules} from "@/content/site";

export const metadata: Metadata = {
  title: "Platform",
  description: "The integrated Cell Clinics implementation platform for education, diagnostics, clinical systems and partner clinics."
};

export default async function PlatformPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const modules = platformModules.map((item, index) => ({
    ...item,
    title: t(`platform.module${index + 1}Title`),
    body: t(`platform.module${index + 1}Body`)
  }));

  return (
    <>
      <PageHero
        eyebrow={t("platformPage.eyebrow")}
        title={t("platformPage.title")}
        lead={t("platformPage.lead")}
        primary={{label: t("cta.heroPrimary"), href: "/partnerships/apply"}}
        secondary={{label: t("cta.viewSystems"), href: "/clinical-systems"}}
        image="/images/cellclinic-network.png"
      />
      <section className="section">
        <div className="container">
          <SectionHeading title={t("platformPage.integratedTitle")} body={t("platformPage.integratedBody")} />
          <ModuleGrid items={modules} />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container platform-closing">
          <h2 className="section-title">{t("platform.closingTitle")}</h2>
          <p className="lead">{t("platform.closingBody")}</p>
          <ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
