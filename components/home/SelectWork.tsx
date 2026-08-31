"use client";

import { useMemo, useState } from "react";

import {
  placeholderWork,
  type WorkCategory,
} from "@/data/placeholders";
import { WorkThumbCursor } from "@/components/work/WorkThumbCursor";
import { WorkCursorProvider } from "@/components/work/WorkCursorProvider";

type Filter = "all" | WorkCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "narrative", label: "Narrative" },
  { id: "short-form", label: "Short-form" },
  { id: "all", label: "All works" },
];

export function SelectWork() {
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    if (filter === "all") {
      return placeholderWork;
    }
    return placeholderWork.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section
      id="work"
      className="nen-work"
      aria-labelledby="nen-work-heading"
      tabIndex={-1}
    >
      <div className="nen-container">
        <div className="nen-work__header">
          <h2 id="nen-work-heading" className="nen-section-title">
            Select Work
          </h2>
          <div
            className="nen-work__filters"
            role="group"
            aria-label="Filter work by category"
          >
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nen-pill${filter === item.id ? " nen-pill--active" : ""}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <WorkCursorProvider>
          <ul className="nen-work__grid">
            {items.map((project) => (
              <li key={project.slug} className="nen-work__item">
                <article className="nen-work-card">
                  <WorkThumbCursor
                    gradient={project.gradient}
                    title={project.title}
                  />
                  <div className="nen-work-card__meta">
                    <h3 className="nen-work-card__title">{project.title}</h3>
                    <span className="nen-work-card__tag">{project.categoryLabel}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </WorkCursorProvider>
      </div>
    </section>
  );
}
