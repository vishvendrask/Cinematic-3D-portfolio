"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setProgress } from "@/lib/experience";

interface ScrollDriverProps {
  /** The tall stage element that spans every scene. */
  target: RefObject<HTMLElement>;
}

/**
 * Bridges page scroll → the global experience progress (0..1).
 * A single ScrollTrigger spans the whole stage; its eased progress feeds the
 * render-free store consumed by the 3D scene and the on-screen apps.
 */
export function ScrollDriver({ target }: ScrollDriverProps) {
  useEffect(() => {
    const el = target.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    // Sync once on mount in case we load mid-page.
    setProgress(trigger.progress);

    return () => trigger.kill();
  }, [target]);

  return null;
}
