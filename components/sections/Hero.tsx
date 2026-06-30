"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

const headlineWords = ["Building", "Frontend", "Systems", "That", "Scale"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const word = {
  hidden: { y: "120%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 3D backdrop */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <HeroScene />
      </motion.div>

      {/* grid + glow overlays */}
      <div className="ring-grid pointer-events-none absolute inset-0 z-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent" />

      {/* content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="eyebrow mb-8"
        >
           <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
           <span className="text-white">Senior Frontend Engineer · Bangalore, India</span>
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl md:text-8xl lg:text-[8.5rem]"
        >
          {headlineWords.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={word}
                className={`mr-[0.22em] inline-block will-change-transform ${
                  i === 4 ? "accent-gradient-text" : "text-gradient"
                }`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
           className="mt-8 max-w-2xl text-balance text-base text-white sm:text-lg"
         >
           <span className="text-white">Senior Frontend Engineer · 7+ Years Experience · React · TypeScript · Redux Toolkit · React Query · Architecture</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#experience">
            <MagneticButton variant="primary">
              View Experience
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </a>
          <a href="#projects">
            <MagneticButton variant="ghost">
              View Projects
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </a>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
         className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white"
        data-cursor="hover"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/15">
          <motion.span
            className="mt-1.5 h-2 w-1 rounded-full bg-accent-electric"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
