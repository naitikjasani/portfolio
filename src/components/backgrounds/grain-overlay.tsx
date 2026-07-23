/**
 * A fixed, ultra-subtle film-grain layer. It sits above the page background
 * but below the UI chrome and never intercepts pointer events. The texture is
 * what keeps large flat dark areas from reading as "synthetic".
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-30 opacity-[0.05] mix-blend-soft-light"
    />
  );
}
