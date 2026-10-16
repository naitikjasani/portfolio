import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

type SectionProps = {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

/**
 * Consistent section shell: a monospaced index/kicker, a large heading,
 * an optional description, and the section body.
 */
export function Section({
  id,
  index,
  kicker,
  title,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative scroll-mt-20 py-12 sm:py-20", className)}
    >
      <div className={cn("container", containerClassName)}>
        <Reveal className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs tracking-[0.2em] text-accent">
              {index}
            </span>
            <span className="h-px w-8 bg-border" aria-hidden />
            <span className="kicker text-muted-foreground">{kicker}</span>
          </div>
          <h2
            id={`${id}-heading`}
            className="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl md:text-[2.75rem]"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
