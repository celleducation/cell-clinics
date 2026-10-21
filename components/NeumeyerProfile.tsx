import Image from "next/image";
import {ArrowLeft, ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {neumeyerCopy} from "@/content/neumeyer";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

export function NeumeyerProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = neumeyerCopy[locale as keyof typeof neumeyerCopy] ?? neumeyerCopy.de;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
      "@context": "https://schema.org", "@type": "Dentist", name: clinic.name,
      url: `${SITE_URL}/${locale}/network/${clinic.slug}`, sameAs: clinic.website,
      telephone: clinic.phone, email: clinic.contactEmail,
      image: `${SITE_URL}/clinics/neumeyer/team.webp`,
      address: {"@type": "PostalAddress", streetAddress: "Leminger Straße 10", postalCode: "93458", addressLocality: "Eschlkam", addressCountry: "DE"},
      openingHoursSpecification: [["08:00", "13:00"], ["14:00", "18:00"]].map(([opens, closes]) => ({"@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens, closes}))
    })}} />
    <Breadcrumbs locale={locale} items={[{name: c.home, path: ""}, {name: c.back, path: "/network"}, {name: clinic.name, path: `/network/${clinic.slug}`}]} />
    <section className="alpstein-hero section-soft neumeyer-hero"><div className="container">
      <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
      <div className="alpstein-hero-grid">
        <div className="alpstein-hero-copy"><span className="eyebrow">{c.label}</span><h1 className="display">Dr. Neumeyer<br />&amp; Partner</h1><p className="lead">{c.intro}</p><div className="button-row"><a className="button button-primary" href="#contact">{c.contact}</a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
        <div className="neumeyer-hero-media"><Image src="/clinics/neumeyer/team.webp" alt={c.teamAlt} width={1600} height={1067} sizes="(max-width: 767px) 90vw, 600px" priority /><div className="neumeyer-logo"><Image src="/clinics/neumeyer/logo.webp" alt="Dr. Stefan Neumeyer · MUDr. (Univ. Prag) Jana Vanicky · Dr. Stefanie Neumeyer-Wühr" width={756} height={361} sizes="280px" /></div></div>
      </div>
    </div></section>
    <section className="section"><div className="container maak-about"><div><SectionHeading eyebrow={c.aboutLabel} title={c.aboutTitle} /><p className="lead">{c.about}</p></div><div className="maak-focus"><h2 className="section-title">{c.focusTitle}</h2><ul>{c.focus.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section section-soft"><div className="container neumeyer-bio"><div><SectionHeading eyebrow={c.bioLabel} title="Dr. Stefanie Neumeyer-Wühr" /><p className="neumeyer-qualification">{c.qualification}</p><p className="lead">{c.bio}</p><p>{c.languages}</p></div><aside><SectionHeading eyebrow={c.networkLabel} title={c.networkTitle} /><p>{c.network}</p></aside></div></section>
    <section className="section"><div className="container"><SectionHeading title={c.gallery} /><div className="neumeyer-gallery">{["empfang", "praxis", "flur"].map((name, i) => <figure key={name}><Image src={`/clinics/neumeyer/${name}.webp`} alt={c.imageAlts[i]} width={1600} height={1067} sizes="(max-width: 767px) 90vw, 40vw" /><figcaption>{c.imageAlts[i]}</figcaption></figure>)}</div></div></section>
    <section className="section section-alt clinic-profile-contact" id="contact"><div className="container clinic-profile-contact-card"><div><SectionHeading eyebrow={c.contact} title={c.contactTitle} /><p>{c.contactBody}</p><h3>{c.hours}</h3><p>{c.weekdays}<br />08:00–13:00 · 14:00–18:00</p></div><address><strong>{clinic.name}</strong><p>{clinic.address}</p><a href="tel:+49994894090">{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a><div className="button-row"><a className="button button-primary" href="tel:+49994894090">{c.call}</a><a className="button button-secondary" href={`mailto:${clinic.contactEmail}`}>{c.email}</a></div><a href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website} ↗</a></address><div className="maak-social"><a href="https://www.instagram.com/praxis_neumeyer_und_partner" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/DresNeumeyer/" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div></div></section>
  </>;
}
