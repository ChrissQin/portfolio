"use client";

import { useWorkCursor } from "@/components/work/WorkCursorProvider";

type WorkThumbCursorProps = {
  gradient: string;
  title: string;
};

export function WorkThumbCursor({ gradient, title }: WorkThumbCursorProps) {
  const { bindThumb, moveThumb } = useWorkCursor();

  return (
    <div
      className="nen-work-card__thumb"
      style={{ background: gradient }}
      role="img"
      aria-label={`${title} placeholder thumbnail`}
      onPointerEnter={(e) => {
        bindThumb(e.currentTarget);
        moveThumb(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        moveThumb(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerLeave={() => {
        bindThumb(null);
      }}
    />
  );
}
