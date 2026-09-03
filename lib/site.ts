export const site = {
  name: "Chris Qin",
  logo: "/brand/cq-mark.png",
  title: "CQVISUALS | Video Studio for Companies & Creators",
  shareTitle: "Video Studio for Companies & Creators",
  description:
    "Strategy, design, and video for teams shaping what comes next.",
  marqueeText: "Let's create something great",
  email: "hello@placeholder.studio",
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer-only links — includes pages not shown in the primary header nav. */
export const footerNavLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/photography", label: "Photography" },
  { href: "/contact", label: "Contact" },
] as const;

export type FooterSocialId = "linkedin" | "instagram" | "youtube";

export const footerSocialLinks: ReadonlyArray<{
  id: FooterSocialId;
  href: string;
  label: string;
}> = [
  { id: "linkedin", href: "https://www.linkedin.com/in/thechrisqin/", label: "LinkedIn" },
  { id: "instagram", href: "https://www.instagram.com/_cqvisuals/", label: "Instagram" },
  { id: "youtube", href: "https://www.youtube.com/@chrisqinvisuals?sub_confirmation=1", label: "YouTube" },
];
