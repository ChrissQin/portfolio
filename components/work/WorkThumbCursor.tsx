"use client";

import DotCursor from "@/components/originkit/ui/dot-cursor";

/** Brand palette — paper dot, ink outline, accent trail */
const CURSOR_HEAD = "#F7F5F1";
const CURSOR_OUTLINE = "#11110F";
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
        headOutlineColor={CURSOR_OUTLINE}
        trailColor={CURSOR_TRAIL}
        hideDocumentCursor={false}
        size={18}
        trailLength={8}
        trailThickness={10}
      />
    </div>
  );
}
