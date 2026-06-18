"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}

/** A glassmorphic card with 3D cursor tilt and dynamic glare. */
export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
}: TiltCardProps) {
  const { ref, rotateX, rotateY, glareX, glareY, handleMouseMove, handleMouseLeave } =
    useTilt({ max });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn(
        "preserve-3d relative overflow-hidden rounded-3xl glass transition-shadow duration-300",
        className,
      )}
    >
      {glare && (
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(420px circle at ${0}px ${0}px, rgba(124,140,255,0.18), transparent 60%)`,
            left: glareX,
            top: glareY,
          }}
          className="pointer-events-none absolute -inset-px opacity-60"
        />
      )}
      <div className="relative z-10 h-full" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
