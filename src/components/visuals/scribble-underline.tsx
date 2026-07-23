"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Wraps an inline word and draws a slightly irregular, hand-made underline
 * beneath it — the kind of imperfection a person adds and a template never does.
 */
export function ScribbleUnderline({
  children,
  className,
  delay = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden
        className="absolute -bottom-2 left-0 h-[0.4em] w-full overflow-visible text-accent"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M2 8.5C31 3.5 63 3 96 5.5C129 8 165 9 198 4"
          stroke="currentColor"
          strokeWidth={3.5}
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </span>
  );
}
