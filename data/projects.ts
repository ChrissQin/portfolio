import type { Project } from "@/lib/projects";

/**
 * Featured Selected Work projects — homepage gallery only.
 * thumbnail / previewVideoUrl stay null until real media is supplied.
 * Do not invent years, URLs, results, or awards.
 */
export const projects: Project[] = [
  {
    slug: "ga-painting-company-intro",
    title: "GA Painting Company Intro",
    client: "GA Painting Company",
    year: "2026",
    featured: true,
    contentType: "Company Intro",
    roles: ["Videographer", "Editor"],
    services: ["videography", "editing"],
    orientation: "horizontal",
    thumbnail: null,
    previewVideoUrl: null,
    videoProvider: "none",
  },
  {
    slug: "baba",
    title: "bàba",
    featured: true,
    contentType: "YouTube Channel",
    roles: ["Producer", "Videographer", "Editor"],
    services: ["production", "videography", "editing"],
    orientation: "horizontal",
    thumbnail: null,
    previewVideoUrl: null,
    videoProvider: "none",
    subscriberContext: "7K+ subscribers",
  },
  {
    slug: "houlai-chinese-immigration-story",
    title: "《后来》：A Chinese Immigration Story",
    featured: true,
    contentType: "Short Documentary",
    roles: ["Director", "Editor", "Videographer"],
    services: ["production", "editing", "videography"],
    orientation: "horizontal",
    thumbnail: null,
    previewVideoUrl: null,
    videoProvider: "none",
    recognition: "Official Selection — Atlanta High School Film Festival",
  },
  {
    slug: "in-motion",
    title: "In Motion",
    client: "Uni Uni Bubble Tea",
    featured: true,
    contentType: "Vertical Product Advertisement",
    roles: ["Editor", "Videographer"],
    services: ["editing", "videography"],
    orientation: "vertical",
    thumbnail: null,
    previewVideoUrl: null,
    videoProvider: "none",
  },
];
