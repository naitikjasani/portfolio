"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Circle, CornerDownLeft, RotateCcw } from "lucide-react";

import { stackMatchPresets, techGroups } from "@/lib/data";
import { scanText } from "@/lib/skill-match";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useSkillMatch } from "@/components/skills/skill-match-context";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      kicker="Skills"
      title="Check my stack against your role."
      description="Pick what you're hiring for, or paste the job description. Matches light up across the page."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <Reveal>
          <StackMatch />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="hidden lg:block">
            <SkillGroups />
          </div>
          <details className="group lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              See all skills
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3">
              <SkillGroups />
            </div>
          </details>
        </Reveal>
      </div>
    </Section>
  );
}

function StackMatch() {
  const match = useSkillMatch();
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  if (!match) return null;
  const { results, isSelected, toggle, addMany, clear } = match;

  const submit = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const parts = value.split(/[,;\n/|]+/).map((p) => p.trim()).filter(Boolean);
    const isList = parts.length > 1 && parts.every((p) => p.split(/\s+/).length <= 3);
    if (isList || value.split(/\s+/).length <= 3) {
      // "java, kafka, go" or a single skill — take each term literally.
      setHint(null);
      addMany(isList ? parts : [value]);
    } else {
      // Prose — treat it as a pasted job description.
      const terms = scanText(value);
      setHint(terms.length ? null : "No skills I recognise in that text.");
      addMany(terms);
    }
    setDraft("");
  };

  const matched = results.filter((r) => r.skill);
  const gaps = results.filter((r) => !r.skill);
  const pct = results.length ? Math.round((matched.length / results.length) * 100) : 0;

  return (
    <div className="surface p-5 sm:p-6">
      <div className="flex flex-wrap gap-1.5">
        {stackMatchPresets.map((term) => {
          const on = isSelected(term);
          return (
            <button
              key={term}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(term)}
              className={cn(
                "rounded-md border px-2.5 py-1 font-mono text-2xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                on
                  ? "border-accent/60 bg-accent/15 text-accent"
                  : "border-border/80 bg-secondary/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {term}
            </button>
          );
        })}
      </div>

      <form
        className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 focus-within:border-accent/50"
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
      >
        <label htmlFor="stack-match-input" className="sr-only">
          Add a skill or paste a job description
        </label>
        <input
          id="stack-match-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text");
            if (text.trim().split(/\s+/).length > 3) {
              e.preventDefault();
              submit(text);
            }
          }}
          placeholder="Add a skill, or paste a job description…"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label="Add"
          className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <CornerDownLeft className="size-3.5" />
        </button>
      </form>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}

      <div className="mt-5 border-t border-border/60 pt-5" aria-live="polite">
        {results.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing selected yet. Try <span className="text-foreground">Java</span>,{" "}
            <span className="text-foreground">Kafka</span> and{" "}
            <span className="text-foreground">Redis</span>.
          </p>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <div className="metric text-2xl font-semibold text-foreground">
                {matched.length}
                <span className="text-muted-foreground"> / {results.length}</span>
                <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">
                  matched
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setHint(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                Clear
              </button>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
              />
            </div>

            <ul className="mt-5 space-y-3">
              <AnimatePresence initial={false}>
                {[...matched, ...gaps].map((r) => (
                  <motion.li
                    key={r.skill ?? r.term}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    {r.skill ? (
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    ) : (
                      <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className={r.skill ? "font-medium text-foreground" : "text-muted-foreground"}>
                          {r.term}
                        </span>
                        {r.evidence.map((e) => (
                          <a
                            key={e.label}
                            href={e.href}
                            className="rounded border border-border/80 px-1.5 py-px font-mono text-2xs text-accent transition-colors hover:border-accent/50"
                          >
                            {e.label}
                          </a>
                        ))}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {r.skill ? r.note : "Not in my production stack yet."}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function SkillGroups() {
  const match = useSkillMatch();

  return (
    <dl className="divide-y divide-border/60 border-y border-border/60">
      {techGroups.map((group) => (
        <div key={group.id} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="pt-1 text-sm font-medium text-foreground">{group.label}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {group.items.map((item) => {
              const on = match?.selected.has(item.name) ?? false;
              return (
                <button
                  key={item.name}
                  type="button"
                  title={item.note}
                  aria-pressed={on}
                  onClick={() => match?.toggle(item.name)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 font-mono text-2xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    on
                      ? "border-accent/60 bg-accent/15 text-accent"
                      : "border-border/80 bg-secondary/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}
