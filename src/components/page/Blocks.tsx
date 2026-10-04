import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading, Reveal } from "../ui/Section";
import { Button, Chevrons } from "../ui/Button";
import { Marquee } from "../ui/Marquee";
import { ToFill, filled } from "./ToFill";
import { CLIENT_LOGOS, ICLOSED_URL, PROCESS, TESTIMONIALS, TRUST_TITLE, type FaqItem } from "../../data/content";

/** Page claire (fond blanc) : enveloppe des pages façon clickway. */
export function LightPage({ children }: { children: React.ReactNode }) {
  return <div className="bg-white text-[#0b0b0f]">{children}</div>;
}

/** Fond « rideau de lumière » blanc et violet du hero. */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute -top-48 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.16),rgba(167,139,250,0)_100%)]" />
      <div className="absolute bottom-24 -left-40 h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.12),rgba(167,139,250,0)_100%)]" />
      <div className="hero-beams absolute inset-0" />
    </div>
  );
}

/** Logos clients en gris sur fond clair (les fichiers sont blancs : on les inverse). */
export function LogosStrip({ title = TRUST_TITLE }: { title?: string }) {
  return (
    <div>
      <p className="mb-5 text-center font-display text-sm text-slate-500">{title}</p>
      <Marquee>
        {CLIENT_LOGOS.map((l) => (
          <div key={l.name} className="flex h-14 w-28 items-center justify-center gap-2 px-3 opacity-50 sm:h-16 sm:w-48 sm:px-5">
            <img src={l.src} alt={l.name} decoding="async" className="max-h-8 max-w-[6rem] object-contain invert sm:max-h-10 sm:max-w-[8.5rem]" />
            {l.label && <span className="font-display text-lg font-semibold tracking-tight text-[#0b0b0f]">{l.label}</span>}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

/** Hero de page : badge, titre avec mot encadré, sous-titre, CTA, logos, captures en éventail. */
export function PageHero({
  badge,
  title,
  boxed,
  titleEnd,
  subtitle,
  images = [],
  visual,
  showRating = false,
  secondary = { label: "Voir nos réalisations", to: "/projets" },
}: {
  /** Affiche le petit badge d'avis clients sous les boutons. */
  showRating?: boolean;
  /** Illustration à la place des captures en éventail. */
  visual?: React.ReactNode;
  badge: string;
  title: string;
  boxed?: string;
  titleEnd?: string;
  subtitle: string;
  images?: string[];
  secondary?: { label: string; to: string };
}) {
  const fan = images.slice(0, 3);
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      <HeroBackground />
      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 font-display text-xs font-medium text-slate-700 shadow-sm backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-8 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] text-[#0b0b0f] sm:text-6xl md:text-7xl"
          >
            {title}{" "}
            {boxed && (
              <span className="relative inline-block whitespace-nowrap rounded-lg border-[3px] border-dashed border-brand-600 bg-white px-3 shadow-[0_10px_30px_-12px_rgba(76,29,149,0.35)] sm:px-4">
                {boxed}
              </span>
            )}
            {filled(titleEnd) && (
              <>
                {titleEnd!.startsWith(",") ? "" : " "}
                <span className="text-brand-600">{titleEnd}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-7 max-w-2xl font-display text-base leading-relaxed text-slate-600 sm:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={ICLOSED_URL} external size="lg" variant="dark">
              Parler de votre projet <Chevrons />
            </Button>
            <Button href={secondary.to} size="lg" variant="outlineLight">
              {secondary.label}
            </Button>
          </motion.div>

          {showRating && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }} className="mt-7">
              <RatingPill />
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12">
          <LogosStrip />
        </motion.div>
      </div>

      {/* Illustration dédiée, ou captures d'applications en éventail */}
      {visual ? (
        <div className="relative z-10 mx-auto mt-6 max-w-6xl px-3 pb-6 sm:px-6">{visual}</div>
      ) : fan.length > 0 ? (
        <div className="relative z-10 mx-auto mt-10 h-[200px] max-w-6xl overflow-hidden px-5 sm:h-[340px]">
          {fan.map((src, i) => {
            const pos =
              fan.length === 1
                ? "left-1/2 -translate-x-1/2 w-[86%] rotate-0 z-20"
                : i === 0
                  ? "left-1/2 -translate-x-1/2 w-[64%] z-20 top-6"
                  : i === 1
                    ? "left-0 w-[46%] -rotate-[4deg] top-16 z-10"
                    : "right-0 w-[46%] rotate-[4deg] top-16 z-10";
            return (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute rounded-2xl border border-black/10 shadow-[0_30px_60px_-24px_rgba(30,20,60,0.45)] ${pos}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-10" />
      )}
    </section>
  );
}

/** « Nos règles » : 3 cartes. */
export function RulesSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: { title: string; text: string }[];
}) {
  // En ligne, une section sans contenu ne doit laisser aucun trou.
  if (!import.meta.env.DEV && !filled(items)) return null;
  return (
    <Section className="bg-[#f7f6fb]">
      {filled(title) ? (
        <SectionHeading title={title} subtitle={filled(subtitle) ? subtitle : undefined} tone="light" />
      ) : (
        <ToFill label="titre de la section « nos règles / nos engagements »" />
      )}
      {filled(items) ? (
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-black/5 bg-white p-7 shadow-[0_20px_40px_-30px_rgba(76,29,149,0.35)]">
                <h3 className="font-display text-lg font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <ToFill label="3 cartes « nos règles » (titre + texte + visuel)" className="mt-8" />
      )}
    </Section>
  );
}

/** La méthode en 4 étapes (contenu de PROCESS). */
export function MethodSection() {
  return (
    <Section className="bg-white">
      <SectionHeading badge={PROCESS.badge} title={PROCESS.title} subtitle={PROCESS.subtitle} tone="light" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.steps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 4) * 0.08}>
            <div className="h-full rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
              <span className="font-display text-4xl font-semibold tracking-tight text-brand-600">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** 5 étoiles remplies au prorata de la note (ex. 4,8 → 96 %). */
function Stars({ value, outOf = 5, className }: { value: number; outOf?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / outOf) * 100));
  const row = "★★★★★";
  return (
    <span className={`relative inline-block leading-none tracking-[0.12em] ${className ?? ""}`} aria-label={`${value} sur ${outOf}`}>
      <span className="text-black/10">{row}</span>
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap text-[#f5a524]" style={{ width: `${pct}%` }}>
        {row}
      </span>
    </span>
  );
}

/** Branche de laurier : feuilles en goutte réparties le long d'un arc. `flip` pour le côté droit. */
function Laurel({ flip = false }: { flip?: boolean }) {
  // position (x, y) et inclinaison de chaque feuille, du bas vers le haut
  const leaves = [
    { x: 24, y: 60, r: -62 },
    { x: 15, y: 50, r: -40 },
    { x: 10, y: 38, r: -18 },
    { x: 10, y: 25, r: 6 },
    { x: 15, y: 13, r: 30 },
  ];
  return (
    <svg viewBox="0 0 40 72" className={`h-16 w-9 shrink-0 ${flip ? "-scale-x-100" : ""}`} aria-hidden>
      {leaves.map((l, k) => (
        <path
          key={k}
          d="M0,0 C-7,-7 -7,-17 0,-24 C7,-17 7,-7 0,0 Z"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          className="fill-brand-500"
          opacity={1 - k * 0.07}
        />
      ))}
    </svg>
  );
}

/** Distinction entourée de lauriers, sans encadré. */
function LaurelBadge({ text, strong }: { text: string; strong: string }) {
  return (
    <div className="flex items-center gap-3">
      <Laurel />
      <p className="text-center font-display text-base leading-snug text-slate-700 sm:text-lg">
        {text}
        <br />
        <strong className="text-lg font-bold text-[#0b0b0f] sm:text-xl">{strong}</strong>
      </p>
      <Laurel flip />
    </div>
  );
}

// Logos les plus lisibles dans une pastille ronde.
const AVATAR_LOGOS = ["Muller", "Sygma France", "Abeille Assurances", "ISCI International", "Bungazur"]
  .map((n) => CLIENT_LOGOS.find((l) => l.name === n))
  .filter((l): l is (typeof CLIENT_LOGOS)[number] => Boolean(l));

/** Petit badge d'avis (pastilles clients + étoiles + note), cliquable vers la section avis. */
export function RatingPill() {
  const r = TESTIMONIALS.rating;
  return (
    <a
      href="#avis"
      className="group inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-16px_rgba(76,29,149,0.45)] backdrop-blur transition-transform hover:-translate-y-0.5"
    >
      <span className="flex -space-x-1.5">
        {AVATAR_LOGOS.slice(0, 4).map((l) => (
          <span key={l.name} className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_10px_-4px_rgba(30,20,60,0.35)] ring-1 ring-black/5">
            <img src={l.src} alt="" className="h-5 w-5 object-contain opacity-85 invert" />
          </span>
        ))}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <Stars value={r.value} outOf={r.outOf} className="text-sm" />
        <span className="mt-0.5 font-display text-xs text-slate-600">
          <strong className="font-semibold text-[#0b0b0f]">{r.value.toLocaleString("fr-FR")}/{r.outOf}</strong> · avis de nos clients
        </span>
      </span>
    </a>
  );
}

/** Témoignages clients (version claire) : note, distinctions et avis. */
export function TestimonialsSection() {
  const t = TESTIMONIALS;
  return (
    <Section id="avis" className="bg-[#f7f6fb]">
      <SectionHeading badge={t.badge} title={t.title} subtitle={t.subtitle} tone="light" />

      {/* Note globale + distinctions */}
      <Reveal className="mt-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
          {/* Pastilles rondes des clients, façon Trustpilot */}
          <div className="flex -space-x-2.5">
            {AVATAR_LOGOS.map((l) => (
              <span
                key={l.name}
                title={l.name}
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_6px_14px_-6px_rgba(30,20,60,0.35)]"
              >
                <img src={l.src} alt={l.name} className="h-7 w-8 object-contain opacity-85 invert" />
              </span>
            ))}
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-brand-gradient font-display text-xs font-semibold text-white shadow-[0_6px_14px_-6px_rgba(30,20,60,0.35)]">
              +{Math.max(0, CLIENT_LOGOS.length - AVATAR_LOGOS.length)}
            </span>
          </div>
          <span className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {t.rating.value.toLocaleString("fr-FR")}
            <span className="text-2xl text-slate-400 sm:text-3xl"> / {t.rating.outOf}</span>
          </span>
          <div className="flex flex-col items-center sm:items-start">
            <Stars value={t.rating.value} outOf={t.rating.outOf} className="text-2xl" />
            <span className="mt-1 text-sm text-slate-500">{t.rating.label}</span>
          </div>
        </div>
        {filled(t.badges) && (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {t.badges.map((b) => (
              <LaurelBadge key={b.strong} {...b} />
            ))}
          </div>
        )}
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {t.items.map((it, i) => (
          <Reveal key={it.company} delay={(i % 3) * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl border border-black/5 bg-white p-7">
              <Stars value={5} className="text-base" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">“{it.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-black/5 pt-5">
                <span>
                  <span className="block font-display text-sm font-semibold">{it.company}</span>
                  <span className="block text-xs text-slate-500">{it.author}</span>
                </span>
                {it.logo && <img src={it.logo} alt={it.company} className="h-8 max-w-[7rem] object-contain opacity-75 invert" />}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** FAQ en accordéon (version claire). */
export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!import.meta.env.DEV && !filled(items)) return null;
  return (
    <Section id="faq" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl">{title}</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Une autre question ? Le premier échange est offert, posez-la en direct.
          </p>
          <Button href={ICLOSED_URL} external variant="dark" className="mt-2 w-fit">
            Parler de votre projet <Chevrons />
          </Button>
        </div>
        {filled(items) ? (
          <div className="flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-black/5 bg-[#f7f6fb]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm font-semibold sm:text-base">{item.q}</span>
                    <span className="shrink-0 text-xl leading-none text-brand-600">{isOpen ? "–" : "+"}</span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ToFill label="questions / réponses de la FAQ de cette page" />
        )}
      </div>
    </Section>
  );
}

/** Appel à l'action final : grande carte claire teintée violet. */
export function CtaSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Section className="bg-white">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] px-7 py-14 text-center sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" />
          <h2 className="relative mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">{title}</h2>
          {filled(subtitle) && (
            <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
          )}
          <div className="relative mt-8 flex justify-center">
            <Button href={ICLOSED_URL} external size="lg" variant="dark">
              Parler de votre projet <Chevrons />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
