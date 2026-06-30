"use client";

import { SCENES } from "@/lib/experience";
import { useActiveScene } from "@/hooks/useActiveScene";
import { cn } from "@/lib/utils";

/**
 * A fixed dock that mirrors macOS — each dot is an act of the story.
 * Highlights the active scene and jumps via anchor links (Lenis handles it).
 */
export function SceneDock() {
  const active = useActiveScene();

  return (
    <nav
      aria-label="Sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SCENES.map((scene, i) => (
        <a
          key={scene.id}
          href={`#${scene.id}`}
          data-cursor="hover"
          aria-label={scene.title}
          className="group relative flex items-center"
        >
          <span
            className={cn(
              "block h-2.5 w-2.5 rounded-full border transition-all duration-300",
              i === active
                ? "scale-125 border-accent-electric bg-accent-electric shadow-[0_0_12px_2px_rgba(77,124,255,0.7)]"
                : "border-white/25 bg-white/10 group-hover:border-white/60",
            )}
          />
           <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/10 bg-black/70 px-2.5 py-1 text-[11px] text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
            {scene.eyebrow.split("·")[0].trim()}
          </span>
        </a>
      ))}
    </nav>
  );
}
