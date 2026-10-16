import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Code2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Swords,
} from "lucide-react";

import { site } from "@/lib/site";
import { about, experiences, leadership, projects, techGroups, timeline } from "@/lib/data";
import { PrintButton } from "@/components/resume/print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.role}.`,
  robots: { index: false, follow: true },
};

const education = timeline.find((t) => t.kind === "education");

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background py-8 sm:py-12">
      {/* Toolbar — screen only */}
      <div className="no-print container mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
        <PrintButton />
      </div>

      {/* Paper sheet */}
      <article className="mx-auto max-w-[820px] bg-white px-8 py-10 text-neutral-800 shadow-card sm:rounded-lg sm:px-12 sm:py-12 print:max-w-none print:rounded-none print:px-0 print:py-0 print:shadow-none">
        {/* Header */}
        <header className="border-b border-neutral-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{site.name}</h1>
          <p className="mt-1 text-base font-medium text-neutral-600">{site.role}</p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-600">
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
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-neutral-400" />
              {site.location}
            </span>
          </div>
        </header>

        {/* Summary */}
        <ResumeSection title="Summary">
          <p className="text-sm leading-relaxed text-neutral-700">
            {about.summary}
          </p>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {exp.role} · {exp.company}
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-neutral-500">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-0.5 text-xs italic text-neutral-500">
                  {exp.region}
                  {exp.certificate ? (
                    <>
                      {" · "}
                      <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="not-italic text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
                      >
                        Certificate
                      </a>
                    </>
                  ) : null}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400">
                  {exp.achievements.map((a) => (
                    <li key={a.label}>{a.detail}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-600">Stack:</span>{" "}
                  {exp.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Selected Projects">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {project.name}
                    <span className="font-normal text-neutral-500"> · {project.category}</span>
                    {project.demo ? (
                      <ResumeInlineLink href={project.demo} label="Website" />
                    ) : null}
                    {project.repo ? <ResumeInlineLink href={project.repo} label="GitHub" /> : null}
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-neutral-500">
                    {project.year}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                  {project.description}
                </p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-600">Stack:</span>{" "}
                  {project.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Technical Skills">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {techGroups.map((group) => (
              <div key={group.id} className="flex gap-2 text-sm">
                <dt className="w-28 shrink-0 font-semibold text-neutral-900">{group.label}</dt>
                <dd className="text-neutral-700">
                  {group.items.map((item) => item.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        {/* Education */}
        {education ? (
          <ResumeSection title="Education">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-semibold text-neutral-900">
                {education.title} · {education.org}
              </h3>
              <span className="shrink-0 text-xs font-medium text-neutral-500">
                {education.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-700">{education.description}</p>
          </ResumeSection>
        ) : null}

        {/* Leadership */}
        <ResumeSection title="Leadership & Activities">
          <p className="text-sm text-neutral-700">
            {leadership.map((l) => `${l.role}: ${l.org}`).join("  ·  ")}
          </p>
        </ResumeSection>
      </article>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-neutral-900">
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
