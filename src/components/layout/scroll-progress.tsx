"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline reading-progress bar pinned to the very top of the viewport —
 * a quiet, instrument-panel detail that also aids orientation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[45] h-0.5 origin-left bg-gradient-to-r from-accent/40 via-accent to-accent/40"
    />
  );
}
