"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const child: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

/** Word-by-word masked reveal driven by viewport entry. */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  once = true,
}: TextRevealProps) {
  const words = useMemo(() => text.split(" "), [text]);
  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.25em] overflow-hidden py-[0.05em]">
          <motion.span variants={child} className="inline-block will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Simple fade + rise on viewport entry. */
export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
