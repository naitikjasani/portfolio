import Link from "next/link";

import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70">
      <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          <Link href="/writing" className="transition-colors hover:text-foreground">
            Writing
          </Link>
          <a href={site.resumeHref} className="transition-colors hover:text-foreground">
            Résumé
          </a>
          <a
            href={site.profiles.codolio}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Codolio
          </a>
        </nav>
      </div>
    </footer>
  );
}
