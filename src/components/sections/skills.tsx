"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Circle, CornerDownLeft, RotateCcw } from "lucide-react";

import { techGroups } from "@/lib/data";
import { scanText } from "@/lib/skill-match";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useSkillMatch } from "@/components/skills/skill-match-context";

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      description="Hiring for a specific stack? Click the skills you need, or paste your job description, to see where I've used them."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_24rem] lg:gap-12">
        {/* Panel first on phones so results sit right under the input. */}
        <Reveal className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:self-start">
          <StackMatch />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-start-1 lg:row-start-1">
          <SkillGroups />
        </Reveal>
      </div>
    </Section>
  );
}

function SkillGroups() {
  const match = useSkillMatch();

  return (
    <dl className="space-y-6">
      {techGroups.map((group) => (
        <div key={group.id}>
          <dt className="text-sm font-medium text-foreground">{group.label}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {group.items.map((item) => {
              const on = match?.selected.has(item.name) ?? false;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => match?.toggle(item.name)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    on
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground",
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

function StackMatch() {
  const match = useSkillMatch();
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  if (!match) return null;
  const { results, addMany, clear } = match;

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
    <div className="rounded-xl border border-border/80 bg-card/40 p-5">
      <form
        className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 focus-within:border-accent/50"
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
          placeholder="Type a skill or paste a JD…"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label="Add"
          className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <CornerDownLeft className="size-4" />
        </button>
      </form>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}

      <div className="mt-5" aria-live="polite">
        {results.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nothing selected yet. Try clicking <span className="text-foreground">Java</span> and{" "}
            <span className="text-foreground">Redis</span>. Matches also light up in Experience
            and Projects.
          </p>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="metric text-2xl font-semibold text-foreground">
                  {matched.length}/{results.length}
                </span>{" "}
                matched
              </p>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setHint(null);
                }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
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
                    className="flex items-start gap-2.5"
                  >
                    {r.skill ? (
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    ) : (
                      <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    )}
                    <div className="min-w-0">
                      <p className={cn("text-sm", r.skill ? "font-medium text-foreground" : "text-muted-foreground")}>
                        {r.term}
                        {r.evidence.length ? (
                          <span className="font-normal text-muted-foreground">
                            {" — "}
                            {r.evidence.map((e, i) => (
                              <span key={e.label}>
                                {i > 0 ? ", " : ""}
                                <a href={e.href} className="text-accent hover:underline">
                                  {e.label}
                                </a>
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
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
