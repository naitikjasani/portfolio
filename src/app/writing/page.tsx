import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllPosts, formatPostDate } from "@/lib/writing";
import { site } from "@/lib/site";
import { TechPill } from "@/components/shared/tech-pill";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on backend systems, distributed architecture and the tradeoffs behind them — by Naitik Jasani.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: `Writing · ${site.name}`,
    description:
      "Notes on backend systems, distributed architecture and the tradeoffs behind them.",
    url: `${site.url}/writing`,
    type: "website",
  },
};

export default function WritingIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-border" aria-hidden />
        <span className="kicker text-muted-foreground">Writing</span>
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
        Notes on backend systems.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Short pieces on the parts of engineering I keep coming back to —
        reliability, event-driven design, and the tradeoffs that only show up
        under real load.
      </p>

      <ul className="mt-12 divide-y divide-border/60 border-t border-border/60">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-3 py-7 transition-opacity"
            >
              <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="h-px w-4 bg-border" aria-hidden />
                <span>{post.readingTime} min read</span>
              </div>

              <h2 className="flex items-start gap-2 font-display text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl">
                <span className="transition-colors group-hover:text-accent">
                  {post.title}
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
              </h2>

              <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <TechPill key={tag}>{tag}</TechPill>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
