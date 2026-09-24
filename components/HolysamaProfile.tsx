import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {holysamaCopy} from "@/content/holysama";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

const topicImages = ["/images/cellclinic-mitochondria.png", "/images/cellclinic-genetics.png", "/images/cellclinic-therapy.png"];

export function HolysamaProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = holysamaCopy[locale as keyof typeof holysamaCopy] ?? holysamaCopy.de;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({"@context": "https://schema.org", "@type": "MedicalClinic", name: "Holysama", url: `${SITE_URL}/${locale}/network/${clinic.slug}`, image: `${SITE_URL}/clinics/holysama/portrait.webp`, telephone: clinic.phone, email: clinic.contactEmail, sameAs: clinic.website, address: {"@type": "PostalAddress", streetAddress: "Schillerplatz 3", postalCode: "73033", addressLocality: "Göppingen", addressCountry: "DE"}})}} />
    <section className="alpstein-hero section-soft"><div className="container">
      <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
      <div className="alpstein-hero-grid">
        <div className="alpstein-hero-copy"><span className="eyebrow">{c.label}</span><h1 className="display holysama-name">Dr. med. Julia<br />Napolitano Gil</h1><p className="lead">{c.intro}</p><div className="button-row"><a className="button button-primary" href={`mailto:${clinic.contactEmail}`}>{c.book}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
        <Image className="holysama-portrait" src="/clinics/holysama/portrait.webp" alt="Dr. med. Julia Napolitano Gil" width={1100} height={1100} sizes="(max-width:767px) 90vw, 40vw" priority />
      </div>
    </div></section>
    <section className="section"><div className="container holysama-about"><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow={c.focusLabel} title={c.focusTitle} /><div className="martin-topics">{c.topics.map(([title, body], i) => <article key={title}><div className="martin-topic-art"><Image src={topicImages[i]} alt="" fill sizes="(max-width:767px) 90vw, 30vw" /></div><div className="martin-topic-copy"><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="health-point-note">{c.note}</p></div></section>
    <section className="section"><div className="container holysama-details"><article><span className="eyebrow">{c.networkLabel}</span><h2 className="section-title">{c.networkTitle}</h2><p>{c.networkBody}</p></article><article><h2 className="section-title">{c.visitTitle}</h2><p>{c.visitBody}</p><a className="clinic-back-link" href="https://holysama.de/wp-content/uploads/2023/05/Holysama_Behandlungsablauf.pdf" target="_blank" rel="noopener noreferrer">{c.process}<ArrowUpRight size={16} aria-hidden="true" /></a></article></div></section>
    <section className="section clinic-profile-contact"><div className="container clinic-profile-contact-card"><div><span className="eyebrow">Holysama</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><address><strong>{clinic.practitioner}</strong><p>{clinic.address}</p><a href="tel:+4915156196738">{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a><a className="button button-primary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-secondary" href="https://holysama.de/wp-content/uploads/2024/01/Holysama_Anreise_GP.pdf" target="_blank" rel="noopener noreferrer">{c.directions}<ArrowUpRight size={16} aria-hidden="true" /></a></address><small>{c.source}</small></div></section>
  </>;
}
