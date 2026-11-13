"use client";

import { useRef, useState } from "react";

import { getWorkCardRatio } from "@/components/work/palette-layouts";
import { VideoLightbox } from "@/components/work/VideoLightbox";
import type { WorkOrientation } from "@/data/placeholders";
import { useWorkCursor } from "@/components/work/WorkCursorProvider";
import { getYouTubeVideoId } from "@/lib/youtube";

type PaletteWorkCardProps = {
  gradient: string;
  title: string;
  categoryLabel: string;
  subCategoryLabel?: string;
  tagVariant?: "home" | "page";
  orientation?: WorkOrientation;
  frameRatio?: string;
  index: number;
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
  href,
  thumbnail,
  thumbnailPosition,
}: PaletteWorkCardProps) {
  const { bindSurface, moveSurface } = useWorkCursor();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasThumbnail = Boolean(thumbnail?.trim());
  const youtubeId = getYouTubeVideoId(href);
  const playsInline = Boolean(youtubeId);
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
        className="nen-palette-card__media"
        style={{
          aspectRatio: frameRatio ?? getWorkCardRatio(orientation, index),
        }}
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
    <article className="nen-palette-card" aria-label={title}>
      {playsInline && href ? (
        <button
          ref={triggerRef}
          type="button"
          className="nen-palette-card__link nen-palette-card__link--button"
          data-dot-cursor="fill"
          aria-label={`Play ${title}`}
          onClick={() => setLightboxOpen(true)}
        >
          {surface}
        </button>
      ) : href ? (
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

      {lightboxOpen && href ? (
        <VideoLightbox
          title={title}
          detail={tagLabel}
          videoUrl={href}
          orientation={orientation === "vertical" ? "vertical" : "horizontal"}
          onClose={() => setLightboxOpen(false)}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </article>
  );
}
