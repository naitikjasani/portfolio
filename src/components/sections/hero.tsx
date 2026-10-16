"use client";

import { Check, Copy, Download, Github, Linkedin, MapPin } from "lucide-react";

import { site } from "@/lib/site";
import { telemetry } from "@/lib/data";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { GridBackground } from "@/components/backgrounds/grid-background";
import { NetworkCanvas } from "@/components/backgrounds/network-canvas";
import { ScribbleUnderline } from "@/components/visuals/scribble-underline";

/**
 * First viewport = the whole pitch: who, what, where, availability, proof, and
 * one-click résumé. Rendered without entrance animation so it paints immediately.
 */
export function Hero() {
  const { copied, copy } = useCopyEmail();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-12 pt-24"
    >
      <GridBackground />
      <NetworkCanvas className="mask-b-faded" opacity={0.6} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="container relative">
        <div className="max-w-4xl">
          {/* Availability */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <StatusDot />
              {site.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              {site.location} · {site.relocation}
            </span>
          </div>

          {/* Identity */}
          <p className="mt-8 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {site.name}
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
            Backend engineer building order, returns and{" "}
            <ScribbleUnderline className="text-accent">wallet</ScribbleUnderline> workflows at{" "}
            {site.company}.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Node.js · TypeScript · AWS SQS — previously Java Spring Boot at Bajaj Finserv
            Health. B.Tech CSE &apos;26, LNMIIT.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={site.resumePdf} download>
                <Download />
                Download résumé
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={copy} aria-live="polite">
              {copied ? <Check className="text-success" /> : <Copy />}
              {copied ? "Email copied" : site.email}
            </Button>
            <div className="flex items-center gap-2">
              <IconLink href={site.socials.linkedin} label="LinkedIn">
                <Linkedin className="size-4" />
              </IconLink>
              <IconLink href={site.socials.github} label="GitHub">
                <Github className="size-4" />
              </IconLink>
            </div>
          </div>

          {/* Proof strip */}
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/80 bg-border/60 sm:grid-cols-4">
            {telemetry.map((t) => (
              <div key={t.label} className="bg-card/70 p-4">
                <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
                  {t.label}
                </dt>
                <dd className="metric mt-2 text-lg font-semibold text-foreground">{t.value}</dd>
                <dd className="mt-0.5 text-xs text-muted-foreground/80">{t.hint}</dd>
              </div>
            ))}
          </dl>
        </div>
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
      className="grid size-11 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </a>
  );
}
