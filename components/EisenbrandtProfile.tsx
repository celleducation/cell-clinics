import {ClinicProfileLabel} from "@/components/ClinicProfileLabel";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {Clinic} from "@/content/clinics";

export async function EisenbrandtProfile({clinic, locale}: {clinic: Clinic; locale: string}) {
  const t = await getTranslations("eisenbrandt");
  return <>
    <section className="alpstein-hero eisenbrandt-hero section-soft">
      <div className="container">
        <div className="alpstein-hero-grid">
          <div className="alpstein-hero-copy">
            <ClinicProfileLabel clinic={clinic} locale={locale} />
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
    <section className="section partner-glass-wash"><div className="container eisenbrandt-details">
      <div><h2 className="section-title">{t("bioTitle")}</h2><p className="lead">{t("bio")}</p></div>
      <div className="eisenbrandt-specialties"><h2 className="section-title">{t("focusTitle")}</h2>
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
        <span>{clinic.contactEmail}</span>
        <div className="partner-contact-actions"><a className="button button-primary" href={`mailto:${clinic.contactEmail}`}>{t("appointment")}</a>
        <a className="button button-secondary" href="https://www.instagram.com/dr.franziska.eisenbrandt/">Instagram ↗</a></div>
      </address>
    </div></section>
  </>;
}
