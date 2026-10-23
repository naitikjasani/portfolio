import { ArrowUpRight, FileText, Lock } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StackLine } from "@/components/shared/tech-pill";
import { OfflineSyncDemo } from "@/components/visuals/offline-sync-demo";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-5">
        <FeaturedProject project={featured} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((project) => (
            <Reveal key={project.slug}>
              <CompactProject project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ContextTag({ project }: { project: Project }) {
  if (!project.context) return null;
  return (
    <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-foreground/85">
      {project.context}
    </span>
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
      {project.docs ? (
        <a
          href={project.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-accent"
        >
          <FileText className="size-3.5" />
          Architecture notes
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
    <article id={`project-${project.slug}`} className="glow-border scroll-mt-24">
      <div className="glow-border-inner grid grid-cols-1 overflow-hidden lg:grid-cols-2">
        <Reveal className="space-y-5 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-accent rounded-full px-2.5 py-0.5 text-xs font-medium text-white">
                Featured
              </span>
              <ContextTag project={project} />
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
            Two workouts were logged with no signal. Reconnect to sync them, then retry a request.
          </p>
          <OfflineSyncDemo />
        </div>
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="glass h-full scroll-mt-24 space-y-4 p-6 transition-colors hover:border-white/[0.12] sm:p-8"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <ContextTag project={project} />
          <Meta project={project} />
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
          {project.name}
        </h3>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>
      <Highlights items={project.highlights} />
      <StackLine items={project.stack} />
      <Links project={project} />
    </article>
  );
}
