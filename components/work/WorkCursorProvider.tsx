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
  bindSurface: (el: HTMLElement | null) => void;
  moveSurface: (el: HTMLElement, x: number, y: number) => void;
};

const WorkCursorContext = createContext<WorkCursorContextValue | null>(null);

const CURSOR_PAD = 36;

function applyFrame(el: HTMLDivElement, surface: Element | null) {
  if (!surface) {
    el.style.visibility = "hidden";
    el.style.width = "0";
    el.style.height = "0";
    return;
  }

  const rect = surface.getBoundingClientRect();
  el.style.visibility = "visible";
  el.style.position = "fixed";
  el.style.left = `${rect.left - CURSOR_PAD}px`;
  el.style.top = `${rect.top - CURSOR_PAD}px`;
  el.style.width = `${rect.width + CURSOR_PAD * 2}px`;
  el.style.height = `${rect.height + CURSOR_PAD * 2}px`;
  el.style.zIndex = "9999";
  el.style.overflow = "visible";
}

export function WorkCursorProvider({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const activeSurfaceRef = useRef<HTMLElement | null>(null);
  const [frameEl, setFrameEl] = useState<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const setFrameRef = useCallback((node: HTMLDivElement | null) => {
    frameRef.current = node;
    setFrameEl(node);
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const setSurfaceActiveState = useCallback((el: HTMLElement | null) => {
    document
      .querySelectorAll(".nen-work-card__surface, .nen-palette-card__surface")
      .forEach((surface) => {
        const isActive = surface === el;
        surface.classList.toggle("nen-work-card__surface--active", isActive);
        surface.classList.toggle("nen-palette-card__surface--active", isActive);
      });
  }, []);

  const bindSurface = useCallback(
    (el: HTMLElement | null) => {
      if (activeSurfaceRef.current === el) return;
      activeSurfaceRef.current = el;
      if (frameRef.current) applyFrame(frameRef.current, el);
      setSurfaceActiveState(el);
      if (!el) {
        window.dispatchEvent(
          new PointerEvent("pointermove", {
            clientX: -1,
            clientY: -1,
            bubbles: true,
          }),
        );
      }
    },
    [setSurfaceActiveState],
  );

  const moveSurface = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      activeSurfaceRef.current = el;
      if (frameRef.current) applyFrame(frameRef.current, el);
      window.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: x,
          clientY: y,
          bubbles: true,
        }),
      );
    },
    [],
  );

  useLayoutEffect(() => {
    if (!frameEl) return;

    const onReposition = () => {
      if (!activeSurfaceRef.current || !frameRef.current) return;
      applyFrame(frameRef.current, activeSurfaceRef.current);
    };

    window.addEventListener("scroll", onReposition, { passive: true, capture: true });
    window.addEventListener("resize", onReposition);

    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
      bindSurface(null);
    };
  }, [frameEl, bindSurface]);

  return (
    <WorkCursorContext.Provider value={{ bindSurface, moveSurface }}>
      {children}
      {mounted
        ? createPortal(
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
                trailColor="#FF573D"
                size={18}
                trailLength={8}
                trailThickness={10}
                instantPresence
                suppressNativeCursor
                halo
                style={{ overflow: "visible" }}
              />
            </div>,
            document.body,
          )
        : null}
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
