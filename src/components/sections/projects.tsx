import Image from "next/image";
import { ArrowUpRight, Check, Lock, MousePointerClick } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TechPill } from "@/components/shared/tech-pill";
import { BleVisual } from "@/components/visuals/ble-visual";
import { OfflineSyncDemo } from "@/components/visuals/offline-sync-demo";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" index="02" kicker="Projects" title="Things I've built end to end.">
      <div className="space-y-8">
        <FeaturedProject project={featured} />
        {rest.map((project) => (
          <CompactProject key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
      <span className="text-accent">{project.category}</span>
      <span className="hidden h-px w-6 bg-border sm:block" aria-hidden />
      <span>{project.year}</span>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View source
          <ArrowUpRight className="size-4" />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Lock className="size-3.5" />
          Private repository
        </span>
      )}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          Open app{project.demoNote ? ` (${project.demoNote})` : ""}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="surface overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        {/* Story */}
        <Reveal className="space-y-5 p-5 sm:p-8">
          <ProjectMeta project={project} />
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-2 text-pretty text-base text-accent-soft/90">{project.tagline}</p>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>

          {project.stats ? (
            <dl className="grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-border/80 bg-border/60">
              {project.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-card/80 px-3 py-2.5">
                  <dt className="text-2xs text-muted-foreground">{s.label}</dt>
                  <dd className="metric text-lg font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul className="grid gap-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
          <ProjectLinks project={project} />
        </Reveal>

        {/* Interactive demo */}
        <div className="relative border-t border-border/70 bg-elevated/30 p-5 sm:p-8 lg:border-l lg:border-t-0">
          <div className="absolute inset-0 bg-dots opacity-[0.3]" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-accent">
              <MousePointerClick className="size-3.5" />
              Try it · the write path
            </div>
            <OfflineSyncDemo />
          </div>
        </div>
      </div>

      {project.screenshots?.length ? (
        <div className="border-t border-border/70 p-5 sm:p-8">
          <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
            {project.screenshots.map((shot) => (
              <a
                key={shot.src}
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 snap-start overflow-hidden rounded-lg border border-border/80 transition-colors hover:border-accent/50"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="h-56 w-auto sm:h-72"
                />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="surface grid items-center gap-6 overflow-hidden p-5 sm:grid-cols-[1fr_15rem] sm:p-8 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-4">
          <ProjectMeta project={project} />
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>
          </div>
          <ul className="grid gap-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
        <div className="mx-auto hidden w-full max-w-[18rem] sm:block">
          <BleVisual />
        </div>
      </article>
    </Reveal>
  );
}
