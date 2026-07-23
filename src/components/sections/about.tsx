import { MapPin, Terminal } from "lucide-react";

import { about } from "@/lib/data";
import { site } from "@/lib/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StatusDot } from "@/components/shared/status-dot";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      kicker="About"
      title={about.lead}
      description="A short read on how I think about backend work — and what I optimize for when the tradeoffs get real."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Prose */}
        <Reveal className="space-y-6">
          {about.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
            >
              {paragraph}
            </p>
          ))}

          <div className="grid gap-px overflow-hidden rounded-xl border border-border/80 bg-border/60 sm:grid-cols-2">
            {about.principles.map((p) => (
              <div key={p.k} className="bg-card/60 p-5">
                <div className="font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
                  {p.k}
                </div>
                <div className="mt-1.5 text-sm font-medium text-foreground">{p.v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Manifest card */}
        <Reveal delay={0.1}>
          <div className="surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="size-3.5" />
                <span className="font-mono text-2xs tracking-wide">profile.manifest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
              </div>
            </div>

            <dl className="divide-y divide-border/60 font-mono text-sm">
              <ManifestRow k="role" v={site.role} />
              <ManifestRow k="company" v={site.company} />
              <ManifestRow k="focus" v="Distributed systems" />
              <ManifestRow k="paradigm" v="Event-driven" />
              <ManifestRow
                k="location"
                v={
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    {site.location}
                  </span>
                }
              />
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-muted-foreground">status</dt>
                <dd className="flex items-center gap-2 text-foreground">
                  <StatusDot />
                  <span className="text-success">available</span>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ManifestRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right text-foreground">{v}</dd>
    </div>
  );
}
