"use client";

import { techGroups } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { RevealChild, RevealGroup } from "@/components/shared/reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TechStack() {
  return (
    <Section
      id="stack"
      index="04"
      kicker="Tech Stack"
      title="The tools I reach for."
      description="Grouped by the job they do in a system. Hover any item to see where and how I've used it."
    >
      <TooltipProvider delayDuration={80} skipDelayDuration={200}>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group) => (
            <RevealChild key={group.id}>
              <div className="surface surface-hover h-full p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
                  <span className="font-mono text-2xs tracking-wide text-muted-foreground/70">
                    {group.items.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{group.caption}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex cursor-default items-center rounded-md border border-border/80 bg-secondary/40 px-2.5 py-1 font-mono text-2xs tracking-wide text-muted-foreground transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:border-accent/50 focus-visible:text-accent"
                        >
                          {item.name}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">{item.note}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </RevealChild>
          ))}
        </RevealGroup>
      </TooltipProvider>
    </Section>
  );
}
