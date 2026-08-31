"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import DotCursor from "@/components/originkit/ui/dot-cursor";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const GRID_SELECTOR = ".nen-work__grid";
const THUMB_SELECTOR = ".nen-work-card__thumb";

function applyFrame(
  el: HTMLDivElement,
  thumb: Element | null,
) {
  if (!thumb) {
    el.style.visibility = "hidden";
    el.style.width = "0";
    el.style.height = "0";
    return;
  }

  const rect = thumb.getBoundingClientRect();
  el.style.visibility = "visible";
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

/**
 * One Originkit DotCursor instance, repositioned over whichever thumbnail
 * the pointer is on. Frame position updates synchronously so DotCursor's
 * window pointermove handler sees the correct hit area on the same event.
 */
export function WorkThumbDotCursorLayer() {
  const isClient = useIsClient();
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);

  useEffect(() => {
    if (!isClient) return;

    const grid = document.querySelector(GRID_SELECTOR);
    const frame = frameRef.current;
    if (!grid || !frame) return;

    const thumbAt = (x: number, y: number) =>
      document.elementFromPoint(x, y)?.closest(THUMB_SELECTOR) ?? null;

    const sync = (x: number, y: number) => {
      const thumb = thumbAt(x, y);
      activeRef.current = thumb !== null;
      applyFrame(frame, thumb);
    };

    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      pointerRef.current = { x: pe.clientX, y: pe.clientY };
      sync(pe.clientX, pe.clientY);
    };

    const onLeave = (e: Event) => {
      const pe = e as PointerEvent;
      const next = pe.relatedTarget as Node | null;
      if (next && grid.contains(next)) return;
      activeRef.current = false;
      applyFrame(frame, null);
    };

    const onReposition = () => {
      if (!activeRef.current) return;
      const { x, y } = pointerRef.current;
      sync(x, y);
    };

    grid.addEventListener("pointermove", onMove, { passive: true, capture: true });
    grid.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onReposition, { passive: true, capture: true });
    window.addEventListener("resize", onReposition);

    return () => {
      grid.removeEventListener("pointermove", onMove, true);
      grid.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
      activeRef.current = false;
      applyFrame(frame, null);
    };
  }, [isClient]);

  if (!isClient) return null;

  return createPortal(
    <div
      ref={frameRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        visibility: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <DotCursor
        label={false}
        headColor="#FF573D"
        trailColor="#11110F"
        size={18}
        trailLength={8}
        trailThickness={10}
      />
    </div>,
    document.body,
  );
}
