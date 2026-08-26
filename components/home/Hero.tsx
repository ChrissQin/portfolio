import Image from "next/image";

import { siteConfig } from "@/lib/constants";

const HERO_POSTER = siteConfig.heroImage ?? "/hero/hero-waterfall.png";

/**
 * NEN-inspired type-led hero — brand-first statement with orange accents,
 * then a full-bleed atmospheric still (not an inset card).
 */
export function Hero() {
  const email = siteConfig.email;

  return (
    <section
      id="top"
      className="studio-hero"
      aria-labelledby="hero-heading"
      tabIndex={-1}
    >
      <div className="container studio-hero__intro">
        <p className="studio-hero__brand" aria-hidden="true">
          {siteConfig.name}
        </p>
        <p className="studio-hero__role">
          Video editor &amp; videographer — Atlanta, Georgia
        </p>

        <h1 id="hero-heading" className="studio-hero__headline">
          <span className="studio-hero__line">Building experiences that</span>
          <span className="studio-hero__line">
            <em>make the idea land.</em>
          </span>
        </h1>

        <p className="studio-hero__lede">
          I help creators, founders, and filmmakers turn rough ideas into
          videos people understand, feel, and remember.
        </p>

        <div className="studio-hero__actions">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="btn btn--primary"
            >
              Start a project
            </a>
          ) : null}
          <a href="#work" className="btn btn--ghost">
            View work
          </a>
        </div>
      </div>

      <div className="studio-hero__media">
        <Image
          src={HERO_POSTER}
          alt="Cinematic waterfall landscape with a solitary figure near the base of the falls"
          width={1536}
          height={1024}
          priority
          className="studio-hero__image"
          sizes="100vw"
          draggable={false}
        />
      </div>
    </section>
  );
}
