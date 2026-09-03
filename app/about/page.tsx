import type { Metadata } from "next";

import { OurClientsGrid } from "@/components/about/OurClientsGrid";
import { ServiceGlyph } from "@/components/about/ServiceGlyphs";
import { aboutServiceGroups } from "@/data/placeholders";

export const metadata: Metadata = {
  title: "About",
  description: "About the studio — strategy, design, and video.",
};

export default function AboutPage() {
  return (
    <>
      <section className="nen-hero nen-about-hero" aria-labelledby="about-heading">
        <div className="nen-container">
          <h1 id="about-heading" className="nen-hero__headline">
            <em>We care deeply about how things are made.</em> Our work sits at
            the powerful confluence of advertising and entertainment.
          </h1>
        </div>
      </section>

      <section className="nen-services" aria-labelledby="services-heading">
        <div className="nen-container">
          <div className="nen-services__card">
            <h2 id="services-heading" className="nen-services__label">
              Our Services
            </h2>
            <div className="nen-services__grid">
              {aboutServiceGroups.map((group) => (
                <div key={group.key} className="nen-services__group">
                  <ServiceGlyph name={group.glyph} />
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
        </div>
      </section>

      <section className="nen-story" aria-labelledby="story-heading">
        <div className="nen-container nen-story__inner">
          <h2 id="story-heading" className="sr-only">
            About cqvisuals
          </h2>
          <p className="nen-story__copy nen-story__copy--indent-1">
            We are an independent creative studio built to move quickly and stay
            close to the work.
          </p>
          <p className="nen-story__copy nen-story__copy--indent-2">
            We take projects from rough idea through final delivery, working
            hands-on with the people behind them to uncover what matters, what
            makes the idea distinct, and how to translate that into something
            powerful on screen.
          </p>
        </div>
      </section>

      <section
        className="nen-clients nen-clients--about"
        aria-labelledby="about-clients-heading"
      >
        <div className="nen-container">
          <div className="nen-clients__card">
            <div className="nen-clients__stack">
              <h2 id="about-clients-heading" className="nen-clients__label">
                Our Clients
              </h2>
              <OurClientsGrid />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
