export type Role =
  | "Editor"
  | "Videographer"
  | "Editor & Videographer"
  | "Producer, Videographer & Editor"
  | "Social Media Editor";

export type Service = "editing" | "videography" | "production";

export type Orientation = "horizontal" | "vertical";

export type VideoProvider = "youtube" | "vimeo" | "local" | "external" | "none";

export type ProjectDepth = "simple" | "expanded";

export type GalleryImage = {
  src: string | null;
  alt: string;
  hint?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  featured: boolean;
  /** Only published projects appear publicly. */
  published: boolean;
  description: string;
  contentType: string;
  roles: Role[];
  /** Filter-ready; unused in the Work UI at launch. */
  services: Service[];
  orientation: Orientation;
  /**
   * Optional explicit 12-column span. When omitted, the grid packer assigns a
   * span from orientation pairing so layout does not depend on list order hacks.
   */
  gridSpan?: number;
  /** Real poster path. Null renders a CSS placeholder — never a broken image. */
  thumbnail: string | null;
  /**
   * Optional muted local preview (mp4/webm). Loaded only after pointer/focus intent.
   * Prefer this for hover showreel behavior; remote embeds stay on project pages.
   */
  previewVideoUrl?: string | null;
  videoUrl?: string | null;
  videoProvider: VideoProvider;
  projectDepth: ProjectDepth;
  responsibilities?: string[];
  approach?: string;
  software?: string[];
  /** Only populate with real results. */
  results?: string[];
  credits?: string[];
  galleryImages?: GalleryImage[];
};

export function getPublishedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.published);
}

export function getProjectBySlug(
  projects: Project[],
  slug: string,
): Project | undefined {
  return getPublishedProjects(projects).find((project) => project.slug === slug);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return getPublishedProjects(projects).filter((project) => project.featured);
}

export function getAdjacentProjects(
  projects: Project[],
  slug: string,
): { previous: Project | null; next: Project | null } {
  const published = getPublishedProjects(projects);
  const index = published.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? published[index - 1] : null,
    next: index < published.length - 1 ? published[index + 1] : null,
  };
}

/** Prefer explicit projectDepth; fall back to content presence. */
export function getProjectDepth(project: Project): ProjectDepth {
  if (project.projectDepth) {
    return project.projectDepth;
  }

  const hasExpandedContent = Boolean(
    project.approach ||
      (project.galleryImages && project.galleryImages.length > 0) ||
      (project.software && project.software.length > 0) ||
      (project.results && project.results.length > 0),
  );

  return hasExpandedContent ? "expanded" : "simple";
}

export function getProjectRoleLabel(project: Project): string {
  return project.roles.join(" + ");
}
