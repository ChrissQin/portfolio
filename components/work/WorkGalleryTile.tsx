"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { VideoLightbox } from "@/components/work/VideoLightbox";
import { usePrefersReducedMotion } from "@/lib/motion";
import { formatProjectRoles, type Project } from "@/lib/projects";
import { getYouTubeVideoId } from "@/lib/youtube";

type WorkGalleryTileProps = {
  project: Project;
  /** @deprecated Unused in studio layout — kept for call-site compatibility. */
  wide?: boolean;
};

/**
 * Portfolio tile. Never navigates externally.
 * When a YouTube videoUrl is present, a play control opens an on-page lightbox.
 */
export function WorkGalleryTile({ project }: WorkGalleryTileProps) {
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
    isPortraitSplit || isVertical
      ? "work-tile--portrait"
      : "work-tile--landscape",
    hasPoster ? "work-tile--has-media" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const tags = [
    project.contentType,
    project.client,
    hasYear ? year : null,
  ].filter(Boolean) as string[];

  return (
    <article className={tileClass}>
      <div
        className={`work-tile__surface${interactive ? " work-tile__surface--active" : ""}`}
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
              isPortraitSplit || isVertical
                ? "(max-width: 759px) 70vw, 22vw"
                : "(max-width: 759px) 100vw, 48vw"
            }
          />
          {canPlay ? (
            <button
              ref={playButtonRef}
              type="button"
              className="work-tile__play"
              aria-label={`Play ${project.title}, ${roleLabel}`}
              onClick={() => setLightboxOpen(true)}
            >
              <span className="work-tile__play-icon" aria-hidden="true" />
              <span className="work-tile__play-label">Play</span>
            </button>
          ) : null}
        </div>

        <div className="work-tile__caption">
          <h3 className="work-tile__title">{project.title}</h3>
          <ul className="work-tile__tags" aria-label="Project details">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="work-tile__roles">{roleLabel}</p>
          {project.subscriberContext ? (
            <p className="work-tile__extra">{project.subscriberContext}</p>
          ) : null}
          {project.recognition ? (
            <p className="work-tile__extra">{project.recognition}</p>
          ) : null}
        </div>
      </div>

      {lightboxOpen && canPlay && project.videoUrl ? (
        <VideoLightbox
          title={project.title}
          detail={[project.contentType, roleLabel].filter(Boolean).join(" · ")}
          videoUrl={project.videoUrl}
          orientation={project.orientation}
          onClose={() => setLightboxOpen(false)}
          returnFocusRef={playButtonRef}
        />
      ) : null}
    </article>
  );
}
