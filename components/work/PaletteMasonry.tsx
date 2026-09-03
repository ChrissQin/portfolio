"use client";

import { useEffect, useMemo, useState } from "react";

import type { PlaceholderWork } from "@/data/placeholders";
import { getCategoryFilterFrameRatio } from "@/components/work/palette-layouts";
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

function distributeToColumns<T>(items: T[], columnCount: number): T[][] {
  const columns = Array.from({ length: columnCount }, () => [] as T[]);
  items.forEach((item, index) => {
    columns[index % columnCount]!.push(item);
  });
  return columns;
}

function hasFixedFrameTail(item?: PlaceholderWork): boolean {
  return item?.orientation === "horizontal" || Boolean(item?.frameRatio);
}

function shouldFillColumnEnd(
  columnItems: PlaceholderWork[],
  itemIndex: number,
): boolean {
  const lastItem = columnItems[columnItems.length - 1];
  const currentItem = columnItems[itemIndex];
  const isLast = itemIndex === columnItems.length - 1;
  const isSecondToLast = itemIndex === columnItems.length - 2;

  if (isLast) {
    return !hasFixedFrameTail(lastItem);
  }

  if (
    isSecondToLast &&
    hasFixedFrameTail(lastItem) &&
    !currentItem?.frameRatio
  ) {
    return true;
  }

  return false;
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

  // Homepage All works: Peer left, Twine middle, Georgia Paint right.
  const displayColumns = useMemo(() => {
    if (
      tagVariant === "home" &&
      filter === "all" &&
      columnCount === 3 &&
      columns.length === 3
    ) {
      return [
        { items: columns[1]!, sourceIndex: 1 },
        { items: columns[2]!, sourceIndex: 2 },
        { items: columns[0]!, sourceIndex: 0 },
      ];
    }

    return columns.map((items, sourceIndex) => ({ items, sourceIndex }));
  }, [columns, columnCount, filter, tagVariant]);

  return (
    <div
      className={`nen-work__masonry-columns${denserShortForm ? " nen-work__masonry-columns--short-form" : ""}`}
    >
      {displayColumns.map(({ items: columnItems, sourceIndex }, columnIndex) => (
        <div key={sourceIndex} className="nen-work__masonry-column">
          {columnItems.map((project, itemIndex) => {
            const globalIndex = itemIndex * columnCount + sourceIndex;
            const fillColumnEnd = isCategoryFilter
              ? false
              : shouldFillColumnEnd(columnItems, itemIndex);

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
                frameRatio={
                  isCategoryFilter ? categoryFrameRatio : project.frameRatio
                }
                index={globalIndex}
                fillColumnEnd={fillColumnEnd}
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
