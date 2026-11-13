import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {Clinic} from "@/content/clinics";

export async function GoeczeProfile({clinic, locale}: {clinic: Clinic; locale: string}) {
  const t = await getTranslations("goecze");
  const seo = await getTranslations("seo");

  return <>
    <Breadcrumbs locale={locale} items={[
      {name: seo("home"), path: ""},
      {name: t("network"), path: "/network"},
      {name: clinic.practitioner, path: `/network/${clinic.slug}`}
    ]} />
    <section className="alpstein-hero section-soft">
      <div className="container alpstein-hero-grid">
        <div className="alpstein-hero-copy">
          <span className="eyebrow">{clinic.name} · {clinic.city}</span>
          <h1 className="display">{clinic.practitioner}</h1>
          <p className="lead">{t("intro")}</p>
          <div className="button-row"><a className="button button-primary" href="#contact">{t("contact")}</a></div>
        </div>
        <Image src="/images/cellclinic-mitochondria.png" alt="" width={640} height={640} className="w-full h-auto" sizes="(max-width: 767px) 90vw, 540px" priority />
      </div>
    </section>
    <section className="section">
      <div className="container clinic-profile-copy">
        <SectionHeading title={t("background")} />
        <p className="lead">{t("bio")}</p>
      </div>
    </section>
    <section id="contact" className="section section-soft clinic-profile-contact">
      <div className="container clinic-profile-contact-card">
        <SectionHeading title={t("contact")} />
        <address>
          <strong>{clinic.practitioner}</strong>
          <span>{clinic.address}</span>
          <a href={`tel:${clinic.phone?.replaceAll(" ", "")}`}>{clinic.phone}</a>
          <a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>
          <a href={clinic.website}>{t("website")}</a>
        </address>
      </div>
    </section>
  </>;
}
