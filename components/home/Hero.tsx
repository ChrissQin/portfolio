import Link from "next/link";

import { WorkspaceCollage } from "@/components/home/WorkspaceCollage";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="hero__slate">
            <span>PORTFOLIO_01</span>
            <span aria-hidden="true">·</span>
            <span>00:00:01:12</span>
          </p>

          <p className="hero__name" id="hero-heading">
            {siteConfig.name}
          </p>

          <h1 className="hero__roles">
            {siteConfig.roles.map((role) => (
              <span key={role} className="hero__role-line">
                {role}
              </span>
            ))}
          </h1>

          <p className="hero__intro">{siteConfig.intro}</p>
          <p className="hero__tagline">{siteConfig.tagline}</p>

          <div className="hero__actions">
            <Link href="#featured-work" className="editorial-link">
              View Selected Work
              <span aria-hidden="true"> ↘</span>
            </Link>
            <Link href="/about" className="editorial-link editorial-link--muted">
              More About Me
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>

        <div className="hero__collage">
          <WorkspaceCollage />
        </div>
      </div>
    </section>
  );
}
