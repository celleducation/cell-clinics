import Image from "next/image";
import type {ReactNode} from "react";

type PhotographicHeroProps = {
  audience: "home" | "patient";
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  children: ReactNode;
};

export function PhotographicHero({audience, eyebrow, title, body, image, children}: PhotographicHeroProps) {
  return (
    <section className={`${audience}-hero photo-hero photo-hero-${audience}`}>
      <div className="container photo-hero-intro">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display">{title}</h1>
        </div>
        <div className="photo-hero-description">
          <p className="lead">{body}</p>
          <div className="button-row">{children}</div>
        </div>
      </div>
      <div className="photo-hero-image">
        <Image src={image} alt="" fill sizes="100vw" priority />
      </div>
    </section>
  );
}
