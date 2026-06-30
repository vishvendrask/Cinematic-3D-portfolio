"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/TextReveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const paragraphs = [
  "I started in Android development and learned how software behaves when it reaches real devices and real users.",
  "That evolved into building enterprise frontend systems with React, TypeScript, Redux Toolkit and React Query across healthcare, banking and government domains.",
  "Today I focus on reusable systems, performance, and maintainable UI architecture that supports large teams and long-lived products.",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="flex flex-col">
          <SectionHeading
            eyebrow="The Story"
            title="From Android pixels to systems for millions."
          />
          <div ref={ref} className="mt-12 space-y-7">
            {paragraphs.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                 <p className="text-lg leading-relaxed text-white sm:text-xl">
                  {p}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-12">
            <dl className="grid grid-cols-3 gap-4">
              {[
                { k: "7+", v: "Years" },
                { k: "10M+", v: "Users reached" },
                { k: "5+", v: "Companies" },
              ].map((stat) => (
                <div
                  key={stat.v}
                  className="glass rounded-2xl px-5 py-6 text-center"
                >
                  <dt className="text-3xl font-semibold accent-gradient-text">
                    {stat.k}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-gray-300">
                    {stat.v}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* visual portrait card */}
        <FadeIn delay={0.15} className="relative">
          <motion.div
            style={{ y: imageY }}
            className="glass-strong relative overflow-hidden rounded-[2rem] p-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-slate via-surface to-background">
              <div className="ring-grid absolute inset-0 opacity-30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.35),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(77,124,255,0.3),transparent_55%)]" />

              {/* monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="select-none text-[10rem] font-bold leading-none text-white/[0.06]">
                  VK
                </span>
              </div>

              {/* floating chips */}
              {[
                { label: "Architecture", x: "8%", y: "14%", d: 0 },
                { label: "Performance", x: "62%", y: "30%", d: 0.6 },
                { label: "Design Systems", x: "16%", y: "70%", d: 1.2 },
                { label: "Enterprise UI", x: "58%", y: "78%", d: 1.8 },
              ].map((chip) => (
                <motion.span
                  key={chip.label}
                   className="glass absolute rounded-full px-4 py-2 text-xs font-medium text-gray-300"
                  style={{ left: chip.x, top: chip.y }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 5,
                    delay: chip.d,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {chip.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
