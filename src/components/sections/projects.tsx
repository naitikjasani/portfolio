"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

import { projects, type Project, type ProjectKind } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StackLine } from "@/components/shared/tech-pill";
import { OfflineSyncDemo } from "@/components/visuals/offline-sync-demo";

const filters: ("All" | ProjectKind)[] = ["All", "Full-stack", "Backend", "Frontend"];

export function Projects() {
  const [featured, ...rest] = projects;
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = rest.filter((p) => filter === "All" || p.kind === filter);

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-5">
        <FeaturedProject project={featured} />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <h3 className="text-lg font-semibold text-foreground">More projects</h3>
          <div
            role="group"
            aria-label="Filter projects"
            className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-1"
          >
            {filters.map((f) => {
              const count = f === "All" ? rest.length : rest.filter((p) => p.kind === f).length;
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:px-3",
                    on ? "bg-gradient-accent text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                  <span className={cn("ml-1.5 text-xs", on ? "text-white/80" : "text-muted-foreground/70")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <CompactProject project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="text-sm text-muted-foreground">
      {project.category} · {project.year}
    </p>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
        >
          Source
          <ArrowUpRight className="size-4" />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Lock className="size-3.5" />
          Private repository
        </span>
      )}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
        >
          Open app{project.demoNote ? ` (${project.demoNote})` : ""}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function Highlights({ items }: { items: string[] }) {
  const Item = ({ text, className = "" }: { text: string; className?: string }) => (
    <li className={`relative pl-4 text-base leading-relaxed text-muted-foreground ${className}`}>
      <span className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-accent/70" aria-hidden />
      {text}
    </li>
  );
  const [first, rest] = [items.slice(0, 2), items.slice(2)];

  return (
    <div>
      <ul className="space-y-2">
        {first.map((h) => (
          <Item key={h} text={h} />
        ))}
        {/* Desktop shows everything; phones keep the rest one tap away. */}
        {rest.map((h) => (
          <Item key={h} text={h} className="hidden sm:block" />
        ))}
      </ul>
      {rest.length ? (
        <details className="group mt-2 sm:hidden">
          <summary className="cursor-pointer list-none text-sm text-muted-foreground [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">{rest.length} more</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <ul className="mt-2 space-y-2">
            {rest.map((h) => (
              <Item key={h} text={h} />
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="glow-border">
      <div className="glow-border-inner grid grid-cols-1 overflow-hidden lg:grid-cols-2">
        <Reveal className="space-y-5 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-accent rounded-full px-2.5 py-0.5 text-xs font-medium text-white">
                Featured
              </span>
              <Meta project={project} />
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-base text-foreground/85">{project.tagline}</p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>

          {project.stats ? (
            <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              {project.stats.map((s) => (
                <span key={s.label}>
                  <span className="metric text-gradient text-xl font-semibold">{s.value}</span>{" "}
                  {s.label}
                </span>
              ))}
            </p>
          ) : null}

          <Highlights items={project.highlights} />
          <StackLine items={project.stack} />
          <Links project={project} />
        </Reveal>

        <div className="relative border-t border-white/[0.06] bg-gradient-to-br from-accent/[0.07] via-transparent to-[hsl(var(--accent-2)/0.06)] p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="text-sm font-medium text-foreground">Try it: the write path</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Go offline, log a few workouts, reconnect — then retry a request.
          </p>
          <OfflineSyncDemo />
        </div>
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article className="glass h-full space-y-4 p-6 transition-colors hover:border-white/[0.12] sm:p-8">
      <div>
        <Meta project={project} />
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
          {project.name}
        </h3>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <Highlights items={project.highlights} />
      <StackLine items={project.stack} />
      <Links project={project} />
    </article>
  );
}
