"use client";

import { useEffect, useRef, useState } from "react";

import type { PortfolioStat } from "@/data/stats";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/motion";

type StatCounterProps = {
  stat: PortfolioStat;
  delayMs?: number;
};

const DURATION_MS = 1200;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function StatCounter({ stat, delayMs = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, 0.25);
  const reducedMotion = usePrefersReducedMotion();
  const [animated, setAnimated] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reducedMotion) {
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const target = stat.value;

    const timeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        if (start === null) {
          start = timestamp;
        }
        const progress = Math.min(1, (timestamp - start) / DURATION_MS);
        const current = Math.round(easeOutCubic(progress) * target);
        setAnimated(String(current));
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };
      frame = window.requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [inView, reducedMotion, stat.value, delayMs]);

  const display = reducedMotion
    ? String(stat.value)
    : !inView
      ? "0"
      : (animated ?? "0");

  return (
    <div ref={ref} className="by-numbers__stat">
      <span className="by-numbers__plus" aria-hidden="true">
        +
      </span>
      <p className="by-numbers__label">{stat.label}</p>
      <p
        className="by-numbers__value"
        aria-label={stat.accessibleValue}
      >
        <span aria-hidden="true">
          {stat.prefix}
          <span>{display}</span>
          {stat.suffix}
        </span>
      </p>
      <p className="by-numbers__description">{stat.description}</p>
      <span className="by-numbers__plus by-numbers__plus--bottom" aria-hidden="true">
        +
      </span>
    </div>
  );
}
