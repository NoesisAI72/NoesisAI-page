import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Section, Reveal } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { Button, Chevrons } from "../ui/Button";
import { cn } from "../ui/cn";
import { ICLOSED_URL, LOGICIEL_METHOD } from "../../data/content";

type Step = (typeof LOGICIEL_METHOD.steps)[number];

/* ------------------------------------------------------------------ */
/*  Mini-visuels animés : un par étape. `on` = étape active (au centre  */
/*  de l'écran) ; sinon l'animation se joue au survol de la carte.      */
/* ------------------------------------------------------------------ */

function VisualDiagnostic({ on }: { on: boolean }) {
  return (
    <div className="relative h-full w-full p-4">
      {[80, 62, 90, 48, 70].map((w, i) => (
        <div
          key={i}
          className={cn(
            "mb-2.5 h-2 rounded-full transition-colors duration-500",
            i === 2 ? (on ? "bg-brand-500" : "bg-black/10 group-hover:bg-brand-500") : "bg-black/10"
          )}
          style={{ width: `${w}%` }}
        />
      ))}
      {/* loupe */}
      <div
        className={cn(
          "absolute left-3 top-2 h-12 w-12 rounded-full border-[3px] border-brand-600 bg-white/40 backdrop-blur-[1px] transition-transform duration-700 ease-out",
          on ? "translate-x-14 translate-y-5" : "group-hover:translate-x-14 group-hover:translate-y-5"
        )}
      >
        <span className="absolute -bottom-3 -right-2 h-4 w-[3px] rotate-[-45deg] rounded-full bg-brand-600" />
      </div>
    </div>
  );
}

function VisualCadrage({ on }: { on: boolean }) {
  const cell = "rounded-md transition-colors duration-500";
  return (
    <div className="grid h-full w-full grid-cols-[28%_1fr] grid-rows-[18%_1fr] gap-1.5 p-3">
      <div className={cn(cell, "col-span-2 bg-black/10")} />
      <div className={cn(cell, on ? "bg-brand-300" : "bg-black/10 group-hover:bg-brand-300")} />
      <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
        <div className={cn(cell, on ? "bg-brand-200 delay-100" : "bg-black/10 group-hover:bg-brand-200 group-hover:delay-100")} />
        <div className={cn(cell, on ? "bg-brand-400 delay-200" : "bg-black/10 group-hover:bg-brand-400 group-hover:delay-200")} />
        <div className={cn(cell, "col-span-2", on ? "bg-brand-100 delay-300" : "bg-black/10 group-hover:bg-brand-100 group-hover:delay-300")} />
      </div>
    </div>
  );
}

function VisualValidation({ on }: { on: boolean }) {
  const delays = ["delay-0", "delay-150", "delay-300"];
  const hoverDelays = ["group-hover:delay-0", "group-hover:delay-150", "group-hover:delay-300"];
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-2.5 p-4">
      {["Périmètre", "Planning", "Budget"].map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span className="relative flex h-4 w-4 items-center justify-center rounded border-2 border-black/20 bg-white">
            <span
              className={cn(
                "absolute inset-[-2px] flex items-center justify-center rounded bg-brand-600 text-[0.6rem] font-bold text-white transition-all duration-300",
                on ? cn("scale-100 opacity-100", delays[i]) : cn("scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100", hoverDelays[i])
              )}
            >
              ✓
            </span>
          </span>
          <span className="font-display text-xs font-medium text-slate-600">{l}</span>
        </div>
      ))}
      <span
        className={cn(
          "absolute bottom-3 right-3 rotate-[-12deg] rounded-md border-2 border-brand-600 px-1.5 py-0.5 font-display text-[0.65rem] font-bold uppercase text-brand-600 transition-all duration-300",
          on ? "scale-100 opacity-100 delay-500" : "scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-500"
        )}
      >
        Validé
      </span>
    </div>
  );
}

function VisualDev({ on }: { on: boolean }) {
  const bars = [
    { h: "h-[30%]", hv: "group-hover:h-[30%]", d: "", hd: "" },
    { h: "h-[52%]", hv: "group-hover:h-[52%]", d: "delay-100", hd: "group-hover:delay-100" },
    { h: "h-[74%]", hv: "group-hover:h-[74%]", d: "delay-200", hd: "group-hover:delay-200" },
    { h: "h-[100%]", hv: "group-hover:h-[100%]", d: "delay-300", hd: "group-hover:delay-300" },
  ];
  return (
    <div className="relative flex h-full w-full items-end gap-2 px-4 pb-6 pt-8">
      {bars.map((b, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <div
            className={cn(
              "w-full rounded-md bg-brand-gradient transition-all duration-500 ease-out",
              on ? cn(b.h, b.d) : cn("h-[12%]", b.hv, b.hd)
            )}
          />
          <span className="absolute bottom-1.5 font-display text-[0.6rem] text-slate-400" style={{ left: `${12 + i * 21.5}%` }}>
            S{i + 1}
          </span>
        </div>
      ))}
      <span
        className={cn(
          "absolute right-2 top-1.5 rounded-lg rounded-br-none bg-[#0b0b0f] px-2 py-1 font-display text-[0.6rem] font-semibold text-white transition-all duration-300",
          on ? "translate-y-0 opacity-100 delay-500" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-500"
        )}
      >
        Feedback ✓
      </span>
    </div>
  );
}

function VisualFormation({ on }: { on: boolean }) {
  const lifts = [
    { a: "-translate-y-1.5", h: "group-hover:-translate-y-1.5", d: "", hd: "" },
    { a: "-translate-y-1.5 delay-100", h: "group-hover:-translate-y-1.5", d: "", hd: "group-hover:delay-100" },
    { a: "-translate-y-1.5 delay-200", h: "group-hover:-translate-y-1.5", d: "", hd: "group-hover:delay-200" },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex -space-x-2">
        {lifts.map((l, i) => (
          <span
            key={i}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-sm shadow-sm transition-transform duration-300",
              ["bg-brand-200", "bg-brand-300", "bg-brand-400"][i],
              on ? l.a : cn(l.h, l.hd)
            )}
          >
            {["🧑‍💼", "👩‍🔧", "🧑‍💻"][i]}
          </span>
        ))}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className={cn(
            "h-full rounded-full bg-brand-gradient transition-all duration-700 ease-out",
            on ? "w-full delay-300" : "w-[15%] group-hover:w-full group-hover:delay-300"
          )}
        />
      </div>
      <span className="font-display text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">Équipe formée</span>
    </div>
  );
}

const VISUALS: Record<string, (p: { on: boolean }) => JSX.Element> = {
  diagnostic: VisualDiagnostic,
  cadrage: VisualCadrage,
  validation: VisualValidation,
  dev: VisualDev,
  formation: VisualFormation,
};

/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  index,
  current,
  onEnter,
}: {
  step: Step;
  index: number;
  current: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // L'étape devient « active » quand elle traverse la ligne médiane de l'écran.
  const inCenter = useInView(ref, { margin: "-48% 0px -48% 0px" });
  useEffect(() => {
    if (inCenter) onEnter(index);
  }, [inCenter, index, onEnter]);

  const isCurrent = current === index;
  const isPassed = index <= current;
  const Visual = VISUALS[step.visual];

  return (
    <li ref={ref} className="relative pb-6 pl-16 last:pb-0 sm:pl-24">
      {/* Nœud de la timeline */}
      <div className="absolute left-0 top-6 flex w-10 justify-center sm:w-14">
        <div
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm font-semibold transition-all duration-500 sm:h-14 sm:w-14 sm:text-base",
            isPassed
              ? "border-transparent bg-brand-gradient text-white shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7)]"
              : "border-black/10 bg-white text-slate-400",
            isCurrent && "scale-110"
          )}
        >
          {isCurrent && <span className="absolute inset-0 rounded-full bg-brand-500/40 motion-safe:animate-ping" />}
          <span className="relative">{step.n}</span>
        </div>
      </div>

      {/* Carte */}
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          const el = cardRef.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className={cn(
          "group relative rounded-3xl p-px transition-all duration-500 hover:-translate-y-1",
          isCurrent ? "bg-brand-gradient shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]" : "bg-black/5 hover:bg-brand-gradient"
        )}
      >
        <div className="relative grid gap-5 overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-6 sm:grid-cols-[1fr_11rem] sm:p-7">
          {/* Halo qui suit la souris */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), rgba(139,92,246,0.12), transparent 70%)" }}
          />
          <div className="relative">
            <p className={cn("font-display text-xs font-semibold uppercase tracking-wider transition-colors", isPassed ? "text-brand-600" : "text-slate-400")}>
              Étape {step.n} · {step.kicker}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] sm:text-[1.35rem]">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7f6fb] px-3 py-1.5 font-display text-xs font-medium text-[#0b0b0f]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              {step.deliverable}
            </p>
          </div>
          <div className="relative h-32 overflow-hidden rounded-2xl border border-black/5 bg-[#f7f6fb] sm:h-auto sm:min-h-[8.5rem]">
            <Visual on={isCurrent} />
          </div>
        </div>
      </div>
    </li>
  );
}

export function MethodTimeline() {
  const m = LOGICIEL_METHOD;
  const listRef = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <Section id="methode" className="bg-[#f7f6fb] text-[#0b0b0f]">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Colonne fixe : titre + étape en cours */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal className="flex flex-col items-start gap-4">
            <Badge tone="light">{m.badge}</Badge>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
              {m.title} <span className="text-brand-600">{m.titleAccent}</span>
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{m.subtitle}</p>
          </Reveal>

          {/* Indicateur de progression (bureau) */}
          <div className="mt-8 hidden rounded-2xl border border-black/5 bg-white p-5 lg:block">
            <div className="flex items-baseline justify-between font-display">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Étape en cours</span>
              <span className="text-sm font-semibold text-brand-600">
                {current + 1} / {m.steps.length}
              </span>
            </div>
            <motion.p
              key={current}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 font-display text-lg font-semibold tracking-tight"
            >
              {m.steps[current].kicker}
            </motion.p>
            <div className="mt-4 flex gap-1.5">
              {m.steps.map((s, i) => (
                <span
                  key={s.n}
                  className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i <= current ? "bg-brand-gradient" : "bg-black/10")}
                />
              ))}
            </div>
          </div>

          <Button href={ICLOSED_URL} external size="lg" variant="dark" className="mt-8">
            Démarrer par un diagnostic <Chevrons />
          </Button>
        </div>

        {/* Timeline */}
        <ol ref={listRef} className="relative">
          {/* Rail + remplissage au scroll */}
          <div aria-hidden className="absolute bottom-10 left-5 top-10 w-[2px] -translate-x-1/2 rounded-full bg-black/10 sm:left-7" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute bottom-10 left-5 top-10 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[#3b82f6] via-brand-500 to-[#c026d3] sm:left-7"
          />
          {m.steps.map((s, i) => (
            <TimelineStep key={s.n} step={s} index={i} current={current} onEnter={setCurrent} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
