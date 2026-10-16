import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

type SectionProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Consistent section shell: a heading, an optional one-line description, the body. */
export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative scroll-mt-20 py-10 sm:py-14", className)}
    >
      <div className="container">
        <Reveal className="mb-6 sm:mb-8">
          <span className="bg-gradient-accent mb-4 block h-1 w-10 rounded-full" aria-hidden />
          <h2
            id={`${id}-heading`}
            className="text-balance text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
