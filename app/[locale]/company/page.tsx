import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Company",
  description: "Cell Group unites Cell Education, cell supply and cell clinics in one cellular medicine ecosystem."
};

export default async function CompanyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const items = [
    {title: "Cell Education", body: t("companyPage.education")},
    {title: "cell supply", body: t("companyPage.supply")},
    {title: "cell clinics", body: t("companyPage.clinics")}
  ];
  return (
    <>
      <PageHero eyebrow={t("companyPage.eyebrow")} title={t("companyPage.title")} lead={t("companyPage.lead")} image="/images/cellclinic-platform.png" />
      <section className="section"><div className="container ecosystem-company"><Image src="/brand/cell-group-ecosystem.svg" alt="Cell Group ecosystem" width={1200} height={600}/><div className="module-grid">{items.map(item=><article className="card module-card" key={item.title}><h2>{item.title}</h2><p>{item.body}</p></article>)}</div></div></section>
    </>
  );
}
