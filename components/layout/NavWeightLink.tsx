"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  stagger,
  useAnimate,
  type AnimationOptions,
} from "framer-motion";

type NavWeightLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Nav link with sand pill on hover + letter weight morph (Originkit weight-hover pattern, Söhne).
 */
export function NavWeightLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavWeightLinkProps) {
  const fromWeight = 400;
  const toWeight = 700;
  const staggerDuration = 30;
  const staggerFrom = "first" as const;
  const [scope, animate] = useAnimate();
  const staggerSec = Math.max(0, staggerDuration) / 1000;

  const transition: AnimationOptions = useMemo(
    () => ({ type: "spring", duration: 0.45, bounce: 0.15 }),
    [],
  );

  const mergeStagger = (base: AnimationOptions): AnimationOptions => ({
    ...base,
    delay: stagger(staggerSec, { from: staggerFrom }),
  });

  const debouncedHoverStartRef = useRef<(() => void) | null>(null);
  const debouncedHoverEndRef = useRef<(() => void) | null>(null);
  const timerRefs = useRef({
    startTimer: null as ReturnType<typeof setTimeout> | null,
    startTrailing: false,
    endTimer: null as ReturnType<typeof setTimeout> | null,
    endTrailing: false,
  });

  useEffect(() => {
    const runStart = () => {
      void animate(
        ".nav-letter",
        { fontWeight: toWeight },
        mergeStagger(transition),
      );
    };

    const runEnd = () => {
      void animate(
        ".nav-letter",
        { fontWeight: fromWeight },
        mergeStagger(transition),
      );
    };

    const wait = 100;
    const t = timerRefs.current;

    debouncedHoverStartRef.current = () => {
      if (!t.startTimer) {
        runStart();
        t.startTimer = setTimeout(() => {
          if (t.startTrailing) {
            runStart();
          }
          t.startTrailing = false;
          t.startTimer = null;
        }, wait);
      } else {
        t.startTrailing = true;
      }
    };

    debouncedHoverEndRef.current = () => {
      if (!t.endTimer) {
        runEnd();
        t.endTimer = setTimeout(() => {
          if (t.endTrailing) {
            runEnd();
          }
          t.endTrailing = false;
          t.endTimer = null;
        }, wait);
      } else {
        t.endTrailing = true;
      }
    };

    return () => {
      if (t.startTimer) {
        clearTimeout(t.startTimer);
      }
      if (t.endTimer) {
        clearTimeout(t.endTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, transition]);

  const letters = label.split("");

  return (
    <Link
      href={href}
      className={`nen-header__link${className ? ` ${className}` : ""}`}
      onClick={onNavigate}
      onMouseEnter={() => debouncedHoverStartRef.current?.()}
      onMouseLeave={() => debouncedHoverEndRef.current?.()}
      onFocus={() => debouncedHoverStartRef.current?.()}
      onBlur={() => debouncedHoverEndRef.current?.()}
    >
      <span className="sr-only">{label}</span>
      <span ref={scope} className="nen-header__link-text" aria-hidden="true">
        {letters.map((letter, index) => (
          <motion.span
            key={`${label}-${index}`}
            className="nav-letter"
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              fontWeight: fromWeight,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}
