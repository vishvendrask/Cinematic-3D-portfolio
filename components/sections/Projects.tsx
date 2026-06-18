"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { FadeIn } from "@/components/ui/TextReveal";
import { PROJECTS, type Project } from "@/lib/data";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

/** Animated, abstract "architecture diagram" visual unique to each project. */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${project.accent}14, transparent 60%), #0a0b0f`,
      }}
    >
      <div className="ring-grid absolute inset-0 opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 20%, ${project.accent}33, transparent 55%)`,
        }}
      />

      {/* mock architecture nodes */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250">
        <defs>
          <linearGradient id={`edge-${project.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={project.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[
          ["80,60", "200,40"],
          ["200,40", "320,80"],
          ["80,60", "160,150"],
          ["200,40", "200,150"],
          ["320,80", "260,180"],
          ["160,150", "260,180"],
        ].map(([a, b], i) => {
          const [x1, y1] = a.split(",").map(Number);
          const [x2, y2] = b.split(",").map(Number);
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#edge-${project.id})`}
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          );
        })}
        {[
          [80, 60],
          [200, 40],
          [320, 80],
          [160, 150],
          [200, 150],
          [260, 180],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill={project.accent}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            style={{ filter: `drop-shadow(0 0 6px ${project.accent})` }}
          />
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
          {project.category}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={(index % 2) * 0.1} className="h-full">
      <TiltCard className="h-full p-6 sm:p-8">
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-ink-faint">
                {project.year}
              </span>
              <h3 className="mt-1 text-2xl font-semibold text-ink">
                {project.title}
              </h3>
            </div>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-colors duration-300 group-hover:text-ink"
              data-cursor="hover"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <ProjectVisual project={project} />

          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            {project.tagline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-electric">
                Challenge
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {project.challenge}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-purple">
                Solution
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Results
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.results.map((r) => (
                <li
                  key={r}
                  className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-ink"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
              {project.stack.map((s) => (
                <span key={s} className="font-mono text-xs text-ink-faint">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </FadeIn>
  );
}

export function Projects() {
  const [feature, ...rest] = PROJECTS;
  return (
    <section id="projects" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Products engineered for scale."
          description="Case studies spanning enterprise healthcare, developer tooling, fintech and identity."
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ProjectCard project={feature} index={0} />
          </div>
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
