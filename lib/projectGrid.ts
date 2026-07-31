import type { Orientation, Project } from "@/lib/projects";

export type ProjectGridItem = {
  project: Project;
  /** Explicit 12-column span for desktop layout. Always set. */
  span: number;
};

/**
 * Packs projects into a 12-column editorial grid without relying on DOM order
 * selectors. Every item receives an explicit span so nothing falls back to a
 * single grid track.
 *
 * Pairing rules:
 * - horizontal + vertical → 7 + 5
 * - vertical + horizontal → 5 + 7
 * - two horizontals → 6 + 6
 * - two verticals → 6 + 6
 * - lone horizontal → 8
 * - lone vertical → 5
 *
 * Optional per-project `gridSpan` overrides the packed value when provided.
 */
export function resolveProjectGridLayout(
  projects: Project[],
): ProjectGridItem[] {
  const items: ProjectGridItem[] = [];
  let index = 0;

  while (index < projects.length) {
    const current = projects[index];
    const next = projects[index + 1];

    if (current.gridSpan) {
      items.push({ project: current, span: clampSpan(current.gridSpan) });
      index += 1;
      continue;
    }

    if (!next || next.gridSpan) {
      items.push({ project: current, span: loneSpan(current.orientation) });
      index += 1;
      continue;
    }

    const pair = pairSpans(current.orientation, next.orientation);

    if (pair) {
      items.push(
        { project: current, span: pair[0] },
        { project: next, span: pair[1] },
      );
      index += 2;
      continue;
    }

    items.push({ project: current, span: loneSpan(current.orientation) });
    index += 1;
  }

  return items;
}

function pairSpans(
  first: Orientation,
  second: Orientation,
): [number, number] | null {
  if (first === "horizontal" && second === "vertical") {
    return [7, 5];
  }

  if (first === "vertical" && second === "horizontal") {
    return [5, 7];
  }

  if (first === "horizontal" && second === "horizontal") {
    return [6, 6];
  }

  if (first === "vertical" && second === "vertical") {
    return [6, 6];
  }

  return null;
}

function loneSpan(orientation: Orientation): number {
  return orientation === "vertical" ? 5 : 8;
}

function clampSpan(span: number): number {
  return Math.min(12, Math.max(1, Math.round(span)));
}
