import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeading } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { cn } from "./ui/cn";
import { ScreenshotFrame } from "./ui/ScreenshotFrame";
import { MiniNetwork } from "./page/AutomationNetwork";
import { ICLOSED_URL, PROJECT_CATEGORIES, PROJETS, type Project, type ProjectCategory } from "../data/content";

type Filter = ProjectCategory;
const FILTERS: Filter[] = PROJECT_CATEGORIES;
/** Nombre maximum de projets affichés par catégorie. */
const MAX_PER_CATEGORY: Record<ProjectCategory, number> = { Applications: 4, Automatisation: 3, Formation: 3 };

const COVER_STYLE: Record<ProjectCategory, { bg: string; icon: string }> = {
  Applications: { bg: "from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff]", icon: "▦" },
  Automatisation: { bg: "from-[#f3e8ff] via-[#f5f3ff] to-[#fce7f3]", icon: "⚙" },
  Formation: { bg: "from-[#e0e7ff] via-[#f5f3ff] to-[#ede9fe]", icon: "✦" },
};

/** Visuel d'un projet : photo plein cadre, capture encadrée, ou couverture graphique. */
function ProjectVisual({ p, large = false }: { p: Project; large?: boolean }) {
  if (!p.image) return <Cover p={p} />;
  if (p.photo)
    return (
      <img
        src={p.image}
        alt={`Photo du projet ${p.client}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  return <ScreenshotFrame src={p.image} alt={`Aperçu du projet ${p.client}`} inset={large ? "lg" : "md"} className="h-full w-full" />;
}

/** Couverture graphique claire pour les projets sans capture d'écran. */
function Cover({ p }: { p: Project }) {
  const style = COVER_STYLE[p.categories[0]];
  if (p.network?.length) {
    const seed = [...p.client].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return (
      <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${style.bg}`}>
        <span className="absolute left-6 top-6 z-10 rounded-full border border-black/5 bg-white/80 px-3 py-1 font-display text-[0.7rem] font-medium text-slate-600">
          {p.categories.join(" · ")}
        </span>
        <div className="absolute inset-x-[6%] bottom-[4%] top-[18%]">
          <MiniNetwork logos={p.network} seed={seed} />
        </div>
      </div>
    );
  }
  return (
    <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br p-6 ${style.bg}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[11rem] leading-none text-brand-500/15 transition-transform duration-700 group-hover:rotate-12"
      >
        {style.icon}
      </span>
      <span className="w-fit rounded-full border border-black/5 bg-white/80 px-3 py-1 font-display text-[0.7rem] font-medium text-slate-600">
        {p.categories.join(" · ")}
      </span>
      <p className="relative max-w-[75%] font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-brand-800">
        {[p.sector, p.country].filter(Boolean).join(" · ")}
      </p>
    </div>
  );
}

// forwardRef : requis par AnimatePresence (mode "popLayout") pour mesurer la carte.
const ProjectCard = forwardRef<HTMLElement, { p: Project; onOpen: () => void }>(function ProjectCard({ p, onOpen }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_40px_-30px_rgba(30,20,60,0.4)]"
    >
      <button type="button" onClick={onOpen} className="relative aspect-[16/10] overflow-hidden bg-[#f3f2f7] text-left">
        <ProjectVisual p={p} />
      </button>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-xs text-slate-500">{p.tags.join(", ")}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{p.client}</h3>
          {p.logo && <img src={p.logo} alt="" className="h-6 max-w-[5.5rem] object-contain opacity-60 invert" />}
        </div>
        {p.kpi ? (
          <p className="mt-3">
            <span className="font-display text-2xl font-semibold tracking-tight text-brand-600">{p.kpi.value}</span>{" "}
            <span className="text-sm text-slate-600">{p.kpi.label}</span>
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.summary}</p>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto w-fit pt-5 font-display text-sm font-semibold text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-600"
        >
          Découvrir ↗
        </button>
      </div>
    </motion.article>
  );
});

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.client}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white text-[#0b0b0f] sm:rounded-3xl"
      >
        <div className="aspect-[16/8] overflow-hidden bg-[#f3f2f7]">
          <ProjectVisual p={p} large />
        </div>
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs text-slate-500">
                {[p.sector, p.country].filter(Boolean).join(" · ")}
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">{p.client}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-slate-600 hover:bg-black/5"
            >
              ✕
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f7f6fb] p-5">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">Avant</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.before}</p>
            </div>
            <div className="rounded-2xl bg-brand-50 p-5">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-brand-700">Ce que nous avons construit</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.solution}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-black/10 px-3 py-1 text-xs text-slate-600">
                {t}
              </span>
            ))}
          </div>
          <Button href={ICLOSED_URL} external size="lg" variant="dark" className="mt-8">
            Un projet similaire ? Parlons-en <Chevrons />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projets({
  category,
  limit,
  title = PROJETS.title,
  subtitle = PROJETS.subtitle,
  badge = PROJETS.badge,
  showAllLink = false,
  before,
  exclude = [],
}: {
  /** Clients à ne pas répéter dans la grille (ex. déjà mis en avant). */
  exclude?: string[];
  /** Catégorie imposée : pas d'onglets, seulement les projets de ce type. */
  category?: ProjectCategory;
  limit?: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  showAllLink?: boolean;
  /** Contenu inséré entre le titre et la grille (ex. projet phare). */
  before?: React.ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>(category ?? PROJECT_CATEGORIES[0]);
  const [open, setOpen] = useState<Project | null>(null);
  // Projets dont c'est la catégorie principale ; ceux qui ont un visuel passent en premier.
  const all = PROJETS.items
    .filter((p) => p.categories[0] === filter && !exclude.includes(p.client))
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  const items = all.slice(0, Math.min(limit ?? MAX_PER_CATEGORY[filter], MAX_PER_CATEGORY[filter]));

  return (
    <Section id="projets" className="bg-white text-[#0b0b0f]">
      <SectionHeading badge={badge} title={title} subtitle={subtitle} tone="light" />
      {before && <div className="mt-12">{before}</div>}

      {/* Filtres par type de projet */}
      {!category && (
      <div className="mt-10 flex justify-center">
        <div role="tablist" aria-label="Type de projet" className="flex w-full max-w-md gap-1 rounded-full border border-black/5 bg-[#f7f6fb] p-1 sm:w-auto sm:max-w-full">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-full px-2.5 py-2 font-display text-[0.8rem] font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm",
                filter === f ? "bg-[#0b0b0f] text-white" : "text-slate-600 hover:text-[#0b0b0f]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      )}

      <motion.div
        layout
        className={cn(
          "mt-10 grid gap-5",
          items.length === 1 && "mx-auto max-w-md",
          items.length === 2 && "mx-auto max-w-4xl sm:grid-cols-2",
          items.length === 4 && "mx-auto max-w-5xl sm:grid-cols-2",
          (items.length === 3 || items.length > 4) && "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <ProjectCard key={p.client} p={p} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Projets confidentiels : simple mention sous la grille */}
      <p className="mt-8 text-center text-sm text-slate-500">
        🔒 {PROJETS.confidential}{" "}
        <a
          href={ICLOSED_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 hover:decoration-brand-600"
        >
          {PROJETS.confidentialCta}
        </a>
      </p>

      {showAllLink && (
        <div className="mt-10 flex justify-center">
          <Button href="/projets" variant="outlineLight" size="lg">
            Voir tous nos projets
          </Button>
        </div>
      )}

      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}
