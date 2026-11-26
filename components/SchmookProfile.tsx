import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import {ClinicProfileLabel} from "@/components/ClinicProfileLabel";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {schmookCopy} from "@/content/schmook";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";
import styles from "./SchmookProfile.module.css";

const imageRoot = "/clinics/claudia-schmook";
const gallery = ["consultation", "desk", "treatment", "ihht"];

export function SchmookProfile({clinic, locale}: {clinic: Clinic; locale: string}) {
  const c = schmookCopy[locale as keyof typeof schmookCopy];
  const phone = clinic.phone?.replaceAll(" ", "");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: clinic.name,
        url: `${SITE_URL}/${locale}/network/${clinic.slug}`,
        image: `${SITE_URL}${imageRoot}/portrait.webp`,
        telephone: clinic.phone,
        email: clinic.contactEmail,
        sameAs: clinic.website,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Altenhainer Straße 21",
          postalCode: "65812",
          addressLocality: "Bad Soden am Taunus",
          addressCountry: "DE"
        }
      })}} />
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <ClinicProfileLabel clinic={clinic} locale={locale} />
            <h1 className="display">Claudia Schmook</h1>
            <p className="lead">{c.intro}</p>
            <div className="button-row">
              <a className="button button-primary button-lg" href="#contact">{c.book}</a>
              <a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">
                {c.website}<ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <Image className={styles.portrait} src={`${imageRoot}/portrait.webp`} alt={c.portraitAlt} width={1280} height={852} sizes="(max-width: 800px) 92vw, 50vw" priority />
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.aboutGrid}`}>
          <SectionHeading title={c.aboutTitle} />
          <div>{c.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading title={c.focusTitle} />
          <p className={styles.intro}>{c.focusIntro}</p>
          <div className={styles.cards}>
            {c.topics.map(([title, body]) => (
              <article className={styles.card} key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.detailsGrid}`}>
          <div className={styles.card}>
            <SectionHeading title={c.servicesTitle} />
            <ul className={styles.services}>{c.services.map(service => <li key={service}>{service}</li>)}</ul>
          </div>
          <div className={styles.card}>
            <SectionHeading title={c.approachTitle} />
            <p>{c.approach}</p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading title={c.galleryTitle} />
          <div className={styles.gallery}>
            {gallery.map((name, index) => (
              <Image key={name} src={`${imageRoot}/${name}.webp`} alt={c.galleryAlts[index]} width={1200} height={1600} sizes="(max-width: 600px) 92vw, (max-width: 1000px) 45vw, 280px" />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.visitGrid}`}>
          <Image className={styles.exterior} src={`${imageRoot}/exterior.webp`} alt={c.exteriorAlt} width={1400} height={1050} sizes="(max-width: 800px) 92vw, 45vw" />
          <div>
            <SectionHeading title={c.hoursTitle} />
            <p>{c.hours}</p>
            <p>{c.languages}</p>
            <p>{clinic.address}</p>
          </div>
        </div>
      </section>
      <section id="contact" className="section clinic-profile-contact">
        <div className="container clinic-profile-contact-card">
          <div>
            <h2 className="section-title">{c.contactTitle}</h2>
            <p>{c.contactBody}</p>
          </div>
          <address>
            <strong>{clinic.name}</strong>
            <span>{clinic.address}</span>
            <div className="partner-contact-actions">
              <a className="button button-secondary" href={`tel:${phone}`}>{clinic.phone}</a>
              <a className="button button-secondary" href={`mailto:${clinic.contactEmail}`}>{c.book}</a>
              <a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>
          </address>
        </div>
      </section>
    </>
  );
}
