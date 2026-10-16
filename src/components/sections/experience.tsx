import { Activity, ArrowUpRight } from "lucide-react";

import { experiences, type Experience as ExperienceType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TechPill } from "@/components/shared/tech-pill";
import { AchievementList } from "@/components/sections/achievement-list";

export function Experience() {
  return (
    <Section id="experience" index="01" kicker="Experience" title="Deployed to production.">
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
    <article className="surface surface-hover overflow-hidden">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[18rem_1fr] lg:gap-12">
        {/* Who / when */}
        <div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-2xs tracking-wide",
                running
                  ? "border-success/30 bg-success/10 text-success"
                  : "border-border bg-secondary/50 text-muted-foreground",
              )}
            >
              <Activity className={cn("size-3", running && "motion-safe:animate-pulse")} />
              {running ? "Current" : "Completed"}
            </span>
            <span className="font-mono text-2xs tracking-wide text-muted-foreground">
              {exp.region}
            </span>
          </div>

          <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            {exp.company}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">{exp.role}</p>
          <p className="mt-1 font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
            {exp.period}
          </p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            {exp.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {exp.stack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>

          {exp.certificate ? (
            <a
              href={exp.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              Internship certificate
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>

        {/* Impact */}
        <div className="lg:border-l lg:border-border/60 lg:pl-10">
          <AchievementList achievements={exp.achievements} />
        </div>
      </div>
    </article>
  );
}
