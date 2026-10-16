"use client";

import { Fragment } from "react";

import { cn } from "@/lib/utils";
import { resolveSkill } from "@/lib/skill-match";
import { useSkillMatch } from "@/components/skills/skill-match-context";

/** Small neutral tag (post tags). */
export function TechPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-secondary/70 px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * A stack written as plain text — "Node.js · TypeScript · MySQL" — where each
 * item lights up when it's selected in Stack Match.
 */
export function StackLine({ items, className }: { items: string[]; className?: string }) {
  const match = useSkillMatch();

  return (
    <p className={cn("flex flex-wrap items-center gap-y-1 text-sm leading-relaxed text-muted-foreground", className)}>
      {items.map((item, i) => {
        const skill = resolveSkill(item);
        const lit = Boolean(skill && match?.selected.has(skill));
        return (
          <Fragment key={item}>
            {i > 0 ? <span className="px-1.5 text-muted-foreground/50">·</span> : null}
            <span
              className={cn(
                "rounded transition-colors duration-300",
                lit && "bg-accent/15 px-1 font-medium text-accent",
              )}
            >
              {item}
            </span>
          </Fragment>
        );
      })}
    </p>
  );
}
