"use client";

import Link from "next/link";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Nav link with sand pill + Originkit-style per-letter weight stagger.
 * Uses Inter Variable + CSS transitions (first-letter stagger, 30ms) so each
 * letter bolds independently — same pattern as Originkit weight-hover.
 */
export function NavWeightLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavWeightLinkProps) {
  const text = label.toUpperCase();
  const letters = text.split("");

  return (
    <Link
      href={href}
      className={`nen-header__link${className ? ` ${className}` : ""}`}
      onClick={onNavigate}
    >
      <span className="sr-only">{text}</span>
      <span
        className="nen-header__link-text nen-header__link-weight"
        style={{ ["--letter-count" as string]: letters.length }}
        aria-hidden="true"
      >
        {letters.map((letter, index) => (
          <span
            key={`${text}-${index}`}
            className="letter"
            style={{ ["--letter-i" as string]: index }}
          >
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
}
