import Image from "next/image";
import {Check} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ButtonLink} from "@/components/ui/ButtonLink";

export default async function LeadershipPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <section className="section section-soft">
      <div className="container leadership-page">
        <div><span className="eyebrow">{t("leadershipPage.eyebrow")}</span><h1 className="page-title">{t("leadershipPage.title")}</h1><p className="lead">{t("leadershipPage.lead")}</p><h2>Dr. Kay Bredehorst</h2><p>{t("leadership.body")}</p><div className="credential-list">{[1,2,3,4].map(n=><div className="credential-item" key={n} tabIndex={0}><Check size={17}/><div><strong>{t(`leadership.stat${n}`)}</strong><p>{t(`leadership.stat${n}Body`)}</p></div></div>)}</div><ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink></div>
        <Image src="/images/kay-bredehorst.jpg" alt="Dr. Kay Bredehorst" width={900} height={1100}/>
      </div>
    </section>
  );
}
