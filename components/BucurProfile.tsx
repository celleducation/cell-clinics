import Image from "next/image";
import {ArrowLeft, ArrowUpRight, Phone} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {bucurCopy} from "@/content/bucur";
import type {Clinic} from "@/content/clinics";
import {jsonLd, SITE_URL} from "@/lib/seo";

export function BucurProfile({locale, clinic}: {locale: string; clinic: Clinic}) {
  const c = bucurCopy[locale as keyof typeof bucurCopy] ?? bucurCopy.de;
  const actions = <><a className="button button-primary" href="tel:+497219579280"><Phone size={16} aria-hidden="true" />{c.book}</a><a className="button button-secondary" href={clinic.website} target="_blank" rel="noopener noreferrer">{c.website}<ArrowUpRight size={16} aria-hidden="true" /></a></>;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({"@context": "https://schema.org", "@type": "Dentist", name: clinic.name, url: `${SITE_URL}/${locale}/network/${clinic.slug}`, image: `${SITE_URL}/clinics/bucur/portrait.webp`, telephone: clinic.phone, email: clinic.contactEmail, sameAs: clinic.website, address: {"@type": "PostalAddress", streetAddress: "Nikolaus-Lenau-Str. 11", postalCode: "76199", addressLocality: "Karlsruhe", addressCountry: "DE"}})}} />
    <section className="alpstein-hero section-soft bucur-profile"><div className="container">
      <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} aria-hidden="true" />{c.back}</Link>
      <div className="bucur-hero-grid"><div><span className="eyebrow">Praxisklinik Bucur · Karlsruhe-Rüppurr</span><h1 className="display">Doctor medic<br />Elena Bucur</h1><p className="lead">{c.intro}</p><div className="button-row">{actions}</div></div><Image className="bucur-portrait" src="/clinics/bucur/portrait.webp" alt="Doctor medic Elena Bucur" width={850} height={1166} sizes="(max-width:767px) 85vw, 360px" priority /></div>
    </div></section>
    <section className="section"><div className="container bucur-introduction bucur-introduction-visual"><div><SectionHeading eyebrow={c.label} title={c.heading} /><p className="lead">{c.about}</p></div><div className="bucur-cell-art" aria-hidden="true"><Image src="/images/cell-science/membrane-transport-transparent.png" alt="" width={1651} height={953} sizes="(max-width:767px) 80vw, 30vw" /></div></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow={c.focusLabel} title={c.focusTitle} /><div className="bucur-focus-grid">{c.topics.map(([title, body], i) => <article key={title}><span className="bucur-index" aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><p className="bucur-additional">{c.additional}</p></div></section>
    <section className="section"><div className="container"><div className="bucur-practice-intro"><Image src="/clinics/bucur/reception.webp" alt={c.captions[0]} width={1400} height={933} sizes="(max-width:767px) 90vw, 52vw" /><div><SectionHeading eyebrow={c.roomsLabel} title={c.roomsTitle} /><p>{c.rooms}</p></div></div><div className="bucur-gallery">{["precision", "treatment-room"].map((file, i) => <figure key={file}><Image src={`/clinics/bucur/${file}.webp`} alt={c.captions[i + 1]} width={1100} height={733} sizes="(max-width:767px) 90vw, 45vw" /><figcaption>{c.captions[i + 1]}</figcaption></figure>)}</div></div></section>
    <section className="section bucur-network-section"><div className="container bucur-network bucur-network-visual"><div className="bucur-network-art" aria-hidden="true"><Image src="/images/cellclinic-network.png" alt="" width={1672} height={941} sizes="(max-width:767px) 90vw, 42vw" /></div><div><SectionHeading eyebrow={c.networkLabel} title={c.networkTitle} /><p>{c.network}</p></div></div></section>
    <section className="section clinic-profile-contact"><div className="container clinic-profile-contact-card"><div><span className="eyebrow">Praxisklinik Bucur</span><h2 className="section-title">{c.contactTitle}</h2><p>{c.contact}</p></div><address><strong>Doctor medic Elena Bucur</strong><p>{clinic.address}</p><a href="tel:+497219579280">{clinic.phone}</a><a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>{actions}</address></div></section>
  </>;
}
