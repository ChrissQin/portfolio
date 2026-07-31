import Link from "next/link";

import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { FooterMarquee } from "@/components/layout/FooterMarquee";
import { GeorgiaClock } from "@/components/layout/GeorgiaClock";
import {
  getActiveSocialLinks,
  getPendingFooterSocials,
} from "@/lib/contact";
import { siteConfig } from "@/lib/constants";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = getActiveSocialLinks();
  const pendingSocials =
    process.env.NODE_ENV !== "production" ? getPendingFooterSocials() : [];
  const email = siteConfig.email;
  const phoneDisplay = siteConfig.phoneDisplay;
  const phoneHref = siteConfig.phoneHref;
  const showSocialBlock = socials.length > 0 || pendingSocials.length > 0;

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container site-footer__top">
        <div className="site-footer__identity">
          <p className="site-footer__name">{siteConfig.name}</p>
          <ul className="site-footer__roles">
            {siteConfig.roles.map((role) => (
              <li key={role.text}>{role.text}</li>
            ))}
          </ul>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <p className="site-footer__eyebrow">Menu</p>
          <ul className="site-footer__nav-list">
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-footer__nav-link">
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <p className="site-footer__eyebrow">Get in touch</p>
          {email ? (
            <div className="site-footer__contact-stack">
              <a href={`mailto:${email}`} className="site-footer__contact-link">
                <span>{email}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <CopyEmailButton email={email} />
            </div>
          ) : null}
          {phoneDisplay && phoneHref ? (
            <a href={phoneHref} className="site-footer__contact-link">
              <span>{phoneDisplay}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        {showSocialBlock ? (
          <div className="site-footer__socials">
            <p className="site-footer__eyebrow">Social</p>
            <ul className="site-footer__nav-list">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__nav-link"
                  >
                    <span>{social.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              {pendingSocials.map((social) => (
                <li key={social.key}>
                  <span
                    className="site-footer__nav-link site-footer__nav-link--disabled"
                    aria-disabled="true"
                  >
                    <span>{social.label}</span>
                    <span className="site-footer__needed">URL needed</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="container site-footer__meta">
        <GeorgiaClock />
      </div>

      <FooterMarquee />

      <div className="container site-footer__bottom">
        <p className="site-footer__copyright">
          © {year} {siteConfig.name.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
