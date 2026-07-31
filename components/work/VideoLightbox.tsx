"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { getYouTubeEmbedSrc } from "@/lib/youtube";
import type { Orientation } from "@/lib/projects";

type VideoLightboxProps = {
  title: string;
  videoUrl: string;
  orientation: Orientation;
  onClose: () => void;
  /** Element that opened the lightbox — focus returns here on close. */
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

/**
 * Accessible inline YouTube lightbox. Iframe mounts only while open.
 */
export function VideoLightbox({
  title,
  videoUrl,
  orientation,
  onClose,
  returnFocusRef,
}: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const embedSrc = getYouTubeEmbedSrc(videoUrl, { autoplay: true });
  const isVertical = orientation === "vertical";

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnTarget = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnTarget?.focus();
    };
  }, [returnFocusRef]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  const onBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      handleClose();
    }
  };

  if (!embedSrc) {
    return null;
  }

  return (
    <div
      className="video-lightbox"
      role="presentation"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={dialogRef}
        className={`video-lightbox__dialog${isVertical ? " video-lightbox__dialog--vertical" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
      >
        <div className="video-lightbox__chrome">
          <h2 id={titleId} className="video-lightbox__title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="video-lightbox__close"
            onClick={handleClose}
            aria-label="Close video"
          >
            Close
            <span aria-hidden="true"> ✕</span>
          </button>
        </div>
        <div
          className={`video-lightbox__frame${isVertical ? " video-lightbox__frame--vertical" : ""}`}
        >
          <iframe
            className="video-lightbox__iframe"
            src={embedSrc}
            title={`${title} video player`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}
