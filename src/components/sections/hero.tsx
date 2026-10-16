"use client";

import { Check, Cloud, Copy, Download, Github, Layers, Linkedin, Monitor, Server } from "lucide-react";

import { site } from "@/lib/site";
import { telemetry } from "@/lib/data";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { GridBackground } from "@/components/backgrounds/grid-background";
import { NetworkCanvas } from "@/components/backgrounds/network-canvas";

const roleIcons = { "Full-stack": Layers, Backend: Server, Frontend: Monitor, DevOps: Cloud } as const;

/**
 * First viewport = the whole pitch: who, what, availability, proof, and
 * one-click résumé. Rendered without entrance animation so it paints immediately.
 */
export function Hero() {
  const { copied, copy } = useCopyEmail();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28"
    >
      <GridBackground />
      <NetworkCanvas className="mask-b-faded" opacity={0.6} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="container relative">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm font-medium text-success">
              <StatusDot />
              {site.availability}
            </span>
            <span className="text-sm text-muted-foreground">
              {site.location} · {site.relocation.toLowerCase()}
            </span>
          </div>

          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-6xl">
            Hi, I&apos;m {site.name}.
            <br className="hidden sm:block" /> I build software{" "}
            <span className="text-gradient">end to end.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Software engineer at {site.company}. I work across the stack — Node.js and Java
            services, React and Next.js front ends, and the AWS, Docker and CI/CD that ship them.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles I'm open to">
            {site.roles.map((role) => {
              const Icon = roleIcons[role];
              return (
                <li
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/90"
                >
                  <Icon className="size-4 text-accent" />
                  {role}
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={site.resumePdf} download>
                <Download />
                Download résumé
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={copy} aria-live="polite" className="bg-background/40 backdrop-blur">
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

        <dl className="glass mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden sm:grid-cols-4">
          {telemetry.map((t) => (
            <div key={t.label} className="p-5">
              <dt className="text-sm text-muted-foreground">{t.label}</dt>
              <dd className="metric text-gradient mt-1 text-3xl font-semibold">{t.value}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{t.hint}</dd>
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
      className="grid size-11 place-items-center rounded-lg border border-border bg-background/40 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </a>
  );
}
