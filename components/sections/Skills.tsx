"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Boxes,
  Code2,
  Cpu,
  FlaskConical,
  Layers,
  Server,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/data";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Cpu> = {
  Languages: Code2,
  Frontend: Layers,
  Architecture: Boxes,
  Backend: Server,
  Testing: FlaskConical,
  Tools: Wrench,
  Default: Cpu,
};

export function Skills() {
  const [active, setActive] = useState(SKILLS[0].category);
  const activeGroup = SKILLS.find((g) => g.category === active) ?? SKILLS[0];

  return (
    <section id="skills" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="A toolkit honed across enterprise teams."
          description="Hover a domain to explore the stack. Built for performance, reuse and longevity."
          align="center"
        />

        {/* category selector */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {SKILLS.map((group) => {
            const Icon = ICONS[group.category] ?? ICONS.Default;
            const isActive = active === group.category;
            return (
              <button
                key={group.category}
                onMouseEnter={() => setActive(group.category)}
                onFocus={() => setActive(group.category)}
                onClick={() => setActive(group.category)}
                data-cursor="hover"
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-accent-gradient shadow-[0_8px_30px_-8px_rgba(91,139,255,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* skills grid */}
        <div className="relative mt-12 min-h-[14rem]">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            {activeGroup.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.04 }}
                data-cursor="hover"
                className="glass group relative rounded-2xl px-6 py-5 text-center"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(124,140,255,0.25),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative text-base font-medium text-ink">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
