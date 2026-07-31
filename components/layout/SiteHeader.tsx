import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { getPrimaryNavLinks } from "@/lib/nav";

export function SiteHeader() {
  const links = getPrimaryNavLinks();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand">
          Chris Qin
        </Link>

        <nav aria-label="Primary" className="site-header__desktop">
          <ul className="site-header__links">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link href={link.href} className="site-header__link">
                  <span className="site-header__index">{link.index}</span>
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
