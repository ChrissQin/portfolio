import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/constants";
import { getActiveSocialLinks } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = getActiveSocialLinks();
  const email = siteConfig.email;
  const resumeUrl = siteConfig.resumeUrl;

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__identity">
          <p className="site-footer__name">Chris Qin</p>
          <p className="site-footer__credit">Editor / Videographer</p>
          <p className="site-footer__year">{year}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="site-footer__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-footer__link">
                  {link.index} {link.label}
                </Link>
              </li>
            ))}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="site-footer__link">
                  Email
                </a>
              </li>
            ) : null}
            {resumeUrl ? (
              <li>
                <a href={resumeUrl} className="site-footer__link">
                  Resume
                </a>
              </li>
            ) : null}
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
