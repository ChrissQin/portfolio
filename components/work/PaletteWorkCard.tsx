"use client";

import { getWorkCardRatio } from "@/components/work/palette-layouts";
import type { WorkOrientation } from "@/data/placeholders";
import { useWorkCursor } from "@/components/work/WorkCursorProvider";

type PaletteWorkCardProps = {
  gradient: string;
  title: string;
  categoryLabel: string;
  subCategoryLabel?: string;
  tagVariant?: "home" | "page";
  orientation?: WorkOrientation;
  frameRatio?: string;
  index: number;
  fillColumnEnd?: boolean;
  href?: string;
  thumbnail?: string | null;
  thumbnailPosition?: string;
};

export function PaletteWorkCard({
  gradient,
  title,
  categoryLabel,
  subCategoryLabel,
  tagVariant = "home",
  orientation,
  frameRatio,
  index,
  fillColumnEnd = false,
  href,
  thumbnail,
  thumbnailPosition,
}: PaletteWorkCardProps) {
  const { bindSurface, moveSurface } = useWorkCursor();
  const hasThumbnail = Boolean(thumbnail?.trim());
  const tagLabel =
    tagVariant === "page" && subCategoryLabel ? subCategoryLabel : categoryLabel;

  const surface = (
    <div
      className="nen-palette-card__surface"
      onPointerEnter={(e) => {
        bindSurface(e.currentTarget);
        moveSurface(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        moveSurface(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerLeave={() => {
        bindSurface(null);
      }}
    >
      <div
        className={`nen-palette-card__media${fillColumnEnd ? " nen-palette-card__media--fill" : ""}`}
        style={
          fillColumnEnd ? undefined : { aspectRatio: frameRatio ?? getWorkCardRatio(orientation, index) }
        }
      >
        {hasThumbnail ? (
          <img
            src={thumbnail!}
            alt=""
            className="nen-palette-card__thumb nen-palette-card__thumb--image"
            style={
              thumbnailPosition
                ? { objectPosition: thumbnailPosition }
                : undefined
            }
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div
            className="nen-palette-card__thumb"
            style={{ background: gradient }}
            role="img"
            aria-hidden="true"
          />
        )}
        <div className="nen-palette-card__scrim" aria-hidden="true" />
        <div className="nen-palette-card__copy">
          <h3 className="nen-palette-card__title">{title}</h3>
          <span
            className={`nen-palette-card__tag${tagVariant === "page" && subCategoryLabel ? " nen-palette-card__tag--sub" : ""}`}
          >
            {tagLabel}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <article
      className={`nen-palette-card${fillColumnEnd ? " nen-palette-card--fill" : ""}`}
      aria-label={title}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="nen-palette-card__link"
          data-dot-cursor="fill"
          aria-label={`${title} — opens in a new tab`}
        >
          {surface}
        </a>
      ) : (
        surface
      )}
    </article>
  );
}
