import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectMedia } from "@/components/work/ProjectMedia";
import { ProjectPager } from "@/components/work/ProjectPager";
import { ProjectStillGallery } from "@/components/work/ProjectStillGallery";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/constants";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectDepth,
  getProjectRoleLabel,
  getPublishedProjects,
} from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedProjects(projects).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    notFound();
  }

  const depth = getProjectDepth(project);
  const roleLabel = getProjectRoleLabel(project);
  const { previous, next } = getAdjacentProjects(projects, project.slug);
  const isExpanded = depth === "expanded";

  return (
    <article className="project-detail" aria-labelledby="project-title">
      <div className="container">
        <header className="project-detail__header">
          <p className="project-detail__eyebrow">
            {project.contentType}
            <span aria-hidden="true"> · </span>
            {roleLabel}
          </p>
          <h1 id="project-title" className="project-detail__title">
            {project.title}
          </h1>
          <dl className="project-detail__meta">
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </header>

        <div className="project-detail__media">
          <ProjectMedia project={project} />
        </div>

        <div className="project-detail__body">
          <section
            className="project-detail__section"
            aria-labelledby="project-context-heading"
          >
            <h2
              id="project-context-heading"
              className="project-detail__section-title"
            >
              Context
            </h2>
            <p className="project-detail__copy">{project.description}</p>
          </section>

          {project.responsibilities && project.responsibilities.length > 0 ? (
            <section
              className="project-detail__section"
              aria-labelledby="project-contribution-heading"
            >
              <h2
                id="project-contribution-heading"
                className="project-detail__section-title"
              >
                Contribution
              </h2>
              <ul className="project-detail__list">
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {isExpanded && project.approach ? (
            <section
              className="project-detail__section"
              aria-labelledby="project-approach-heading"
            >
              <h2
                id="project-approach-heading"
                className="project-detail__section-title"
              >
                Approach
              </h2>
              <p className="project-detail__copy">{project.approach}</p>
            </section>
          ) : null}

          {isExpanded && project.software && project.software.length > 0 ? (
            <section
              className="project-detail__section"
              aria-labelledby="project-software-heading"
            >
              <h2
                id="project-software-heading"
                className="project-detail__section-title"
              >
                Software
              </h2>
              <ul className="project-detail__list project-detail__list--inline">
                {project.software.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {isExpanded &&
          project.results &&
          project.results.length > 0 ? (
            <section
              className="project-detail__section"
              aria-labelledby="project-results-heading"
            >
              <h2
                id="project-results-heading"
                className="project-detail__section-title"
              >
                Results
              </h2>
              <ul className="project-detail__list">
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {isExpanded && project.galleryImages ? (
            <ProjectStillGallery images={project.galleryImages} />
          ) : null}

          {project.credits && project.credits.length > 0 ? (
            <section
              className="project-detail__section"
              aria-labelledby="project-credits-heading"
            >
              <h2
                id="project-credits-heading"
                className="project-detail__section-title"
              >
                Credits
              </h2>
              <ul className="project-detail__list">
                {project.credits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <ProjectPager previous={previous} next={next} />
      </div>
    </article>
  );
}
