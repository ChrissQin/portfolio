"use client";

import { useEffect, useMemo, useState } from "react";

import type { PlaceholderWork } from "@/data/placeholders";
import {
  getCategoryFilterFrameRatio,
  HORIZONTAL_FRAME_RATIO,
  VERTICAL_FRAME_RATIO,
} from "@/components/work/palette-layouts";
import { PaletteWorkCard } from "@/components/work/PaletteWorkCard";
import type { WorkFilter } from "@/components/work/work-filters";

function useMasonryColumnCount(options?: {
  denserShortForm?: boolean;
}) {
  const denserShortForm = Boolean(options?.denserShortForm);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 640px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const wide = window.matchMedia("(min-width: 1280px)");

    const update = () => {
      if (denserShortForm) {
        if (wide.matches) setColumnCount(5);
        else if (desktop.matches) setColumnCount(4);
        else if (tablet.matches) setColumnCount(3);
        else setColumnCount(2);
        return;
      }

      if (desktop.matches) setColumnCount(3);
      else if (tablet.matches) setColumnCount(2);
      else setColumnCount(1);
    };

    update();
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);
    wide.addEventListener("change", update);

    return () => {
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, [denserShortForm]);

  return columnCount;
}

/** CSS aspect-ratio is width / height; return height / width for packing. */
function frameHeightRatio(item: PlaceholderWork): number {
  const raw =
    item.frameRatio ??
    (item.orientation === "vertical"
      ? VERTICAL_FRAME_RATIO
      : item.orientation === "horizontal"
        ? HORIZONTAL_FRAME_RATIO
        : HORIZONTAL_FRAME_RATIO);

  const parts = raw.split("/").map((part) => Number(part.trim()));
  const width = parts[0];
  const height = parts[1];
  if (!width || !height || !Number.isFinite(width) || !Number.isFinite(height)) {
    return 9.8 / 16;
  }
  return height / width;
}

/** Pack into the shortest column so mixed ratios stay balanced. */
function distributeToColumns(
  items: PlaceholderWork[],
  columnCount: number,
): PlaceholderWork[][] {
  const columns = Array.from({ length: columnCount }, () => [] as PlaceholderWork[]);
  const heights = Array.from({ length: columnCount }, () => 0);

  for (const item of items) {
    let target = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i]! < heights[target]!) target = i;
    }
    columns[target]!.push(item);
    heights[target]! += frameHeightRatio(item);
  }

  return columns;
}

function resolveFrameRatio(
  project: PlaceholderWork,
  isCategoryFilter: boolean,
  categoryFrameRatio: string | undefined,
): string | undefined {
  if (isCategoryFilter) return categoryFrameRatio;
  if (project.frameRatio) return project.frameRatio;
  if (project.orientation === "vertical") return VERTICAL_FRAME_RATIO;
  if (project.orientation === "horizontal") return HORIZONTAL_FRAME_RATIO;
  return undefined;
}

type PaletteMasonryProps = {
  items: PlaceholderWork[];
  tagVariant?: "home" | "page";
  /** When set to a category, all cards use that category's fixed aspect ratio. */
  filter?: WorkFilter;
};

export function PaletteMasonry({
  items,
  tagVariant = "home",
  filter = "all",
}: PaletteMasonryProps) {
  const denserShortForm = tagVariant === "page" && filter === "short-form";
  const columnCount = useMasonryColumnCount({ denserShortForm });
  const columns = useMemo(
    () => distributeToColumns(items, columnCount),
    [items, columnCount],
  );
  const isCategoryFilter = filter !== "all";
  const categoryFrameRatio = isCategoryFilter
    ? getCategoryFilterFrameRatio(filter)
    : undefined;

  return (
    <div
      className={`nen-work__masonry-columns${denserShortForm ? " nen-work__masonry-columns--short-form" : ""}`}
    >
      {columns.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="nen-work__masonry-column">
          {columnItems.map((project, itemIndex) => {
            const globalIndex = itemIndex * columnCount + columnIndex;

            return (
              <PaletteWorkCard
                key={project.slug}
                gradient={project.gradient}
                title={project.title}
                categoryLabel={project.categoryLabel}
                subCategoryLabel={project.subCategoryLabel}
                tagVariant={tagVariant}
                orientation={
                  isCategoryFilter
                    ? filter === "short-form"
                      ? "vertical"
                      : "horizontal"
                    : project.orientation
                }
                frameRatio={resolveFrameRatio(
                  project,
                  isCategoryFilter,
                  categoryFrameRatio,
                )}
                index={globalIndex}
                href={project.href}
                thumbnail={project.thumbnail}
                thumbnailPosition={project.thumbnailPosition}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
