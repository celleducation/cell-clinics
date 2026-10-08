import {ArrowLeft, ArrowUpRight} from "lucide-react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {Clinic} from "@/content/clinics";
import {schmehlCopy} from "@/content/reinhard-schmehl";
import {jsonLd, SITE_URL} from "@/lib/seo";

export function SchmehlProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = schmehlCopy[locale as keyof typeof schmehlCopy] ?? schmehlCopy.de;
  const photoAlt = locale === "de" ? "Innenansicht der Privatpraxis Reinhard Schmehl" : locale === "es" ? "Interior de la consulta privada Reinhard Schmehl" : "Interior of Reinhard Schmehl’s private practice";
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
      "@context": "https://schema.org", "@type": "MedicalClinic", name: clinic.name,
      url: `${SITE_URL}/${locale}/network/${clinic.slug}`, sameAs: clinic.website,
      telephone: clinic.phone, email: clinic.contactEmail,
      address: {"@type": "PostalAddress", streetAddress: "Hinteregglburg 2", postalCode: "85560", addressLocality: "Ebersberg", addressCountry: "DE"}
    })}} />
    <Breadcrumbs locale={locale} items={[{name: c.home, path: ""}, {name: c.back, path: "/network"}, {name: clinic.name, path: `/network/${clinic.slug}`}]} />
    <section className="alpstein-hero section-soft">
      <div className="container">
        <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
        <div className="alpstein-hero-grid"><div className="alpstein-hero-copy">
          <span className="eyebrow">{c.label}</span>
          <h1 className="display">Privatpraxis<br />Reinhard Schmehl</h1>
          <p className="clinic-profile-location">Hinteregglburg · Ebersberg</p>
          <p className="lead">{c.intro}</p>
          <div className="button-row">
            <a className="button button-primary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="button button-secondary" href="#contact">{c.contact}</a>
          </div>
        </div>
        <Image className="health-point-hero-photo" src="/clinics/reinhard-schmehl/interior-7.jpg" alt={photoAlt} width={600} height={400} sizes="(max-width: 767px) 100vw, 50vw" priority /></div>
        <div className="clinic-fact-strip">{c.facts.map((fact, i) => <div key={fact}><span>0{i + 1}</span><strong>{fact}</strong></div>)}</div>
      </div>
    </section>
    <section className="section"><div className="container">
      <SectionHeading eyebrow={c.network} title={c.aboutTitle} />
      <p className="lead">{c.about}</p>
      <div className="alpstein-hero-grid">{[1, 3].map(number => <Image key={number} className="health-point-hero-photo" src={`/clinics/reinhard-schmehl/interior-${number}.jpg`} alt={`${photoAlt} – ${number === 1 ? 2 : 3}`} width={600} height={400} sizes="(max-width: 767px) 100vw, 50vw" />)}</div>
    </div></section>
    <section className="section section-alt clinic-profile-contact" id="contact">
      <div className="container clinic-profile-contact-card">
        <div><span className="eyebrow">{c.contact}</span><h2 className="section-title">{c.directions}</h2><p>{c.directionsBody}</p></div>
        <address><strong>{clinic.name}</strong><p>{clinic.address}</p>
          <a href={`tel:${clinic.phone?.replaceAll(" ", "")}`}>{clinic.phone}</a>
          <a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>
          <a className="button button-primary" href={`mailto:${clinic.contactEmail}`}>{c.email}</a>
          <a href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </address>
        <small>{c.source}</small>
      </div>
    </section>
  </>;
}
