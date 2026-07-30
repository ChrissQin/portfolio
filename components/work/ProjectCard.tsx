import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const isVertical = project.orientation === "vertical";
  const roleLabel = project.roles.join(" · ");

  return (
    <article
      className={`project-card project-card--${project.orientation} ${className}`.trim()}
    >
      <Link
        href="/work"
        className="project-card__link"
        aria-label={`${project.title}. Role: ${roleLabel}. Open work archive.`}
      >
        <div className="project-card__media">
          <Image
            src={project.thumbnail}
            alt={`${project.title} poster placeholder`}
            fill
            unoptimized
            sizes={
              isVertical
                ? "(max-width: 768px) 70vw, 28vw"
                : "(max-width: 768px) 100vw, 60vw"
            }
            className="project-card__image"
          />
        </div>

        <div className="project-card__meta">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__client">{project.client}</p>
          <div className="project-card__details">
            <span>{project.contentType}</span>
            <span aria-hidden="true">·</span>
            <span className="project-card__role">{roleLabel}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
