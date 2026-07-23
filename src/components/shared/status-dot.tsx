import { cn } from "@/lib/utils";

type StatusDotProps = {
  tone?: "success" | "accent" | "warning";
  className?: string;
  pulse?: boolean;
};

const toneMap = {
  success: "bg-success",
  accent: "bg-accent",
  warning: "bg-warning",
} as const;

/**
 * A small live-status indicator with an optional pulsing halo.
 */
export function StatusDot({ tone = "success", className, pulse = true }: StatusDotProps) {
  return (
    <span className={cn("relative flex size-2", className)} aria-hidden>
      {pulse ? (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping",
            toneMap[tone],
          )}
        />
      ) : null}
      <span className={cn("relative inline-flex size-2 rounded-full", toneMap[tone])} />
    </span>
  );
}
