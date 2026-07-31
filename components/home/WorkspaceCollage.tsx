import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import { collageSlots } from "@/data/collage";

type WorkspaceCollageProps = {
  compact?: boolean;
};

export function WorkspaceCollage({ compact = false }: WorkspaceCollageProps) {
  const slots = compact ? collageSlots.slice(0, 2) : collageSlots.slice(0, 3);

  return (
    <div
      className={`workspace-collage${compact ? " workspace-collage--compact" : ""}`}
      aria-label="Creative workspace collage placeholders"
    >
      {slots.map((slot, index) => (
        <figure
          key={slot.id}
          className={`workspace-collage__item workspace-collage__item--${slot.kind} workspace-collage__item--${index + 1}`}
        >
          <PlaceholderMedia
            src={slot.src}
            alt={`${slot.label} placeholder`}
            label={slot.label}
            hint={slot.hint}
            aspectRatio={slot.aspectRatio}
            motif={slot.motif}
            className="workspace-collage__media"
            sizes="(max-width: 900px) 45vw, 18rem"
          />
          <figcaption className="workspace-collage__caption">
            <span className="workspace-collage__caption-label">{slot.label}</span>
            <span className="workspace-collage__caption-hint">{slot.hint}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
