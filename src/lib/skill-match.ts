import { experiences, knownGapTerms, projects, techGroups } from "@/lib/data";

/**
 * Stack Match engine: resolves whatever a recruiter types (or pastes from a
 * job description) to a skill in the catalogue, and finds where it was used.
 */

export type Evidence = { label: string; href: string };

export type MatchResult = {
  /** What the recruiter asked for, as they'd recognise it. */
  term: string;
  /** Catalogue name, or null when it's a gap. */
  skill: string | null;
  note?: string;
  evidence: Evidence[];
};

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

const notes = new Map<string, string>();
const lookup = new Map<string, string>();

for (const group of techGroups) {
  for (const item of group.items) {
    notes.set(item.name, item.note);
    for (const key of [item.name, ...(item.aliases ?? [])]) lookup.set(normalize(key), item.name);
  }
}
// Tools that only appear in a role or project stack still count as known.
for (const name of [...experiences, ...projects].flatMap((x) => x.stack)) {
  if (!lookup.has(normalize(name))) lookup.set(normalize(name), name);
}

/** Canonical skill for a term, or null if it isn't in the catalogue. */
export function resolveSkill(term: string): string | null {
  return lookup.get(normalize(term)) ?? null;
}

function evidenceFor(skill: string): Evidence[] {
  const uses = (stack: string[]) => stack.some((s) => resolveSkill(s) === skill);
  return [
    ...experiences
      .filter((e) => uses(e.stack))
      .map((e) => ({ label: e.company, href: "#experience" })),
    ...projects.filter((p) => uses(p.stack)).map((p) => ({ label: p.name, href: "#projects" })),
  ];
}

export function matchTerm(term: string): MatchResult {
  const skill = resolveSkill(term);
  if (!skill) {
    const known = knownGapTerms.find((g) => normalize(g) === normalize(term));
    return { term: known ?? term, skill: null, evidence: [] };
  }
  return { term: skill, skill, note: notes.get(skill), evidence: evidenceFor(skill) };
}

/* ------------------------------------------------------------------ */
/* Job-description scanning                                            */
/* ------------------------------------------------------------------ */

// Everyday words that would false-positive in prose ("the rest of", "react to").
const NO_SCAN = new Set([
  "rest", "testing", "caching", "express", "spring", "node", "ci", "ts", "js", "go",
  "queues", "containers", "distributed", "argo", "e2e", "react", "hld", "lld", "eda",
  "next", "framer", "animations", "real-time", "realtime", "authentication",
]);

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = (key: string, flags: string) =>
  new RegExp(`(^|[^A-Za-z0-9+#.])${escape(key)}(?=$|[^A-Za-z0-9+#])`, flags);

type Scanner = { re: RegExp; term: string };

const scanners: Scanner[] = [];
for (const group of techGroups) {
  for (const item of group.items) {
    // Official names match with their casing ("React", not "react to").
    scanners.push({ re: pattern(item.name, ""), term: item.name });
    for (const alias of item.aliases ?? []) {
      if (alias.length > 2 && !NO_SCAN.has(alias)) scanners.push({ re: pattern(alias, "i"), term: item.name });
    }
  }
}
for (const gap of knownGapTerms) {
  if (!NO_SCAN.has(normalize(gap))) scanners.push({ re: pattern(gap, ""), term: gap });
}

/** Every known skill or known gap mentioned in a block of text, in order found. */
export function scanText(text: string): string[] {
  const found = scanners
    .map(({ re, term }) => ({ term, at: text.search(re) }))
    .filter((f) => f.at >= 0)
    .sort((a, b) => a.at - b.at)
    .map((f) => f.term);
  return Array.from(new Set(found));
}
