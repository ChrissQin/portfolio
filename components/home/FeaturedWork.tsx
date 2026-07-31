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
          <div className="home-featured__intro">
            <p className="section-eyebrow">Featured work</p>
            <h2 id="featured-heading" className="section-title">
              Selected projects
            </h2>
            <p className="section-lede">
              A focused set of edits and filmed pieces. Each project lists my
              exact role so you can see where editing—and when relevant,
              videography—comes in.
            </p>
          </div>

          <Link href="/work" className="text-link home-featured__all">
            View All Work
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
