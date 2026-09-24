import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {marcStrackeCopy} from "@/content/marc-stracke";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";
import {StrackeDiagnostics} from "@/components/PartnerProfileDetails";

const booking = "https://www.doctolib.de/allgemeinmedizin/luebeck/marc-stracke";
const topicImages = ["/images/cellclinic-mitochondria.png", "/images/cellclinic-genetics.png", "/images/cellclinic-therapy.png"];
export function MarcStrackeProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = marcStrackeCopy[locale as keyof typeof marcStrackeCopy] ?? marcStrackeCopy.de;
  const actions = <><a className="button button-primary" href={booking} target="_blank" rel="noopener noreferrer">{c.book}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></>;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({"@context": "https://schema.org", "@type": "MedicalClinic", name: "Privatpraxis Dr. Marc Stracke", url: `${SITE_URL}/${locale}/network/${clinic.slug}`, image: `${SITE_URL}/clinics/marc-stracke/portrait.webp`, telephone: clinic.phone, email: clinic.contactEmail, sameAs: clinic.website, address: {"@type": "PostalAddress", streetAddress: "Meesenring 1", postalCode: "23566", addressLocality: "Lübeck", addressCountry: "DE"}})}} />
    <section className="alpstein-hero section-soft"><div className="container"><Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link><div className="alpstein-hero-grid"><div className="alpstein-hero-copy"><span className="eyebrow">Lübeck · Schleswig-Holstein</span><h1 className="display">Dr. med.<br />Marc Stracke</h1><p className="lead">{c.intro}</p><div className="button-row">{actions}</div></div><Image className="stracke-portrait" src="/clinics/marc-stracke/portrait.webp" alt="Dr. med. Marc Stracke" width={1000} height={1061} sizes="(max-width:767px) 90vw, 40vw" priority /></div></div></section>
    <section className="section"><div className="container stracke-about"><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow={c.focusLabel} title={c.focusTitle} /><div className="martin-topics">{c.topics.map(([title, body], i) => <article key={title}><div className="martin-topic-art"><Image src={topicImages[i]} alt="" fill sizes="(max-width:767px) 90vw, 30vw" /></div><div className="martin-topic-copy"><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="health-point-note">{c.note}</p></div></section>
    <StrackeDiagnostics locale={locale} />
    <section className="section"><div className="container stracke-visit"><Image src="/clinics/marc-stracke/practice.webp" alt={c.practiceAlt} width={950} height={633} sizes="(max-width:767px) 90vw, 45vw" /><div><SectionHeading eyebrow={c.visitLabel} title={c.visitTitle} /><p>{c.visitBody}</p><a className="button button-secondary" href="https://praxis-dr-stracke.de/neupatienten/" target="_blank" rel="noopener noreferrer">{c.process}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
    <section className="section clinic-profile-contact"><div className="container clinic-profile-contact-card"><div><span className="eyebrow">Dr. Marc Stracke · Lübeck</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><address><strong>{clinic.practitioner}</strong><p>{clinic.address}</p><a href="tel:+494514094099">{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>{actions}</address></div></section>
  </>;
}
