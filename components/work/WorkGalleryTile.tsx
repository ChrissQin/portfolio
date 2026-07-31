"use client";

import { useEffect, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/lib/projects";

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
  const roleLabel = project.roles.join(" + ");
  const interactive = hovered || focused;
  const externalUrl = project.externalUrl?.trim() || null;

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
        orientation="horizontal"
        active={finePointer && interactive && !reducedMotion}
        sizes="(max-width: 759px) 100vw, 50vw"
      />
      <div className="work-tile__shade" aria-hidden="true" />
      <div className="work-tile__meta">
        <h3 className="work-tile__title">{project.title}</h3>
        <p className="work-tile__detail">
          <span>{project.contentType}</span>
          <span aria-hidden="true"> · </span>
          <span>{roleLabel}</span>
          {project.year !== "—" ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{project.year}</span>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );

  const surfaceClass = `work-tile__link${interactive ? " work-tile__link--active" : ""}`;

  return (
    <article className={`work-tile${wide ? " work-tile--wide" : ""}`}>
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
