"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { matchTerm, type MatchResult } from "@/lib/skill-match";

type SkillMatchValue = {
  results: MatchResult[];
  /** Canonical skills currently selected — drives page-wide pill highlights. */
  selected: Set<string>;
  toggle: (term: string) => void;
  addMany: (terms: string[]) => void;
  clear: () => void;
};

const SkillMatchContext = createContext<SkillMatchValue | null>(null);

const keyOf = (r: MatchResult) => (r.skill ?? r.term).toLowerCase();

export function SkillMatchProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<MatchResult[]>([]);

  const toggle = useCallback((term: string) => {
    const next = matchTerm(term);
    setResults((prev) =>
      prev.some((r) => keyOf(r) === keyOf(next))
        ? prev.filter((r) => keyOf(r) !== keyOf(next))
        : [...prev, next],
    );
  }, []);

  const addMany = useCallback((terms: string[]) => {
    setResults((prev) => {
      const seen = new Set(prev.map(keyOf));
      const added = terms.map(matchTerm).filter((r) => {
        if (seen.has(keyOf(r))) return false;
        seen.add(keyOf(r));
        return true;
      });
      return [...prev, ...added];
    });
  }, []);

  const clear = useCallback(() => setResults([]), []);

  const value = useMemo<SkillMatchValue>(() => {
    const selected = new Set(results.flatMap((r) => (r.skill ? [r.skill] : [])));
    return {
      results,
      selected,
      toggle,
      addMany,
      clear,
    };
  }, [results, toggle, addMany, clear]);

  return <SkillMatchContext.Provider value={value}>{children}</SkillMatchContext.Provider>;
}

/** Returns null outside the provider (e.g. /resume), so consumers degrade gracefully. */
export function useSkillMatch() {
  return useContext(SkillMatchContext);
}
