import Link from "next/link";
import { Boxes, Code2, Github, Linkedin, Mail, Swords } from "lucide-react";

import { site } from "@/lib/site";

const links = [
  { label: "GitHub", href: site.socials.github, icon: Github, external: true },
  { label: "LinkedIn", href: site.socials.linkedin, icon: Linkedin, external: true },
  { label: "LeetCode", href: site.profiles.leetcode, icon: Code2, external: true },
  { label: "Codeforces", href: site.profiles.codeforces, icon: Swords, external: true },
  { label: "Codolio", href: site.profiles.codolio, icon: Boxes, external: true },
  { label: "Email", href: site.socials.email, icon: Mail, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70">
      <div className="container flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            © {year} {site.name} · {site.role}
          </p>
          <nav className="flex items-center gap-4 pt-1 text-sm">
            <Link
              href="/writing"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Writing
            </Link>
            <a
              href={site.resumeHref}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Résumé (web)
            </a>
            <a
              href={site.resumePdf}
              download
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Résumé (PDF)
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {links.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={label}
              className="grid size-10 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs tracking-wide text-muted-foreground/70">
            Built with Next.js · TypeScript · Tailwind · Framer Motion
          </p>
          <p className="font-mono text-2xs tracking-wide text-muted-foreground/70">
            {site.location} · {site.relocation}
          </p>
        </div>
      </div>
    </footer>
  );
}
