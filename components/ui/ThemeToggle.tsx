"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/** A glass pill that flips between light and dark themes. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="hover"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-ink transition-colors duration-300 hover:bg-white/[0.12]",
        className,
      )}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
