import Link from "next/link";

import { getActiveSocialLinks } from "@/lib/contact";
import { siteConfig } from "@/lib/constants";
import { getPrimaryNavLinks } from "@/lib/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = getActiveSocialLinks();
  const email = siteConfig.email;
  const links = getPrimaryNavLinks().filter((link) => link.label !== "Resume");

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
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
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
            {siteConfig.resumeUrl ? (
              <li>
                <a href={siteConfig.resumeUrl} className="site-footer__link">
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
