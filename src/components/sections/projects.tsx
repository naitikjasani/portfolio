import { ArrowUpRight, Lock } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StackLine } from "@/components/shared/tech-pill";
import { OfflineSyncDemo } from "@/components/visuals/offline-sync-demo";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-6">
        <FeaturedProject project={featured} />
        {rest.map((project) => (
          <Reveal key={project.slug}>
            <CompactProject project={project} />
          </Reveal>
        ))}
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
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card/40">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Reveal className="space-y-5 p-6 sm:p-8">
          <div>
            <Meta project={project} />
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {project.name}
            </h3>
            <p className="mt-1 text-base text-foreground/85">{project.tagline}</p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>

          {project.stats ? (
            <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              {project.stats.map((s) => (
                <span key={s.label}>
                  <span className="metric text-base font-semibold text-foreground">{s.value}</span>{" "}
                  {s.label}
                </span>
              ))}
            </p>
          ) : null}

          <Highlights items={project.highlights} />
          <StackLine items={project.stack} />
          <Links project={project} />
        </Reveal>

        <div className="border-t border-border/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
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
    <article className="space-y-4 rounded-xl border border-border/80 p-6 sm:p-8">
      <div>
        <Meta project={project} />
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
          {project.name}
        </h3>
      </div>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <Highlights items={project.highlights} />
      <StackLine items={project.stack} />
      <Links project={project} />
    </article>
  );
}
