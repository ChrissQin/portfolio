import { MobileNav } from "@/components/layout/MobileNav";
import { getPrimaryNavLinks } from "@/lib/nav";

export function SiteHeader() {
  const links = getPrimaryNavLinks();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="site-header__brand">
          Chris Qin
        </a>

        <nav aria-label="Primary" className="site-header__desktop">
          <ul className="site-header__links">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="site-header__link">
                  <span className="site-header__index">{link.index}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
