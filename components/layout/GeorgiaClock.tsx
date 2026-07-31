"use client";

import { GeorgiaLiveClock } from "@/components/layout/GeorgiaLiveClock";
import { siteConfig } from "@/lib/constants";

/**
 * Footer clock block — same Georgia timezone logic as the hero metadata.
 */
export function GeorgiaClock() {
  return (
    <div className="site-footer__clock-block">
      <GeorgiaLiveClock className="site-footer__clock" />
      <p className="site-footer__location">{siteConfig.locationLabel}</p>
    </div>
  );
}
