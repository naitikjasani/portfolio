"use client";

import { motion } from "framer-motion";
import {
  Database,
  KeyRound,
  Layers,
  MonitorSmartphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Stage = {
  icon: LucideIcon;
  label: string;
  sub: string;
  edge: string;
  highlight?: boolean;
};

const stages: Stage[] = [
  { icon: MonitorSmartphone, label: "Client", sub: "Web / API consumer", edge: "HTTPS" },
  { icon: Layers, label: "Express API", sub: "Routing · validation", edge: "REST" },
  {
    icon: ShieldCheck,
    label: "Auth Layer",
    sub: "JWT verify · RBAC guard",
    edge: "authorize",
    highlight: true,
  },
  { icon: KeyRound, label: "Service Layer", sub: "Business logic", edge: "invoke" },
  { icon: Database, label: "Data Store", sub: "Relational schema", edge: "query" },
];

/**
 * A top-to-bottom request flow diagram with packets travelling between stages.
 * The auth layer is emphasized — the heart of the project.
 */
export function ArchitectureVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="mx-auto w-full max-w-sm py-2">
      {stages.map((stage, i) => (
        <div key={stage.label}>
          <StageCard stage={stage} index={i} />
          {i < stages.length - 1 ? (
            <Connector label={stages[i + 1].edge} delay={i * 0.4} reduced={reduced} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
        stage.highlight
          ? "border-accent/40 bg-accent/5 shadow-[0_0_0_1px_hsl(var(--accent)/0.12)]"
          : "border-border/80 bg-card/70",
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md border",
          stage.highlight
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-border bg-secondary/50 text-muted-foreground",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{stage.label}</div>
        <div className="font-mono text-2xs tracking-wide text-muted-foreground">{stage.sub}</div>
      </div>
    </motion.div>
  );
}

function Connector({
  label,
  delay,
  reduced,
}: {
  label: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="relative flex h-9 items-center justify-center">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      {!reduced ? (
        <motion.span
          className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.5)]"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 36], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
        />
      ) : null}
      <span className="relative z-10 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-2xs tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
