import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { NavWeightLink } from "@/components/layout/NavWeightLink";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="nen-header">
      <div className="nen-container nen-header__inner">
        <Link href="/" className="nen-header__brand" aria-label={`${site.name} — Home`}>
          <span
            className="nen-header__logo"
            style={{ ["--logo-mask" as string]: `url("${site.logo}")` }}
            aria-hidden="true"
          />
        </Link>

        <nav aria-label="Primary" className="nen-header__nav">
          <ul className="nen-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavWeightLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
