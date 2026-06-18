"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { HeroSceneContent } from "./HeroSceneContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The full-bleed 3D backdrop for the hero. Falls back to a static gradient when
 * reduced motion is preferred. Loaded via dynamic import (client-only).
 */
export function HeroScene() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(77,124,255,0.25),transparent_60%)]" />
    );
  }

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 45 }}
    >
      <Suspense fallback={null}>
        <HeroSceneContent />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
