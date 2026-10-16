"use client";

import { cn } from "@/lib/utils";
import { resolveSkill } from "@/lib/skill-match";
import { useSkillMatch } from "@/components/skills/skill-match-context";

/**
 * Compact monospaced tag used for tech chips across the site.
 * Lights up when its skill is selected in Stack Match.
 */
export function TechPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const match = useSkillMatch();
  const skill = typeof children === "string" ? resolveSkill(children) : null;
  const lit = Boolean(skill && match?.selected.has(skill));

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-2xs tracking-wide transition-colors duration-300",
        lit
          ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_0_1px_hsl(var(--accent)/0.15)]"
          : "border-border/80 bg-secondary/50 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
