"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/layout/MobileNav";
import { getPrimaryNavLinks } from "@/lib/nav";

/**
 * Global header for non-home routes. On `/`, the cinematic hero owns navigation
 * so desktop does not show a separate black header bar above the media frame.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const links = getPrimaryNavLinks();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/#top" className="site-header__brand">
          Chris Qin
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
