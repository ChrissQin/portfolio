import type { Metadata } from "next";

import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { getActiveSocialLinks } from "@/lib/contact";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const email = siteConfig.email;
  const socials = getActiveSocialLinks();

  return (
    <section className="container page-stub" aria-labelledby="contact-heading">
      <p className="mono-label">03 / Inbox</p>
      <h1 id="contact-heading" className="display-heading">
        Contact
      </h1>
      <p className="page-stub__lede">
        Reach out with a project, a cut that needs help, or a shoot you want
        planned around the edit.
      </p>

      <div className="contact-details">
        {email ? (
          <div className="contact-details__row">
            <p className="contact-details__label">Email</p>
            <a href={`mailto:${email}`} className="editorial-link">
              {email}
              <span aria-hidden="true"> ↗</span>
            </a>
            <CopyEmailButton email={email} />
          </div>
        ) : null}

        {siteConfig.phoneDisplay && siteConfig.phoneHref ? (
          <div className="contact-details__row">
            <p className="contact-details__label">Phone</p>
            <a href={siteConfig.phoneHref} className="editorial-link">
              {siteConfig.phoneDisplay}
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        ) : null}

        <div className="contact-details__row">
          <p className="contact-details__label">Based in</p>
          <p className="contact-details__value">{siteConfig.location}</p>
        </div>

        {socials.length > 0 ? (
          <div className="contact-details__row">
            <p className="contact-details__label">Social</p>
            <ul className="contact-details__socials">
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
          </div>
        ) : null}
      </div>
    </section>
  );
}
