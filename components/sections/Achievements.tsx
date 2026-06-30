"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ACHIEVEMENTS } from "@/lib/data";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export function Achievements() {
  return (
    <section id="achievements" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Impact"
          title="Numbers that compounded."
          align="center"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass group relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-electric/10 blur-3xl transition-all duration-500 group-hover:bg-accent-electric/25" />
              <div className="relative">
                <div className="text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">
                  <AnimatedCounter
                    value={a.value}
                    prefix={a.prefix}
                    suffix={a.suffix}
                    decimals={a.decimals}
                  />
                </div>
                 <p className="mt-4 text-sm leading-relaxed text-white">
                  {a.label}
                </p>
              </div>
              <div className="mt-6 h-px w-full origin-left scale-x-0 bg-accent-gradient transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
