"use client";

import { useEffect, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { usePrefersReducedMotion } from "@/lib/motion";
import { formatProjectRoles, type Project } from "@/lib/projects";

type WorkGalleryTileProps = {
  project: Project;
  /** When true, tile spans the full grid row (e.g. third of three). */
  wide?: boolean;
};

/**
 * Portfolio tile. Links only when `externalUrl` is set (YouTube, campaign, etc.).
 * Without a destination, the tile remains an interactive preview surface.
 */
export function WorkGalleryTile({ project, wide = false }: WorkGalleryTileProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const roleLabel = formatProjectRoles(project.roles);
  const interactive = hovered || focused;
  const externalUrl = project.externalUrl?.trim() || null;
  const isVertical = project.orientation === "vertical";
  const year = project.year?.trim();
  const hasYear = Boolean(year && year !== "—");

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const media = (
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
    </div>
  );

  const surfaceClass = `work-tile__link${interactive ? " work-tile__link--active" : ""}`;
  const tileClass = [
    "work-tile",
    isVertical ? "work-tile--vertical" : "work-tile--horizontal",
    wide ? "work-tile--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={tileClass}>
      {externalUrl ? (
        <a
          href={externalUrl}
          className={surfaceClass}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}. ${roleLabel}. Opens in a new tab.`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {media}
        </a>
      ) : (
        <div
          className={`${surfaceClass} work-tile__link--static`}
          tabIndex={0}
          role="group"
          aria-label={`${project.title}. ${roleLabel}.`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {media}
        </div>
      )}
    </article>
  );
}
