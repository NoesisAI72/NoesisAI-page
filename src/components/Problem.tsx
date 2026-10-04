import { Section, SectionHeading, Reveal } from "./ui/Section";
import { PROBLEM } from "../data/content";

export function Problem() {
  return (
    <Section id="probleme" className="bg-white">
      <SectionHeading badge={PROBLEM.badge} title={PROBLEM.title} subtitle={PROBLEM.subtitle} tone="light" />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PROBLEM.pains.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-display text-lg font-semibold text-brand-600 shadow-sm">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
