import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";
import {ButtonLink} from "@/components/ui/ButtonLink";

export default async function ProgramPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return <><PageHero eyebrow={t("partnershipsPage.eyebrow")} title={t("partnershipsPage.programTitle")} lead={t("partnershipsPage.programLead")} image="/images/cellclinic-systems.png"/><section className="section"><div className="container"><div className="timeline">{[1,2,3,4].map((n)=><div key={n}><span>{String(n).padStart(2,"0")}</span><strong>{t(`partnershipsPage.week${n}`)}</strong></div>)}</div><ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink></div></section></>;
}
