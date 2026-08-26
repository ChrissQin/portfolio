import type { Metadata } from "next";
import Link from "next/link";

import { MarqueeCTA } from "@/components/layout/MarqueeCTA";
import { aboutServices, aboutTeam, placeholderClients } from "@/data/placeholders";

export const metadata: Metadata = {
  title: "About",
  description: "About the studio — strategy, design, and video.",
};

const serviceGroups = [
  { key: "brand", title: "Brand", items: aboutServices.brand },
  { key: "website", title: "Website", items: aboutServices.website },
  { key: "product", title: "Product", items: aboutServices.product },
  { key: "video", title: "Video", items: aboutServices.video },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="nen-page-hero" aria-labelledby="about-heading">
        <div className="nen-container">
          <h1 id="about-heading" className="nen-page-hero__headline">
            Nen is a creative partner for companies shaping the future. We build
            brands, products, and stories that move bold ideas forward.
          </h1>
        </div>
      </section>

      <section className="nen-services" aria-labelledby="services-heading">
        <div className="nen-container">
          <h2 id="services-heading" className="nen-section-title">
            Our Services
          </h2>
          <div className="nen-services__grid">
            {serviceGroups.map((group) => (
              <div key={group.key} className="nen-services__group">
                <h3 className="nen-services__title">{group.title}</h3>
                <ul className="nen-services__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nen-clients nen-clients--about" aria-labelledby="about-clients-heading">
        <div className="nen-container">
          <h2 id="about-clients-heading" className="nen-section-title">
            Our Clients
          </h2>
          <ul className="nen-clients__grid">
            {placeholderClients.map((name) => (
              <li key={`about-${name}`} className="nen-clients__item">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="nen-story" aria-labelledby="story-heading">
        <div className="nen-container nen-story__inner">
          <h2 id="story-heading" className="sr-only">
            Studio story
          </h2>
          <p>
            Placeholder studio story. Nen comes from Hunter × Hunter, where it
            refers to the mastery of one&apos;s life energy — strengthened through
            focus, discipline, and the right guidance. We see that same energy in
            the teams we work with: the drive to build, to grow, and to shape the
            future.
          </p>
          <p>
            With backgrounds in building and scaling products, we know how hard
            it is to turn that energy into momentum. Clarity is rare. Great
            partners are even rarer. Nen was created to close that gap.
          </p>
          <p>
            We move like a startup and craft like a studio — disciplined, fast,
            and precise. Together, we turn vision into brands, products, and
            stories that move the world forward.
          </p>
        </div>
      </section>

      <section className="nen-team" aria-labelledby="team-heading">
        <div className="nen-container">
          <h2 id="team-heading" className="nen-section-title">
            Nen Collective
          </h2>
          <ul className="nen-team__grid">
            {aboutTeam.map((name) => (
              <li key={name} className="nen-team__member">
                {name}
              </li>
            ))}
          </ul>
          <p className="nen-team__hiring">
            <Link href="/contact" className="nen-inline-link">
              Join us, we&apos;re hiring!
            </Link>
          </p>
        </div>
      </section>

      <MarqueeCTA />
    </>
  );
}
