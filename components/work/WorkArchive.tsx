"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { placeholderWork } from "@/data/placeholders";
import { PaletteMasonry } from "@/components/work/PaletteMasonry";
import { WorkCursorProvider } from "@/components/work/WorkCursorProvider";
import {
  WORK_FILTERS,
  type WorkFilter,
} from "@/components/work/work-filters";

/** Explicit order for /work Short-form only (homepage All works unchanged). */
const WORK_PAGE_SHORT_FORM_ORDER = [
  "twine-yc-s23",
  "btrt-run-club",
  "uni-uni-boba",
  "toppings-masshole-donuts",
  "dandre-mckenzie-polymarket",
  "anand-valavalkar",
  "dreamcollege-ai",
] as const;

type WorkArchiveProps = {
  variant?: "home" | "page";
  limit?: number;
  showExploreMore?: boolean;
};

export function WorkArchive({
  variant = "page",
  limit,
  showExploreMore = false,
}: WorkArchiveProps) {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const isHome = variant === "home";
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isHome) return;

    const updatePinnedHeader = () => {
      const track = trackRef.current;
      const header = headerRef.current;
      const placeholder = placeholderRef.current;
      const marquee = document.querySelector<HTMLElement>(".nen-marquee");

      if (!track || !header) return;

      const headerHeight = header.offsetHeight;
      const trackRect = track.getBoundingClientRect();
      const marqueeTop = marquee?.getBoundingClientRect().top ?? Infinity;

      let isPinned = false;
      let top = 0;

      if (marqueeTop <= headerHeight) {
        isPinned = true;
        top = marqueeTop - headerHeight;
      } else if (trackRect.top < 0) {
        isPinned = true;
        top = 0;
      }

      header.classList.toggle("nen-work__header--pinned", isPinned);
      header.style.top = isPinned ? `${top}px` : "";

      if (placeholder) {
        const marginBottom = Number.parseFloat(
          getComputedStyle(header).marginBottom
        );
        const spacer = headerHeight + (Number.isFinite(marginBottom) ? marginBottom : 0);
        placeholder.style.height = isPinned ? `${spacer}px` : "0px";
      }
    };

    const onResize = () => {
      updatePinnedHeader();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(updatePinnedHeader);
    });

    window.addEventListener("scroll", updatePinnedHeader, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(updatePinnedHeader);
    const header = headerRef.current;
    if (header) {
      resizeObserver.observe(header);
    }

    const marquee = document.querySelector<HTMLElement>(".nen-marquee");
    if (marquee) {
      resizeObserver.observe(marquee);
    }

    const explore = document.querySelector<HTMLElement>(".nen-work__footer");
    if (explore) {
      resizeObserver.observe(explore);
    }

    const layoutObserver = new ResizeObserver(onResize);
    if (marquee) {
      layoutObserver.observe(marquee);
    }
    if (explore) {
      layoutObserver.observe(explore);
    }

    return () => {
      window.removeEventListener("scroll", updatePinnedHeader);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      layoutObserver.disconnect();
    };
  }, [isHome]);

  const items = useMemo(() => {
    let filtered =
      filter === "all"
        ? placeholderWork
        : placeholderWork.filter((item) => item.category === filter);

    // Product filter: Peer before Georgia Paint (home + /work).
    if (filter === "product") {
      filtered = [...filtered].sort((a, b) => {
        if (a.slug === "peer-yc-s26") return -1;
        if (b.slug === "peer-yc-s26") return 1;
        return 0;
      });
    }

    // /work Short-form: fixed sequence for real projects, placeholders after.
    if (!isHome && filter === "short-form") {
      const rank = new Map<string, number>(
        WORK_PAGE_SHORT_FORM_ORDER.map((slug, index) => [slug, index]),
      );
      filtered = [...filtered].sort((a, b) => {
        const aRank = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
        const bRank = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
        if (aRank !== bRank) return aRank - bRank;
        return 0;
      });
    }

    const effectiveLimit =
      isHome && (filter === "product" || filter === "narrative")
        ? 3
        : isHome && filter === "short-form"
          ? 6
          : limit;

    return typeof effectiveLimit === "number"
      ? filtered.slice(0, effectiveLimit)
      : filtered;
  }, [filter, isHome, limit]);

  return (
    <section
      id={isHome ? "work" : undefined}
      className={`nen-work${isHome ? " nen-work--home" : " nen-work--page"}`}
      aria-labelledby={isHome ? "nen-work-heading" : "work-page-heading"}
      tabIndex={isHome ? -1 : undefined}
    >
      {isHome ? (
        <div className="nen-work__sticky-track" ref={trackRef}>
          <div
            ref={headerRef}
            className="nen-work__header nen-work__header--sticky"
          >
            <div className="nen-container nen-work__header-inner">
              <h2 id="nen-work-heading" className="nen-section-title">
                Select Work
              </h2>
              <WorkFilterBar filter={filter} onFilterChange={setFilter} />
            </div>
          </div>
          <div
            ref={placeholderRef}
            className="nen-work__header-placeholder"
            aria-hidden="true"
          />

          <div className="nen-container">
            <WorkCursorProvider>
              <PaletteMasonry items={items} tagVariant="home" filter={filter} />
            </WorkCursorProvider>

            {showExploreMore ? (
              <div className="nen-work__footer">
                <Link href="/work" className="nen-work__more">
                  Explore more work
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="nen-container">
          <>
            <h1 id="work-page-heading" className="nen-work__hero-headline">
              Versatile work that creates a
              <span className="nen-work__hero-phrase">resonant experience</span>
            </h1>
            <div className="nen-work__page-filters">
              <WorkFilterBar filter={filter} onFilterChange={setFilter} />
            </div>
          </>

          <WorkCursorProvider>
            <PaletteMasonry items={items} tagVariant="page" filter={filter} />
          </WorkCursorProvider>
        </div>
      )}
    </section>
  );
}

function WorkFilterBar({
  filter,
  onFilterChange,
}: {
  filter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
}) {
  return (
    <div
      className="nen-work__filters"
      role="group"
      aria-label="Filter work by category"
    >
      {WORK_FILTERS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nen-pill${filter === item.id ? " nen-pill--active" : ""}`}
          aria-pressed={filter === item.id}
          onClick={() => onFilterChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
