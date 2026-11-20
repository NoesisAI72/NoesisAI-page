import { cn } from "../ui/cn";
import { ICONES_OUTILS, type CasClient, type Statut } from "../../data/portfolio";

/** Espaces insécables de la typographie française (avant : ; ! ? %, entre un nombre et « h »). */
export function typo(s: string): string {
  return s
    .replace(/ ([:;!?%»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/(\d) (h|€)(?=[\s,.)]|$)/g, "$1 $2");
}

/** Texte du portfolio : **mot** passe en gras, typographie française appliquée. */
export function Riche({ texte }: { texte: string }) {
  const morceaux = typo(texte).split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {morceaux.map((m, i) =>
        m.startsWith("**") && m.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[#0b0b0f]">
            {m.slice(2, -2)}
          </strong>
        ) : (
          m
        )
      )}
    </>
  );
}

/**
 * Plaque du logo client : rectangle arrondi blanc (ou de la couleur du logo quand celui-ci
 * n'est pas sur fond blanc), posé sur une scène lavande. Sans logo : le nom, composé.
 */
export function PlaqueLogo({ cas, grand = false, className }: { cas: CasClient; grand?: boolean; className?: string }) {
  const { logo, nom } = cas;
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl shadow-[0_18px_40px_-22px_rgba(30,20,60,0.5)] ring-1 ring-black/5",
        className
      )}
      style={{ backgroundColor: logo?.fond ?? "#ffffff" }}
    >
      {!logo ? (
        <span className={cn("text-gradient px-4 text-center font-display font-semibold tracking-[-0.045em]", grand ? "text-4xl sm:text-5xl" : "text-[1.7rem]")}>
          {nom}
        </span>
      ) : logo.photo ? (
        <img src={logo.src} alt={`Enseigne ${nom}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <img
          src={logo.src}
          alt={`Logo ${nom}`}
          loading="lazy"
          decoding="async"
          // Même poids visuel pour tous : largeur proportionnelle à la racine du ratio
          // (un logo très large prend plus de largeur, mais pas plus de surface).
          style={
            logo.ratio
              ? { width: `${Math.min(84, (grand ? 44 : 40) * Math.sqrt(logo.ratio))}%`, maxHeight: grand ? "74%" : "72%" }
              : undefined
          }
          className={cn("h-auto object-contain", !logo.ratio && "max-h-[70%] max-w-[78%]")}
        />
      )}
    </div>
  );
}

/** Scène lavande qui accueille la plaque (haut des cartes, en-tête des fiches). */
export function Scene({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-[#f3f0ff] via-[#f7f6fb] to-[#eef2ff]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(124,58,237,0.13)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-1/3 left-1/2 h-2/3 w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" />
      {children}
    </div>
  );
}

const TON_STATUT: Record<Statut, string> = {
  Livré: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  "En cours": "bg-amber-50 text-amber-700 ring-amber-600/15",
  POC: "bg-brand-50 text-brand-700 ring-brand-600/15",
};

export function PastilleStatut({ statut }: { statut: Statut }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-xs font-semibold ring-1", TON_STATUT[statut])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statut}
    </span>
  );
}

/** Icônes connues contenues dans un nom d'outil (« OpenAI et Claude » : deux icônes). */
function icones(nom: string): string[] {
  return Object.keys(ICONES_OUTILS)
    .filter((k) => nom.toLowerCase().includes(k.toLowerCase()))
    .map((k) => ICONES_OUTILS[k]);
}

/** Pastille carrée d'un outil : son icône, ou son initiale. */
export function IconeOutil({ nom, className }: { nom: string; className?: string }) {
  const srcs = icones(nom);
  return (
    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center gap-0.5 rounded-xl bg-white ring-1 ring-black/[0.06] shadow-[0_6px_14px_-8px_rgba(30,20,60,0.35)]", className)}>
      {srcs.length ? (
        srcs.slice(0, 2).map((s) => <img key={s} src={s} alt="" className={srcs.length > 1 ? "h-4 w-4" : "h-5 w-5"} />)
      ) : (
        <span className="font-display text-sm font-semibold text-brand-700">{nom.replace(/^Bot /, "").charAt(0)}</span>
      )}
    </span>
  );
}

/** Petite étiquette (services, marchés, expertises). */
export function Puce({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-black/[0.06] bg-white px-3 py-1 font-display text-xs font-medium text-slate-600", className)}>
      {children}
    </span>
  );
}

/** Flèche ↗ dans un rond, qui s'anime au survol de la carte parente (.group). */
export function FlecheRonde({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#0b0b0f] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#0b0b0f] group-hover:text-white",
        className
      )}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </span>
  );
}
