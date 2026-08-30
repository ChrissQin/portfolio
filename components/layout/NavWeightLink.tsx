"use client";

import Link from "next/link";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/** Primary nav link — sand pill fades in on hover/focus; label stays ink. */
export function NavWeightLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavWeightLinkProps) {
  return (
    <Link
      href={href}
      className={`nen-header__link${className ? ` ${className}` : ""}`}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
