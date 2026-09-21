import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {healthPointCopy} from "@/content/health-point";
import type {Clinic} from "@/content/clinics";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {jsonLd, ORGANIZATION_ID} from "@/lib/seo";

export function HealthPointProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = healthPointCopy[locale as keyof typeof healthPointCopy] ?? healthPointCopy.de;
  const root = "/clinics/health-point/";
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
      "@context": "https://schema.org", "@type": "MedicalClinic", name: clinic.name,
      "@id": `https://cell-clinics.com/${locale}/network/${clinic.slug}#clinic`,
      url: clinic.website, telephone: clinic.phone, email: clinic.contactEmail,
      image: `https://cell-clinics.com${root}reception.webp`,
      address: {"@type": "PostalAddress", streetAddress: "Rütihofstrasse 1", postalCode: "9052", addressLocality: "Niederteufen", addressRegion: "Appenzell Ausserrhoden", addressCountry: "CH"},
      geo: {"@type": "GeoCoordinates", latitude: clinic.coordinates.lat, longitude: clinic.coordinates.lng},
      memberOf: {"@id": ORGANIZATION_ID},
      openingHoursSpecification: [
        {"@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:30", closes: "17:00"},
        {"@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:30", closes: "12:00"}
      ]
    })}} />
    <section className="alpstein-hero section-soft health-point-profile">
      <div className="container">
        <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} />{c.back}</Link>
        <div className="alpstein-hero-grid">
          <div className="alpstein-hero-copy">
            <span className="eyebrow">{c.label}</span>
            <h1 className="display">Health Point<br />Dr. Klein</h1>
            <p className="clinic-profile-location">{c.location}</p>
            <p className="lead">{c.intro}</p>
            <div className="button-row">
              <a className="button button-primary button-lg" href="#practice-contact">{c.contact}</a>
              <a className="button button-secondary" href={clinic.website} target="_blank" rel="noreferrer">{c.website}<ArrowUpRight size={16} /></a>
            </div>
          </div>
          <Image className="health-point-hero-photo" src={`${root}reception.webp`} alt={c.receptionAlt} width={1500} height={1000} sizes="(max-width: 767px) 100vw, 50vw" priority />
        </div>
        <div className="clinic-fact-strip">{c.facts.map((fact,i)=><div key={fact}><span>{String(i+1).padStart(2,"0")}</span><strong>{fact}</strong></div>)}</div>
      </div>
    </section>
    <section className="section health-point-profile">
      <div className="container health-point-bio">
        <Image className="health-point-portrait" src={`${root}portrait.webp`} alt={c.portraitAlt} width={1000} height={1500} sizes="(max-width: 767px) 100vw, 35vw" />
        <div><SectionHeading eyebrow={c.bioLabel} title={c.bioTitle} /><p className="lead">{c.bio}</p><p>{c.approach}</p></div>
      </div>
    </section>
    <section className="section section-alt">
      <div className="container">
        <SectionHeading eyebrow={c.areasLabel} title={c.areasTitle} />
        <div className="clinic-area-grid">{c.areas.map(([title,body],i)=><article className="clinic-area-card" key={title}><span className="eyebrow">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <p className="health-point-note">{c.indication}</p>
      </div>
    </section>
    <section className="section health-point-profile">
      <div className="container health-point-team">
        <SectionHeading eyebrow={c.teamLabel} title={c.teamTitle} intro={c.teamBody} />
        <Image src={`${root}team.webp`} alt={c.teamAlt} width={1500} height={1000} sizes="(max-width: 1248px) 100vw, 1200px" />
        <h2 className="section-title health-point-gallery-title">{c.galleryTitle}</h2>
        <div className="health-point-gallery">{["treatment", "infusion", "waiting"].map((name,i)=><Image key={name} src={`${root}${name}.webp`} alt={c.galleryAlts[i]} width={1500} height={1000} sizes="(max-width: 767px) 100vw, 33vw" />)}</div>
      </div>
    </section>
    <section className="clinic-network-context">
      <div className="container clinic-network-context-card"><SectionHeading eyebrow={c.networkLabel} title={c.networkTitle} intro={c.networkBody} /></div>
    </section>
    <section className="section clinic-profile-contact" id="practice-contact">
      <div className="container clinic-profile-contact-card">
        <div><span className="eyebrow">Health Point Dr. Klein AG</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contactBody}</p><h3>{c.hours}</h3><p>{c.weekdays}<br />{c.friday}</p><p>{c.office}</p></div>
        <address><strong>{clinic.name}</strong><span>{clinic.address}</span><a href="tel:+41718400346">{clinic.phone}</a><a href="mailto:info@healthpointag.ch">info@healthpointag.ch</a><a className="button button-primary" href={clinic.website} target="_blank" rel="noreferrer">{c.website}<ArrowUpRight size={16}/></a><strong>{c.referrals}</strong><a href="mailto:dr.klein@hin.ch">dr.klein@hin.ch</a></address>
        <small>{c.source}</small>
      </div>
    </section>
  </>;
}
