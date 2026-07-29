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
  return (
    <Link
      href={href}
      className={`button button-${variant} ${size === "lg" || size === "large" ? "button-lg" : ""} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
