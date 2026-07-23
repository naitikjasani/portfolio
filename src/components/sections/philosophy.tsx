import { philosophy } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { RevealChild, RevealGroup } from "@/components/shared/reveal";

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      index="05"
      kicker="Engineering Philosophy"
      title="How I approach the work."
      description="Five principles I keep coming back to. They're less about tools and more about judgment — the calls you make when the requirements are fuzzy and the clock is running."
    >
      <RevealGroup className="border-t border-border/60">
        {philosophy.map((p) => (
          <RevealChild key={p.index}>
            <div className="group grid gap-4 border-b border-border/60 py-8 transition-colors sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-10">
              <div className="flex items-start gap-4">
                <span className="metric text-3xl font-semibold text-border transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                  {p.index}
                </span>
              </div>
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p.body}
                </p>
              </div>
            </div>
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}
