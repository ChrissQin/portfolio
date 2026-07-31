import { HeroRipple } from "@/components/home/HeroRipple";
import { GeorgiaLiveClock } from "@/components/layout/GeorgiaLiveClock";
import { MobileNav } from "@/components/layout/MobileNav";
import { getPrimaryNavLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/constants";

const HERO_POSTER =
  siteConfig.heroImage ?? "/hero/poster-placeholder.svg";

const DISCIPLINES = [
  { label: "Social & YouTube", mark: true },
  { label: "Editing & Post", mark: false },
  { label: "Videography", mark: true },
  { label: "Photography", mark: false },
  { label: "Color Grading", mark: true },
] as const;

/**
 * Reelio-inspired cinematic hero — media frame with internal navigation.
 * WebGL light-ripple is decorative only; all content works without it.
 */
export function Hero() {
  const links = getPrimaryNavLinks();
  const email = siteConfig.email;

  return (
    <section
      id="top"
      className="cinema-hero"
      aria-labelledby="hero-heading"
      tabIndex={-1}
    >
      <div className="cinema-hero__frame">
          <div className="cinema-hero__media">
          {/* Static poster — always present for fallback / reduced-motion / no-WebGL */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cinema-hero__poster"
            src={HERO_POSTER}
            alt="Cinematic waterfall landscape with a solitary figure near the base of the falls"
            width={2400}
            height={1350}
            decoding="async"
            fetchPriority="high"
          />
          <HeroRipple imageSrc={HERO_POSTER} />
          <div className="cinema-hero__veil" aria-hidden="true" />
        </div>

        <div className="cinema-hero__ui">
          <header className="cinema-hero__chrome">
            <a href="#top" className="cinema-hero__brand">
              Chris Qin
            </a>

            <nav aria-label="Primary" className="cinema-hero__nav">
              <ul className="cinema-hero__nav-list">
                {links.map((link) => (
                  <li key={link.sectionId || link.label}>
                    <a href={link.href} className="cinema-hero__nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="cinema-hero__mobile-nav">
              <MobileNav />
            </div>
          </header>

          <div className="cinema-hero__meta">
            <p className="cinema-hero__meta-line">
              Video editing &amp; production — Based in Atlanta, Georgia
              <span className="cinema-hero__pin" aria-hidden="true" />
            </p>
            <GeorgiaLiveClock className="cinema-hero__clock" showDate />
          </div>

          <div className="cinema-hero__copy">
            <h1 id="hero-heading" className="cinema-hero__headline">
              <span>Cut for the story.</span>
              <span>Built to keep watching.</span>
            </h1>
            <p className="cinema-hero__lede">
              Video editing and videography for creators, brands, and ideas I
              care about.
            </p>
            <p className="cinema-hero__lede cinema-hero__lede--secondary">
              Pacing, sound, color, and visual choices built around what makes
              people stay.
            </p>
          </div>

          <ul className="cinema-hero__disciplines" aria-label="Capabilities">
            {DISCIPLINES.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                {item.mark ? (
                  <span className="cinema-hero__plus" aria-hidden="true">
                    +
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="cinema-hero__actions">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="cinema-hero__cta cinema-hero__cta--primary"
              >
                Start a project
                <span aria-hidden="true"> →</span>
              </a>
            ) : null}
            <a href="#work" className="cinema-hero__cta cinema-hero__cta--ghost">
              View work
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
