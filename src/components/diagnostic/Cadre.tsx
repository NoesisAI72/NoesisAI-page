// Cadre commun des ressources cloisonnées (/diagnostic-ia, /guide-automatisation) :
// mêmes codes visuels que le site (fond clair, rideau de lumière, logo
// NoesisAI), mais sans aucun lien vers le reste du site.

import { HeroBackground } from "../page/Blocks";
import { CONTACT_EMAIL } from "../../data/content";

export function CadreRessource({
  mention,
  piedDePage,
  children,
}: {
  /** Petite mention à droite du logo (« Diagnostic confidentiel »…). */
  mention: string;
  /** Texte ajouté au pied de page, avant l'email de contact. */
  piedDePage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#0b0b0f]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[760px] print:hidden">
        <HeroBackground />
      </div>

      {/* Le logo ne renvoie nulle part : la ressource reste isolée du site. */}
      <header className="relative z-10 mx-auto w-full max-w-3xl px-3 pt-3 sm:px-6 print:hidden">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/60 py-2.5 pl-4 pr-4 shadow-[0_8px_24px_-14px_rgba(76,29,149,0.2)] backdrop-blur-md sm:pl-5">
          <div className="flex items-center gap-2.5">
            <img src="/logos/noesis-mark.png" alt="" className="h-9 w-9" />
            <span className="font-display text-xl font-semibold tracking-[-0.04em]">
              Noesis<span className="text-brand-600">AI</span>
            </span>
          </div>
          <span className="font-display text-xs font-medium text-slate-500">{mention}</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {children}
      </main>

      <footer className="relative z-10 border-t border-black/5 py-8 print:hidden">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NoesisAI · {piedDePage ? `${piedDePage} · ` : ""}
            {CONTACT_EMAIL}
          </p>
        </div>
      </footer>
    </div>
  );
}
