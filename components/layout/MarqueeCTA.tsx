import Link from "next/link";

import { site } from "@/lib/site";

export function MarqueeCTA() {
  const phrase = site.marqueeText;
  const repeats = Array.from({ length: 8 }, (_, index) => `${phrase}-${index}`);

  return (
    <section className="nen-marquee" aria-label="Get in touch">
      <div className="nen-marquee__track" aria-hidden="true">
        <div className="nen-marquee__group">
          {repeats.map((key) => (
            <span key={key} className="nen-marquee__text">
              {phrase}
            </span>
          ))}
        </div>
        <div className="nen-marquee__group">
          {repeats.map((key) => (
            <span key={`${key}-dup`} className="nen-marquee__text">
              {phrase}
            </span>
          ))}
        </div>
      </div>
      <Link href="/contact" className="nen-marquee__cta">
        Get in touch
      </Link>
    </section>
  );
}
