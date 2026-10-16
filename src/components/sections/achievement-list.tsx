"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import type { Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Primary bullets up front; the rest one click away. */
export function AchievementList({ achievements }: { achievements: Achievement[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const primary = achievements.filter((a) => a.primary);
  const more = achievements.filter((a) => !a.primary);

  return (
    <div className="mt-4">
      <ul className="space-y-3">
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 overflow-hidden pt-3"
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
          className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          {open ? "Show less" : `${more.length} more`}
        </button>
      ) : null}
    </div>
  );
}

function Item({ a }: { a: Achievement }) {
  return (
    <li className="relative pl-4 text-base leading-relaxed text-muted-foreground">
      <span className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-accent/70" aria-hidden />
      <span className="font-medium text-foreground">{a.label}.</span> {a.detail}
    </li>
  );
}
