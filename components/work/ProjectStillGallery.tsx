import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import type { GalleryImage } from "@/lib/projects";

type ProjectStillGalleryProps = {
  images: GalleryImage[];
};

export function ProjectStillGallery({ images }: ProjectStillGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="project-stills" aria-labelledby="project-stills-heading">
      <h2 id="project-stills-heading" className="project-detail__section-title">
        Selected Stills
      </h2>
      <div className="project-stills__grid">
        {images.map((image, index) => (
          <figure key={`${image.alt}-${index}`} className="project-stills__item">
            <PlaceholderMedia
              src={image.src}
              alt={image.alt}
              label={image.alt}
              hint={image.hint ?? "Asset needed"}
              aspectRatio="16 / 10"
              motif={index % 2 === 0 ? "frame" : "timeline"}
              className="project-stills__media"
              sizes="(max-width: 899px) 100vw, 30vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
