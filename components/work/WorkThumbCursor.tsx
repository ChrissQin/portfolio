"use client";

import DotCursor from "@/components/originkit/ui/dot-cursor";

type WorkThumbCursorProps = {
  gradient: string;
  title: string;
};

export function WorkThumbCursor({ gradient, title }: WorkThumbCursorProps) {
  return (
    <div
      className="nen-work-card__thumb"
      style={{ background: gradient }}
      role="img"
      aria-label={`${title} placeholder thumbnail`}
    >
      <DotCursor
        label={false}
        headColor="#11110F"
        trailColor="#FF573D"
        size={18}
        trailLength={8}
        trailThickness={10}
      />
    </div>
  );
}
