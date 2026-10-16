"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Primary bullets up front; the rest one click away. */
export function AchievementList({ achievements }: { achievements: Achievement[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const primary = achievements.filter((a) => a.primary);
  const more = achievements.filter((a) => !a.primary);

  return (
    <div>
      <ul className="space-y-5">
        {primary.map((a) => (
          <Item key={a.label} a={a} />
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            id={id}
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 overflow-hidden pt-5"
          >
            {more.map((a) => (
              <Item key={a.label} a={a} />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {more.length ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          {open ? "Show less" : `Show ${more.length} more`}
        </button>
      ) : null}
    </div>
  );
}

function Item({ a }: { a: Achievement }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <div className="pt-0.5">
        {a.metric ? (
          <span className="metric text-base font-semibold text-foreground">{a.metric}</span>
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <ChevronRight className="size-3.5 shrink-0 text-accent" />
          {a.label}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
      </div>
    </li>
  );
}
