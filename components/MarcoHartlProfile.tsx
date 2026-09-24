import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {marcoHartlCopy} from "@/content/marco-hartl";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

const topicImages = ["/images/cellclinic-therapy.png", "/images/cellclinic-mitochondria.png", "/images/cellclinic-genetics.png"];

export function MarcoHartlProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = marcoHartlCopy[locale as keyof typeof marcoHartlCopy] ?? marcoHartlCopy.de;
  const actions = <><a className="button button-primary" href="https://one-dr-hartl.de/kontakt/" target="_blank" rel="noopener noreferrer">{c.book}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></>;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({"@context": "https://schema.org", "@type": "MedicalClinic", name: "ONE by Dr. Marco Hartl", url: `${SITE_URL}/${locale}/network/${clinic.slug}`, image: `${SITE_URL}/clinics/marco-hartl/portrait.webp`, email: clinic.contactEmail, sameAs: clinic.website, address: {"@type": "PostalAddress", streetAddress: "Fritz-Fend-Straße 4", postalCode: "93047", addressLocality: "Regensburg", addressCountry: "DE"}})}} />
    <section className="alpstein-hero section-soft"><div className="container">
      <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
      <div className="alpstein-hero-grid">
        <div className="alpstein-hero-copy"><span className="eyebrow">ONE · Regensburg</span><h1 className="display">Dr. med.<br />Marco Hartl</h1><p className="lead">{c.intro}</p><div className="button-row">{actions}</div></div>
        <Image className="hartl-portrait" src="/clinics/marco-hartl/portrait.webp" alt="Dr. med. Marco Hartl" width={719} height={1079} sizes="(max-width:767px) 90vw, 400px" priority />
      </div>
    </div></section>
    <section className="section"><div className="container hartl-about"><Image className="hartl-logo" src="/clinics/marco-hartl/logo.webp" alt="ONE by Dr. Marco Hartl" width={354} height={230} sizes="180px" /><div><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow={c.focusLabel} title={c.focusTitle} /><div className="martin-topics">{c.topics.map(([title, body], i) => <article key={title}><div className="martin-topic-art"><Image src={topicImages[i]} alt="" fill sizes="(max-width:767px) 90vw, 30vw" /></div><div className="martin-topic-copy"><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="health-point-note">{c.note}</p></div></section>
    <section className="section"><div className="container">
      <div className="hartl-visit"><SectionHeading eyebrow={c.visitLabel} title={c.visitTitle} /><p className="lead">{c.visitBody}</p><a className="button button-secondary" href="https://one-dr-hartl.de/faq/" target="_blank" rel="noopener noreferrer">{c.faq}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <div className="hartl-gallery" role="group" aria-label={c.galleryTitle}><figure><Image src="/clinics/marco-hartl/practice.webp" alt={c.practiceAlt} width={1400} height={932} sizes="(max-width:767px) 90vw, 50vw" /><figcaption>{c.practiceCaption}</figcaption></figure><figure><Image src="/clinics/marco-hartl/entrance.webp" alt={c.entranceAlt} width={1200} height={800} sizes="(max-width:767px) 90vw, 40vw" /><figcaption>{c.entranceCaption}</figcaption></figure></div>
    </div></section>
    <section className="section clinic-profile-contact"><div className="container clinic-profile-contact-card"><div><span className="eyebrow">ONE by Dr. Marco Hartl</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><address><strong>{clinic.practitioner}</strong><p>{clinic.address}</p><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>{actions}</address></div></section>
  </>;
}
