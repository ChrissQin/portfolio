"use client";

import { useEffect, useState } from "react";

import { useWorkCursor } from "@/components/work/WorkCursorProvider";

type WorkThumbCursorProps = {
  gradient: string;
  title: string;
};

export function WorkThumbCursor({ gradient, title }: WorkThumbCursorProps) {
  const { bindThumb, moveThumb } = useWorkCursor();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="nen-work-card__thumb"
      style={{ background: gradient }}
      role="img"
      aria-label={`${title} placeholder thumbnail`}
      onPointerEnter={(e) => {
        if (!finePointer) return;
        bindThumb(e.currentTarget);
        moveThumb(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!finePointer) return;
        moveThumb(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerLeave={() => {
        if (!finePointer) return;
        bindThumb(null);
      }}
    />
  );
}
