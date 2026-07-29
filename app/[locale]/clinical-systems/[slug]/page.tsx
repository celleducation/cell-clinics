import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {clinicalSystems} from "@/content/site";
import {PageHero} from "@/components/PageHero";
import {ButtonLink} from "@/components/ui/ButtonLink";

export function generateStaticParams() {
  return clinicalSystems.map(({slug}) => ({slug}));
}

export default async function SystemDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const system = clinicalSystems.find((item) => item.slug === slug);
  if (!system) notFound();
  const t = await getTranslations();
  const index = clinicalSystems.findIndex((item) => item.slug === slug) + 1;

  return (
    <>
      <PageHero eyebrow={t("systems.label")} title={t(`systems.card${index}Title`)} lead={t(`systems.card${index}Body`)} image={system.image} />
      <section className="section">
        <div className="container detail-layout">
          <div>
            <span className="eyebrow">{t("brand.platformKicker")}</span>
            <h2 className="section-title">{t("platform.closingTitle")}</h2>
          </div>
          <div className="prose-block">
            <p>{t("platform.closingBody")}</p>
            <ButtonLink href="/partnerships/apply">{t("cta.requestInfo")}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
