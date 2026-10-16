import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { formatPostDate, getPost, getPostSlugs } from "@/lib/writing";
import { site } from "@/lib/site";
import { TechPill } from "@/components/shared/tech-pill";
import { MdxContent } from "@/components/writing/mdx-content";

type PageProps = { params: Promise<{ slug: string }> };

// Fully static: only prebuilt posts are served, no runtime function needed.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const { meta } = getPost(slug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${site.url}/writing/${slug}`,
      type: "article",
      publishedTime: meta.date,
      authors: [site.name],
      tags: meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();

  const { meta, content } = getPost(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    keywords: meta.tags.join(", "),
    url: `${site.url}/writing/${slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/writing/${slug}`,
  };

  return (
    <article className="container max-w-2xl py-16 sm:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Writing
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
          <span className="h-px w-4 bg-border" aria-hidden />
          <span>{meta.readingTime} min read</span>
        </div>
        <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {meta.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <TechPill key={tag}>{tag}</TechPill>
          ))}
        </div>
      </header>

      <hr className="my-10 border-border/60" />

      <div className="text-[1.0625rem]">
        <MdxContent source={content} />
      </div>

      <footer className="mt-16 border-t border-border/60 pt-8">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All writing
        </Link>
      </footer>
    </article>
  );
}
