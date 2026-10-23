"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";

import { site } from "@/lib/site";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const links = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "GitHub", href: site.socials.github },
  { label: "LeetCode", href: site.profiles.leetcode },
  { label: "Codeforces", href: site.profiles.codeforces },
];

export function Contact() {
  const { copied, copy } = useCopyEmail();

  return (
    <Section id="contact" title="Contact">
      <Reveal className="glow-border">
        <div className="glow-border-inner relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent-2) / 0.25), transparent 70%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent) / 0.2), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
              Let&apos;s build something <span className="text-gradient">together.</span>
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {site.availability} — {site.roles.join(", ")}. Based in {site.location},{" "}
              {site.relocation.toLowerCase()}. Email is the fastest way to reach me.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm font-medium text-success">
              <Check className="size-4" />
              {site.joining}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={site.socials.email}
                className="break-all text-xl font-semibold text-foreground transition-colors hover:text-accent sm:text-2xl"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePdf}
                  download
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                >
                  Résumé (PDF)
                  <Download className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
