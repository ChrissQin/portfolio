import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container flex flex-col gap-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-medium text-ink">
            {siteConfig.name}
          </span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          {siteConfig.role}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
