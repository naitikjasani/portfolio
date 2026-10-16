import { ArrowUpRight } from "lucide-react";

import { experiences, type Experience as ExperienceType } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StackLine } from "@/components/shared/tech-pill";
import { AchievementList } from "@/components/sections/achievement-list";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="divide-y divide-border/70 border-y border-border/70">
        {experiences.map((exp) => (
          <Reveal key={exp.slug}>
            <Role exp={exp} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Role({ exp }: { exp: ExperienceType }) {
  return (
    <article className="grid grid-cols-1 gap-4 py-8 sm:py-10 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <header>
        <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
        <p className="mt-0.5 text-base text-foreground/85">{exp.role}</p>
        <p className="mt-1 text-sm text-muted-foreground">{exp.period}</p>
        {exp.certificate ? (
          <a
            href={exp.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Certificate
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : null}
      </header>

      <div className="max-w-2xl">
        <p className="text-base leading-relaxed text-foreground/90">{exp.summary}</p>
        <AchievementList achievements={exp.achievements} />
        <StackLine items={exp.stack} className="mt-5" />
      </div>
    </article>
  );
}
