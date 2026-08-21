"use client";

import type {MouseEvent, ReactNode} from "react";
import {Link} from "@/i18n/navigation";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  size?: "md" | "lg" | "large";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick
}: ButtonLinkProps) {
  const classes = `button button-${variant} ${size === "lg" || size === "large" ? "button-lg" : ""} ${className}`.trim();

  if (href.startsWith("#")) {
    const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>) => {
      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();
      onClick?.();
      target.scrollIntoView({behavior: "auto", block: "start"});
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    };

    return (
      <a href={href} className={classes} onClick={handleSectionClick}>
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
