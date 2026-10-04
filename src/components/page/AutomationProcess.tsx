import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Section, SectionHeading, Reveal } from "../ui/Section";
import { cn } from "../ui/cn";
import { AUTOMATION_PROCESS } from "../../data/content";

type Step = (typeof AUTOMATION_PROCESS.steps)[number];

/* ------------------------------------------------------------------ */
/*  Mini-visuels animés (actifs quand l'étape est au centre)           */
/* ------------------------------------------------------------------ */

function VMap({ on }: { on: boolean }) {
  const tasks = [
    { l: "Saisie des devis", w: "w-[85%]" },
    { l: "Relances clients", w: "w-[60%]" },
    { l: "Tri des mails", w: "w-[72%]" },
    { l: "Reporting", w: "w-[45%]" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      {tasks.map((t, i) => (
        <div key={t.l}>
          <p className="font-display text-[0.7rem] font-medium text-slate-500">{t.l}</p>
          <div className="mt-1 h-2 rounded-full bg-black/5">
            <div
              className={cn("h-full rounded-full bg-brand-gradient transition-all duration-700 ease-out", on ? t.w : "w-0")}
              style={{ transitionDelay: on ? `${i * 120}ms` : "0ms" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function VMatrix({ on }: { on: boolean }) {
  const dots = [
    { x: 78, y: 22, c: "bg-brand-600", s: 16 },
    { x: 62, y: 38, c: "bg-brand-400", s: 12 },
    { x: 30, y: 30, c: "bg-slate-300", s: 10 },
    { x: 70, y: 70, c: "bg-slate-300", s: 10 },
    { x: 25, y: 72, c: "bg-slate-200", s: 9 },
  ];
  return (
    <div className="relative h-full p-5">
      <div className="relative h-full rounded-xl border border-black/5 bg-white">
        <div className="absolute inset-y-3 left-1/2 border-l border-dashed border-black/10" />
        <div className="absolute inset-x-3 top-1/2 border-t border-dashed border-black/10" />
        <span className="absolute right-2 top-2 rounded bg-brand-50 px-1.5 py-0.5 font-display text-[0.6rem] font-semibold text-brand-700">
          Priorité
        </span>
        <span className="absolute bottom-1 left-2 font-display text-[0.55rem] text-slate-400">Facilité →</span>
        <span className="absolute left-1 top-8 origin-left -rotate-90 font-display text-[0.55rem] text-slate-400">Gain →</span>
        {dots.map((d, i) => (
          <span
            key={i}
            className={cn("absolute rounded-full transition-all duration-500", d.c, on ? "scale-100 opacity-100" : "scale-0 opacity-0")}
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.s,
              height: d.s,
              transitionDelay: on ? `${i * 110}ms` : "0ms",
              boxShadow: i === 0 ? "0 0 0 6px rgba(124,58,237,0.15)" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function VFlow({ on }: { on: boolean }) {
  const nodes = ["Nouveau mail", "IA : analyse", "Créer le contact", "Prévenir l'équipe"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5 p-4">
      {nodes.map((n, i) => (
        <div key={n} className="flex flex-col items-center">
          <span
            className={cn(
              "rounded-lg border px-3 py-1.5 font-display text-[0.7rem] font-semibold transition-all duration-500",
              i === 1 ? "border-brand-200 bg-brand-50 text-brand-700" : "border-black/10 bg-white text-slate-700",
              on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
            style={{ transitionDelay: on ? `${i * 150}ms` : "0ms" }}
          >
            {n}
          </span>
          {i < nodes.length - 1 && (
            <span
              className={cn("h-3 w-px bg-brand-400 transition-opacity duration-300", on ? "opacity-100" : "opacity-0")}
              style={{ transitionDelay: on ? `${i * 150 + 100}ms` : "0ms" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function VConnect({ on }: { on: boolean }) {
  const apps = ["/apps/gmail.svg", "/apps/hubspot.svg", "/apps/pennylane.svg"];
  return (
    <div className="relative flex h-full items-center justify-between px-6">
      <div className="absolute inset-x-12 top-1/2 h-px -translate-y-1/2 bg-black/10" />
      <div
        className={cn("absolute left-12 top-1/2 h-px -translate-y-1/2 bg-brand-gradient transition-all duration-1000 ease-out", on ? "right-12" : "right-[85%]")}
      />
      {on && (
        <span className="absolute left-12 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(139,92,246,0.25)] motion-safe:animate-[auto-travel_1.8s_ease-in-out_infinite]" />
      )}
      {apps.map((a, i) => (
        <span
          key={a}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-[26%] border border-white bg-white shadow-[0_10px_20px_-8px_rgba(30,20,60,0.35)] transition-transform duration-500",
            on ? "scale-100" : "scale-90"
          )}
          style={{ transitionDelay: on ? `${i * 120}ms` : "0ms" }}
        >
          <img src={a} alt="" className="h-6 w-6 object-contain" />
        </span>
      ))}
    </div>
  );
}

function VTests({ on }: { on: boolean }) {
  const checks = ["Cas réels testés", "Validation humaine", "Gestion des erreurs", "Mise en ligne"];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-5">
      {checks.map((c, i) => (
        <div key={c} className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] font-bold text-white transition-all duration-300",
              on ? "scale-100 bg-emerald-500" : "scale-75 bg-black/10"
            )}
            style={{ transitionDelay: on ? `${i * 160}ms` : "0ms" }}
          >
            ✓
          </span>
          <span className="font-display text-xs font-medium text-slate-700">{c}</span>
        </div>
      ))}
    </div>
  );
}

function VMonitor({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <div className="flex items-center justify-between font-display text-[0.7rem]">
        <span className="font-semibold text-slate-700">Exécutions</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" /> En ligne
        </span>
      </div>
      <svg viewBox="0 0 200 80" className="mt-2 w-full">
        <defs>
          <linearGradient id="mon-g" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#c026d3" />
          </linearGradient>
        </defs>
        <path
          d="M0,70 C30,66 45,58 70,52 S110,40 130,30 S170,14 200,8"
          fill="none"
          stroke="url(#mon-g)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={on ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
    </div>
  );
}

const VISUALS: Record<string, (p: { on: boolean }) => JSX.Element> = {
  map: VMap,
  matrix: VMatrix,
  flow: VFlow,
  connect: VConnect,
  tests: VTests,
  monitor: VMonitor,
};

function StepCard({
  step,
  on,
  reached = on,
  className,
}: {
  step: Step;
  /** Étape en cours (mise en avant). */
  on: boolean;
  /** Étape déjà atteinte : son visuel reste rempli. */
  reached?: boolean;
  className?: string;
}) {
  const Visual = VISUALS[step.visual];
  return (
    <article
      className={cn(
        "flex flex-col rounded-3xl border bg-white p-6 transition-all duration-500 sm:p-7",
        on ? "border-brand-200 shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]" : "border-black/5 shadow-[0_20px_40px_-30px_rgba(30,20,60,0.3)]",
        !reached && "opacity-60",
        className
      )}
    >
      <div className="h-44 overflow-hidden rounded-2xl border border-black/5 bg-[#f7f6fb]">
        <Visual on={reached} />
      </div>
      <p className={cn("mt-6 font-display text-xs font-semibold uppercase tracking-wider transition-colors", on ? "text-brand-600" : "text-slate-400")}>
        Étape {step.n}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */

/** Version épinglée : le scroll vertical fait défiler les étapes à l'horizontale. */
function PinnedTimeline() {
  const m = AUTOMATION_PROCESS;
  const n = m.steps.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  // Distance horizontale à parcourir = largeur du rail - largeur visible.
  useLayoutEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      const v = viewportRef.current;
      if (t && v) setDistance(Math.max(0, t.scrollWidth - v.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * distance);
  const fill = useTransform(smooth, (v) => `${v * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.round(v * (n - 1))));
  });

  return (
    // La hauteur crée la « piste » de scroll : 100vh + la distance horizontale.
    <div ref={outerRef} className="relative bg-[#f7f6fb]" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <Badge tone="light">{m.badge}</Badge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
                {m.title} <span className="text-brand-600">{m.titleAccent}</span>
              </h2>
              <p className="text-base leading-relaxed text-slate-600">{m.subtitle}</p>
            </div>
            <p className="shrink-0 font-display text-sm font-medium text-slate-500">
              Étape <span className="text-brand-600">{active + 1}</span> / {n} · Faites défiler ↓
            </p>
          </div>

          {/* Barre de progression avec les étapes */}
          <div className="relative mt-8">
            <div className="h-1 rounded-full bg-black/10" />
            <motion.div className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-[#3b82f6] via-brand-500 to-[#c026d3]" style={{ width: fill }} />
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
              {m.steps.map((s, i) => (
                <span
                  key={s.n}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 font-display text-[0.65rem] font-semibold transition-all duration-300",
                    i <= active ? "border-transparent bg-brand-gradient text-white" : "border-black/10 bg-white text-slate-400",
                    i === active && "scale-125 shadow-[0_0_0_6px_rgba(139,92,246,0.18)]"
                  )}
                >
                  {s.n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rail horizontal */}
        <div ref={viewportRef} className="mt-10 w-full overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-5 pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pr-[20vw]">
            {m.steps.map((s, i) => (
              <StepCard key={s.n} step={s} on={i === active} reached={i <= active} className="w-[24rem] shrink-0" />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Version empilée (mobile, ou animations réduites). */
function StackedTimeline() {
  const m = AUTOMATION_PROCESS;
  return (
    <Section className="bg-[#f7f6fb]">
      <SectionHeading badge={m.badge} title={m.title} accent={m.titleAccent} subtitle={m.subtitle} tone="light" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {m.steps.map((s) => (
          <Reveal key={s.n}>
            <StepCard step={s} on />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function AutomationProcess() {
  const reduce = useReducedMotion();
  return (
    <section id="process-automatisation" className="scroll-mt-24">
      {reduce ? (
        <StackedTimeline />
      ) : (
        <>
          <div className="hidden md:block">
            <PinnedTimeline />
          </div>
          <div className="md:hidden">
            <StackedTimeline />
          </div>
        </>
      )}
    </section>
  );
}
