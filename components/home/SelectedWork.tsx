import { WorkGalleryTile } from "@/components/work/WorkGalleryTile";
import { projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED = 5;

export function SelectedWork() {
  const featured = getFeaturedProjects(projects).slice(0, MAX_FEATURED);
  const count = String(featured.length).padStart(2, "0");
  const oddLast = featured.length % 2 === 1;

  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-heading"
      tabIndex={-1}
    >
      <div className="container">
        <div className="selected-work__header">
          <div className="selected-work__heading-row">
            <h2 id="selected-work-heading" className="selected-work__heading">
              Selected Work
            </h2>
            <p className="selected-work__count" aria-hidden="true">
              [{count}]
            </p>
          </div>
          <a href="#contact" className="selected-work__all">
            Contact Me
            <span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="selected-work__grid" data-count={featured.length}>
          {featured.map((project, index) => {
            const isLast = index === featured.length - 1;
            return (
              <WorkGalleryTile
                key={project.slug}
                project={project}
                wide={oddLast && isLast}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
