"use client";

import { useEffect, useRef, useState } from "react";

import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { Orientation } from "@/lib/projects";

type ProjectPreviewProps = {
  title: string;
  thumbnail: string | null;
  previewVideoUrl?: string | null;
  orientation: Orientation;
  active: boolean;
  /** Mobile/touch: user explicitly requested preview. */
  forcePreview?: boolean;
  sizes?: string;
};

/**
 * Poster-first media. Muted looping preview loads only after intentional
 * hover/focus (or explicit mobile play) — never eagerly on page load.
 */
export function ProjectPreview({
  title,
  thumbnail,
  previewVideoUrl,
  orientation,
  active,
  forcePreview = false,
  sizes,
}: ProjectPreviewProps) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const canPreview = Boolean(previewVideoUrl) && !reducedMotion;
  const intent = canPreview && (active || forcePreview);

  // Latch load intent during render (React-recommended prop→state sync).
  if (intent && !shouldLoadVideo) {
    setShouldLoadVideo(true);
  }

  const showVideo = shouldLoadVideo && intent;
  const aspectRatio = orientation === "vertical" ? "9 / 16" : "16 / 9";
  const imageSizes =
    sizes ??
    (orientation === "vertical"
      ? "(max-width: 899px) 80vw, 28vw"
      : "(max-width: 899px) 100vw, 70vw");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) {
      return;
    }

    if (showVideo) {
      void video.play().catch(() => {
        /* Autoplay can fail; poster remains visible underneath. */
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [showVideo, shouldLoadVideo]);

  return (
    <div
      className={`project-preview${showVideo ? " project-preview--playing" : ""}`}
    >
      <PlaceholderMedia
        src={thumbnail}
        alt={`${title} poster`}
        label={title}
        hint="Poster needed"
        aspectRatio={aspectRatio}
        motif={orientation === "vertical" ? "vertical" : "frame"}
        className="project-preview__poster"
        sizes={imageSizes}
      />
      {shouldLoadVideo && previewVideoUrl ? (
        <video
          ref={videoRef}
          className="project-preview__video"
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden={!showVideo}
          onLoadedData={() => {
            if (showVideo) {
              void videoRef.current?.play().catch(() => undefined);
            }
          }}
        >
          <source src={previewVideoUrl} />
        </video>
      ) : null}
    </div>
  );
}
