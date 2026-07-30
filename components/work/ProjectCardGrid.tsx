import type { Project } from "@/lib/projects";

import { ProjectCard } from "./ProjectCard";

type ProjectCardGridProps = {
  projects: Project[];
};

export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          className={`project-grid__item project-grid__item--${project.orientation}`}
        />
      ))}
    </div>
  );
}
