import { cn } from "@/lib/utils";

/**
 * Static blueprint grid with a feathered radial mask and a faint accent glow.
 * Pure CSS — renders on the server, costs nothing at runtime.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-grid mask-radial-faded opacity-[0.55]" />
      <div
        className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px] motion-safe:animate-glow-drift"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--accent) / 0.22), transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-5%] h-[32rem] w-[32rem] rounded-full opacity-30 blur-[130px] motion-safe:animate-glow-drift [animation-delay:-9s]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(217 60% 40% / 0.18), transparent 65%)",
        }}
      />
    </div>
  );
}
