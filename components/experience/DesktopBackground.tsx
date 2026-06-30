import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { AmbientGlow } from "../ui/AmbientGlow";

/**
 * Renders a macOS‑style desktop background with:
 *  • a high‑quality wallpaper (lazy‑loaded via next/image)
 *  • a soft vignette overlay
 *  • ambient glow for depth
 *  • slight mouse‑based parallax (disabled when prefers‑reduced‑motion)
 */
export default function DesktopBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const translateX = useTransform(x, [-100, 100], [-5, 5]);
  const translateY = useTransform(y, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set(((clientX / innerWidth) * 200) - 100);
    y.set(((clientY / innerHeight) * 200) - 100);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      // Place behind the 3D canvas (z-index -10) to avoid being covered
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ x: translateX, y: translateY }}
    >
      <Image
        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1920&q=80"
        alt="macOS wallpaper"
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40" />
      <AmbientGlow />
    </motion.div>
  );
}
