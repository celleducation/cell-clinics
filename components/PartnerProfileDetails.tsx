import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {partnerDetails} from "@/content/partner-details";

function copy(locale: string) { return partnerDetails[locale as keyof typeof partnerDetails] ?? partnerDetails.de; }

export function HolysamaCare({locale}: {locale: string}) {
  const c = copy(locale).julia;
  return <>
    <section className="section holysama-care"><div className="container holysama-care-grid"><div className="holysama-nature"><Image src="/clinics/holysama/botanical.webp" alt={c.flowerAlt} width={702} height={840} sizes="(max-width:767px) 90vw, 35vw" /></div><div><SectionHeading eyebrow={c.eyebrow} title={c.title} /><p className="lead">{c.intro}</p><div className="holysama-fields">{c.fields.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></div></section>
    <section className="section"><div className="container"><Image className="holysama-landscape" src="/clinics/holysama/lake.webp" alt={c.lakeAlt} width={1500} height={1500} sizes="90vw" /><div className="holysama-path"><h2 className="section-title">{c.journey}</h2><ol className="partner-steps">{c.steps.map(([title,body],i)=><li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></div></section>
  </>;
}

export function StrackeDiagnostics({locale}: {locale: string}) {
  const c = copy(locale).marc;
  return <>
    <section className="section"><div className="container stracke-clinical"><Image src="/clinics/marc-stracke/manual.webp" alt={c.manualAlt} width={1194} height={841} sizes="(max-width:767px) 90vw, 50vw" /><div><span className="eyebrow">Dr. Marc Stracke</span><h2 className="section-title">{c.manualTitle}</h2><p className="lead">{c.manualBody}</p></div></div></section>
    <section className="section section-soft"><div className="container stracke-diagnostics"><div><SectionHeading eyebrow={c.eyebrow} title={c.title} /><p className="lead">{c.intro}</p><a className="button button-secondary" href="https://praxis-dr-stracke.de/diagnostik/" target="_blank" rel="noopener noreferrer">{c.more}<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="stracke-test-list">{c.tests.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section"><div className="container"><h2 className="section-title">{c.journey}</h2><ol className="partner-steps">{c.steps.map(([title,body],i)=><li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
  </>;
}

export function HartlPracticeStory({locale}: {locale: string}) {
  const c = copy(locale).marco;
  const images = ["red-light", "preparation", "infusion"];
  return <section className="section hartl-story"><div className="container"><div className="hartl-story-heading"><SectionHeading eyebrow={c.eyebrow} title={c.title} /><p className="lead">{c.intro}</p></div><div className="hartl-photo-story">{images.map((name,i)=><figure key={name}><Image src={`/clinics/marco-hartl/${name}.webp`} alt={c.captions[i]} width={i===1?719:1400} height={i===1?1079:933} sizes="(max-width:767px) 90vw, 55vw" /><figcaption>{c.captions[i]}</figcaption></figure>)}</div><p className="health-point-note">{c.note}</p></div></section>;
}
