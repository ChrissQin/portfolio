import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/constants";

export function SiteHeader() {
  const hasEmail = Boolean(siteConfig.email);
  const hasResume = Boolean(siteConfig.resumeUrl);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 md:gap-6">
          <ul className="hidden items-center gap-5 text-sm text-ink-muted sm:flex md:gap-6">
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
            {hasResume ? (
              <li>
                <a
                  href={siteConfig.resumeUrl ?? undefined}
                  className="transition-colors hover:text-ink"
                >
                  Resume
                </a>
              </li>
            ) : null}
          </ul>

          {hasEmail ? (
            <Link
              href="/contact"
              className="rounded-[var(--radius)] bg-accent px-3 py-2 text-sm font-medium text-bg-elevated transition-colors hover:bg-accent-hover"
            >
              Get in Touch
            </Link>
          ) : (
            <span
              className="rounded-[var(--radius)] border border-line px-3 py-2 text-sm text-ink-muted"
              title="Contact email placeholder — replace in lib/constants.ts"
            >
              Get in Touch
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
