import { motion } from "framer-motion";
import { Button, Chevrons } from "./ui/Button";
import { HERO, ICLOSED_URL } from "../data/content";

/**
 * Fond clair façon « rideau de lumière » : base blanche, faisceaux verticaux
 * floutés, halo violet très léger en haut, puis fondu vers le noir pour
 * enchaîner sur le reste du site (sombre).
 */
function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      {/* Halo violet très léger en haut au centre */}
      <div className="absolute -top-48 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.16),rgba(167,139,250,0)_100%)]" />
      {/* Touche lavande discrète en bas à gauche (rappel de la marque) */}
      <div className="absolute bottom-24 -left-40 h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.12),rgba(167,139,250,0)_100%)]" />
      {/* Faisceaux verticaux floutés */}
      <div className="hero-beams absolute inset-0" />
      {/* Fondu vers le noir du reste du site */}
      <div className="hero-fade absolute inset-x-0 bottom-0 h-72" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-56 sm:pt-44 sm:pb-64">
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
            {HERO.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-8 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] text-[#0b0b0f] sm:text-6xl md:text-7xl"
          >
            Des systèmes d'IA{" "}
            <span className="relative inline-block whitespace-nowrap rounded-lg border-[3px] border-dashed border-brand-600 bg-white px-3 shadow-[0_10px_30px_-12px_rgba(76,29,149,0.35)] sm:px-4">
              sur-mesure
            </span>{" "}
            <span className="text-brand-600">qui transforment votre entreprise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-7 max-w-2xl font-display text-base leading-relaxed text-slate-600 sm:text-xl"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={ICLOSED_URL} external size="lg" variant="dark">
              {HERO.primaryCta} <Chevrons />
            </Button>
            <Button href="#projets" size="lg" variant="outlineLight">
              {HERO.secondaryCta}
            </Button>
          </motion.div>

          {/* Stats / preuve sociale */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-14 grid w-full max-w-xl grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/5 bg-white/80 py-5 shadow-[0_20px_50px_-24px_rgba(76,29,149,0.22)] backdrop-blur-md"
          >
            {HERO.stats.map((s) => (
              <div key={s.label} className="px-2">
                <div className="font-display text-lg font-semibold tracking-tight text-[#0b0b0f] sm:text-2xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.7rem] leading-tight text-slate-500 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
