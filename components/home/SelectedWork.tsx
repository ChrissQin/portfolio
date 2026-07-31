import Link from "next/link";

import { ShowreelScene } from "@/components/work/ShowreelScene";
import { projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED = 5;

function sceneTreatment(
  index: number,
  orientation: "horizontal" | "vertical",
): "wide" | "offset" | "portrait" {
  if (orientation === "vertical") {
    return "portrait";
  }
  return index % 2 === 0 ? "wide" : "offset";
}

export function SelectedWork() {
  const featured = getFeaturedProjects(projects).slice(0, MAX_FEATURED);
  const count = String(featured.length).padStart(2, "0");

  return (
    <section
      id="featured-work"
      className="selected-work"
      aria-labelledby="selected-work-heading"
    >
      <div className="container selected-work__header">
        <div className="selected-work__heading-row">
          <h2 id="selected-work-heading" className="selected-work__heading">
            Selected Work
          </h2>
          <p className="selected-work__count" aria-hidden="true">
            [{count}]
          </p>
        </div>
        <Link href="/work" className="editorial-link">
          See All Work
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <div className="selected-work__reel">
        {featured.map((project, index) => (
          <ShowreelScene
            key={project.slug}
            project={project}
            index={index + 1}
            treatment={sceneTreatment(index, project.orientation)}
          />
        ))}
      </div>
    </section>
  );
}
