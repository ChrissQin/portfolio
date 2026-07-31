import { siteConfig, type SocialLinks } from "@/lib/constants";

export type ContactSocial = {
  label: string;
  href: string;
};

export function getActiveSocialLinks(
  socials: SocialLinks = siteConfig.socials,
): ContactSocial[] {
  const entries: Array<[keyof SocialLinks, string]> = [
    ["instagram", "Instagram"],
    ["linkedin", "LinkedIn"],
    ["youtube", "YouTube"],
  ];

  return entries.flatMap(([key, label]) => {
    const href = socials[key];
    return href ? [{ label, href }] : [];
  });
}

/** True when at least one actionable contact channel is available. */
export function hasContactMethod(): boolean {
  return Boolean(siteConfig.email || getActiveSocialLinks().length > 0);
}
