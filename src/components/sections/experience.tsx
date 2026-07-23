import { Activity, ChevronRight } from "lucide-react";

import { experiences, type Experience as ExperienceType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TechPill } from "@/components/shared/tech-pill";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      kicker="Experience"
      title="Deployed to production."
      description="Two environments, two domains. Each role, framed the way I think about it — as a running service with a clear contract and measurable outcomes."
    >
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <Reveal key={exp.slug} delay={i * 0.08}>
            <ServiceCard exp={exp} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({ exp }: { exp: ExperienceType }) {
  const running = exp.status === "RUNNING";

  return (
    <article className="group surface surface-hover overflow-hidden">
      {/* status bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-elevated/40 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "size-2 rounded-full",
              running ? "bg-success motion-safe:animate-pulse" : "bg-accent",
            )}
          />
          <span className="font-mono text-2xs tracking-wide text-muted-foreground">
            {exp.slug}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-2xs tracking-wide",
              running
                ? "border-success/30 bg-success/10 text-success"
                : "border-accent/30 bg-accent/10 text-accent",
            )}
          >
            <Activity className="size-3" />
            {exp.status}
          </span>
          <span className="rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-2xs tracking-wide text-muted-foreground">
            {exp.region}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
              {exp.company}
            </h3>
            <span className="shrink-0 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
              {exp.period}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-accent">{exp.role}</p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            {exp.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {exp.stack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
        </div>

        {/* achievements */}
        <ul className="space-y-4 lg:border-l lg:border-border/60 lg:pl-10">
          {exp.achievements.map((a) => (
            <li key={a.label} className="flex gap-4">
              <div className="w-24 shrink-0 pt-0.5">
                <span className="metric text-sm font-semibold text-foreground">{a.metric}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <ChevronRight className="size-3.5 shrink-0 text-accent" />
                  {a.label}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
