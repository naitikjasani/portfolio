import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { GridBackground } from "@/components/backgrounds/grid-background";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GridBackground />
      <div className="relative">
        <p className="font-mono text-2xs uppercase tracking-[0.28em] text-accent">
          HTTP 404
        </p>
        <h1 className="mt-4 font-display text-7xl font-semibold tracking-[-0.03em] text-foreground sm:text-8xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          This route isn&apos;t in the routing table. The resource you requested
          doesn&apos;t exist, or it moved.
        </p>

        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 font-mono text-xs text-muted-foreground">
          <span className="text-destructive">GET</span>
          <span className="text-foreground/70">/unknown</span>
          <span className="text-muted-foreground/50">→</span>
          <span className="text-destructive">404 Not Found</span>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-[filter] hover:brightness-110"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
