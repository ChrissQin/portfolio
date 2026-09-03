"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { PlaceholderPhoto } from "@/data/placeholders";

function usePhotoColumnCount() {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1100px)");

    const update = () => {
      if (desktop.matches) setColumnCount(4);
      else if (tablet.matches) setColumnCount(3);
      else setColumnCount(2);
    };

    update();
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);

    return () => {
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return columnCount;
}

/** Approximate flex gap as a height ratio (~1rem at ~420px column width). */
const COLUMN_GAP_RATIO = 0.024;

function distributeToColumns(
  photos: PlaceholderPhoto[],
  columnCount: number,
): PlaceholderPhoto[][] {
  const columns = Array.from({ length: columnCount }, () => [] as PlaceholderPhoto[]);
  const columnHeights = Array.from({ length: columnCount }, () => 0);

  for (const photo of photos) {
    let targetColumn = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnHeights[i]! < columnHeights[targetColumn]!) {
        targetColumn = i;
      }
    }

    columns[targetColumn]!.push(photo);
    if (columns[targetColumn]!.length > 1) {
      columnHeights[targetColumn]! += COLUMN_GAP_RATIO;
    }
    columnHeights[targetColumn]! += photo.height / photo.width;
  }

  return columns;
}

type PhotoMasonryProps = {
  photos: PlaceholderPhoto[];
};

export function PhotoMasonry({ photos }: PhotoMasonryProps) {
  const columnCount = usePhotoColumnCount();
  const columns = useMemo(
    () => distributeToColumns(photos, columnCount),
    [photos, columnCount],
  );

  return (
    <div className="nen-photo__columns">
      {columns.map((columnPhotos, columnIndex) => (
        <div key={columnIndex} className="nen-photo__column">
          {columnPhotos.map((photo) => (
            <figure key={photo.id} className="nen-photo__figure">
              <div
                className="nen-photo__frame"
                style={{ aspectRatio: photo.aspectRatio }}
              >
                <Image
                  className="nen-photo__image"
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1100px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
            </figure>
          ))}
          <div className="nen-photo__column-fill" aria-hidden />
        </div>
      ))}
    </div>
  );
}
