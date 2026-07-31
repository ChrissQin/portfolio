import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/constants";

/** One-page site — only the homepage is a public document. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();

  return [
    {
      url: origin,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
