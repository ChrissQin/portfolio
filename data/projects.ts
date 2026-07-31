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
    published: true,
    projectDepth: "simple",
    description:
      "Placeholder project for layout development. Replace with a real edit and accurate role details.",
    contentType: "Content Needed",
    roles: ["Editor"],
    services: ["editing"],
    orientation: "horizontal",
    thumbnail: null,
    previewVideoUrl: null,
    videoUrl: null,
    videoProvider: "none",
    responsibilities: [
      "Edit — details needed",
      "Sound and pacing — details needed",
      "Delivery formats — details needed",
    ],
  },
  {
    slug: "project-02",
    title: "Project 02 — Content Needed",
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    published: true,
    projectDepth: "simple",
    description:
      "Placeholder vertical project for orientation testing. Replace with real footage and credits.",
    contentType: "Content Needed",
    roles: ["Editor & Videographer"],
    services: ["editing", "videography"],
    orientation: "vertical",
    thumbnail: null,
    previewVideoUrl: null,
    videoUrl: null,
    videoProvider: "none",
    responsibilities: [
      "Shoot — details needed",
      "Edit — details needed",
    ],
  },
  {
    slug: "project-03",
    title: "Project 03 — Content Needed",
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    published: true,
    projectDepth: "expanded",
    description:
      "Placeholder expanded project for layout development. Replace with a real project summary, stills, and approach notes.",
    contentType: "Content Needed",
    roles: ["Editor"],
    services: ["editing"],
    orientation: "horizontal",
    thumbnail: null,
    previewVideoUrl: null,
    videoUrl: null,
    videoProvider: "none",
    responsibilities: [
      "Edit — details needed",
      "Color and finishing — details needed",
      "Captions and delivery — details needed",
    ],
    approach:
      "Content Needed — describe the creative approach, pacing choices, and what the edit needed to accomplish.",
    software: ["Software needed"],
    galleryImages: [
      {
        src: null,
        alt: "Selected still — content needed",
        hint: "Still needed",
      },
      {
        src: null,
        alt: "Timeline crop — content needed",
        hint: "Asset needed",
      },
      {
        src: null,
        alt: "Production still — content needed",
        hint: "Asset needed",
      },
    ],
    credits: ["Credits needed"],
  },
];
