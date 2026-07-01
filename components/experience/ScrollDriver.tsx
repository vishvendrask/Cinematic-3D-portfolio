"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, setProgress } from "@/lib/experience";

interface ScrollDriverProps {
  /** The tall stage element that spans every scene. */
  target: RefObject<HTMLElement>;
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Bridges page scroll → the global experience progress (0..1).
 * Every narrative section owns a scrubbed GSAP timeline so each act can carry
 * its own camera/laptop move while the 3D scene samples one render-free store.
 */
export function ScrollDriver({ target }: ScrollDriverProps) {
  // Intro animation was previously handled via GSAP. We'll replace it with a simple timeout for reliability in production.
  const introTimer = useRef<NodeJS.Timeout | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = target.current;
    if (!el) return;

    // Manually control scroll restoration and reset state on mount.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setProgress(0);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const segments = SCENES.length;

      // Each scene section drives its own progress segment.
      SCENES.forEach((scene, index) => {
        const section = el.querySelector<HTMLElement>(`#${scene.id}`);
        if (!section) return;

        const from = index / segments;
        const to = (index + 1) / segments;
        const driver = { progress: from };

        gsap.to(driver, {
          progress: to,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          onUpdate: (self) => {
            // If the intro timer hasn't fired yet, we still want to allow scroll updates.
            setProgress(self.progress * (to - from) + from);
          },
          },
        });
      });
    }, el);

    // Simple intro: after a short delay, advance progress just enough to open the lid.
    const heroEnd = 1 / SCENES.length;
    introTimer.current = setTimeout(() => {
      setProgress(heroEnd - 0.001);
      // Refresh ScrollTrigger after the intro progress change to ensure timelines are in sync.
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
      if (introTimer.current) {
        clearTimeout(introTimer.current);
        introTimer.current = null;
      }
      ctx.revert();
    };
  }, [target]);

  return null;
}
