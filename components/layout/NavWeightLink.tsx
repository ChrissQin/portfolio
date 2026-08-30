"use client";

import Link from "next/link";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/** Originkit variant-4: center stagger, 62ms, wght 400 → 800 */
const STAGGER_MS = 62;

function centerStaggerIn(index: number, count: number): number {
  const center = (count - 1) / 2;
  return Math.abs(index - center) * STAGGER_MS;
}

function centerStaggerOut(index: number, count: number): number {
  const center = (count - 1) / 2;
  const distance = Math.abs(index - center);
  const maxDistance = Math.max(
    ...Array.from({ length: count }, (_, i) => Math.abs(i - center)),
  );
  return (maxDistance - distance) * STAGGER_MS;
}

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
      <span className="nen-header__link-text nen-header__link-weight" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${text}-${index}`}
            className="letter"
            style={{
              ["--stagger-in" as string]: centerStaggerIn(index, letters.length),
              ["--stagger-out" as string]: centerStaggerOut(index, letters.length),
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
}
