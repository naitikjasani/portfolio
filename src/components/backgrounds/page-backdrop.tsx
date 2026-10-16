/**
 * Fixed, page-wide depth: two soft colour fields and a faint grid that fades
 * out toward the edges. Pure CSS, sits behind every section.
 */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-[10%] -top-[20%] h-[55rem] w-[55rem] rounded-full opacity-60 blur-[140px]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.16), transparent 65%)" }}
      />
      <div
        className="absolute -right-[15%] top-[30%] h-[50rem] w-[50rem] rounded-full opacity-50 blur-[150px]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent-2) / 0.14), transparent 65%)" }}
      />
      <div
        className="absolute -bottom-[25%] left-[20%] h-[40rem] w-[40rem] rounded-full opacity-40 blur-[140px]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent-3) / 0.08), transparent 65%)" }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.22] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_75%)]" />
    </div>
  );
}
