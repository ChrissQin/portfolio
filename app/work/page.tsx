import type { Metadata } from "next";

import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/constants";
import { getPublishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected edits and shoots by ${siteConfig.name}.`,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Work — ${siteConfig.name}`,
    description: `Selected edits and shoots by ${siteConfig.name}.`,
  },
};

export default function WorkPage() {
  const published = getPublishedProjects(projects);
  const count = String(published.length).padStart(2, "0");

  return (
    <section className="work-archive" aria-labelledby="work-archive-heading">
      <div className="container">
        <header className="work-archive__header">
          <div className="work-archive__heading-row">
            <h1 id="work-archive-heading" className="work-archive__heading">
              Work
            </h1>
            <p className="work-archive__count" aria-hidden="true">
              [{count}]
            </p>
          </div>
          <p className="work-archive__lede">
            A small, curated set of edits and shoots.
          </p>
        </header>

        {published.length > 0 ? (
          <WorkGallery projects={published} />
        ) : (
          <p className="work-archive__empty">Projects coming soon.</p>
        )}
      </div>
    </section>
  );
}
