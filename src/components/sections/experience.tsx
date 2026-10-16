import { ArrowUpRight } from "lucide-react";

import { experiences, type Experience as ExperienceType } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StackLine } from "@/components/shared/tech-pill";
import { AchievementList } from "@/components/sections/achievement-list";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-5">
        {experiences.map((exp, i) => (
          <Reveal key={exp.slug} delay={i * 0.06}>
            <Role exp={exp} current={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** "Bajaj Finserv Health" → "BF"; single words keep two letters ("OZi" → "OZ"). */
const initials = (name: string) => {
  const words = name.split(/\s+/);
  return (words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join("") : name.slice(0, 2)).toUpperCase();
};

function Role({ exp, current }: { exp: ExperienceType; current: boolean }) {
  return (
    <article className="glass grid grid-cols-1 gap-5 p-6 transition-colors hover:border-white/[0.12] sm:p-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
      <header className="flex gap-4 lg:block">
        <span className="bg-gradient-accent grid size-12 shrink-0 place-items-center rounded-xl text-base font-semibold text-white shadow-lg shadow-accent/20">
          {initials(exp.company)}
        </span>
        <div className="lg:mt-4">
          <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
          <p className="mt-0.5 text-base text-foreground/85">{exp.role}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {exp.period}
            {current ? (
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                Current
              </span>
            ) : null}
          </p>
          {exp.certificate ? (
            <a
              href={exp.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              Certificate
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
        </div>
      </header>

      <div className="max-w-2xl">
        <p className="text-base leading-relaxed text-foreground/90">{exp.summary}</p>
        <AchievementList achievements={exp.achievements} />
        <StackLine items={exp.stack} className="mt-5 border-t border-white/[0.06] pt-4" />
      </div>
    </article>
  );
}
