import {ButtonLink} from "./ui/ButtonLink";
import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  primary?: {label: string; href: string};
  secondary?: {label: string; href: string};
  image?: string;
};

export function PageHero({eyebrow, title, lead, primary, secondary, image}: PageHeroProps) {
  return (
    <section className="page-hero section-soft">
      <div className={`container page-hero-grid${image ? "" : " page-hero-grid-simple"}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display">{title}</h1>
          <p className="lead">{lead}</p>
          {(primary || secondary) && (
            <div className="button-row">
              {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary && (
                <ButtonLink href={secondary.href} variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
        {image && (
          <div className="hero-art" aria-hidden="true">
            <Image src={image} alt="" width={1400} height={1050} />
          </div>
        )}
      </div>
    </section>
  );
}
