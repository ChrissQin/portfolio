import Image from "next/image";

import { collageSlots } from "@/data/collage";

type WorkspaceCollageProps = {
  compact?: boolean;
};

export function WorkspaceCollage({ compact = false }: WorkspaceCollageProps) {
  const slots = compact ? collageSlots.slice(0, 3) : collageSlots;

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
          <div className="workspace-collage__frame">
            <Image
              src={slot.src}
              alt={`${slot.label} placeholder`}
              fill
              unoptimized
              sizes="(max-width: 900px) 45vw, 18rem"
              className="workspace-collage__image"
            />
          </div>
          <figcaption className="workspace-collage__caption">
            <span className="workspace-collage__caption-label">{slot.label}</span>
            <span className="workspace-collage__caption-hint">{slot.hint}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
