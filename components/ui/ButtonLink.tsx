import type {ReactNode} from "react";
import {Link} from "@/i18n/navigation";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  size?: "md" | "lg" | "large";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = ""
}: ButtonLinkProps) {
  const classes = `button button-${variant} ${size === "lg" || size === "large" ? "button-lg" : ""} ${className}`.trim();

  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
    >
      {children}
    </Link>
  );
}
