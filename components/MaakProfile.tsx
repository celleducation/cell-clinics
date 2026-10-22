import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {maakCopy} from "@/content/maak";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

export function MaakProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = maakCopy[locale as keyof typeof maakCopy] ?? maakCopy.de;
  const phone = clinic.phone?.replaceAll(" ", "");
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
      "@context": "https://schema.org", "@type": "Dentist", name: clinic.name,
      url: `${SITE_URL}/${locale}/network/${clinic.slug}`, sameAs: clinic.website,
      telephone: clinic.phone, email: clinic.contactEmail,
      address: {"@type": "PostalAddress", streetAddress: "Untere Bergstraße 12", postalCode: "49448", addressLocality: "Lemförde", addressCountry: "DE"},
      openingHoursSpecification: [
        {"@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "20:00"},
        {"@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "14:00"}
      ]
    })}} />
    <Breadcrumbs locale={locale} items={[{name: c.home, path: ""}, {name: c.back, path: "/network"}, {name: clinic.name, path: `/network/${clinic.slug}`}]} />
    <section className="alpstein-hero section-soft maak-hero">
      <div className="container">
        <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
        <div className="alpstein-hero-grid">
          <div className="alpstein-hero-copy">
            <span className="eyebrow">{c.label}</span>
            <h1 className="display">Dr. Michael Maak<br />&amp; Dr. Sabine Hopmann</h1>
            <p className="clinic-profile-location">{clinic.name}</p>
            <p className="lead">{c.intro}</p>
            <div className="button-row"><a className="button button-primary" href="#contact">{c.contact}</a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </div>
          <figure className="maak-team-photo"><Image src="/clinics/maak/maak-hopmann-team.jpg" alt="Dr. Sabine Hopmann & Dr. Michael Maak" width={1500} height={1000} sizes="(max-width: 767px) 90vw, 600px" priority /></figure>
        </div>
        <div className="clinic-fact-strip">{c.facts.map((fact, i) => <div key={fact}><span>0{i + 1}</span><strong>{fact}</strong></div>)}</div>
      </div>
    </section>
    <section className="section"><div className="container maak-about">
      <div><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div>
      <div className="maak-focus"><h2 className="section-title">{c.focusTitle}</h2><ul>{c.focus.map(item => <li key={item}>{item}</li>)}</ul></div>
    </div></section>
    <section className="section section-soft"><div className="container maak-network">
      <figure className="maak-art"><Image src="/clinics/maak/tooth-cellular.webp" alt={c.cellularAlt} width={1200} height={577} sizes="(max-width: 767px) 90vw, 560px" /><figcaption>{c.illustration}</figcaption></figure>
      <div><SectionHeading eyebrow={c.networkLabel} title={c.networkTitle} /><p className="lead">{c.network}</p></div>
    </div></section>
    <section className="section"><div className="container maak-bio"><SectionHeading eyebrow={c.bioLabel} title={c.bioTitle} /><p className="eyebrow">{c.profession}</p><p className="lead">{c.teamIntro}</p>
      <div className="maak-portraits">
        <figure><Image src="/clinics/maak/michael-maak-portrait.jpg" alt="Dr. Michael Maak" width={1500} height={1000} sizes="(max-width: 600px) 90vw, 460px" /><figcaption>Dr. Michael Maak</figcaption></figure>
        <figure><Image src="/clinics/maak/sabine-hopmann-portrait.jpg" alt="Dr. Sabine Hopmann" width={1500} height={1000} sizes="(max-width: 600px) 90vw, 460px" /><figcaption>Dr. Sabine Hopmann</figcaption></figure>
      </div>
      <h3>{c.bioHeading}</h3><p className="lead">{c.bio}</p></div></section>
    <section className="section section-alt clinic-profile-contact" id="contact"><div className="container clinic-profile-contact-card">
      <div><SectionHeading eyebrow={c.contact} title={c.contactTitle} /><p>{c.contactBody}</p><h3>{c.hours}</h3><dl className="maak-hours"><div><dt>{c.weekdays}</dt><dd>08:00–20:00</dd></div><div><dt>{c.friday}</dt><dd>08:00–14:00</dd></div></dl></div>
      <address><strong>{clinic.name}</strong><p>{clinic.address}</p><a href={`tel:${phone}`}>{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a><div className="button-row"><a className="button button-primary" href={`tel:${phone}`}>{c.call}</a><a className="button button-secondary" href={`mailto:${clinic.contactEmail}`}>{c.email}</a></div><a href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></address>
      <nav aria-label={c.social} className="maak-social"><a href="https://www.instagram.com/zahnarztpraxismaak/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/ZahnarztpraxisDr.Maak" target="_blank" rel="noopener noreferrer">Facebook ↗</a></nav>
      <small>{c.source}</small>
    </div></section>
  </>;
}
