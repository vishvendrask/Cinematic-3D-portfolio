"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  Hand,
  Layers3,
  Sparkles,
  Wand2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VISION_AREAS } from "@/lib/data";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const ICONS = [BrainCircuit, Wand2, Hand, Sparkles, Layers3, Boxes];

export function FutureVision() {
  return (
    <section id="future" className="relative section-pad">
      <AmbientGlow />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What's Next"
          title="What I keep sharpening"
          description="The practices that matter most in long-lived frontend systems."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VISION_AREAS.map((area, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                data-cursor="hover"
                className="glass group relative overflow-hidden rounded-3xl p-7"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-accent-electric transition-colors duration-300 group-hover:bg-accent-electric/15">
                  <Icon className="h-5 w-5" />
                </span>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                  {area.title}
                </h3>
                 <p className="mt-3 text-sm leading-relaxed text-white">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
