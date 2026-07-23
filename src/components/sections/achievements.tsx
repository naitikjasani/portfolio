import { achievements } from "@/lib/data";
import { Reveal, RevealChild, RevealGroup } from "@/components/shared/reveal";
import { TechPill } from "@/components/shared/tech-pill";

const focusAreas = [
  "Production APIs",
  "Microservices",
  "Event-Driven",
  "Kafka",
  "Redis",
  "System Design",
  "Healthcare",
  "Quick Commerce",
];

export function Achievements() {
  return (
    <section id="achievements" className="relative border-y border-border/70 bg-elevated/30">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25]" aria-hidden />
      <div className="container relative py-20 sm:py-24">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="h-px w-8 bg-border" aria-hidden />
          <span className="kicker text-muted-foreground">Signals</span>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/80 bg-border/60 lg:grid-cols-4">
          {achievements.map((a) => (
            <RevealChild key={a.label}>
              <div className="h-full bg-card/70 p-6 transition-colors hover:bg-card">
                <div className="metric text-3xl font-semibold text-foreground sm:text-4xl">
                  {a.value}
                </div>
                <div className="mt-3 text-sm font-medium text-foreground">{a.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {a.detail}
                </div>
              </div>
            </RevealChild>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground/70">
            Focus
          </span>
          {focusAreas.map((area) => (
            <TechPill key={area}>{area}</TechPill>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
