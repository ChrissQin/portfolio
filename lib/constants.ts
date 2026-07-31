export type SocialLinks = {
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
};

export type HeroMediaMode = "static" | "montage" | "showreel";

export const siteConfig = {
  name: "Chris Qin",
  role: "Video Editor & Videographer",
  roles: ["Video Editor", "Videographer", "Creative Production"] as const,
  tagline:
    "Editing first. Shooting when the story needs it. Always thinking about pacing, sound, and what makes someone keep watching.",
  intro:
    "I cut, shoot, and shape videos for creators, brands, and ideas I care about.",
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
  heroImage: null as string | null,
} as const;

/** Static link definitions are resolved through getPrimaryNavLinks() in lib/nav.ts. */
