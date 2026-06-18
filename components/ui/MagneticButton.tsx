"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  strength?: number;
  children?: ReactNode;
}

/** A button that magnetically follows the cursor on hover. */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = "primary", strength = 0.4, ...props }, forwardedRef) => {
    void forwardedRef;
    const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
      useMagnetic({ strength });

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.96 }}
        data-cursor="hover"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300",
          variant === "primary" &&
            "bg-accent-gradient text-white shadow-[0_8px_40px_-8px_rgba(91,139,255,0.6)]",
          variant === "ghost" &&
            "glass text-ink hover:bg-white/[0.07]",
          className,
        )}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120px_60px_at_var(--x,50%)_50%,rgba(255,255,255,0.35),transparent)]" />
        )}
      </motion.button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";
