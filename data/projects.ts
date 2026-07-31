import type { Project } from "@/lib/projects";

/**
 * Development stubs only. Replace with real projects before launch.
 * Titles intentionally read as placeholders — never invent clients or credits.
 * thumbnail is null until a real poster exists (avoids broken-image states).
 */
export const projects: Project[] = [
  {
    slug: "project-01",
    title: "Project 01 — Content Needed",
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    description:
      "Placeholder project for layout development. Replace with a real edit and accurate role details.",
    contentType: "Content Needed",
    roles: ["Editor"],
    services: ["editing"],
    orientation: "horizontal",
    thumbnail: null,
    videoProvider: "none",
  },
  {
    slug: "project-02",
    title: "Project 02 — Content Needed",
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    description:
      "Placeholder vertical project for orientation testing. Replace with real footage and credits.",
    contentType: "Content Needed",
    roles: ["Editor & Videographer"],
    services: ["editing", "videography"],
    orientation: "vertical",
    thumbnail: null,
    videoProvider: "none",
  },
  {
    slug: "project-03",
    title: "Project 03 — Content Needed",
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    description:
      "Placeholder project for layout development. Replace with a real project summary.",
    contentType: "Content Needed",
    roles: ["Editor"],
    services: ["editing"],
    orientation: "horizontal",
    thumbnail: null,
    videoProvider: "none",
  },
];
