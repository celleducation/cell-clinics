import {ClinicProfileLabel} from "@/components/ClinicProfileLabel";
import styles from "./GoeczeProfile.module.css";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {Clinic} from "@/content/clinics";

export async function GoeczeProfile({clinic, locale}: {clinic: Clinic; locale: string}) {
  const t = await getTranslations("goecze");

  return <>
    <section className={styles.hero}>
      <div className={`container ${styles.spread}`}>
        <div>
          <ClinicProfileLabel clinic={clinic} locale={locale} />
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
    <section className={styles.services}>
      <div className="container">
        <h2 className="section-title">{t("themes")}</h2>
        <p className={styles.introduction}>{t("introduction")}</p>
        <div className={styles.columns}>
          {(["health", "longevity", "performance"] as const).map(topic =>
            <article key={topic}>
              <Image className={styles.topicImage} src={`/clinics/ivan-goecze/${topic}.webp`} width={640} height={360} sizes="(max-width: 740px) 90vw, 33vw" alt="" />
              <h3>{t(topic)}</h3>
              <p>{t(`${topic}Text`)}</p>
            </article>
          )}
        </div>
      </div>
    </section>
    <section className={`section-soft ${styles.services}`}>
      <div className="container">
        <h2 className="section-title">{t("gallery")}</h2>
        <div className={styles.rooms}>
          {(["waiting", "consultation"] as const).map(room =>
            <Image key={room} className={styles.roomImage} src={`/clinics/ivan-goecze/${room}.webp`} width={960} height={540} sizes="(max-width: 740px) 90vw, 48vw" alt={t(room)} />
          )}
        </div>
      </div>
    </section>
    <section id="contact" className="section section-soft clinic-profile-contact">
      <div className="container clinic-profile-contact-card">
        <div><SectionHeading title={t("contact")} /><h3>{t("hours")}</h3><p>{t("mornings")}<br />{t("evenings")}</p></div>
        <address>
          <strong>{clinic.practitioner}</strong>
          <span>{clinic.address}</span>
          <div className="partner-contact-actions"><a className="button button-secondary" href={`tel:${clinic.phone?.replaceAll(" ", "")}`}>{clinic.phone}</a>
          <a className="button button-secondary" href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>
          <a className="button button-secondary" href={clinic.website}>{t("website")} ↗</a></div>
        </address>
      </div>
    </section>
  </>;
}
