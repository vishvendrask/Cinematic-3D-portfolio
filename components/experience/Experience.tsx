"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { ScrollDriver } from "./ScrollDriver";
import { Narrative } from "./Narrative";
import { SceneDock } from "./SceneDock";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ExperienceCanvas = dynamic(
  () => import("./ExperienceCanvas").then((m) => m.ExperienceCanvas),
  { ssr: false },
);

/**
 * The complete cinematic experience: a persistent floating MacBook (the fixed
 * 3D stage) behind a scrolling narrative that re-poses it act by act.
 *
 * Honors `prefers-reduced-motion` by dropping the 3D stage while keeping the
 * full narrative + scene tracking intact.
 */
export function Experience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <>
      {!reduced && <ExperienceCanvas />}

      {/* Vignette + ambient glow framing the laptop. */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="exp-vignette absolute inset-0" />
        <div className="ring-grid absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <ScrollDriver target={stageRef} />
      <SceneDock />

      <div ref={stageRef} className="relative z-10">
        <Narrative />
      </div>
    </>
  );
}
