"use client";

import Link from "next/link";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Nav link with sand pill on hover + per-letter weight reveal.
 * Originkit weight-hover pattern adapted for static Söhne (Buch/Kraftig crossfade).
 */
export function NavWeightLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavWeightLinkProps) {
  const letters = label.split("");

  return (
    <Link
      href={href}
      className={`nen-header__link${className ? ` ${className}` : ""}`}
      onClick={onNavigate}
    >
      <span className="sr-only">{label}</span>
      <span className="nen-header__link-text" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${label}-${index}`}
            className="letter"
            style={{
              ["--letter-index" as string]: index,
              ["--letter-count" as string]: letters.length,
            }}
          >
            <span className="letter-regular">{letter}</span>
            <span className="letter-bold">{letter}</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
