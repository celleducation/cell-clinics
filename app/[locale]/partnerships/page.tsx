import {Check} from "lucide-react";
import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {ModuleGrid} from "@/components/ModuleGrid";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {partnerModules} from "@/content/site";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Education, clinical systems, diagnostics and implementation support for Cell Clinics partners."
};

export default async function PartnershipsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const modules = partnerModules.map((item, index) => ({
    ...item,
    title: t(`ecosystem.card${index + 1}Title`),
    body: t(`ecosystem.card${index + 1}Body`)
  }));
  const weeks = [t("partnershipsPage.week1"), t("partnershipsPage.week2"), t("partnershipsPage.week3"), t("partnershipsPage.week4")];

  return (
    <>
      <PageHero
        eyebrow={t("partnershipsPage.eyebrow")}
        title={t("partnershipsPage.title")}
        lead={t("partnershipsPage.lead")}
        primary={{label: t("cta.requestInfo"), href: "/partnerships/apply"}}
        secondary={{label: t("cta.bookCall"), href: "/contact"}}
        image="/images/cellclinic-platform.png"
      />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t("ecosystem.label")} title={t("ecosystem.title")} body={t("ecosystem.body2")} />
          <ModuleGrid items={modules} />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionHeading title={t("partnershipsPage.programTitle")} body={t("partnershipsPage.programLead")} />
          <div className="timeline">
            {weeks.map((week, index) => <div key={week}><span>{String(index + 1).padStart(2, "0")}</span><Check size={18}/><strong>{week}</strong></div>)}
          </div>
          <ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
