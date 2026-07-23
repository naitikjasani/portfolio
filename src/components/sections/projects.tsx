import { ArrowUpRight, Check } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TechPill } from "@/components/shared/tech-pill";
import { BleVisual } from "@/components/visuals/ble-visual";
import { ArchitectureVisual } from "@/components/visuals/architecture-visual";

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      kicker="Projects"
      title="Things I've built end to end."
      description="Not screenshots — the systems themselves. Each one started with a question about how something should work, and ended with a service that answers it."
    >
      <div className="space-y-16 lg:space-y-24">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} reversed={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Visual */}
      <Reveal
        className={cn("order-1", reversed ? "lg:order-2" : "lg:order-1")}
        y={24}
      >
        <div className="surface relative overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-dots opacity-[0.35]" aria-hidden />
          <div className="pointer-events-none absolute right-4 top-4 font-mono text-2xs tracking-wide text-muted-foreground/60">
            {project.visual === "ble" ? "signal.map" : "request.flow"}
          </div>
          <div className="relative">
            {project.visual === "ble" ? <BleVisual /> : <ArchitectureVisual />}
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <Reveal
        className={cn("order-2 space-y-5", reversed ? "lg:order-1" : "lg:order-2")}
        delay={0.1}
      >
        <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-accent">{project.category}</span>
          <span className="h-px w-6 bg-border" aria-hidden />
          <span>{project.year}</span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-[2rem]">
            {project.name}
          </h3>
          <p className="mt-2 text-pretty text-base text-accent-soft/90">{project.tagline}</p>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        <ul className="grid gap-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <TechPill key={tech}>{tech}</TechPill>
          ))}
        </div>

        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View source
          <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </article>
  );
}
