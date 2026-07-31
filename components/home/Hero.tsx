import Link from "next/link";

import { WorkspaceCollage } from "@/components/home/WorkspaceCollage";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__layout">
        <div className="hero__copy">
          <h1 id="hero-heading" className="hero__heading">
            <span className="hero__name">{siteConfig.name}</span>
            <span className="hero__roles">
              {siteConfig.roles.map((role) => (
                <span key={role} className="hero__role-line">
                  {role}
                </span>
              ))}
            </span>
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
