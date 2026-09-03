"use client";

import { useEffect, useId, useRef, useState } from "react";

import { NavWeightLink } from "@/components/layout/NavWeightLink";
import { navLinks } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="nen-mobile-nav">
      <button
        type="button"
        className="nen-mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="nen-mobile-nav__bars" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="nen-mobile-nav__backdrop"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id={panelId}
            className="nen-mobile-nav__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <ul className="nen-mobile-nav__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavWeightLink
                    href={link.href}
                    label={link.label}
                    className="nen-mobile-nav__link"
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
