import { WorkGalleryTile } from "@/components/work/WorkGalleryTile";
import type { Project } from "@/lib/projects";

type WorkGalleryProps = {
  projects: Project[];
  className?: string;
};

export function WorkGallery({ projects, className = "" }: WorkGalleryProps) {
  const oddLast = projects.length % 2 === 1;

  return (
    <div
      className={`selected-work__grid${className ? ` ${className}` : ""}`}
      data-count={projects.length}
    >
      {projects.map((project, index) => {
        const isLast = index === projects.length - 1;
        return (
          <WorkGalleryTile
            key={project.slug}
            project={project}
            wide={oddLast && isLast && projects.length > 1}
          />
        );
      })}
    </div>
  );
}
