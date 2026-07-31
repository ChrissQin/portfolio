import Image from "next/image";

import { siteConfig } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <section
      id="about"
      className="home-about"
      aria-labelledby="about-teaser-heading"
      tabIndex={-1}
    >
      <div className="container home-about__spread">
        <div className="home-about__visuals">
          <figure className="home-about__frame home-about__frame--portrait">
            <div className="home-about__photo">
              <Image
                src="/about/chris-qin-portrait.png"
                alt="Portrait of Chris Qin"
                fill
                sizes="(max-width: 899px) 100vw, min(480px, 42vw)"
                className="home-about__photo-img"
              />
            </div>
          </figure>
        </div>

        <div className="home-about__copy">
          <h2 id="about-teaser-heading" className="display-heading">
            {siteConfig.name}
          </h2>

          <p className="home-about__statement">
            I&apos;m an Atlanta-based video editor and videographer obsessed
            with branded content, social video, documentary, and digital media.
            Over the past five years, my work has generated more than 15 million
            views and helped build audiences of over 14,000 subscribers across
            platforms. I&apos;ve worked with startups, restaurants, nonprofits,
            creators, and personal brands from concept and production through
            final delivery.
          </p>

          <p className="home-about__body">
            What draws me most to this work is the opportunity to understand the
            people behind each project and build genuine creative relationships
            with them. I believe the strongest videos go beyond compelling
            visuals — they capture the personality, emotion, and authenticity of
            the people I work with in a way that can be felt through the camera.
          </p>

          <p className="home-about__body home-about__body--closing">
            Take a look around to see all of the different ways that we can work
            together!
          </p>
        </div>
      </div>
    </section>
  );
}
