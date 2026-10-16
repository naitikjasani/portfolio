import { education, leadership } from "@/lib/data";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Education() {
  return (
    <Section id="education" title="Education">
      <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="glass p-6">
          <h3 className="text-lg font-semibold text-foreground">{education.school}</h3>
          <p className="mt-0.5 text-base text-foreground/85">{education.degree}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {education.period} · {education.grade}
          </p>
        </div>
        <div className="glass p-6">
          <h3 className="text-lg font-semibold text-foreground">Leadership</h3>
          <ul className="mt-1 space-y-0.5 text-base text-muted-foreground">
            {leadership.map((l) => (
              <li key={l.org}>
                {l.role}, {l.org}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
