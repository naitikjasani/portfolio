"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CloudOff, Plus, RotateCcw, Server, Smartphone, Wifi } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Write = { id: number; key: string; label: string; clock: number; retry?: boolean };
type Row = Write & { duplicate: boolean };

const SEND_MS = 650;
const keyFor = (n: number) => `idem-${((n * 2654435761) >>> 0).toString(16).slice(0, 6)}`;

/**
 * A hands-on model of Ekayu's write path: writes queue on the device while
 * offline, drain in logical-clock order on reconnect, and the server dedupes
 * on the idempotency key — so a retried request never logs a workout twice.
 */
export function OfflineSyncDemo() {
  const reduced = usePrefersReducedMotion();
  const [online, setOnline] = useState(false);
  const [queue, setQueue] = useState<Write[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [sending, setSending] = useState<Write | null>(null);
  const [lastSent, setLastSent] = useState<Write | null>(null);
  const seq = useRef(0);
  const clock = useRef(0);
  const workouts = useRef(0);

  // Pick up the next write while online — the queue is already in logical-clock order.
  useEffect(() => {
    if (!online || sending || queue.length === 0) return;
    setSending(queue[0]);
    setQueue((q) => q.slice(1));
  }, [online, sending, queue]);

  // Deliver it; the server dedupes on the idempotency key.
  useEffect(() => {
    if (!sending) return;
    const t = setTimeout(
      () => {
        setRows((prev) => [{ ...sending, duplicate: prev.some((r) => r.key === sending.key) }, ...prev]);
        setLastSent(sending);
        setSending(null);
      },
      reduced ? 0 : SEND_MS,
    );
    return () => clearTimeout(t);
  }, [sending, reduced]);

  const log = () => {
    const id = ++seq.current;
    workouts.current += 1;
    clock.current += 1;
    setQueue((q) => [...q, { id, key: keyFor(id), label: `Workout #${workouts.current}`, clock: clock.current }]);
  };

  const retry = () => {
    if (!lastSent) return;
    clock.current += 1;
    setQueue((q) => [...q, { ...lastSent, id: ++seq.current, clock: clock.current, retry: true }]);
  };

  const reset = () => {
    setQueue([]);
    setRows([]);
    setSending(null);
    setLastSent(null);
    workouts.current = 0;
    clock.current = 0;
  };

  const stored = rows.filter((r) => !r.duplicate).length;
  const ignored = rows.length - stored;

  return (
    <div className="mt-5 w-full space-y-4 text-left">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          role="switch"
          aria-checked={online}
          onClick={() => setOnline((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
            online
              ? "border-success/40 bg-success/10 text-success"
              : "border-warning/40 bg-warning/10 text-warning",
          )}
        >
          {online ? <Wifi className="size-3.5" /> : <CloudOff className="size-3.5" />}
          {online ? "Online" : "Offline"}
          <span className="font-normal text-muted-foreground">· tap to {online ? "cut signal" : "reconnect"}</span>
        </button>
        <DemoButton onClick={log} icon={Plus}>
          Log workout
        </DemoButton>
        <DemoButton onClick={retry} icon={RotateCcw} disabled={!lastSent}>
          Retry last request
        </DemoButton>
      </div>

      {/* Device outbox */}
      <Panel icon={Smartphone} title="Device · outbox" meta={`${queue.length} queued`}>
        {queue.length === 0 && !sending ? (
          <Empty>{online ? "Nothing waiting — writes go straight out." : "Log a workout while offline."}</Empty>
        ) : (
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {[...(sending ? [sending] : []), ...queue].map((w) => (
                <motion.li
                  key={w.id}
                  layout={!reduced}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <WriteRow write={w} tag={w === sending ? "sending…" : w.retry ? "retry" : "queued"} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </Panel>

      {/* Network lane */}
      <div className="relative flex h-8 items-center justify-center" aria-hidden>
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 w-px -translate-x-1/2",
            online ? "bg-border" : "border-l border-dashed border-warning/50 bg-transparent",
          )}
        />
        {sending && !reduced ? (
          <motion.span
            key={sending.id}
            className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.5)]"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 28, opacity: [0, 1, 0] }}
            transition={{ duration: SEND_MS / 1000, ease: "easeInOut" }}
          />
        ) : null}
        <span className="relative z-10 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-2xs text-muted-foreground">
          {online ? "POST /log · Idempotency-Key" : "no signal — holding writes"}
        </span>
      </div>

      {/* Server log */}
      <Panel
        icon={Server}
        title="Server · append-only log"
        meta={rows.length ? `${stored} stored · ${ignored} ignored` : undefined}
      >
        {rows.length === 0 ? (
          <Empty>Empty.</Empty>
        ) : (
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {rows.slice(0, 4).map((r) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <WriteRow write={r} tag={r.duplicate ? "duplicate · ignored" : "stored"} tone={r.duplicate ? "warn" : "ok"} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </Panel>

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {ignored > 0 ? (
            <>
              <span className="text-foreground">Same key, same write:</span> the retry was ignored, so the
              workout is logged exactly once.
            </>
          ) : rows.length ? (
            <>Now retry the last request.</>
          ) : null}
        </p>
        {rows.length || queue.length ? (
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}

function DemoButton({
  onClick,
  icon: Icon,
  disabled,
  children,
}: {
  onClick: () => void;
  icon: typeof Plus;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon className="size-3.5" />
      {children}
    </button>
  );
}

function Panel({
  icon: Icon,
  title,
  meta,
  children,
}: {
  icon: typeof Plus;
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/70 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-medium text-foreground">
          <Icon className="size-3.5 text-muted-foreground" />
          {title}
        </div>
        {meta ? <span className="text-xs text-muted-foreground">{meta}</span> : null}
      </div>
      <div className="min-h-[2.25rem]">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-2 text-xs text-muted-foreground/80">{children}</p>;
}

function WriteRow({ write, tag, tone }: { write: Write; tag: string; tone?: "ok" | "warn" }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-background/50 px-2.5 py-1.5">
      <div className="flex min-w-0 items-center gap-2">
        {tone === "ok" ? <Check className="size-3.5 shrink-0 text-success" /> : null}
        <span className="truncate text-xs text-foreground">{write.label}</span>
        <span className="hidden font-mono text-2xs text-muted-foreground sm:inline">
          {write.key} · t{write.clock}
        </span>
      </div>
      <span
        className={cn(
          "shrink-0 text-xs",
          tone === "warn" ? "text-warning" : tone === "ok" ? "text-success" : "text-muted-foreground",
        )}
      >
        {tag}
      </span>
    </div>
  );
}
