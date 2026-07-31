import Link from "next/link";

import type { Project } from "@/lib/projects";

type ProjectPagerProps = {
  previous: Project | null;
  next: Project | null;
};

export function ProjectPager({ previous, next }: ProjectPagerProps) {
  return (
    <nav className="project-pager" aria-label="Adjacent projects">
      <div className="project-pager__side">
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="project-pager__link"
          >
            <span className="project-pager__label">Previous</span>
            <span className="project-pager__title">{previous.title}</span>
          </Link>
        ) : (
          <span className="project-pager__empty" />
        )}
      </div>

      <Link href="/work" className="project-pager__archive">
        All Work
        <span aria-hidden="true"> ↑</span>
      </Link>

      <div className="project-pager__side project-pager__side--next">
        {next ? (
          <Link href={`/work/${next.slug}`} className="project-pager__link">
            <span className="project-pager__label">Next</span>
            <span className="project-pager__title">{next.title}</span>
          </Link>
        ) : (
          <span className="project-pager__empty" />
        )}
      </div>
    </nav>
  );
}
