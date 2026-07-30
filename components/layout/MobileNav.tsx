"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { navLinks, siteConfig } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-nav md:hidden">
      <button
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="mobile-nav__bars" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div id={panelId} className="mobile-nav__panel">
          <nav aria-label="Mobile primary">
            <ul className="mobile-nav__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mobile-nav__link"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {siteConfig.resumeUrl ? (
                <li>
                  <a
                    href={siteConfig.resumeUrl}
                    className="mobile-nav__link"
                    onClick={() => setOpen(false)}
                  >
                    Resume
                  </a>
                </li>
              ) : null}
              <li>
                {siteConfig.email ? (
                  <Link
                    href="/contact"
                    className="mobile-nav__cta"
                    onClick={() => setOpen(false)}
                  >
                    Get in Touch
                  </Link>
                ) : (
                  <span className="mobile-nav__cta mobile-nav__cta--disabled">
                    Get in Touch
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
