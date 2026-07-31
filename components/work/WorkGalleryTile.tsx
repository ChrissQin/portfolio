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
  const isPortraitSplit = project.galleryVariant === "portrait-split";
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
    isPortraitSplit
      ? "work-tile--portrait-split"
      : isVertical
        ? "work-tile--vertical"
        : "work-tile--horizontal",
    hasPoster ? "work-tile--has-media" : "",
    wide ? "work-tile--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const surfaceClass = `work-tile__surface${interactive ? " work-tile__surface--active" : ""}`;

  const playControl = canPlay ? (
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
  ) : null;

  const preview = (
    <ProjectPreview
      title={project.title}
      thumbnail={project.thumbnail}
      previewVideoUrl={project.previewVideoUrl}
      orientation={project.orientation}
      active={finePointer && interactive && !reducedMotion}
      sizes={
        isPortraitSplit
          ? "(max-width: 759px) 70vw, 18vw"
          : isVertical
            ? "(max-width: 759px) 100vw, 28vw"
            : "(max-width: 759px) 100vw, 50vw"
      }
    />
  );

  const standardMeta = (
    <>
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
    </>
  );

  const splitPanel = (
    <div className="work-tile__split-panel">
      <h3 className="work-tile__split-title">{project.title}</h3>
      {project.client ? (
        <p className="work-tile__split-client">{project.client}</p>
      ) : null}
      <p className="work-tile__split-meta">{project.contentType}</p>
      <p className="work-tile__split-meta">{roleLabel}</p>
      {hasYear ? <p className="work-tile__split-meta">{year}</p> : null}
      {project.subscriberContext ? (
        <p className="work-tile__split-meta">{project.subscriberContext}</p>
      ) : null}
      {project.recognition ? (
        <p className="work-tile__split-recognition">{project.recognition}</p>
      ) : null}
    </div>
  );

  return (
    <article className={tileClass}>
      <div
        className={surfaceClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {isPortraitSplit ? (
          <div className="work-tile__split">
            <div className="work-tile__split-media">
              <div className="work-tile__media work-tile__media--portrait">
                {preview}
                {playControl}
              </div>
            </div>
            {splitPanel}
          </div>
        ) : (
          <div className="work-tile__media">
            {preview}
            {standardMeta}
            {playControl}
          </div>
        )}
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
