"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";

import { MarqueeCTA } from "@/components/layout/MarqueeCTA";
import { FooterSocials } from "@/components/layout/FooterSocials";
import GlyphRing from "@/components/originkit/ui/glyph-ring";
import { footerNavLinks, site } from "@/lib/site";

function useFooterRingZoom(stageRef: RefObject<HTMLDivElement | null>) {
  const [ringZoom, setRingZoom] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (!height) return;
      const zoom = Math.max(1, width / height / 1.18);
      setRingZoom(Math.min(zoom, 2.75));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef]);

  return ringZoom;
}

export function SiteFooter() {
  const pathname = usePathname();
  const bodyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringZoom = useFooterRingZoom(stageRef);

  if (pathname === "/photography") {
    return null;
  }

  const showMarquee = pathname !== "/contact";
  const year = new Date().getFullYear();

  return (
    <footer className="nen-footer" tabIndex={-1}>
      {showMarquee ? <MarqueeCTA /> : null}

      <div ref={bodyRef} className="nen-footer__body">
        <nav className="nen-footer__nav" aria-label="Footer">
          {footerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nen-footer__nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div ref={stageRef} className="nen-footer__stage">
          <div
            className="nen-footer__ring"
            aria-hidden="true"
            style={{ ["--footer-ring-zoom" as string]: ringZoom }}
          >
            <GlyphRing
              ink="#A8ADB2"
              lit="#FF573D"
              rings={18}
              charSize={3}
              gap={9}
              spin={3}
              beam={8}
              band={0}
              churn={1}
              scale={200}
              interactionRoot={bodyRef}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="nen-footer__center">
            <div className="nen-footer__knockout">
              <div className="nen-footer__brand">
                <span
                  className="nen-footer__logo"
                  style={{
                    ["--footer-logo-mask" as string]:
                      'url("/brand/cq-mark-accent.png")',
                  }}
                  role="img"
                  aria-label={site.name}
                />
                <p className="nen-footer__locales">ATL · SF · CHI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="nen-footer__bottom">
          <FooterSocials />
          <p className="nen-footer__copy">
            © {year} {site.name.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
