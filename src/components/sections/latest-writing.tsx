import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { formatPostDate, getAllPosts } from "@/lib/writing";
import { Section } from "@/components/shared/section";
import { RevealChild, RevealGroup } from "@/components/shared/reveal";

export function LatestWriting() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section id="writing" index="04" kicker="Writing" title="How I think about the hard parts.">
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <RevealChild key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group surface surface-hover flex h-full flex-col p-5"
            >
              <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime} min</span>
              </div>
              <h3 className="mt-3 flex items-start justify-between gap-2 font-display text-lg font-semibold tracking-[-0.01em] text-foreground">
                <span className="transition-colors group-hover:text-accent">{post.title}</span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </RevealChild>
        ))}
      </RevealGroup>
      <Link
        href="/writing"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
      >
        All writing
        <ArrowRight className="size-4" />
      </Link>
    </Section>
  );
}
