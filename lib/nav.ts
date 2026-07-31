import { siteConfig } from "@/lib/constants";

export type NavLink = {
  href: string;
  label: string;
  index: string;
  /** DOM id without hash — used for focus after mobile menu close. */
  sectionId: string;
};

/**
 * Homepage section anchors. Numbered 01–03 to match the approved header style.
 * Plain hash hrefs preserve native scroll behavior (no Next.js route navigation).
 */
export function getPrimaryNavLinks(): NavLink[] {
  const links: Array<{ href: string; label: string; sectionId: string }> = [
    { href: "#work", label: "Work", sectionId: "work" },
    { href: "#about", label: "About", sectionId: "about" },
    { href: "#contact", label: "Contact", sectionId: "contact" },
  ];

  if (siteConfig.resumeUrl) {
    links.push({
      href: siteConfig.resumeUrl,
      label: "Resume",
      sectionId: "",
    });
  }

  return links.map((link, index) => ({
    ...link,
    index: String(index + 1).padStart(2, "0"),
  }));
}
