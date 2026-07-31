import { siteConfig } from "@/lib/constants";

export function formatGeorgiaTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatGeorgiaDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timezone,
    month: "long",
    day: "numeric",
  })
    .format(date)
    .toUpperCase();
}
