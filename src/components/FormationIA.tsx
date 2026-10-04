import { Section, SectionHeading, Reveal } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { FORMATION, ICLOSED_URL } from "../data/content";

type Format = { label: string; title: string; text: string; points: string[] };

/** Carte d'un parcours (présentiel ou distanciel) avec son visuel. */
function FormatCard({ format, icon, children }: { format: Format; icon: string; children: React.ReactNode }) {
  return (
    <div className="group flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(76,29,149,0.35)] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(76,29,149,0.5)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">{icon}</span>
        <span className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">{format.label}</span>
      </div>
      <h4 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{format.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{format.text}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {format.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-sm text-slate-700">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[0.65rem] text-brand-600">✓</span>
            {pt}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex-1 rounded-2xl bg-[#f7f6fb] p-3">{children}</div>
    </div>
  );
}

export function FormationIA() {
  const f = FORMATION;
  return (
    <Section id="formation" className="bg-[#f7f6fb] text-[#0b0b0f]">
      <SectionHeading badge={f.badge} title={f.title} accent={f.titleAccent} subtitle={f.subtitle} tone="light" className="max-w-3xl" />

      <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
        {f.chips.map((c) => (
          <span key={c} className="rounded-full border border-black/5 bg-white px-4 py-2 font-display text-sm font-medium shadow-sm">
            {c}
          </span>
        ))}
      </Reveal>

      {/* Outils IA couverts par la formation */}
      <Reveal className="mt-10">
        <p className="text-center font-display text-sm font-medium text-slate-500">{f.toolsTitle}</p>
        <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {f.tools.map((t) => (
            <li
              key={t.name}
              className="group flex items-center gap-2.5 rounded-2xl border border-black/5 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_-14px_rgba(76,29,149,0.45)]"
            >
              <img
                src={t.logo}
                alt=""
                className="tool-logo h-6 w-6 object-contain"
              />
              <span className="font-display text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#0b0b0f]">
                {t.name}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {f.pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-black/5 bg-white p-7 shadow-[0_20px_40px_-30px_rgba(76,29,149,0.35)]">
              <span className="font-display text-4xl font-semibold tracking-tight text-brand-600">{p.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Deux parcours : présentiel (photos CCI) et distanciel (plateforme) */}
      <Reveal className="mt-10">
        <h3 className="text-center font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{f.formats.title}</h3>
        <div className="relative mt-8 grid gap-4 lg:grid-cols-2">
          {/* « ou » entre les deux parcours */}
          <span className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white font-display text-sm font-semibold text-brand-600 shadow-[0_10px_30px_-10px_rgba(76,29,149,0.4)] lg:flex">
            ou
          </span>
          <FormatCard format={f.formats.presentiel} icon="◎">
            <div className="grid h-full grid-cols-[1.5fr_1fr] grid-rows-2 gap-2">
              {f.formats.presentiel.photos.map((ph, k) => (
                <img
                  key={ph.src}
                  src={ph.src}
                  alt={ph.alt}
                  loading="lazy"
                  className={`h-full w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.02] ${k === 0 ? "row-span-2" : ""}`}
                />
              ))}
            </div>
            <p className="mt-3 text-center font-display text-xs text-slate-500">{f.formats.presentiel.caption}</p>
          </FormatCard>
          <FormatCard format={f.formats.distanciel} icon="▶">
            <div className="relative h-full min-h-[11rem] sm:min-h-[15rem]">
              {f.formats.distanciel.screens.map((sc, k) => (
                <img
                  key={sc.src}
                  src={sc.src}
                  alt={sc.alt}
                  loading="lazy"
                  className={`absolute w-[82%] rounded-xl border border-black/10 shadow-[0_24px_48px_-20px_rgba(30,20,60,0.5)] transition-transform duration-500 ${
                    k === 0 ? "left-0 top-0 group-hover:-translate-x-1 group-hover:-translate-y-1" : "bottom-0 right-0 group-hover:translate-x-1 group-hover:translate-y-1"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-center font-display text-xs text-slate-500">Votre espace privé : séances, replays et ressources</p>
          </FormatCard>
        </div>
      </Reveal>

      <Reveal className="mt-10 rounded-3xl border border-black/5 bg-white p-7 sm:p-9">
        <p className="text-center font-display text-sm font-medium uppercase tracking-wider text-slate-500">
          {f.referencesTitle}
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {f.references.map((r) => (
            <li key={r.name} className="flex flex-col items-center rounded-2xl bg-[#f7f6fb] px-5 py-4 text-center">
              {r.logo ? (
                <span className="flex h-9 items-center gap-2">
                  <img src={r.logo} alt={r.name} className="h-9 max-w-[10rem] object-contain opacity-80 invert" />
                  {r.label && <span className="font-display text-base font-semibold tracking-tight">{r.label}</span>}
                </span>
              ) : (
                <p className="flex h-9 items-center font-display text-base font-semibold tracking-tight">{r.name}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">{r.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={ICLOSED_URL} external size="lg" variant="dark">
            {f.cta} <Chevrons />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
