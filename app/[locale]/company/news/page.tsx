import {NewsVideo} from "@/components/NewsVideo";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function NewsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return <section className="section"><div className="container news-page-list"><span className="eyebrow">{t("newsPage.eyebrow")}</span><h1 className="page-title">{t("newsPage.title")}</h1><p className="lead">{t("newsPage.lead")}</p><article className="event-card card"><div><span className="eyebrow">{t("lab.label")}</span><h2 className="section-title">{t("lab.title")}</h2><p>{t("lab.body1")}</p><p>{t("lab.body2")}</p><a className="button button-secondary" href="https://www.cell-performance.com/longevity-lab" target="_blank" rel="noreferrer">{t("lab.cta")}</a></div><NewsVideo locale={locale} /></article></div></section>;
}
