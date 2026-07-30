import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/constants";

const staticPoster =
  siteConfig.heroImage ?? "/projects/project-01/poster.svg";

export function Hero() {
  const hasEmail = Boolean(siteConfig.email);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__media" aria-hidden="true">
        <Image
          src={staticPoster}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__scrim" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow">Portfolio</p>
        <h1 id="hero-heading" className="hero__name">
          {siteConfig.name}
        </h1>
        <p className="hero__role">{siteConfig.role}</p>
        <p className="hero__tagline">{siteConfig.tagline}</p>

        <div className="hero__actions">
          <Link href="#featured-work" className="button button--primary">
            View My Work
          </Link>
          {hasEmail ? (
            <Link href="/contact" className="button button--ghost">
              Get in Touch
            </Link>
          ) : (
            <span
              className="button button--ghost button--disabled"
              title="Contact email placeholder — replace in lib/constants.ts"
            >
              Get in Touch
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
