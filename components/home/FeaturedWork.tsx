import Link from "next/link";

import { ProjectCardGrid } from "@/components/work/ProjectCardGrid";
import { projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED = 6;

export function FeaturedWork() {
  const featured = getFeaturedProjects(projects).slice(0, MAX_FEATURED);

  return (
    <section
      id="featured-work"
      className="home-featured"
      aria-labelledby="featured-heading"
    >
      <div className="container">
        <div className="home-featured__header">
          <h2 id="featured-heading" className="display-heading">
            Selected Work
          </h2>
          <Link href="/work" className="editorial-link">
            See All Work
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <ProjectCardGrid projects={featured} />
        ) : (
          <p className="home-featured__empty">
            Featured projects will appear here once work is added.
          </p>
        )}
      </div>
    </section>
  );
}
