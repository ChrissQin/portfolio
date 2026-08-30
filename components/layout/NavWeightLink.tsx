"use client";

import Link from "next/link";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Nav link with sand pill on hover + staggered Buch → Kraftig reveal via CSS.
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
            className="nav-letter"
            style={{
              ["--letter-index" as string]: index,
              ["--letter-count" as string]: letters.length,
            }}
          >
            <span className="nav-letter-regular">{letter}</span>
            <span className="nav-letter-bold">{letter}</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
