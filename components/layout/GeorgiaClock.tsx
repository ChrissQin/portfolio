"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/constants";

function formatGeorgiaTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Live clock locked to Georgia (America/New_York) so EST/EDT track automatically.
 * Client-only to avoid SSR/client hydration mismatches.
 */
export function GeorgiaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatGeorgiaTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="site-footer__clock-block">
      <p
        className={`site-footer__clock${time ? "" : " site-footer__clock--pending"}`}
        aria-live="off"
        aria-label={
          time
            ? `Current time in Georgia: ${time}`
            : "Current time in Georgia"
        }
      >
        <time dateTime={time ?? undefined} className="site-footer__clock-digits">
          {time ?? "00:00:00"}
        </time>
      </p>
      <p className="site-footer__location">{siteConfig.locationLabel}</p>
    </div>
  );
}
