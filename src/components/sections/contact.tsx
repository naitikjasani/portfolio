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
    <Section
      id="contact"
      title="Contact"
      description={`${site.availability}. Based in ${site.location}, ${site.relocation.toLowerCase()}. Email is the fastest way to reach me.`}
    >
      <Reveal className="border-t border-border/70 pt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={site.socials.email}
            className="break-all text-xl font-semibold text-foreground transition-colors hover:text-accent sm:text-2xl"
          >
            {site.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
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
      </Reveal>
    </Section>
  );
}
