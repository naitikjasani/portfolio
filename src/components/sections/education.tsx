import { GraduationCap, Users } from "lucide-react";

import { education, leadership } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";

export function Education() {
  return (
    <section id="education" aria-label="Education and leadership" className="py-8 sm:py-12">
      <Reveal className="container">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <div className="surface flex gap-4 p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary/50 text-muted-foreground">
              <GraduationCap className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground">{education.degree}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{education.school}</p>
              <p className="mt-2 font-mono text-2xs tracking-wide text-muted-foreground">
                {education.period} · {education.grade}
              </p>
            </div>
          </div>

          <div className="surface flex gap-4 p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary/50 text-muted-foreground">
              <Users className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground">Leadership</h2>
              <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                {leadership.map((l) => (
                  <li key={l.org}>
                    <span className="text-foreground/90">{l.role}</span> · {l.org}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
