import styles from "./GoeczeProfile.module.css";
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
    <section className={styles.hero}>
      <div className={`container ${styles.spread}`}>
        <div>
          <span className="eyebrow">{t("role")}</span>
          <h1 className={styles.name}><small>Priv.-Doz. Dr. med.</small>Ivan Göcze</h1>
          <p className="lead">{t("intro")}</p>
          <a className="button button-primary" href="#contact">{t("contact")}</a>
        </div>
        <Image className={styles.portrait} src="/clinics/ivan-goecze/portrait.webp" width={850} height={955} alt={clinic.practitioner} sizes="(max-width: 740px) 90vw, 420px" priority />
      </div>
    </section>
    <section className={styles.story}>
      <div className={`container ${styles.spread}`}>
        <Image className={styles.reception} src="/clinics/ivan-goecze/praxis.webp" width={1024} height={576} alt={t("reception")} sizes="(max-width: 740px) 90vw, 540px" />
        <div><h2 className="section-title">{t("background")}</h2><p>{t("bio")}</p><p>{t("research")}</p></div>
      </div>
    </section>
    <section className={`section-soft ${styles.services}`}>
      <div className="container">
        <h2 className="section-title">{t("practice")}</h2>
        <div className={styles.columns}>{(["care","tests","prevention"] as const).map(key =>
          <article key={key}><h3>{t(key)}</h3><p>{t(`${key}Text`)}</p></article>
        )}</div>
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
