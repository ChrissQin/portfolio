import { Hero } from "@/components/home/Hero";
import { ProjectCardGrid } from "@/components/work/ProjectCardGrid";
import { projects } from "@/data/projects";

export default function HomePage() {
  const checkpointProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />

      <section
        id="featured-work"
        className="featured-checkpoint"
        aria-labelledby="featured-heading"
      >
        <div className="container">
          <div className="featured-checkpoint__intro">
            <p className="section-eyebrow">Featured work</p>
            <h2 id="featured-heading" className="section-title">
              Selected projects
            </h2>
            <p className="section-lede">
              Visual checkpoint with three development placeholders. Horizontal
              and vertical formats share one editorial grid.
            </p>
          </div>

          <ProjectCardGrid projects={checkpointProjects} />
        </div>
      </section>
    </>
  );
}
