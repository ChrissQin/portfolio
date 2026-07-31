import { WorkspaceCollage } from "@/components/home/WorkspaceCollage";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="container hero__layout">
        <div className="hero__copy">
          <h1 id="hero-heading" className="hero__heading">
            <span className="hero__name">{siteConfig.name}</span>
            <span className="hero__roles">
              {siteConfig.roles.map((role) => (
                <span
                  key={role.text}
                  className={`hero__role-line hero__role-line--${role.emphasis}`}
                >
                  {role.emphasis === "supporting" ? (
                    <span className="hero__role-plus" aria-hidden="true">
                      +
                    </span>
                  ) : null}
                  <span className="hero__role-text">{role.text}</span>
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__intro">{siteConfig.intro}</p>
          <p className="hero__tagline">{siteConfig.tagline}</p>

          <div className="hero__actions">
            <a href="#work" className="editorial-link">
              View Selected Work
              <span aria-hidden="true"> ↘</span>
            </a>
            <a href="#about" className="editorial-link editorial-link--muted">
              More About Me
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>

        <div className="hero__collage hero__collage--quiet">
          <WorkspaceCollage compact />
        </div>
      </div>
    </section>
  );
}
