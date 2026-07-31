import { resolveProjectGridLayout } from "@/lib/projectGrid";
import type { Project } from "@/lib/projects";

import { ProjectCard } from "./ProjectCard";

type ProjectCardGridProps = {
  projects: Project[];
};

export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  const layout = resolveProjectGridLayout(projects);

  return (
    <div className="project-grid">
      {layout.map(({ project, span }) => (
        <ProjectCard
          key={project.slug}
          project={project}
          span={span}
          className={`project-grid__item project-grid__item--${project.orientation}`}
        />
      ))}
    </div>
  );
}
