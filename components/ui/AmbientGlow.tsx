"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
}

/** Floating, slowly-animating ambient gradient blobs for background depth. */
export function AmbientGlow({ className }: AmbientGlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute -left-32 top-10 h-[40rem] w-[40rem] rounded-full bg-accent-electric/20 blur-[140px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-accent-purple/20 blur-[150px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-blue/15 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
