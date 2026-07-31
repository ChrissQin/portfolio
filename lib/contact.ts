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
 * Instagram, LinkedIn, and résumé are intentionally omitted from the public
 * site until real URLs are supplied. Never render empty/disabled social labels.
 */
export function getPendingFooterSocials(): PendingSocial[] {
  return [];
}

/** True when at least one actionable contact channel is available. */
export function hasContactMethod(): boolean {
  return Boolean(
    siteConfig.email ||
      siteConfig.phoneHref ||
      getActiveSocialLinks().length > 0,
  );
}
