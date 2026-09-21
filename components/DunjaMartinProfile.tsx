import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {dunjaMartinCopy} from "@/content/dunja-martin";
import type {Clinic} from "@/content/clinics";
import {jsonLd} from "@/lib/seo";

const booking = "https://calendly.com/drdunjamartin/erstgesprach";
export function DunjaMartinProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = dunjaMartinCopy[locale as keyof typeof dunjaMartinCopy] ?? dunjaMartinCopy.de;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({"@context":"https://schema.org","@type":"Person",name:clinic.name,jobTitle:"Dr. med. · Neurologie",url:clinic.website,email:clinic.contactEmail,telephone:clinic.phone,image:"https://cell-clinics.com/clinics/dunja-martin/portrait.webp"})}} />
    <section className="alpstein-hero section-soft">
      <div className="container">
        <Link className="clinic-back-link" href="/network"><ArrowLeft size={16}/>{c.back}</Link>
        <div className="alpstein-hero-grid">
          <div className="alpstein-hero-copy"><span className="eyebrow">{c.label}</span><h1 className="display">Dr. med.<br/>Dunja Martin</h1><p className="clinic-profile-location">{c.headline}</p><p className="lead">{c.intro}</p><div className="button-row"><a className="button button-primary" href={booking} target="_blank" rel="noreferrer">{c.book}<ArrowUpRight size={16}/></a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noreferrer">{c.website}</a></div></div>
          <Image className="martin-hero-portrait" src="/clinics/dunja-martin/portrait.webp" alt={c.portraitAlt} width={1000} height={1250} sizes="(max-width:767px) 100vw, 45vw" priority/>
        </div>
        <div className="clinic-fact-strip">{c.facts.map((f,i)=><div key={f}><span>0{i+1}</span><strong>{f}</strong></div>)}</div>
      </div>
    </section>
    <section className="section"><div className="container health-point-bio"><Image className="health-point-portrait" src="/clinics/dunja-martin/outdoor.webp" alt={c.secondAlt} width={1000} height={1233} sizes="(max-width:767px) 100vw, 35vw"/><div><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle}/><p className="lead">{c.about}</p></div></div></section>
    <section className="section section-alt"><div className="container"><SectionHeading eyebrow={c.offerLabel} title={c.offerTitle}/><div className="martin-offers">{c.offers.map(([title,body],i)=><article className="clinic-area-card" key={title}><span className="eyebrow">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow={c.focusLabel} title={c.focusTitle}/><div className="martin-topics">{c.topics.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><p className="health-point-note">{c.note}</p></div></section>
    <section className="section clinic-profile-contact"><div className="container clinic-profile-contact-card"><div><span className="eyebrow">Dr. med. Dunja Martin</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contactBody}</p><div className="clinic-contact-hours"><h3>{c.location}</h3><p>{clinic.address}</p><p>{c.locationNote}</p></div></div><address><strong>{clinic.name}</strong><a href="tel:+4915233849922">{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a><a className="button button-primary" href={booking} target="_blank" rel="noreferrer">{c.book}<ArrowUpRight size={16}/></a><a href={clinic.website} target="_blank" rel="noreferrer">{c.website}</a></address><small>{c.source}</small></div></section>
  </>;
}
