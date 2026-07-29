import Image from "next/image";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {clinics, getClinic} from "@/content/clinics";
import {ButtonLink} from "@/components/ui/ButtonLink";

export function generateStaticParams() {
  return clinics.map(({slug}) => ({slug}));
}

export default async function ClinicPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "MedicalClinic"],
    name: clinic.name,
    address: {"@type": "PostalAddress", addressLocality: clinic.city, addressCountry: clinic.countryCode},
    medicalSpecialty: clinic.focus
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <section className="clinic-detail-hero section-soft">
        <div className="container clinic-detail-grid">
          <div>
            <span className="eyebrow">{clinic.modelClinic ? "Central model clinic · Powered by Cell Clinics" : "Partner clinic"}</span>
            <Image className="clinic-detail-logo" src="/clinics/alpstein/logo.webp" alt={clinic.name} width={400} height={180} />
            <h1 className="page-title">{clinic.name}</h1>
            <p className="lead">{clinic.city}, {clinic.country}</p>
            <p>{clinic.intro}</p>
            <ButtonLink href="/partnerships/apply">Explore the partnership model</ButtonLink>
          </div>
          <div className="clinic-detail-gallery">
            {clinic.images.map((image, index) => <Image key={image} src={image} alt={`${clinic.name} ${index + 1}`} width={900} height={720} />)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container clinic-evidence">
          <div className="chip-list clinic-focus-list">
            {["Clinical Diagnostics", "Expert-Guided Care", "Regenerative Medicine", "Longevity Programs"].map((item) => <span className="chip chip-large" key={item}>{item}</span>)}
          </div>
          <div className="detail-layout">
            <div>
              <span className="eyebrow">What this demonstrates</span>
              <h2 className="section-title">A framework for clinical implementation</h2>
            </div>
            <div className="prose-block">
              <p>The Cell Clinics model is designed to help healthcare providers implement structured cellular medicine programs inside existing practices and clinics. This includes physician education, diagnostic frameworks, clinical pathways and implementation support.</p>
              <ul className="evidence-list">
                <li>Structured diagnostic pathways</li>
                <li>Physician-guided implementation</li>
                <li>Clinical education frameworks</li>
                <li>Premium patient experience</li>
                <li>Scalable operational model</li>
              </ul>
            </div>
          </div>
          <div className="detail-layout">
            <div><span className="eyebrow">Powered by clinical frameworks</span><h2 className="section-title">Adaptable to local clinical expertise</h2></div>
            <div className="prose-block"><p>Cell Clinics provides the educational, diagnostic and implementation frameworks that enable healthcare providers to build structured cellular medicine programs inside their own clinical environments.</p><p>The objective is not to standardize clinics, but to provide a proven framework that can be adapted to local medical expertise, patient populations and clinical objectives.</p></div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container clinic-contact card">
          <div><span className="eyebrow">Clinic inquiry</span><h2 className="section-title">Connect with {clinic.name}</h2><p>For partnership and clinic inquiries, contact the Cell Clinics coordination team.</p><a className="button button-primary" href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a></div>
          <Image src="/clinics/alpstein/location-map.png" alt={`Map showing ${clinic.city}, ${clinic.country}`} width={1000} height={650}/>
        </div>
      </section>
    </>
  );
}
