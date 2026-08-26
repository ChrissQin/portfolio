"use client";

import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { getPrimaryNavLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/constants";

/**
 * Sticky studio header — wordmark left, primary anchors right.
 * Shown on every route, including the homepage.
 */
export function SiteHeader() {
  const links = getPrimaryNavLinks();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/#top" className="site-header__brand">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="site-header__desktop">
          <ul className="site-header__links">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="site-header__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
