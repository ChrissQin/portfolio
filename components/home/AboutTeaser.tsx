import Link from "next/link";

import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import { siteConfig } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <section className="home-about" aria-labelledby="about-teaser-heading">
      <div className="container home-about__spread">
        <div className="home-about__visuals">
          <figure className="home-about__frame home-about__frame--portrait">
            <PlaceholderMedia
              src={null}
              alt="Candid photo placeholder"
              label="Candid photo"
              hint="Asset needed"
              aspectRatio="4 / 5"
              motif="portrait"
              className="home-about__media"
              sizes="(max-width: 900px) 70vw, 18rem"
            />
          </figure>

          <figure className="home-about__frame home-about__frame--timeline">
            <PlaceholderMedia
              src={null}
              alt="Edit timeline placeholder"
              label="Timeline crop"
              hint="Asset needed"
              aspectRatio="4 / 3"
              motif="timeline"
              className="home-about__media"
              sizes="(max-width: 900px) 55vw, 14rem"
            />
          </figure>

        </div>

        <div className="home-about__copy">
          <h2 id="about-teaser-heading" className="display-heading">
            {siteConfig.name}
          </h2>

          <p className="home-about__statement">
            I&apos;ve been editing for more than five years—long enough that
            pacing, sound, and the tiny choices that make a video feel finished
            are what I think about first.
          </p>

          <p className="home-about__body">
            Editing is still the center of what I do, but I also like being
            behind the camera and involved before the footage reaches the
            timeline.
          </p>

          <ul className="home-about__facts">
            <li>Adobe creative software · 5+ years</li>
            <li>Short-form, YouTube, lifestyle, social</li>
            <li>Fast communication · adapts to creator voice</li>
          </ul>

          <Link href="/about" className="editorial-link">
            Read More About Me
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
