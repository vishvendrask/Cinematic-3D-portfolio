"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltOptions {
  max?: number;
}

/**
 * 3D tilt motion values driven by cursor position over a card.
 */
export function useTilt({ max = 10 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.4 };
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { ref, rotateX, rotateY, glareX, glareY, handleMouseMove, handleMouseLeave };
}
