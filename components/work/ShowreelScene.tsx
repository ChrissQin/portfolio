"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ProjectPreview } from "@/components/work/ProjectPreview";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type ShowreelSceneProps = {
  project: Project;
  index: number;
  /** Alternating scene treatment for edit-like rhythm. */
  treatment: "wide" | "offset" | "portrait";
};

export function ShowreelScene({
  project,
  index,
  treatment,
}: ShowreelSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewOnce(ref, 0.28);
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const padded = String(index).padStart(2, "0");
  const roleLabel = project.roles.join(" + ");
  const revealed = reducedMotion || inView;
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
      ref={ref}
      className={[
        "showreel-scene",
        `showreel-scene--${treatment}`,
        `showreel-scene--${project.orientation}`,
        revealed ? "showreel-scene--in" : "",
        interactive ? "showreel-scene--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-index={padded}
      style={{ ["--scene-stagger" as string]: `${(index - 1) * 40}ms` }}
    >
      <div className="container showreel-scene__inner">
        <p className="showreel-scene__index" aria-hidden="true">
          {padded}
        </p>

        <Link
          href={`/work/${project.slug}`}
          className="showreel-scene__link"
          aria-label={`${project.title}. ${roleLabel}. View project.`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <div className="showreel-scene__media">
            <ProjectPreview
              title={project.title}
              thumbnail={project.thumbnail}
              previewVideoUrl={project.previewVideoUrl}
              orientation={project.orientation}
              active={finePointer && interactive}
              forcePreview={!finePointer && mobilePreview}
            />

            <div className="showreel-scene__shade" aria-hidden="true" />

            {!finePointer && project.previewVideoUrl && !reducedMotion ? (
              <button
                type="button"
                className="showreel-scene__play"
                aria-pressed={mobilePreview}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setMobilePreview((value) => !value);
                }}
              >
                {mobilePreview ? "Pause preview" : "Play preview"}
              </button>
            ) : null}
          </div>

          <div className="showreel-scene__meta">
            <p className="showreel-scene__category">
              {padded} / {project.contentType}
            </p>
            <h3 className="showreel-scene__title">{project.title}</h3>
            <p className="showreel-scene__role">{roleLabel}</p>
            {project.year !== "—" ? (
              <p className="showreel-scene__year">{project.year}</p>
            ) : null}
          </div>
        </Link>
      </div>
    </article>
  );
}
