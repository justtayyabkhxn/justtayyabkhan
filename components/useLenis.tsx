// hooks/useLenis.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -12 * t)),
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
};