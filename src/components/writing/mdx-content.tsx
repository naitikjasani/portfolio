import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
};

const components = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-mt-24 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 font-display text-lg font-semibold tracking-[-0.01em] text-foreground"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 leading-[1.75] text-muted-foreground" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground marker:text-accent/60"
      {...props}
    />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-muted-foreground marker:text-muted-foreground/70"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.7] [&>strong]:text-foreground" {...props} />
  ),
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? (
      <Link
        href={href}
        className="font-medium text-accent underline-offset-4 hover:underline"
        {...props}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline-offset-4 hover:underline"
        {...props}
      />
    ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-accent/50 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  figure: (props: HTMLAttributes<HTMLElement>) => (
    <figure
      className="my-6 overflow-hidden rounded-xl border border-border"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="overflow-x-auto bg-[#0b0d12] p-4 font-mono text-[0.85rem] leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
};

/**
 * Renders a post's MDX source with the site's typography and build-time
 * syntax highlighting (via rehype-pretty-code / shiki).
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
