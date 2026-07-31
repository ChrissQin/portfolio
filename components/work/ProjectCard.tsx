import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  /** Desktop 12-column span from the layout packer. */
  span: number;
  index?: number;
  className?: string;
};

export function ProjectCard({
  project,
  span,
  index = 1,
  className = "",
}: ProjectCardProps) {
  const isVertical = project.orientation === "vertical";
  const roleLabel = project.roles.join(" + ");
  const paddedIndex = String(index).padStart(2, "0");

  return (
    <article
      className={`project-card project-card--${project.orientation} ${className}`.trim()}
      style={{ ["--grid-span" as string]: String(span) }}
      data-span={span}
      data-index={paddedIndex}
    >
      <Link
        href="/work"
        className="project-card__link"
        aria-label={`${project.title}. Role: ${roleLabel}. Open work archive.`}
      >
        <div className="project-card__frame">
          <div className="project-card__media">
            <Image
              src={project.thumbnail}
              alt={`${project.title} poster placeholder`}
              fill
              unoptimized
              sizes={
                isVertical
                  ? "(max-width: 899px) 70vw, 20rem"
                  : "(max-width: 899px) 100vw, 60vw"
              }
              className="project-card__image"
            />
            <span className="project-card__monitor" aria-hidden="true" />
          </div>
        </div>

        <div className="project-card__meta">
          <p className="project-card__index">
            {paddedIndex} / {project.contentType}
          </p>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__role">{roleLabel}</p>
          {project.year !== "—" ? (
            <p className="project-card__year">{project.year}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
