import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {ModuleGrid} from "@/components/ModuleGrid";
import {partnerModules} from "@/content/site";

export default async function EcosystemPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const modules = partnerModules.map((item, index) => ({...item, title: t(`ecosystem.card${index + 1}Title`), body: t(`ecosystem.card${index + 1}Body`)}));
  return <><PageHero eyebrow={t("ecosystem.label")} title={t("ecosystem.title")} lead={t("ecosystem.body2")} image="/images/cellclinic-platform.png" /><section className="section"><div className="container"><ModuleGrid items={modules}/></div></section></>;
}
