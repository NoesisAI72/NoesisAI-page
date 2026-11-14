import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { CONTACT_EMAIL, ICLOSED_URL } from "../data/content";
import { Button } from "./ui/Button";

/**
 * Fenêtre « Parlons de votre projet » : les boutons d'appel à l'action ouvrent un petit
 * formulaire (prénom, nom, entreprise, e-mail, téléphone, besoin facultatif) envoyé à
 * /api/lead, la même base Notion que les ressources (Source « Site »). Le lien de prise de
 * rendez-vous reste proposé dans la fenêtre pour ceux qui préfèrent choisir un créneau.
 */

type Ouvrir = (origine: string) => void;
const Contexte = createContext<Ouvrir>(() => {});

export function useDemandeInfos() {
  return useContext(Contexte);
}

export function DemandeInfosProvider({ children }: { children: ReactNode }) {
  const [origine, setOrigine] = useState<string | null>(null);
  const declencheur = useRef<HTMLElement | null>(null);
  const ouvrir = useCallback<Ouvrir>((o) => {
    declencheur.current = document.activeElement as HTMLElement | null;
    setOrigine(o);
  }, []);
  const fermer = useCallback(() => {
    setOrigine(null);
    declencheur.current?.focus?.();
  }, []);
  return (
    <Contexte.Provider value={ouvrir}>
      {children}
      {origine !== null && <Fenetre origine={origine} onClose={fermer} />}
    </Contexte.Provider>
  );
}

type BoutonProps = {
  /** Où se trouve le bouton sur la page (noté avec le prospect) */
  emplacement: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "outlineLight" | "white";
  size?: "md" | "lg";
  className?: string;
};

/** Bouton d'appel à l'action qui ouvre la fenêtre de demande. */
export function BoutonDemande({ emplacement, children, ...props }: BoutonProps) {
  const ouvrir = useDemandeInfos();
  const { pathname } = useLocation();
  return (
    <Button {...props} onClick={() => ouvrir(`${pathname} · ${emplacement}`)}>
      {children}
    </Button>
  );
}

/** Variante lien texte (même comportement). */
export function LienDemande({ emplacement, children, className }: { emplacement: string; children: ReactNode; className?: string }) {
  const ouvrir = useDemandeInfos();
  const { pathname } = useLocation();
  return (
    <button type="button" className={className} onClick={() => ouvrir(`${pathname} · ${emplacement}`)}>
      {children}
    </button>
  );
}

const champ =
  "w-full rounded-xl border border-black/10 bg-[#f7f6fb] px-4 py-3 text-[16px] text-[#0b0b0f] placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20";
const etiquette = "mb-1.5 block text-sm font-medium text-[#0b0b0f]";

function Fenetre({ origine, onClose }: { origine: string; onClose: () => void }) {
  const titreId = useId();
  const boite = useRef<HTMLDivElement>(null);
  const premier = useRef<HTMLInputElement>(null);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState("");
  const [prenom, setPrenom] = useState("");

  // Défilement de la page bloqué, focus dans la fenêtre, Échap pour fermer, Tab qui reste dedans.
  useEffect(() => {
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => premier.current?.focus(), 30);
    const clavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !boite.current) return;
      const f = boite.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), textarea'
      );
      if (!f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", clavier);
    return () => {
      document.body.style.overflow = avant;
      window.clearTimeout(t);
      document.removeEventListener("keydown", clavier);
    };
  }, [onClose]);

  async function envoyer(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (etat === "envoi") return;
    const d = new FormData(ev.currentTarget);
    const v = (k: string) => String(d.get(k) || "").trim();
    const donnees = {
      firstName: v("prenom"),
      lastName: v("nom"),
      entreprise: v("entreprise"),
      email: v("email"),
      phone: v("telephone"),
      message: v("besoin"),
      company: v("company"), // champ piège anti-robots, invisible
      ressource: `Demande d'infos : ${origine}`,
      source: "Site",
    };
    if (donnees.firstName.length < 2) return setErreur("Il nous faut votre prénom.");
    if (donnees.lastName.length < 2) return setErreur("Il nous faut votre nom.");
    if (donnees.entreprise.length < 2) return setErreur("Il nous faut le nom de votre entreprise.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email)) return setErreur("Cet e-mail ne semble pas valide.");
    if (donnees.phone.replace(/[^\d]/g, "").length < 6) return setErreur("Ce numéro ne semble pas valide.");
    setErreur("");
    setEtat("envoi");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "envoi");
      }
      setPrenom(donnees.firstName);
      setEtat("ok");
    } catch (e) {
      setEtat("saisie");
      const m = e instanceof Error && e.message !== "envoi" ? `${e.message} ` : "";
      setErreur(`${m}L'envoi n'a pas abouti. Réessayez, ou écrivez-nous à ${CONTACT_EMAIL}.`);
    }
  }

  const rendezVous = (
    <a
      href={ICLOSED_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 hover:decoration-brand-600"
    >
      Choisir un créneau de 30 min
    </a>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0b0b0f]/50 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        className="relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white px-6 pb-6 pt-6 text-[#0b0b0f] shadow-[0_30px_80px_-20px_rgba(11,11,15,0.45)] sm:rounded-3xl sm:px-8 sm:pb-8 sm:pt-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-slate-500 transition hover:bg-black/5 hover:text-[#0b0b0f] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          ×
        </button>

        {etat === "ok" ? (
          <div className="pt-4 text-center">
            <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-xl text-white" aria-hidden>
              ✓
            </p>
            <h2 id={titreId} className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
              Merci {prenom}, c'est noté.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">On vous recontacte rapidement.</p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <Button href={ICLOSED_URL} external size="lg" variant="dark">
                Choisir un créneau maintenant
              </Button>
              <button type="button" onClick={onClose} className="text-sm font-medium text-slate-500 hover:text-[#0b0b0f]">
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={envoyer} noValidate>
            <h2 id={titreId} className="pr-8 font-display text-2xl font-semibold tracking-[-0.03em]">
              Parlons de votre projet
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Laissez vos coordonnées, on vous recontacte rapidement.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="di-prenom" className={etiquette}>Prénom</label>
                <input ref={premier} id="di-prenom" name="prenom" autoComplete="given-name" className={champ} />
              </div>
              <div>
                <label htmlFor="di-nom" className={etiquette}>Nom</label>
                <input id="di-nom" name="nom" autoComplete="family-name" className={champ} />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="di-entreprise" className={etiquette}>Entreprise</label>
              <input id="di-entreprise" name="entreprise" autoComplete="organization" className={champ} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="di-email" className={etiquette}>E-mail pro</label>
                <input id="di-email" name="email" type="email" autoComplete="email" inputMode="email" className={champ} />
              </div>
              <div>
                <label htmlFor="di-telephone" className={etiquette}>Téléphone</label>
                <input id="di-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" className={champ} />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="di-besoin" className={etiquette}>
                Votre besoin <span className="font-normal text-slate-400">(facultatif)</span>
              </label>
              <textarea
                id="di-besoin"
                name="besoin"
                rows={2}
                placeholder="Ex. : automatiser nos devis, un agent vocal pour le standard"
                className={`${champ} resize-none`}
              />
            </div>
            {/* Piège à robots : invisible pour les humains. */}
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />

            {erreur && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {erreur}
              </p>
            )}

            <Button type="submit" size="lg" variant="dark" className="mt-5 w-full">
              {etat === "envoi" ? "Envoi…" : "Être recontacté"}
            </Button>

            <p className="mt-3 text-center text-sm text-slate-600">Vous préférez choisir l'horaire ? {rendezVous}</p>
            <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
              Vos informations servent uniquement à vous recontacter.{" "}
              <Link to="/confidentialite" onClick={onClose} className="underline underline-offset-2 hover:text-slate-600">
                Confidentialité
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
