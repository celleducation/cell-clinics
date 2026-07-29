import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {ButtonLink} from "@/components/ui/ButtonLink";

export default async function DiagnosticsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHero eyebrow={t("platform.module3Title")} title={t("systems.card2Title")} lead={t("platform.module3Body")} image="/images/cellclinic-diagnostics.png" />
      <section className="section"><div className="container prose-block"><h2>{t("platformPage.integratedTitle")}</h2><p>{t("systems.card2Body")}</p><ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink></div></section>
    </>
  );
}
