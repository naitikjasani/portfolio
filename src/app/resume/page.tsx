import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Code2,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Swords,
} from "lucide-react";

import { site } from "@/lib/site";
import { about, education, experiences, leadership, projects, techGroups } from "@/lib/data";
import { PrintButton } from "@/components/resume/print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.role}.`,
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background py-8 sm:py-12 print:min-h-0 print:bg-white print:py-0">
      {/* Toolbar — screen only */}
      <div className="no-print container mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={site.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <Download className="size-4" />
            Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      {/* Paper sheet */}
      <article className="mx-auto max-w-[820px] bg-white px-8 py-10 text-neutral-800 shadow-card sm:rounded-lg sm:px-12 sm:py-12 print:max-w-none print:rounded-none print:px-0 print:py-0 print:shadow-none">
        {/* Header */}
        <header className="border-b border-neutral-200 pb-6 print:pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 print:text-[20pt] print:leading-tight">{site.name}</h1>
          <p className="mt-1 text-base font-medium text-neutral-600 print:mt-0 print:text-[10.5pt]">
            {site.role}
            <span className="font-normal text-neutral-500">
              {" "}· {site.location} · {site.relocation} · {site.joining}
            </span>
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-600 print:mt-1.5 print:gap-x-3 print:gap-y-0.5 print:text-[8pt]">
            <ContactLink icon={Mail} href={site.socials.email} label={site.email} />
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900">
              <Phone className="size-3.5 text-neutral-400" />
              {site.phone}
            </a>
            <ContactLink
              icon={Github}
              href={site.socials.github}
              label={`github.com/${site.handles.github}`}
            />
            <ContactLink
              icon={Linkedin}
              href={site.socials.linkedin}
              label={`linkedin.com/in/${site.handles.linkedin}`}
            />
            <ContactLink
              icon={Code2}
              href={site.profiles.leetcode}
              label={`leetcode.com/u/${site.handles.leetcode}`}
            />
            <ContactLink
              icon={Swords}
              href={site.profiles.codeforces}
              label={`codeforces.com/profile/${site.handles.codeforces}`}
            />
            <ContactLink
              icon={Boxes}
              href={site.profiles.codolio}
              label={`codolio.com/profile/${site.handles.codolio}`}
            />
            <ContactLink icon={Globe} href={site.url} label={site.url.replace("https://", "")} />
          </div>
        </header>

        {/* Summary */}
        <ResumeSection title="Summary">
          <p className="text-sm leading-relaxed text-neutral-700 print:text-[8.8pt] print:leading-snug">
            {about.summary}
          </p>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          <div className="space-y-5 print:space-y-1.5">
            {experiences.map((exp) => (
              <div key={exp.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-neutral-900 print:text-[9.5pt]">
                    {exp.role} · {exp.company}
                    <span className="font-normal italic text-neutral-500"> · {exp.region}</span>
                    {exp.certificate ? (
                      <ResumeInlineLink href={exp.certificate} label="Certificate" />
                    ) : null}
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-neutral-500 print:text-[8pt]">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400 print:mt-0.5 print:space-y-0 print:text-[8.8pt] print:leading-snug">
                  {exp.achievements.map((a) => (
                    <li key={a.label}>{a.detail}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-neutral-500 print:mt-0.5 print:text-[8pt]">
                  <span className="font-medium text-neutral-600">Stack:</span>{" "}
                  {exp.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Selected Projects">
          <div className="space-y-4 print:space-y-1.5">
            {projects.filter((p) => p.resume).map((project) => (
              <div key={project.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-neutral-900 print:text-[9.5pt]">
                    {project.name}
                    <span className="font-normal text-neutral-500"> · {project.category}</span>
                    {project.repo ? <ResumeInlineLink href={project.repo} label="GitHub" /> : null}
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-neutral-500 print:text-[8pt]">
                    {project.year}
                  </span>
                </div>
                {/* Only the case study keeps its description; the rest read fine as bullets. */}
                {project.stats ? (
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700 print:mt-0.5 print:text-[8.8pt] print:leading-snug">
                    {project.description}
                  </p>
                ) : null}
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400 print:mt-0.5 print:space-y-0 print:text-[8.8pt] print:leading-snug">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-neutral-500 print:hidden">
                  <span className="font-medium text-neutral-600">Stack:</span>{" "}
                  {project.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Technical Skills">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2 print:grid-cols-1 print:gap-y-0">
            {techGroups.map((group) => (
              <div key={group.id} className="flex gap-2 text-sm print:text-[8.5pt] print:leading-snug">
                <dt className="w-28 shrink-0 font-semibold text-neutral-900 print:w-44">{group.label}</dt>
                <dd className="text-neutral-700">
                  {group.items.map((item) => item.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education & Leadership">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-semibold text-neutral-900 print:text-[9.5pt]">
              {education.degree} · {education.school}
            </h3>
            <span className="shrink-0 text-xs font-medium text-neutral-500 print:text-[8pt]">
              {education.grade} · {education.period}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-700 print:mt-0.5 print:text-[8.8pt]">
            <span className="font-medium text-neutral-900">Leadership:</span>{" "}
            {leadership.map((l) => `${l.role}, ${l.org}`).join("  ·  ")}
          </p>
        </ResumeSection>
      </article>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid print:mt-2.5">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-neutral-900 print:mb-1 print:text-[8.5pt]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ResumeInlineLink({ href, label }: { href: string; label: string }) {
  return (
    <>
      <span className="font-normal text-neutral-400"> | </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
      >
        {label}
      </a>
    </>
  );
}

function ContactLink({
  icon: Icon,
  href,
  label,
}: {
  icon: typeof Mail;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900"
    >
      <Icon className="size-3.5 text-neutral-400" />
      {label}
    </a>
  );
}
