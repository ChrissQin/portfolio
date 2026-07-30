export type Role =
  | "Editor"
  | "Videographer"
  | "Editor & Videographer"
  | "Producer, Videographer & Editor"
  | "Social Media Editor";

export type Service = "editing" | "videography" | "production";

export type Orientation = "horizontal" | "vertical";

export type VideoProvider = "youtube" | "vimeo" | "local" | "none";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  featured: boolean;
  description: string;
  contentType: string;
  roles: Role[];
  /** Filter-ready; unused in the Work UI at launch. */
  services: Service[];
  orientation: Orientation;
  thumbnail: string;
  videoUrl?: string;
  videoProvider: VideoProvider;
  responsibilities?: string[];
  approach?: string;
  software?: string[];
  /** Only populate with real results. */
  results?: string[];
  credits?: string[];
  galleryImages?: GalleryImage[];
};

export function getProjectBySlug(
  projects: Project[],
  slug: string,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAdjacentProjects(
  projects: Project[],
  slug: string,
): { previous: Project | null; next: Project | null } {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

/** Expanded when approach, gallery, software, or results are present. */
export function getProjectDepth(project: Project): "simple" | "expanded" {
  const hasExpandedContent = Boolean(
    project.approach ||
      (project.galleryImages && project.galleryImages.length > 0) ||
      (project.software && project.software.length > 0) ||
      (project.results && project.results.length > 0),
  );

  return hasExpandedContent ? "expanded" : "simple";
}
