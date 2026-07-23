import { cn } from "@/lib/utils";

/**
 * Compact monospaced tag used for tech chips across the site.
 */
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
        "inline-flex items-center rounded-md border border-border/80 bg-secondary/50 px-2.5 py-1 font-mono text-2xs tracking-wide text-muted-foreground transition-colors",
        className,
      )}
    >
      {children}
    </span>
  );
}
