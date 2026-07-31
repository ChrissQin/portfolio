"use client";

import { useEffect, useState, type RefObject } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function isElementInView(node: Element, threshold: number): boolean {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, vw) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) {
    return false;
  }

  const ratio =
    (visibleHeight * visibleWidth) / Math.max(rect.height * rect.width, 1);
  return ratio >= threshold;
}

export function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.25,
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) {
      return;
    }

    if (isElementInView(node, threshold)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, inView, threshold]);

  return inView;
}
