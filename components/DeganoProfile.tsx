import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {deganoCopy} from "@/content/degano";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

export function DeganoProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = deganoCopy[locale as keyof typeof deganoCopy] ?? deganoCopy.de;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
      "@context": "https://schema.org", "@type": "Dentist", name: clinic.name,
      url: `${SITE_URL}/${locale}/network/${clinic.slug}`, sameAs: clinic.website,
      telephone: clinic.phone, email: clinic.contactEmail, image: `${SITE_URL}/clinics/degano/team.webp`,
      address: {"@type": "PostalAddress", streetAddress: "Calle Arquitecto Francisco Casas 17, Local B23 + B24", postalCode: "07181", addressLocality: "Bendinat", addressRegion: "Mallorca", addressCountry: "ES"}
    })}} />
    <Breadcrumbs locale={locale} items={[{name: c.home, path: ""}, {name: c.back, path: "/network"}, {name: clinic.name, path: `/network/${clinic.slug}`}]} />
    <section className="alpstein-hero section-soft"><div className="container">
      <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
      <div className="alpstein-hero-grid">
        <div className="alpstein-hero-copy"><span className="eyebrow">{c.label}</span><h1 className="display">DentaCare Mallorca<br /><span>Dr. Peter Degano</span></h1><p className="lead">{c.intro}</p><div className="button-row"><a className="button button-primary" href="#contact">{c.contact}</a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
        <div className="neumeyer-hero-media"><Image src="/clinics/degano/team.webp" alt={c.teamAlt} width={1600} height={900} sizes="(max-width: 767px) 90vw, 600px" priority /></div>
      </div>
    </div></section>
    <section className="section"><div className="container maak-about"><div><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div><div className="maak-focus"><h2 className="section-title">{c.focusTitle}</h2><ul>{c.focus.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section section-soft"><div className="container neumeyer-bio"><div><SectionHeading eyebrow={c.bioLabel} title={c.bioTitle} /><p className="lead">{c.bio}</p></div><aside><h2 className="section-title">{c.planningTitle}</h2><p>{c.planning}</p></aside></div></section>
    <section className="section"><div className="container"><SectionHeading title={c.gallery} /><div className="neumeyer-gallery">{["reception", "treatment", "diagnostics"].map((name, i) => <figure key={name}><Image src={`/clinics/degano/${name}.webp`} alt={c.imageAlts[i]} width={800} height={600} sizes="(max-width: 767px) 90vw, 50vw" /></figure>)}</div></div></section>
    <section className="section section-alt clinic-profile-contact" id="contact"><div className="container clinic-profile-contact-card"><div><SectionHeading eyebrow={c.contact} title={c.contactTitle} /><p>{c.contactBody}</p></div><address><strong>{clinic.name}</strong><p>{clinic.address}</p><a href={`tel:${clinic.phone?.replaceAll(" ", "")}`}>{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a><a className="button button-primary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></address><small>{c.source}</small></div></section>
  </>;
}
