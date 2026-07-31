import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks, siteConfig } from "@/lib/constants";

export function SiteHeader() {
  const hasResume = Boolean(siteConfig.resumeUrl);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand">
          Chris Qin
        </Link>

        <nav aria-label="Primary" className="site-header__desktop">
          <ul className="site-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-header__link">
                  <span className="site-header__index">{link.index}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            {hasResume ? (
              <li>
                <a
                  href={siteConfig.resumeUrl ?? undefined}
                  className="site-header__link"
                >
                  <span className="site-header__index">04</span>
                  Resume
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
