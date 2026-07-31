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
        <h2 id="home-cta-heading" className="home-cta__title">
          <span>Got footage?</span>
          <span>Let&apos;s make something good.</span>
        </h2>

        {showContact ? (
          <div className="home-cta__contact">
            {email ? (
              <div className="home-cta__email-row">
                <a href={`mailto:${email}`} className="editorial-link">
                  Send Me a Project
                  <span aria-hidden="true"> →</span>
                </a>
                <span className="home-cta__email">{email}</span>
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
                      className="editorial-link editorial-link--muted"
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
            <Link href="/work" className="editorial-link">
              See All Work
              <span aria-hidden="true"> →</span>
            </Link>
            <Link href="/about" className="editorial-link editorial-link--muted">
              Read More About Me
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
