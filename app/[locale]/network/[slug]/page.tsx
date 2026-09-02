import Image from "next/image";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {Activity, ArrowLeft, ArrowUpRight, Microscope, RefreshCw, Stethoscope} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {clinics, getClinic} from "@/content/clinics";
import {Link} from "@/i18n/navigation";

export function generateStaticParams() {
  return clinics.filter((clinic) => clinic.profileAvailable).map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale, slug} = await params;
  const clinic = getClinic(slug);
  if (!clinic?.profileAvailable) return {};
  const profileKey = slug === "medivium-stuttgart"
    ? "medivium"
    : slug === "monika-brueck-mallorca"
      ? "monikaBrueck"
      : slug === "boguslaw-nikiciuk-neuruppin"
        ? "nikiciuk"
        : slug === "mihriban-ciftci-stuttgart"
          ? "mihribanCiftci"
        : slug === "maja-koebel-aink-luebeck"
          ? "majaKoebelAink"
        : "alpstein";
  const t = await getTranslations({locale, namespace: `clinicProfiles.${profileKey}`});
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {canonical: `https://cell-clinics.com/${locale}/network/${slug}`},
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [clinic.images?.[0] || "/clinics/alpstein/interior-1.webp"]
    }
  };
}

export default async function ClinicPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const clinic = getClinic(slug);
  if (!clinic?.profileAvailable) notFound();
  const isMedivium = slug === "medivium-stuttgart";
  const isMonikaBrueck = slug === "monika-brueck-mallorca";
  const isNikiciuk = slug === "boguslaw-nikiciuk-neuruppin";
  const isMihriban = slug === "mihriban-ciftci-stuttgart";
  const isMaja = slug === "maja-koebel-aink-luebeck";
  const profileKey = isMedivium ? "medivium" : isMonikaBrueck ? "monikaBrueck" : isNikiciuk ? "nikiciuk" : isMihriban ? "mihribanCiftci" : isMaja ? "majaKoebelAink" : "alpstein";
  const t = await getTranslations(`clinicProfiles.${profileKey}`);
  const networkT = await getTranslations("networkPage");
  const assets = isMedivium ? {
    logo: "/clinics/medivium/logo.png",
    main: "/clinics/medivium/ha4a6318.jpg",
    portrait: "/clinics/medivium/enrico-thiele.webp",
    profile: "/clinics/medivium/enrico-thiele.webp",
    galleryThird: "/clinics/medivium/logo.png",
    context: "/clinics/medivium/ha4a6318.jpg"
  } : isMonikaBrueck ? {
    logo: "/clinics/monika-brueck/logo.svg",
    main: "/clinics/monika-brueck/hero.webp",
    portrait: "/clinics/monika-brueck/monika-brueck.jpeg",
    profile: "/clinics/monika-brueck/monika-brueck.jpeg",
    galleryThird: "/clinics/monika-brueck/practice.jpg",
    context: "/clinics/monika-brueck/practice.jpg"
  } : isNikiciuk ? {
    logo: "/clinics/nikiciuk/logo.png",
    main: "/clinics/nikiciuk/portrait.jpg",
    portrait: "/clinics/nikiciuk/cell-mitochondria.png",
    profile: "/clinics/nikiciuk/cell-receptors.png",
    galleryThird: "/clinics/nikiciuk/logo.png",
    context: "/clinics/nikiciuk/cell-transport.png"
  } : isMihriban ? {
    logo: "/clinics/mihriban-ciftci/logo.jpg",
    main: "/clinics/mihriban-ciftci/portrait.jpg",
    portrait: "/clinics/mihriban-ciftci/interior.jpg",
    profile: "/images/cellclinic-therapy.png",
    galleryThird: "/clinics/mihriban-ciftci/logo.jpg",
    context: "/clinics/mihriban-ciftci/interior.jpg"
  } : isMaja ? {
    logo: "/clinics/maja-koebel-aink/portrait.webp",
    main: "/clinics/maja-koebel-aink/portrait.webp",
    portrait: "/clinics/maja-koebel-aink/team.webp",
    profile: "/clinics/maja-koebel-aink/prgf.webp",
    galleryThird: "/images/cellclinic-therapy.png",
    context: "/clinics/maja-koebel-aink/team.webp"
  } : {
    logo: "/clinics/alpstein/logo.webp",
    main: "/clinics/alpstein/interior-1.webp",
    portrait: "/clinics/alpstein/recovery.webp",
    profile: "/clinics/alpstein/recovery.webp",
    galleryThird: "/clinics/alpstein/landscape.webp",
    context: "/clinics/alpstein/landscape.webp"
  };

  const areas = [Microscope, Stethoscope, RefreshCw, Activity].map((Icon, index) => ({
    Icon,
    title: t(`area${index + 1}Title`),
    body: t(`area${index + 1}Body`)
  }));
  const stages = [1, 2, 3, 4].map((index) => ({title: t(`stage${index}Title`), body: t(`stage${index}Body`)}));
  const facts = [1, 2, 3, 4].map((index) => t(`fact${index}`));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isMedivium || isMihriban ? ["MedicalBusiness", "LocalBusiness"] : ["MedicalOrganization", "MedicalClinic"],
    name: clinic.name,
    url: clinic.website,
    email: clinic.contactEmail,
    telephone: clinic.phone,
    image: `https://cell-clinics.com${assets.main}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: isMedivium ? "Kirchheimer Straße 42" : isMonikaBrueck ? "Camí dels Reis 308, Edificio 3A Norte" : isNikiciuk ? "An der Seepromenade 24" : isMihriban ? "Obere Waiblinger Straße 107 a" : isMaja ? "Hansestraße 43 A" : "Dorfplatz 5",
      postalCode: isMedivium ? "70619" : isMonikaBrueck ? "07011" : isNikiciuk ? "16816" : isMihriban ? "70374" : isMaja ? "23558" : "9056",
      addressLocality: isMedivium || isMihriban ? "Stuttgart" : isMonikaBrueck ? "Palma" : isNikiciuk ? "Neuruppin" : isMaja ? "Lübeck" : "Gais",
      addressRegion: isMedivium || isMihriban ? "Baden-Württemberg" : isMonikaBrueck ? "Baleares" : isNikiciuk ? "Brandenburg" : isMaja ? "Schleswig-Holstein" : "Appenzell Ausserrhoden",
      addressCountry: isMedivium || isNikiciuk || isMihriban || isMaja ? "DE" : isMonikaBrueck ? "ES" : "CH"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className="alpstein-hero section-soft">
        <div className="container">
          <Link className="clinic-back-link" href="/network"><ArrowLeft size={16} />{networkT("directoryLabel")}</Link>
          <div className="alpstein-hero-grid">
            <div className="alpstein-hero-copy">
              <span className="eyebrow">{t("eyebrow")}</span>
              {!isMaja && <Image className={`alpstein-logo${isMedivium ? " medivium-logo" : ""}${isMonikaBrueck ? " monika-logo" : ""}${isNikiciuk ? " nikiciuk-logo" : ""}${isMihriban ? " mihriban-logo" : ""}`} src={assets.logo} alt={`${clinic.name} Logo`} width={500} height={220} priority />}
              <h1 className="display">{clinic.name}</h1>
              <p className="clinic-profile-location">{t("location")}</p>
              <p className="lead">{t("heroBody")}</p>
              <div className="button-row">
                <a className="button button-primary button-lg" href={clinic.website} target="_blank" rel="noreferrer">{t("visitWebsite")}<ArrowUpRight size={16} /></a>
                <a className="button button-secondary button-lg" href={clinic.contactEmail ? `mailto:${clinic.contactEmail}` : `tel:${clinic.phone?.replaceAll(" ", "")}`}>{t("contact")}</a>
              </div>
            </div>
            <div className="alpstein-hero-gallery">
              <Image className={`alpstein-gallery-main${isNikiciuk ? " nikiciuk-main-portrait" : ""}${isMihriban ? " mihriban-main-portrait" : ""}${isMaja ? " maja-main-portrait" : ""}`} src={assets.main} alt={t("mainImageAlt")} width={1200} height={1100} priority />
              <Image className={isMedivium ? "medivium-portrait" : isNikiciuk ? "nikiciuk-cell-art" : ""} src={assets.portrait} alt={t("portraitAlt")} width={800} height={600} priority={isMedivium} />
              <Image className={isMedivium ? "medivium-gallery-logo" : isNikiciuk ? "nikiciuk-gallery-logo" : isMihriban ? "mihriban-gallery-logo" : isMaja ? "maja-cell-art" : ""} src={assets.galleryThird} alt={isMedivium || isNikiciuk || isMihriban ? `${clinic.name} Logo` : t("contextImageAlt")} width={800} height={600} />
            </div>
          </div>
          <div className="clinic-fact-strip" aria-label={t("factsLabel")}>
            {facts.map((fact, index) => <div key={fact}><span>{String(index + 1).padStart(2, "0")}</span><strong>{fact}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section clinic-profile-story" id="clinical-profile">
        <div className="container clinic-profile-split">
          <div className="clinic-profile-image-wrap">
            <Image className={isMedivium ? "medivium-profile-portrait" : isNikiciuk ? "nikiciuk-profile-art" : isMihriban ? "mihriban-profile-art" : ""} src={assets.profile} alt={isNikiciuk || isMihriban ? t("profileImageAlt") : t("portraitAlt")} width={1000} height={900} />
            <span>{t("profileLabel")}</span>
          </div>
          <div className="clinic-profile-copy">
            <span className="eyebrow">{t("profileLabel")}</span>
            <h2 className="section-title">{t("profileTitle")}</h2>
            <p className="lead">{t("profileBody")}</p>
          </div>
        </div>
      </section>

      <section className="clinic-network-context">
        <div className="container clinic-network-context-card">
          <span className="eyebrow">{t("cellClinicsLabel")}</span>
          <h2 className="section-title">{t("cellClinicsTitle")}</h2>
          <p className="lead">{t("cellClinicsBody")}</p>
        </div>
      </section>

      <section className="section section-alt clinic-areas-section">
        <div className="container">
          <div className="clinic-section-heading">
            <div><span className="eyebrow">{t("areasLabel")}</span><h2 className="section-title">{t("areasTitle")}</h2></div>
            <p>{t("profileBody")}</p>
          </div>
          <div className="clinic-area-grid">
            {areas.map(({Icon, title, body}, index) => (
              <article className="clinic-area-card" key={title}>
                <div className="clinic-area-top"><Icon size={21} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section clinic-approach-section">
        <div className="container">
          <div className="clinic-section-heading">
            <div><span className="eyebrow">{t("approachLabel")}</span><h2 className="section-title">{t("approachTitle")}</h2></div>
            <p>{t("approachBody")}</p>
          </div>
          <div className="clinic-stage-flow">
            {stages.map((stage, index) => (
              <article key={stage.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft clinic-context-section">
        <div className="container clinic-context-grid">
          <div className="clinic-context-copy">
            <span className="eyebrow">{t("leadershipLabel")}</span>
            <h2 className="section-title">{t("leadershipTitle")}</h2>
            <p>{t("leadershipBody")}</p>
          </div>
          <Image className={isNikiciuk ? "nikiciuk-context-art" : ""} src={assets.context} alt={t("contextImageAlt")} width={900} height={900} />
          <div className="clinic-setting-card">
            <span className="eyebrow">{t("settingLabel")}</span>
            <h2>{t("settingTitle")}</h2>
            <p>{t("settingBody")}</p>
          </div>
        </div>
      </section>

      <section className="section clinic-profile-contact">
        <div className="container clinic-profile-contact-card">
          <div>
            <span className="eyebrow">{t("contactLabel")}</span>
            <h2 className="section-title">{t("contactTitle")}</h2>
            <p>{t("contactBody")}</p>
          </div>
          <address>
            <strong>{clinic.name}</strong>
            <span>{clinic.address}</span>
            <a href={`tel:${clinic.phone?.replaceAll(" ", "")}`}>{clinic.phone}</a>
            {clinic.contactEmail && <a href={`mailto:${clinic.contactEmail}`}>{clinic.contactEmail}</a>}
            <a className="button button-primary" href={clinic.website} target="_blank" rel="noreferrer">{t("visitWebsite")}<ArrowUpRight size={16} /></a>
          </address>
          <small>{t("sourceNote")}</small>
        </div>
      </section>
    </>
  );
}
