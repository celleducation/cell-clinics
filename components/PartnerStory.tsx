import Image from "next/image";
import {Check, GraduationCap, Handshake, MessagesSquare, RefreshCw, Package} from "lucide-react";
import {partnerStories} from "@/content/partner-story";
import {partnerMaterials} from "@/content/partner-materials";
import {CellScienceLearning} from "@/components/CellScienceArt";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ButtonLink} from "@/components/ui/ButtonLink";

export function PartnerPillars({locale}: {locale: string}) {
  const {pillars} = partnerStories[locale] ?? partnerStories.de;
  return (
    <section className="section partner-story" id="practice-model">
      <div className="container">
        <SectionHeading eyebrow={pillars.label} title={pillars.title} intro={pillars.intro} />
        <div className="partner-pillars">
          {pillars.items.map((item, index) => (
            <article className="partner-pillar" key={item.title}>
              <div className="partner-pillar-image">
                <Image src={index === 0 ? "/images/editorial/practice-entrance.webp" : "/images/editorial/institute-seminar.webp"} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
              <div className="partner-pillar-copy">
                <span className="eyebrow" aria-hidden="true">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="partner-pillar-detail">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="partner-story-note">{pillars.note}</p>
      </div>
    </section>
  );
}

export function PartnerProgram({locale}: {locale: string}) {
  const {program} = partnerStories[locale] ?? partnerStories.de;
  return (
    <section className="section partner-story section-soft" id="programme">
      <div className="container partner-program-layout">
        <div className="partner-program-photo">
          <Image src="/images/editorial/performance-assessment.webp" alt="" fill sizes="(max-width: 900px) 100vw, 42vw" />
        </div>
        <div>
          <SectionHeading eyebrow={program.label} title={program.title} intro={program.intro} />
          <ol className="partner-program-steps">
            {program.steps.map((step, index) => <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>)}
          </ol>
          <p className="partner-story-note">{program.note}</p>
        </div>
      </div>
    </section>
  );
}

export function PartnerDeliverables({locale}: {locale: string}) {
  const material = partnerMaterials[locale] ?? partnerMaterials.de;
  const supportIcons = [GraduationCap, Handshake, MessagesSquare, RefreshCw];
  return (
    <section className="section partner-materials" id="platform">
      <div className="container">
        <SectionHeading eyebrow={material.label} title={material.title} intro={material.intro} />
        <div className="materials-compendium">
          <div>
            <h3>{material.bookTitle}</h3>
            <p>{material.bookBody}</p>
            <ul>{material.points.map(point => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul>
          </div>
          <figure>
            <div className="materials-book-image"><Image src="/images/partner-materials/compendium.webp" alt="" fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
            <figcaption>{material.caption}</figcaption>
          </figure>
        </div>
        <CellScienceLearning locale={locale} />
        <h3 className="materials-subtitle">{material.resourcesTitle}</h3>
        <div className="materials-grid">
          {material.resources.map(item => <article className="materials-card" key={item.image}>
            <div className="materials-preview"><Image src={`/images/partner-materials/${item.image}.webp`} alt={item.title} fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
            <div className="materials-card-copy"><h4>{item.title}</h4><p>{item.body}</p></div>
          </article>)}
        </div>
        <aside className="materials-equipment">
          <Package size={24} aria-hidden="true" />
          <div><h4>{material.equipment.title}</h4><p>{material.equipment.body}</p></div>
        </aside>
        <div className="materials-support">
          <h3 className="materials-subtitle">{material.supportTitle}</h3>
          <div className="materials-support-grid">{material.support.map((item, index) => {
            const Icon = supportIcons[index];
            return <article key={item.title}><span className="materials-support-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><h4>{item.title}</h4><p>{item.body}</p></article>;
          })}</div>
        </div>
        <p className="materials-note">{material.note}</p>
        <div className="section-action"><ButtonLink href="#application" variant="secondary">{material.cta}</ButtonLink></div>
      </div>
    </section>
  );
}
