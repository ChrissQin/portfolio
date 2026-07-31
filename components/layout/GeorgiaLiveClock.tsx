"use client";

import { useEffect, useState } from "react";

import { formatGeorgiaDate, formatGeorgiaTime } from "@/lib/georgiaTime";

type GeorgiaLiveClockProps = {
  className?: string;
  showDate?: boolean;
};

/**
 * Client-only Georgia (America/New_York) clock — shared by footer and hero.
 * Starts null to avoid SSR/client hydration mismatches.
 */
export function useGeorgiaLiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return {
    ready: now !== null,
    time: now ? formatGeorgiaTime(now) : "00:00:00",
    date: now ? formatGeorgiaDate(now) : "———— ——",
  };
}

export function GeorgiaLiveClock({
  className = "",
  showDate = false,
}: GeorgiaLiveClockProps) {
  const { ready, time, date } = useGeorgiaLiveClock();

  return (
    <div className={className}>
      {showDate ? (
        <p className="georgia-clock__date" aria-hidden={!ready}>
          {date}
        </p>
      ) : null}
      <p
        className={`georgia-clock__time${!ready ? " georgia-clock__time--pending" : ""}`}
        aria-live="off"
        aria-label={
          ready ? `Current time in Georgia: ${time}` : "Current time in Georgia"
        }
      >
        <time dateTime={ready ? time : undefined} className="georgia-clock__digits">
          {time}
        </time>
      </p>
    </div>
  );
}
