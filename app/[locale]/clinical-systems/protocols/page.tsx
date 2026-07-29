import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {ButtonLink} from "@/components/ui/ButtonLink";

export default async function ProtocolsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHero eyebrow={t("platform.module2Title")} title={t("systems.card1Title")} lead={t("systems.card1Body")} image="/images/cellclinic-protocols.png" />
      <section className="section"><div className="container prose-block"><h2>{t("platform.closingTitle")}</h2><p>{t("platform.closingBody")}</p><ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink></div></section>
    </>
  );
}
