"use client";

import DotCursor from "@/components/originkit/ui/dot-cursor";

/** Brand palette — ink dot, accent trail */
const CURSOR_HEAD = "#11110F";
const CURSOR_TRAIL = "#FF573D";

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
        headColor={CURSOR_HEAD}
        trailColor={CURSOR_TRAIL}
        size={18}
        trailLength={8}
        trailThickness={10}
      />
    </div>
  );
}
