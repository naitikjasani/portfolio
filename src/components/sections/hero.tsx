"use client";

import { Check, Copy, Download, Github, Linkedin } from "lucide-react";

import { site } from "@/lib/site";
import { telemetry } from "@/lib/data";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { NetworkCanvas } from "@/components/backgrounds/network-canvas";

/**
 * First viewport = the whole pitch: who, what, where, availability, proof, and
 * one-click résumé. Rendered without entrance animation so it paints immediately.
 */
export function Hero() {
  const { copied, copy } = useCopyEmail();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28"
    >
      <NetworkCanvas className="mask-b-faded" opacity={0.35} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="container relative">
        <div className="max-w-3xl">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 font-medium text-success">
              <StatusDot />
              {site.availability}
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span>
              {site.location}, {site.relocation.toLowerCase()}
            </span>
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl">
            Hi, I&apos;m {site.name}. I build order, returns and wallet systems at {site.company}.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Backend engineer working in Node.js, TypeScript and AWS SQS. Previously built Java
            Spring Boot services at Bajaj Finserv Health. B.Tech CSE, LNMIIT, 2026.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={site.resumePdf} download>
                <Download />
                Download résumé
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={copy} aria-live="polite">
              {copied ? <Check className="text-success" /> : <Copy />}
              {copied ? "Email copied" : "Copy email"}
            </Button>
            <IconLink href={site.socials.linkedin} label="LinkedIn">
              <Linkedin className="size-4" />
            </IconLink>
            <IconLink href={site.socials.github} label="GitHub">
              <Github className="size-4" />
            </IconLink>
          </div>
        </div>

        <dl className="mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-6 border-t border-border/70 pt-6 sm:grid-cols-4">
          {telemetry.map((t) => (
            <div key={t.label}>
              <dt className="text-sm text-muted-foreground">{t.label}</dt>
              <dd className="metric mt-1 text-2xl font-semibold text-foreground">{t.value}</dd>
              <dd className="mt-0.5 text-sm text-muted-foreground">{t.hint}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </a>
  );
}
