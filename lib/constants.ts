export type SocialLinks = {
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
};

export type HeroMediaMode = "static" | "montage" | "showreel";

export const siteConfig = {
  name: "Chris Qin",
  role: "Video Editor & Videographer",
  tagline:
    "I shape footage into engaging stories through pacing, sound, and purposeful visuals.",
  /** Replace with the final portfolio email before launch. */
  email: null as string | null,
  socials: {
    instagram: null,
    linkedin: null,
    youtube: null,
  } satisfies SocialLinks,
  /** Set when a resume PDF or URL is provided. */
  resumeUrl: null as string | null,
  /** Set when an availability line is provided. */
  availability: null as string | null,
  /** Default until montage or showreel media is supplied. */
  heroMediaMode: "static" as HeroMediaMode,
  /**
   * Static poster for the hero. Using a development placeholder until a real
   * featured still is provided. Montage/showreel modes are not enabled yet.
   */
  heroImage: "/projects/project-01/poster.svg" as string | null,
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
