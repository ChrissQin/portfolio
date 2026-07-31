"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { VideoLightbox } from "@/components/work/VideoLightbox";
import { usePrefersReducedMotion } from "@/lib/motion";
import { formatProjectRoles, type Project } from "@/lib/projects";
import { getYouTubeVideoId } from "@/lib/youtube";

type WorkGalleryTileProps = {
  project: Project;
  /** When true, tile spans the full grid row (e.g. third of three). */
  wide?: boolean;
};

/**
 * Portfolio tile. Never navigates externally.
 * When a YouTube videoUrl is present, a play control opens an on-page lightbox.
 */
export function WorkGalleryTile({ project, wide = false }: WorkGalleryTileProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const roleLabel = formatProjectRoles(project.roles);
  const interactive = hovered || focused;
  const isVertical = project.orientation === "vertical";
  const year = project.year?.trim();
  const hasYear = Boolean(year && year !== "—");
  const hasPoster = Boolean(project.thumbnail?.trim());
  const canPlay =
    project.videoProvider === "youtube" &&
    Boolean(getYouTubeVideoId(project.videoUrl));

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const tileClass = [
    "work-tile",
    isVertical ? "work-tile--vertical" : "work-tile--horizontal",
    hasPoster ? "work-tile--has-media" : "",
    wide ? "work-tile--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const surfaceClass = `work-tile__surface${interactive ? " work-tile__surface--active" : ""}`;

  return (
    <article className={tileClass}>
      <div
        className={surfaceClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className="work-tile__media">
          <ProjectPreview
            title={project.title}
            thumbnail={project.thumbnail}
            previewVideoUrl={project.previewVideoUrl}
            orientation={project.orientation}
            active={finePointer && interactive && !reducedMotion}
            sizes={
              isVertical
                ? "(max-width: 759px) 100vw, 28vw"
                : "(max-width: 759px) 100vw, 50vw"
            }
          />
          <div className="work-tile__shade" aria-hidden="true" />
          <div className="work-tile__meta">
            <h3 className="work-tile__title">{project.title}</h3>
            <div className="work-tile__meta-end">
              <p className="work-tile__detail">
                <span>{project.contentType}</span>
                <span aria-hidden="true"> · </span>
                <span>{roleLabel}</span>
                {hasYear ? (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span>{year}</span>
                  </>
                ) : null}
                {project.subscriberContext ? (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span>{project.subscriberContext}</span>
                  </>
                ) : null}
              </p>
              {project.recognition ? (
                <p className="work-tile__recognition">{project.recognition}</p>
              ) : null}
            </div>
          </div>

          {canPlay ? (
            <button
              ref={playButtonRef}
              type="button"
              className="work-tile__play"
              aria-label={`Play ${project.title}`}
              onClick={() => setLightboxOpen(true)}
            >
              <span className="work-tile__play-icon" aria-hidden="true" />
              <span className="work-tile__play-label">Play</span>
            </button>
          ) : null}
        </div>
      </div>

      {lightboxOpen && canPlay && project.videoUrl ? (
        <VideoLightbox
          title={project.title}
          videoUrl={project.videoUrl}
          orientation={project.orientation}
          onClose={() => setLightboxOpen(false)}
          returnFocusRef={playButtonRef}
        />
      ) : null}
    </article>
  );
}
