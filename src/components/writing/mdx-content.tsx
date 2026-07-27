import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";

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
  code: ({
    className,
    children,
    ...props
  }: HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
    // Fenced code blocks carry a `language-*` class — highlight them.
    if (
      typeof className === "string" &&
      className.startsWith("language-") &&
      typeof children === "string"
    ) {
      return (
        <code
          className="sugar-high"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: highlight(children.replace(/\n$/, "")) }}
        />
      );
    }
    // Inline code.
    return (
      <code
        className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-[#0b0d12] p-4 font-mono text-[0.85rem] leading-relaxed"
      {...props}
    />
  ),
};

/**
 * Renders a post's MDX source with the site's typography and lightweight,
 * build-time syntax highlighting (sugar-high — ~1KB, no runtime dependency).
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
