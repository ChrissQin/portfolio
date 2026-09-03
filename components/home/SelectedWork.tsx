import { WorkGalleryTile } from "@/components/work/WorkGalleryTile";
import { projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED = 5;

export function SelectedWork() {
  const featured = getFeaturedProjects(projects).slice(0, MAX_FEATURED);

  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-heading"
      tabIndex={-1}
    >
      <div className="container">
        <div className="selected-work__header">
          <h2 id="selected-work-heading" className="section-heading">
            Select work
          </h2>
          <a href="#contact" className="text-link">
            Get in touch
            <span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="selected-work__grid" data-count={featured.length}>
          {featured.map((project) => (
            <WorkGalleryTile key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
