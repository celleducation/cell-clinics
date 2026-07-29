import {getTranslations, setRequestLocale} from "next-intl/server";
import type {Metadata} from "next";
import {PageHero} from "@/components/PageHero";
import {ClinicFinder} from "@/components/ClinicFinder";
import {clinics} from "@/content/clinics";

export const metadata: Metadata = {
  title: "Partner Clinic Network",
  description: "Find Cell Clinics partners by location, clinical focus and language."
};

export default async function NetworkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHero eyebrow={t("networkPage.eyebrow")} title={t("networkPage.title")} lead={t("networkPage.lead")} image="/images/cellclinic-network.png" />
      <section className="section">
        <div className="container">
          <ClinicFinder clinics={clinics} labels={{
            search: t("networkPage.searchLabel"),
            placeholder: t("networkPage.searchPlaceholder"),
            focus: t("networkPage.focusLabel"),
            language: t("networkPage.languageLabel"),
            all: t("common.all"),
            noResults: t("networkPage.noResults"),
            details: t("common.viewDetails")
          }} />
        </div>
      </section>
    </>
  );
}
