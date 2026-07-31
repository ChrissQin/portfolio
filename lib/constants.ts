export type SocialLinks = {
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
};

export type HeroMediaMode = "static" | "montage" | "showreel";

export type HeroRole = {
  text: string;
  emphasis: "primary" | "secondary" | "supporting";
};

/**
 * Canonical site origin for metadata and sitemap.
 * Override with NEXT_PUBLIC_SITE_URL when a production domain is ready.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Chris Qin",
  role: "Video Editor & Videographer",
  roles: [
    { text: "Video Editor", emphasis: "primary" },
    { text: "Videographer", emphasis: "secondary" },
  ] as const satisfies readonly HeroRole[],
  tagline:
    "Editing first. Shooting when the story needs it. Always thinking about pacing, sound, and what makes someone keep watching.",
  intro:
    "I cut, shoot, and shape videos for creators, brands, and ideas I care about.",
  email: "cqvisualscontact@gmail.com",
  phoneDisplay: "+1 (404) 567-3549",
  phoneHref: "tel:+14045673549",
  location: "Georgia, USA",
  locationLabel: "GEORGIA, USA",
  timezone: "America/New_York",
  /** Keep null — Instagram / LinkedIn are not shown on the public site. */
  socials: {
    instagram: null,
    linkedin: null,
    youtube: null,
  } satisfies SocialLinks,
  /** Keep null — résumé is not shown on the public site. */
  resumeUrl: null as string | null,
  /** Set when an availability line is provided. */
  availability: null as string | null,
  /** Default until montage or showreel media is supplied. */
  heroMediaMode: "static" as HeroMediaMode,
  /**
   * Final hero poster — waterfall frame; person near bottom center.
   */
  heroImage: "/hero/hero-waterfall.png" as string | null,
} as const;

/** Static link definitions are resolved through getPrimaryNavLinks() in lib/nav.ts. */
