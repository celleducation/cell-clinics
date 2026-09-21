import Image from "next/image";
import {Check} from "lucide-react";
import {partnerStories} from "@/content/partner-story";
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
  const {deliverables} = partnerStories[locale] ?? partnerStories.de;
  return (
    <section className="section partner-story" id="platform">
      <div className="container">
        <SectionHeading eyebrow={deliverables.label} title={deliverables.title} intro={deliverables.intro} />
        <div className="partner-deliverables">
          {deliverables.items.map((item) => <article key={item.title}>
            <Check size={20} aria-hidden="true" />
            <div><h3>{item.title}</h3><p>{item.body}</p></div>
          </article>)}
        </div>
        <div className="section-action"><ButtonLink href="#application" variant="secondary">{deliverables.cta}</ButtonLink></div>
      </div>
    </section>
  );
}
