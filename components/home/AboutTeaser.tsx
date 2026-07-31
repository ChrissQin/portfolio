import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <section className="home-about" aria-labelledby="about-teaser-heading">
      <div className="container home-about__spread">
        <div className="home-about__visuals">
          <figure className="home-about__frame home-about__frame--portrait">
            <Image
              src="/about/portrait-placeholder.svg"
              alt="Candid photo placeholder — asset needed"
              fill
              unoptimized
              sizes="(max-width: 900px) 70vw, 18rem"
              className="home-about__image"
            />
            <figcaption className="home-about__caption">
              Candid — Asset Needed
            </figcaption>
          </figure>

          <figure className="home-about__frame home-about__frame--timeline">
            <Image
              src="/collage/edit-timeline.svg"
              alt="Edit timeline placeholder — asset needed"
              fill
              unoptimized
              sizes="(max-width: 900px) 55vw, 14rem"
              className="home-about__image"
            />
            <figcaption className="home-about__caption">
              Timeline crop — Asset Needed
            </figcaption>
          </figure>

          <p className="home-about__annotation" aria-hidden="true">
            this part matters ↓
          </p>
        </div>

        <div className="home-about__copy">
          <p className="mono-label">About / Notes</p>
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
