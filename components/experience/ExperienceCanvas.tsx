"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { Scene } from "./Scene";

/**
 * The persistent, fixed 3D stage. Stays mounted for the entire page so the
 * MacBook never unmounts — it simply re-poses as the story scrolls.
 */
export function ExperienceCanvas() {
  return (
    <div className="fixed inset-0 z-0 h-[100svh] w-full">
      <Canvas
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.4, 6.4], fov: 38 }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
