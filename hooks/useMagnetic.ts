"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface MagneticOptions {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

/**
 * Provides spring-driven x/y motion values that pull an element toward the
 * cursor, creating a magnetic hover effect.
 */
export function useMagnetic({
  strength = 0.35,
  damping = 15,
  stiffness = 150,
}: MagneticOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping, stiffness, mass: 0.4 });
  const springY = useSpring(y, { damping, stiffness, mass: 0.4 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
}
