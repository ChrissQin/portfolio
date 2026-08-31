"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const THUMB_SELECTOR = ".nen-work-card__thumb";
const HEAD = "#11110F";
const OUTLINE = "#F7F5F1";
const TRAIL = "#FF573D";
const SIZE = 18;
const TRAIL_LENGTH = 8;
const TRAIL_THICKNESS = 10;
const FOLLOW_TAU = 0.01;
const BORDER_WIDTH = 2;

type Point = { x: number; y: number; age: number };

function withAlpha(input: string, alpha: number) {
  const a = Math.max(0, Math.min(1, alpha));
  const hex = input.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return `rgba(0,0,0,${a})`;
  const n = parseInt(hex[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  trailMs: number,
) {
  const n = points.length;
  if (n < 2) return;

  const maxHalf = Math.max(0.5, ((TRAIL_THICKNESS / 20) * SIZE) / 2);
  const lx: number[] = [];
  const ly: number[] = [];
  const rx: number[] = [];
  const ry: number[] = [];
  let nx = 0;
  let ny = 0;

  for (let i = 0; i < n; i++) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(n - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy);
    if (len > 0.0001) {
      nx = -dy / len;
      ny = dx / len;
    }
    const t = Math.max(0, Math.min(1, 1 - points[i].age / trailMs));
    const half = maxHalf * t;
    lx.push(points[i].x + nx * half);
    ly.push(points[i].y + ny * half);
    rx.push(points[i].x - nx * half);
    ry.push(points[i].y - ny * half);
  }

  ctx.beginPath();
  ctx.moveTo(lx[0], ly[0]);
  for (let i = 1; i < n; i++) ctx.lineTo(lx[i], ly[i]);
  for (let i = n - 1; i >= 0; i--) ctx.lineTo(rx[i], ry[i]);
  ctx.closePath();
  ctx.fillStyle = TRAIL;
  ctx.fill();
}

function setThumbCursorActive(thumb: Element | null) {
  document.querySelectorAll(THUMB_SELECTOR).forEach((el) => {
    el.classList.toggle("nen-work-card__thumb--cursor", el === thumb);
  });
}

/** One viewport canvas — dot + trail while the pointer is over a work thumbnail. */
export function WorkGridDotCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let ballX = 0;
    let ballY = 0;
    let targetX = 0;
    let targetY = 0;
    let active = false;
    let visible = false;
    let points: Point[] = [];

    const onMove = (e: PointerEvent) => {
      const thumb =
        document.elementFromPoint(e.clientX, e.clientY)?.closest(THUMB_SELECTOR) ??
        null;
      const over = thumb !== null;

      if (over) {
        if (!visible) {
          ballX = e.clientX;
          ballY = e.clientY;
          points = [];
          visible = true;
          canvas.style.opacity = "1";
        }
        targetX = e.clientX;
        targetY = e.clientY;
        active = true;
        setThumbCursorActive(thumb);
      } else {
        active = false;
        setThumbCursorActive(null);
      }
    };

    const onLeave = () => {
      active = false;
      setThumbCursorActive(null);
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      ctx.clearRect(0, 0, w, h);

      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const followEase = 1 - Math.exp(-dt / FOLLOW_TAU);
      ballX += (targetX - ballX) * followEase;
      ballY += (targetY - ballY) * followEase;

      const trailMs = TRAIL_LENGTH * 40;
      if (active) points.push({ x: ballX, y: ballY, age: 0 });
      for (const pt of points) pt.age += dt * 1000;
      points = points.filter((pt) => pt.age < trailMs);

      drawTrail(ctx, points, trailMs);

      if (!active && points.length === 0) {
        visible = false;
        canvas.style.opacity = "0";
        raf = requestAnimationFrame(frame);
        return;
      }

      const radius = SIZE / 2;
      ctx.beginPath();
      ctx.arc(ballX, ballY, Math.max(0.5, radius), 0, Math.PI * 2);
      ctx.fillStyle = withAlpha(HEAD, 1);
      ctx.fill();
      ctx.strokeStyle = withAlpha(OUTLINE, 1);
      ctx.lineWidth = BORDER_WIDTH;
      ctx.stroke();

      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      setThumbCursorActive(null);
      canvas.style.opacity = "0";
    };
  }, [isClient]);

  if (!isClient) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      className="nen-work-grid-cursor"
      aria-hidden="true"
    />,
    document.body,
  );
}
