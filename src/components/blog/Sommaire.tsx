import { useEffect, useState, type MouseEvent } from "react";
import type { Article } from "../../blog/articles";

type Titre = Article["sommaire"][number];

/** Hauteur sous laquelle un titre compte comme « en cours de lecture » (barre de navigation comprise). */
const SEUIL = 150;

/** Identifiant de la partie en cours : le dernier titre passé sous la barre de navigation. */
function usePartieActive(ids: string[]) {
  const [actif, setActif] = useState<string | null>(null);
  const cle = ids.join("|");
  useEffect(() => {
    const titres = cle
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => e !== null);
    if (titres.length === 0) return;
    let image = 0;
    const calculer = () => {
      image = 0;
      let courant: string | null = null;
      for (const t of titres) {
        if (t.getBoundingClientRect().top <= SEUIL) courant = t.id;
        else break;
      }
      setActif(courant);
    };
    const surDefilement = () => {
      if (image === 0) image = window.requestAnimationFrame(calculer);
    };
    calculer();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
      if (image !== 0) window.cancelAnimationFrame(image);
    };
  }, [cle]);
  return actif;
}

function allerA(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const cible = document.getElementById(id);
  if (!cible) return;
  e.preventDefault();
  cible.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

/** Sommaire de la colonne de droite : le trait se remplit jusqu'à la partie en cours. */
export function Sommaire({ titres }: { titres: Titre[] }) {
  const actif = usePartieActive(titres.map((t) => t.id));
  const index = titres.findIndex((t) => t.id === actif);
  return (
    <nav aria-label="Sommaire">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Sommaire</p>
      <ol className="mt-4 flex flex-col">
        {titres.map((t, i) => {
          const etat = i === index ? "actif" : i < index ? "lu" : "suivant";
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                onClick={(e) => allerA(e, t.id)}
                aria-current={etat === "actif" ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 leading-snug transition-colors duration-200 ${
                  t.niveau === 3 ? "pl-7 text-[13px]" : "pl-4 text-sm"
                } ${
                  etat === "actif"
                    ? "border-brand-600 font-medium text-[#0b0b0f]"
                    : etat === "lu"
                      ? "border-brand-300 text-slate-500 hover:text-[#0b0b0f]"
                      : "border-black/10 text-slate-500 hover:text-[#0b0b0f]"
                }`}
              >
                {t.titre}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Sommaire repliable affiché au-dessus de l'article sur téléphone et tablette. */
export function SommaireMobile({ titres }: { titres: Titre[] }) {
  return (
    <details className="group rounded-2xl border border-black/10 bg-[#f7f6fb] px-5 py-4 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0b0b0f] [&::-webkit-details-marker]:hidden">
        Sommaire
        <span aria-hidden className="text-lg leading-none text-brand-600 transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <ol className="mt-4 flex flex-col gap-2.5 border-l-2 border-black/10">
        {titres.map((t) => (
          <li key={t.id} className={t.niveau === 3 ? "pl-7" : "pl-4"}>
            <a href={`#${t.id}`} onClick={(e) => allerA(e, t.id)} className="text-sm leading-snug text-slate-600 hover:text-[#0b0b0f]">
              {t.titre}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
