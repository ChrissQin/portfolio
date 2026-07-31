import Link from "next/link";

import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED = 5;

export function SelectedWork() {
  const featured = getFeaturedProjects(projects).slice(0, MAX_FEATURED);
  const count = String(featured.length).padStart(2, "0");

  return (
    <section
      id="featured-work"
      className="selected-work"
      aria-labelledby="selected-work-heading"
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
          <Link href="/work" className="selected-work__all">
            See All Work
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <WorkGallery projects={featured} />
      </div>
    </section>
  );
}
