"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import DotCursor from "@/components/originkit/ui/dot-cursor";

type WorkCursorContextValue = {
  bindThumb: (el: HTMLElement | null) => void;
  moveThumb: (el: HTMLElement, x: number, y: number) => void;
};

const WorkCursorContext = createContext<WorkCursorContextValue | null>(null);

function applyFrame(el: HTMLDivElement, thumb: Element | null) {
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

function seedDotCursor(x: number, y: number) {
  window.dispatchEvent(
    new PointerEvent("pointermove", {
      clientX: x,
      clientY: y,
      bubbles: true,
    }),
  );
}

export function WorkCursorProvider({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLElement | null>(null);
  const [frameEl, setFrameEl] = useState<HTMLDivElement | null>(null);
  const setFrameRef = useCallback((node: HTMLDivElement | null) => {
    frameRef.current = node;
    setFrameEl(node);
  }, []);

  const bindThumb = useCallback((el: HTMLElement | null) => {
    activeThumbRef.current = el;
    if (frameRef.current) applyFrame(frameRef.current, el);
    document.querySelectorAll(".nen-work-card__thumb").forEach((thumb) => {
      thumb.classList.toggle("nen-work-card__thumb--active", thumb === el);
    });
  }, []);

  const moveThumb = useCallback((el: HTMLElement, x: number, y: number) => {
    activeThumbRef.current = el;
    if (frameRef.current) applyFrame(frameRef.current, el);
    seedDotCursor(x, y);
  }, []);

  useLayoutEffect(() => {
    if (!frameEl) return;

    const onReposition = () => {
      if (!activeThumbRef.current || !frameRef.current) return;
      applyFrame(frameRef.current, activeThumbRef.current);
    };

    window.addEventListener("scroll", onReposition, { passive: true, capture: true });
    window.addEventListener("resize", onReposition);

    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
      bindThumb(null);
    };
  }, [frameEl, bindThumb]);

  return (
    <WorkCursorContext.Provider value={{ bindThumb, moveThumb }}>
      {children}
      {createPortal(
        <div
          ref={setFrameRef}
          className="nen-work-cursor-frame"
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
            size={20}
            trailLength={8}
            trailThickness={10}
          />
        </div>,
        document.body,
      )}
    </WorkCursorContext.Provider>
  );
}

export function useWorkCursor() {
  const ctx = useContext(WorkCursorContext);
  if (!ctx) {
    throw new Error("useWorkCursor must be used within WorkCursorProvider");
  }
  return ctx;
}
