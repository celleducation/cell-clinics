import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";

export default async function NewsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return <section className="section"><div className="container news-page-list"><span className="eyebrow">{t("newsPage.eyebrow")}</span><h1 className="page-title">{t("newsPage.title")}</h1><p className="lead">{t("newsPage.lead")}</p><article className="event-card card"><div><span className="eyebrow">{t("lab.label")}</span><h2 className="section-title">{t("lab.title")}</h2><p>{t("lab.body1")}</p><p>{t("lab.body2")}</p><a className="button button-secondary" href="https://www.cell-performance.com/longevity-lab" target="_blank" rel="noreferrer">{t("lab.cta")}</a></div><div className="video-frame"><iframe src="https://player.vimeo.com/video/1207667225?h=4a88c6fc04" title="Longevity Lab 2026 recap" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div></article><article className="news-card card"><div className="news-copy"><Image className="news-logo" src="/images/sheba-medical-center-logo.png" alt="Sheba Medical Center" width={420} height={200}/><h2 className="section-title">{t("news.title")}</h2><p>{t("news.body")}</p><p className="news-note">{t("news.note")}</p><ButtonLink href="/contact" variant="secondary">{t("news.cta")}</ButtonLink></div><Image className="news-image" src="/images/sheba-medical-center-campus.jpg" alt="Sheba Medical Center campus" width={900} height={600}/></article></div></section>;
}
