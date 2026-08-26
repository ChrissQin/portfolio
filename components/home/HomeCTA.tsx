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
        <p className="section-kicker">Contact</p>
        <h2 id="home-cta-heading" className="home-cta__title">
          Got footage? <em>Let&apos;s make something good.</em>
        </h2>

        {showContact ? (
          <div className="home-cta__contact">
            {email ? (
              <div className="home-cta__email-row">
                <a href={`mailto:${email}`} className="btn btn--primary">
                  Get in touch
                </a>
                <span className="home-cta__email">{email}</span>
                <CopyEmailButton email={email} />
              </div>
            ) : null}

            {siteConfig.phoneDisplay && siteConfig.phoneHref ? (
              <p className="home-cta__availability">
                <a href={siteConfig.phoneHref} className="text-link">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
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
            <a href="#about" className="text-link">
              About Me
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
