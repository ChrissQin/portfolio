import { siteConfig, type SocialLinks } from "@/lib/constants";

export type ContactSocial = {
  label: string;
  href: string;
};

export type PendingSocial = {
  label: string;
  key: keyof SocialLinks;
};

const SOCIAL_LABELS: Array<[keyof SocialLinks, string]> = [
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["youtube", "YouTube"],
];

export function getActiveSocialLinks(
  socials: SocialLinks = siteConfig.socials,
): ContactSocial[] {
  return SOCIAL_LABELS.flatMap(([key, label]) => {
    const href = socials[key];
    return href ? [{ label, href }] : [];
  });
}

/**
 * Platforms requested in the footer UI that still need real URLs.
 * Omitted from production; shown as disabled placeholders in development.
 */
export function getPendingFooterSocials(
  socials: SocialLinks = siteConfig.socials,
): PendingSocial[] {
  const requested: Array<keyof SocialLinks> = ["instagram", "linkedin"];
  return requested.flatMap((key) => {
    if (socials[key]) {
      return [];
    }
    const entry = SOCIAL_LABELS.find(([socialKey]) => socialKey === key);
    return entry ? [{ key, label: entry[1] }] : [];
  });
}

/** True when at least one actionable contact channel is available. */
export function hasContactMethod(): boolean {
  return Boolean(
    siteConfig.email ||
      siteConfig.phoneHref ||
      getActiveSocialLinks().length > 0,
  );
}
