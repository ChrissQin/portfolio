import { GeorgiaClock } from "@/components/layout/GeorgiaClock";
import {
  getActiveSocialLinks,
  getPendingFooterSocials,
} from "@/lib/contact";
import { siteConfig } from "@/lib/constants";

const FOOTER_NAV = [
  { href: "/#top", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
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
    <footer id="contact" className="site-footer" tabIndex={-1}>
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
                <a href={link.href} className="site-footer__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <p className="site-footer__eyebrow">Get in touch</p>
          {email ? (
            <a href={`mailto:${email}`} className="site-footer__contact-link">
              {email}
            </a>
          ) : null}
          {phoneDisplay && phoneHref ? (
            <a href={phoneHref} className="site-footer__contact-link">
              {phoneDisplay}
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
                    {social.label}
                  </a>
                </li>
              ))}
              {pendingSocials.map((social) => (
                <li key={social.key}>
                  <span
                    className="site-footer__nav-link site-footer__nav-link--disabled"
                    aria-disabled="true"
                  >
                    {social.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="container site-footer__closing">
        <GeorgiaClock />
        <p className="site-footer__copyright">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
