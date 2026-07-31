export type Role =
  | "Editor"
  | "Videographer"
  | "Producer"
  | "Director"
  | "Social Media Editor";

export type Service = "editing" | "videography" | "production";

export type Orientation = "horizontal" | "vertical";

/**
 * Gallery presentation. `portrait-split` places true 9:16 media beside a
 * text panel inside a standard-width tile — reusable for vertical projects.
 */
export type GalleryVariant = "standard" | "portrait-split";

export type VideoProvider = "youtube" | "vimeo" | "local" | "none";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  /** Internal key only — not used for public project-detail routes. */
  slug: string;
  title: string;
  /** Omit when no client was supplied. */
  client?: string;
  /** Omit when no year was supplied — never invent one. */
  year?: string;
  featured: boolean;
  /** Omit or leave empty when no description was supplied. */
  description?: string;
  contentType: string;
  roles: Role[];
  /** Filter-ready; unused in the Work UI at launch. */
  services: Service[];
  orientation: Orientation;
  /** Defaults to `standard` when omitted. */
  galleryVariant?: GalleryVariant;
  /**
   * Optional explicit 12-column span. When omitted, the grid packer assigns a
   * span from orientation pairing so layout does not depend on list order hacks.
   */
  gridSpan?: number;
  /** Real poster path. Null renders a CSS placeholder — never a broken image. */
  thumbnail: string | null;
  /**
   * Optional muted local preview (mp4/webm). Loaded only after pointer/focus intent.
   * Prefer this for hover showreel behavior on the homepage gallery.
   */
  previewVideoUrl?: string | null;
  /**
   * Optional genuine external destination.
   * Homepage gallery tiles do not navigate externally — prefer videoUrl + lightbox.
   */
  externalUrl?: string | null;
  videoUrl?: string;
  videoProvider: VideoProvider;
  /** Supporting channel context (e.g. subscriber count for a YouTube project). */
  subscriberContext?: string;
  /** Festival selection / award text. Optional — do not invent recognition. */
  recognition?: string;
  responsibilities?: string[];
  approach?: string;
  software?: string[];
  /** Only populate with real results. */
  results?: string[];
  credits?: string[];
  galleryImages?: GalleryImage[];
};

/** Concise role line for gallery overlays (e.g. VIDEOGRAPHER + EDITOR). */
export function formatProjectRoles(roles: Role[]): string {
  return roles.join(" + ");
}

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
