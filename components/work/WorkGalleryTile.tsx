"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type WorkGalleryTileProps = {
  project: Project;
  /** When true, tile spans the full grid row (e.g. third of three). */
  wide?: boolean;
};

export function WorkGalleryTile({ project, wide = false }: WorkGalleryTileProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const roleLabel = project.roles.join(" + ");
  const interactive = hovered || focused;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <article
      className={`work-tile${wide ? " work-tile--wide" : ""}`}
    >
      <Link
        href={`/work/${project.slug}`}
        className={`work-tile__link${interactive ? " work-tile__link--active" : ""}`}
        aria-label={`${project.title}. ${roleLabel}. View project.`}
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
      </Link>
    </article>
  );
}
