import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <section className="home-about" aria-labelledby="about-teaser-heading">
      <div className="container home-about__grid">
        <div className="home-about__media">
          <div className="home-about__portrait">
            <Image
              src="/about/portrait-placeholder.svg"
              alt="Portrait placeholder — replace with a photo of Chris Qin editing or filming"
              fill
              unoptimized
              sizes="(max-width: 900px) 100vw, 28rem"
              className="home-about__image"
            />
          </div>
          <p className="home-about__media-caption">
            Portrait or production photo — Content Needed
          </p>
        </div>

        <div className="home-about__copy">
          <p className="section-eyebrow">About</p>
          <h2 id="about-teaser-heading" className="section-title">
            {siteConfig.name}
          </h2>
          <p className="home-about__lead">
            I&apos;m a video editor and videographer with more than five years
            of experience creating and editing content in Adobe creative
            software.
          </p>
          <p>
            Editing is currently my strongest area. I care about pacing, sound,
            story, and the small visual decisions that change how a piece feels.
            I also shoot content and like being involved across the production
            process when a project calls for it.
          </p>
          <p>
            I work across short-form, YouTube, lifestyle, and social content,
            and I value responsive communication, reliability, and adapting to
            each creator&apos;s voice.
          </p>
          <Link href="/about" className="text-link home-about__link">
            More About Me
          </Link>
        </div>
      </div>
    </section>
  );
}
