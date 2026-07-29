type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({eyebrow, title, intro, as = "h2"}: SectionHeadingProps) {
  const Heading = as;
  return (
    <header className="section-heading">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Heading className={as === "h1" ? "page-title" : "section-title"}>{title}</Heading>
      {intro ? <p className="lead">{intro}</p> : null}
    </header>
  );
}
