"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";

import { leadership, timeline } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section
      id="timeline"
      index="06"
      kicker="Timeline"
      title="The path so far."
      description="A short changelog of where I've been building — and what I was learning at each step."
    >
      <div ref={ref} className="relative">
        {/* rail */}
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-border sm:left-[calc(8rem+7px)]" aria-hidden />
        <motion.div
          className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent/20 sm:left-[calc(8rem+7px)]"
          style={{ scaleY, height: "calc(100% - 0.5rem)" }}
          aria-hidden
        />

        <ol className="space-y-10">
          {timeline.map((entry, i) => {
            const Icon = entry.kind === "education" ? GraduationCap : Briefcase;
            return (
              <motion.li
                key={`${entry.org}-${entry.title}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 gap-x-8 gap-y-2 pl-8 sm:grid-cols-[8rem_1fr] sm:pl-0"
              >
                {/* period */}
                <div className="sm:pr-8 sm:text-right">
                  <span className="font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
                    {entry.period}
                  </span>
                </div>

                {/* marker */}
                <span
                  className={cn(
                    "absolute left-0 top-1 grid size-3.5 place-items-center rounded-full border-2 bg-background sm:left-[calc(8rem+1px)]",
                    entry.kind === "education" ? "border-muted-foreground" : "border-accent",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      entry.kind === "education" ? "bg-muted-foreground" : "bg-accent",
                    )}
                  />
                </span>

                {/* content */}
                <div className="sm:pl-8">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <h3 className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {entry.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-accent">{entry.org}</p>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="mt-14 border-t border-border/60 pt-8 sm:pl-[calc(8rem+2rem)]">
        <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground">
          <Users className="size-3.5" />
          Leadership & activities
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {leadership.map((l) => (
            <li key={l.org} className="surface px-4 py-3">
              <div className="text-sm font-medium text-foreground">{l.org}</div>
              <div className="mt-0.5 font-mono text-2xs tracking-wide text-accent">{l.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
