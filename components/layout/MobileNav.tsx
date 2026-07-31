"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { getPrimaryNavLinks } from "@/lib/nav";
import { hasContactMethod } from "@/lib/contact";
import { siteConfig } from "@/lib/constants";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const links = getPrimaryNavLinks();
  const showContactCta = hasContactMethod() && Boolean(siteConfig.email);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        toggleRef.current?.focus();
        wasOpenRef.current = false;
      }
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusable = [
        ...panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ];

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="mobile-nav md:hidden" ref={rootRef}>
      <button
        ref={toggleRef}
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
        <>
          <button
            type="button"
            className="mobile-nav__backdrop"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={closeMenu}
          />
          <div
            ref={panelRef}
            id={panelId}
            className="mobile-nav__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav aria-label="Mobile primary">
              <ul className="mobile-nav__list">
                {links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="mobile-nav__link"
                      onClick={closeMenu}
                    >
                      <span className="mobile-nav__index">{link.index}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {showContactCta ? (
                  <li>
                    <Link
                      href="/contact"
                      className="mobile-nav__cta"
                      onClick={closeMenu}
                    >
                      Send a project
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
