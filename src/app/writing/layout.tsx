import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { StatusDot } from "@/components/shared/status-dot";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative grid size-9 place-items-center rounded-lg border border-border bg-card font-mono text-sm font-semibold text-foreground">
              NJ
              <span className="absolute -right-1 -top-1">
                <StatusDot />
              </span>
            </span>
            <span className="hidden font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              Naitik Jasani / Writing
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </div>
      </header>
      <main id="main" className="min-h-[70vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
