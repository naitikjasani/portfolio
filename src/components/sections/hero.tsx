"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { telemetry } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { GridBackground } from "@/components/backgrounds/grid-background";
import { NetworkCanvas } from "@/components/backgrounds/network-canvas";
import { ScribbleUnderline } from "@/components/visuals/scribble-underline";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      <GridBackground />
      <NetworkCanvas className="mask-b-faded" opacity={0.7} />
      {/* Deepen the base toward the bottom for a clean handoff to the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="container relative">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-2xs uppercase tracking-[0.28em] text-muted-foreground">
              {site.name}
            </span>
            <span className="h-3.5 w-px bg-border" aria-hidden />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-2xs font-medium text-muted-foreground">
              <StatusDot />
              <span className="font-mono tracking-wide">
                {site.role} · {site.company}
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-7 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-6xl md:text-[4.5rem] md:leading-[1.03]"
          >
            Backend systems that stay{" "}
            <span className="whitespace-nowrap">
              <ScribbleUnderline className="text-accent">fast</ScribbleUnderline>,
            </span>{" "}
            correct, and calm under load.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Backend software engineer at {site.company}, building the order, returns and
            observability services behind a quick-commerce platform in Node.js and
            TypeScript — with prior Java Spring Boot microservices experience in healthcare.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={site.resumeHref} target="_blank" rel="noopener noreferrer">
                <FileText />
                Résumé
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
                <Github />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href={site.socials.email}>
                <Mail />
                Email
              </a>
            </Button>
          </motion.div>

          {/* Telemetry strip */}
          <motion.dl
            variants={item}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/80 bg-border/60 sm:grid-cols-4"
          >
            {telemetry.map((t) => (
              <div key={t.label} className="group bg-card/60 p-4 transition-colors hover:bg-card">
                <dt className="font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t.label}
                </dt>
                <dd className="mt-2 metric text-lg font-semibold text-foreground">{t.value}</dd>
                <dd className="mt-0.5 text-xs text-muted-foreground/80">{t.hint}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <a
          href="#about"
          className="pointer-events-auto inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="size-3.5 motion-safe:animate-bounce" />
          Scroll
        </a>
      </div>

      {/* Corner registration marks — quiet engineering detail */}
      <span className="pointer-events-none absolute left-4 top-24 hidden font-mono text-2xs text-muted-foreground/40 lg:block">
        01 / SYSTEM ONLINE
      </span>
      <span className="pointer-events-none absolute right-4 top-24 hidden items-center gap-1 font-mono text-2xs text-muted-foreground/40 lg:flex">
        ⌘K <ArrowUpRight className="size-3" />
      </span>
    </section>
  );
}
