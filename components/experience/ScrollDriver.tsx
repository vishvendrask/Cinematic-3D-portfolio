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
  const introAnimation = useRef<gsap.core.Tween | null>(null);

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

  // Removed wheel listener that prematurely cancelled the intro animation.
  // The intro now runs to completion, and scroll control is managed by
  // GSAP ScrollTrigger instances defined later.

  // Intro animation should start with the laptop closed (progress = 0) and
  // animate the opening within the first scene (hero). Previously the intro
  // advanced the global progress to the end of the first segment
  // (1 / SCENES.length), causing the app to immediately jump to the next
  // section and display the wrong content. We now animate from 0 to a very
  // small value so that the hero keyframe (which opens the lid) can play
  // smoothly without skipping.
  const targetProgress = { value: 0 };
  // Delay the intro animation so the laptop appears closed for 1 second
  // before opening. The animation then moves a tiny amount of progress to
  // trigger the hero keyframe (which opens the lid).
  // Wait 1 s with the laptop closed, then animate progress to the end of the
  // hero segment (1 / SCENES.length). This triggers the hero keyframe, which
  // opens the lid and displays the correct content while keeping the left
  // navigation visible.
  // Animate to just before the end of the hero segment so the hero scene
  // remains active after the lid opens. This prevents an immediate jump to the
  // next section.
  const heroEnd = 1 / SCENES.length;
  introAnimation.current = gsap.to(targetProgress, {
    value: heroEnd - 0.001,
    duration: 2,
    delay: 1,
    ease: "power3.inOut",
    onUpdate: () => setProgress(targetProgress.value),
    onComplete: () => {
      introAnimation.current = null;
        // No wheel listener to remove; intro animation handles its own cleanup.
    },
  });

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
              if (introAnimation.current?.isActive()) return;
              setProgress(self.progress * (to - from) + from);
            },
          },
        });
      });
    }, el);

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
      if (introAnimation.current?.isActive()) {
        introAnimation.current.kill();
        introAnimation.current = null;
      }
        // No wheel listener was added, so nothing to remove here.
      ctx.revert();
    };
  }, [target]);

  return null;
}
