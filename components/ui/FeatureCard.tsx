import type {LucideIcon} from "lucide-react";
import type {ReactNode} from "react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  interactive?: boolean;
};

export function FeatureCard({icon: Icon, title, children, interactive = false}: FeatureCardProps) {
  return (
    <article className={`card feature-card ${interactive ? "interactive-card" : ""}`}>
      <span className="feature-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
