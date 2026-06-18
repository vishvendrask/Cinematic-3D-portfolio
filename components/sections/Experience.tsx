"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE, type ExperienceItem } from "@/lib/data";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

function TimelineRow({ item }: { item: ExperienceItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid gap-6 pb-16 last:pb-0 md:grid-cols-[200px_1fr] md:gap-12"
    >
      {/* node */}
      <div className="absolute left-[7px] top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-accent-electric shadow-[0_0_16px_3px_rgba(91,139,255,0.7)] md:left-[200px] md:block" />

      <div className="md:text-right">
        <span className="font-mono text-sm text-accent-electric">
          {item.period}
        </span>
        {item.location && (
          <p className="mt-1 text-xs text-ink-faint">{item.location}</p>
        )}
      </div>

      <div className="group glass relative rounded-3xl p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] md:ml-8">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(77,124,255,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
            <Building2 className="h-4 w-4 text-accent-electric" />
          </span>
          <h3 className="text-xl font-semibold text-ink">{item.company}</h3>
          {item.client && (
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-ink-muted">
              {item.client}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-medium text-accent-purple">{item.role}</p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {item.summary}
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {item.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm text-ink-muted"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-electric" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline of building at scale."
          description="Seven years across global product teams — from banking to healthcare to developer tooling."
        />

        <div ref={ref} className="relative mt-20">
          {/* progress line */}
          <div className="absolute left-[7px] top-0 hidden h-full w-px bg-white/10 md:left-[200px] md:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent-electric to-accent-purple"
            />
          </div>

          {EXPERIENCE.map((item) => (
            <TimelineRow key={item.company + item.role} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
