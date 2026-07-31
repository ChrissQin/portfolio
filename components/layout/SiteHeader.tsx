import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks, siteConfig } from "@/lib/constants";

export function SiteHeader() {
  const hasEmail = Boolean(siteConfig.email);
  const hasResume = Boolean(siteConfig.resumeUrl);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="site-header__desktop">
          <ul className="site-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-header__link">
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
                  Resume
                </a>
              </li>
            ) : null}
          </ul>

          {hasEmail ? (
            <Link
              href="/contact"
              className="button button--primary button--compact"
            >
              Get in Touch
            </Link>
          ) : null}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
