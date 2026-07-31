import Link from "next/link";

import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { siteConfig } from "@/lib/constants";
import { getActiveSocialLinks, hasContactMethod } from "@/lib/contact";

export function HomeCTA() {
  const email = siteConfig.email;
  const socials = getActiveSocialLinks();
  const showContact = hasContactMethod();

  return (
    <section className="home-cta" aria-labelledby="home-cta-heading">
      <div className="container home-cta__inner">
        <p className="section-eyebrow home-cta__eyebrow">Next step</p>
        <h2 id="home-cta-heading" className="home-cta__title">
          {showContact ? "Have a project in mind?" : "Want to see more?"}
        </h2>
        <p className="home-cta__lede">
          {showContact
            ? "Tell me about the edit, shoot, or collaboration you have in mind."
            : "Browse the work or read a little more about how I approach editing and production."}
        </p>

        {showContact ? (
          <div className="home-cta__contact">
            {email ? (
              <div className="home-cta__email-row">
                <a href={`mailto:${email}`} className="button button--primary">
                  {email}
                </a>
                <CopyEmailButton email={email} />
              </div>
            ) : null}

            {siteConfig.availability ? (
              <p className="home-cta__availability">{siteConfig.availability}</p>
            ) : null}

            {socials.length > 0 ? (
              <ul className="home-cta__socials">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <div className="home-cta__actions">
            <Link href="/work" className="button button--primary">
              View My Work
            </Link>
            <Link href="/about" className="button button--ghost-ink">
              Learn More About Me
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
