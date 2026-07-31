"use client";

import { usePrefersReducedMotion } from "@/lib/motion";

const MARQUEE_TEXT =
  "CHRIS QIN — VIDEO EDITOR — VIDEOGRAPHER — CREATIVE PRODUCTION — ";

export function FooterMarquee() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={`site-footer__marquee${reducedMotion ? " site-footer__marquee--static" : ""}`}
    >
      <p className="sr-only">
        Chris Qin — Video Editor — Videographer — Creative Production
      </p>
      <div className="site-footer__marquee-track" aria-hidden="true">
        <p className="site-footer__marquee-text">{MARQUEE_TEXT}</p>
        <p className="site-footer__marquee-text">{MARQUEE_TEXT}</p>
      </div>
    </div>
  );
}
