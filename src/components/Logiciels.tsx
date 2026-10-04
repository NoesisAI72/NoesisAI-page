import { Section, SectionHeading, Reveal } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { BeforeAfter } from "./ui/BeforeAfter";
import { ScreenshotFrame } from "./ui/ScreenshotFrame";
import { ICLOSED_URL, LOGICIELS } from "../data/content";

const ICONS = ["▦", "◰", "✦"];

export function Logiciels() {
  const l = LOGICIELS;
  return (
    <Section id="logiciels" className="bg-white text-[#0b0b0f]">
      <SectionHeading badge={l.badge} title={l.title} accent={l.titleAccent} tone="light" className="max-w-3xl" />

      <Reveal className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-1 text-center font-display text-base text-slate-600 sm:text-lg">
        <p>{l.before}</p>
        <p className="font-medium text-[#0b0b0f]">{l.after}</p>
        <Button href={ICLOSED_URL} external size="lg" variant="dark" className="mt-6">
          Parler de votre projet <Chevrons />
        </Button>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <BeforeAfter after={l.afterImage} afterAlt={l.afterAlt} />
      </Reveal>

      {/* Ce que l'on construit */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {l.services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-brand-600 shadow-sm">
                {ICONS[i]}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

    </Section>
  );
}

type Showcase = {
  tag: string;
  client: string;
  logo?: string;
  image: string;
  /** Seconde capture, affichée en superposition (ex. deux sites). */
  image2?: string;
  imageAlt: string;
  text: string;
  stats: { value: string; label: string }[];
};

/** Grande carte de réalisation : capture encadrée + texte + 3 points clés. */
function ShowcaseCard({ item, reverse = false }: { item: Showcase; reverse?: boolean }) {
  return (
    <Reveal>
      <article className="group overflow-hidden rounded-[2rem] border border-black/5 bg-[#f7f6fb] shadow-[0_40px_80px_-40px_rgba(76,29,149,0.35)]">
        <div className={`grid lg:grid-cols-[1.15fr_1fr] ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {item.image2 ? (
            <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff] lg:aspect-auto lg:min-h-[26rem]">
              <img
                src={item.image2}
                alt=""
                loading="lazy"
                className="absolute right-[5%] top-[8%] w-[72%] rounded-xl border border-black/10 shadow-[0_24px_48px_-20px_rgba(30,20,60,0.5)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              <img
                src={item.image}
                alt={item.imageAlt}
                loading="lazy"
                className="absolute bottom-[8%] left-[5%] w-[72%] rounded-xl border border-black/10 shadow-[0_30px_60px_-20px_rgba(30,20,60,0.6)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1"
              />
            </div>
          ) : (
            <ScreenshotFrame src={item.image} alt={item.imageAlt} inset="lg" className="aspect-[16/11] lg:aspect-auto lg:min-h-[26rem]" />
          )}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="w-fit rounded-full border border-black/10 bg-white px-3 py-1 font-display text-xs text-slate-600">{item.tag}</span>
            <div className="mt-5 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{item.client}</h3>
              {item.logo && <img src={item.logo} alt="" className="h-7 max-w-[7rem] shrink-0 object-contain opacity-70 invert sm:h-8 sm:max-w-[8rem]" />}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
            <dl className="mt-8 grid gap-3 border-t border-black/10 pt-6 sm:grid-cols-3 sm:gap-4">
              {item.stats.map((st) => (
                <div key={st.label} className="flex items-baseline gap-3 sm:block">
                  <dt className="shrink-0 font-display text-lg font-semibold tracking-tight text-brand-600 sm:text-xl">{st.value}</dt>
                  <dd className="text-sm leading-snug text-slate-500 sm:mt-1 sm:text-xs">{st.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Réalisations : Muller en premier, puis les autres, capture alternée gauche / droite. */
export function FeaturedProject() {
  const l = LOGICIELS;
  const items: Showcase[] = [{ ...l.featured, logo: "/logos/clients/muller-w.png" }, ...l.showcase];
  return (
    <div className="flex flex-col gap-6">
      {items.map((it, i) => (
        <ShowcaseCard key={it.client} item={it} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}
