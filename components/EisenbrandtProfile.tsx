import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {ArrowLeft} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {Clinic} from "@/content/clinics";

export async function EisenbrandtProfile({clinic, locale}: {clinic: Clinic; locale: string}) {
  const t = await getTranslations("eisenbrandt");
  const seo = await getTranslations("seo");
  return <>
    <Breadcrumbs locale={locale} items={[
      {name: seo("home"), path: ""},
      {name: t("network"), path: "/network"},
      {name: clinic.practitioner, path: `/network/${clinic.slug}`}
    ]} />
    <section className="alpstein-hero section-soft">
      <div className="container">
        <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} />{t("network")}</Link>
        <div className="alpstein-hero-grid">
          <div className="alpstein-hero-copy">
            <span className="eyebrow">{clinic.city}</span>
            <h1 className="display">{clinic.practitioner}</h1>
            <p className="lead">{t("intro")}</p>
            <div className="button-row"><a className="button button-primary" href="#contact">{t("appointment")}</a></div>
          </div>
          <div className="neumeyer-hero-media">
            <Image src="/clinics/franziska-eisenbrandt/portrait.webp" alt={clinic.practitioner} width={796} height={779} sizes="(max-width: 767px) 90vw, 540px" priority />
          </div>
        </div>
      </div>
    </section>
    <section className="section"><div className="container maak-about">
      <div><SectionHeading title={t("bioTitle")} /><p className="lead">{t("bio")}</p></div>
      <div className="maak-focus"><h2 className="section-title">{t("focusTitle")}</h2>
        <ul>{(t.raw("focus") as string[]).map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </div></section>
    <section className="section section-soft"><div className="container clinic-profile-split">
      <Image src="/images/cellclinic-mitochondria.png" alt="" width={640} height={640} sizes="(max-width: 767px) 90vw, 540px" className="w-full h-auto" />
      <div><SectionHeading title={t("approachTitle")} /><p className="lead">{t("approach")}</p></div>
    </div></section>
    <section className="section clinic-profile-contact" id="contact"><div className="container clinic-profile-contact-card">
      <div><SectionHeading title={t("contact")} /><p>{t("visits")}</p></div>
      <address>
        <strong>{clinic.practitioner}</strong><span>{clinic.address}</span>
        <a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>
        <a href="https://www.instagram.com/dr.franziska.eisenbrandt/">Instagram</a>
      </address>
    </div></section>
  </>;
}
