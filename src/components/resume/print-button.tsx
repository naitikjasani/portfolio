"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-[filter] hover:brightness-110"
    >
      <Printer className="size-4" />
      Print / Save as PDF
    </button>
  );
}
