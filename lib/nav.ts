import { siteConfig } from "@/lib/constants";
import { hasContactMethod } from "@/lib/contact";

export type NavLink = {
  href: string;
  label: string;
  index: string;
};

/**
 * Primary navigation with dynamic numbering. Contact is omitted until a real
 * contact method exists so visitors are not sent to an empty page.
 */
export function getPrimaryNavLinks(): NavLink[] {
  const links: Array<{ href: string; label: string }> = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  if (hasContactMethod()) {
    links.push({ href: "/contact", label: "Contact" });
  }

  if (siteConfig.resumeUrl) {
    links.push({ href: siteConfig.resumeUrl, label: "Resume" });
  }

  return links.map((link, index) => ({
    ...link,
    index: String(index + 1).padStart(2, "0"),
  }));
}
