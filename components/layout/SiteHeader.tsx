import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="nen-header">
      <div className="nen-container nen-header__inner">
        <Link href="/" className="nen-header__brand" aria-label={`${site.name} — Home`}>
          <Image
            src={site.logo}
            alt={site.name}
            width={1254}
            height={1254}
            priority
            className="nen-header__logo"
          />
        </Link>

        <nav aria-label="Primary" className="nen-header__nav">
          <ul className="nen-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nen-header__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
