import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatPostDate, getAllPosts } from "@/lib/writing";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function LatestWriting() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section id="writing" title="Writing">
      <Reveal>
        <ul className="divide-y divide-border/70 border-y border-border/70">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground sm:pt-1 sm:text-right">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
                  {post.readingTime} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
      <Link
        href="/writing"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        All writing
        <ArrowRight className="size-4" />
      </Link>
    </Section>
  );
}
