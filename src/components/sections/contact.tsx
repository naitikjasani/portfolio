"use client";

import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Swords,
} from "lucide-react";

import { site } from "@/lib/site";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StatusDot } from "@/components/shared/status-dot";

const methods = [
  {
    label: "GitHub",
    handle: `@${site.handles.github}`,
    href: site.socials.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    handle: `in/${site.handles.linkedin}`,
    href: site.socials.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "LeetCode",
    handle: `@${site.handles.leetcode}`,
    href: site.profiles.leetcode,
    icon: Code2,
    external: true,
  },
  {
    label: "Codeforces",
    handle: `@${site.handles.codeforces}`,
    href: site.profiles.codeforces,
    icon: Swords,
    external: true,
  },
  {
    label: "Résumé",
    handle: "PDF · 1 page",
    href: site.resumePdf,
    icon: Download,
    external: false,
    download: true,
  },
];

export function Contact() {
  const { copied, copy: copyEmail } = useCopyEmail();

  return (
    <Section
      id="contact"
      index="05"
      kicker="Contact"
      title="Let's talk."
      description={`${site.availability} · ${site.location} · ${site.relocation}. Email is the fastest way to reach me.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Email panel */}
        <Reveal className="surface relative overflow-hidden p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.18em] text-muted-foreground">
              <Mail className="size-3.5" />
              Primary channel
            </div>

            <a
              href={site.socials.email}
              className="mt-4 block break-all text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-3xl"
            >
              {site.email}
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={site.socials.email}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-glow transition-[filter] hover:brightness-110"
              >
                <Mail className="size-4" />
                Send an email
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-success" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy address
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
              <StatusDot />
              Typically responds within a day
            </div>
          </div>
        </Reveal>

        {/* Method cards */}
        <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2">
          {methods.map(({ label, handle, href, icon: Icon, external, download }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(download ? { download: true } : {})}
              className="group surface surface-hover flex items-center gap-4 p-4"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">{label}</span>
                <span className="block truncate font-mono text-2xs tracking-wide text-muted-foreground">
                  {handle}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
            </a>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
