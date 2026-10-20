// Affichage du plan d'automatisation généré : outils recommandés,
// étapes, intégrations, données et prompts prêts à copier.

import { useState } from "react";
import { motion } from "framer-motion";
import { ICLOSED_URL } from "../../data/content";
import type { Contact, Plan, Source } from "../../data/guide";

/* ---------------------------------------------------------------
 *  Bouton « copier » pour les prompts
 * -------------------------------------------------------------*/

function BoutonCopier({ texte }: { texte: string }) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texte);
    } catch {
      // Repli si l'API clipboard est bloquée (http, permissions).
      const zone = document.createElement("textarea");
      zone.value = texte;
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(zone);
    }
    setCopie(true);
    window.setTimeout(() => setCopie(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copier}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-[#0b0b0f] shadow-sm transition-colors hover:border-black/25"
    >
      {copie ? "✓ Copié" : "Copier"}
    </button>
  );
}

/* ---------------------------------------------------------------
 *  Puce de difficulté
 * -------------------------------------------------------------*/

function Difficulte({ niveau }: { niveau: Plan["difficulte"] }) {
  const couleur =
    niveau === "Simple"
      ? "text-emerald-700 border-emerald-600/20 bg-emerald-50"
      : niveau === "Intermédiaire"
        ? "text-amber-700 border-amber-600/20 bg-amber-50"
        : "text-rose-700 border-rose-600/20 bg-rose-50";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${couleur}`}>
      {niveau}
    </span>
  );
}

/* ---------------------------------------------------------------
 *  Écran complet
 * -------------------------------------------------------------*/

export function PlanResultat({
  plan,
  contact,
  source,
}: {
  plan: Plan;
  contact: Contact;
  source: Source;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* En-tête */}
      <div className="rounded-3xl border border-black/5 bg-white shadow-card p-7 sm:p-9">
        <p className="text-sm font-medium text-slate-500">
          {contact.prenom}, voici votre plan
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#0b0b0f] sm:text-[2rem]">
          {plan.titre}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {plan.resume}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Difficulte niveau={plan.difficulte} />
          <span className="rounded-full border border-black/5 bg-[#f7f6fb] px-3 py-1 text-xs font-medium text-slate-600">
            Gain estimé : {plan.gainEstime}
          </span>
        </div>
      </div>

      {/* Outils recommandés */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-2xl">
          Vos outils recommandés
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {plan.outils.map((o, i) => (
            <motion.div
              key={o.nom + i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl border border-black/5 bg-white shadow-card p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-base font-bold text-[#0b0b0f]">{o.nom}</h4>
                <span className="shrink-0 text-xs font-medium text-brand-600">{o.role}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.pourquoi}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Étapes */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-2xl">
          Le plan, étape par étape
        </h3>
        <div className="mt-5 flex flex-col gap-3">
          {plan.etapes.map((e, i) => (
            <motion.div
              key={e.titre + i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-black/5 bg-white shadow-card p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#0b0b0f]">{e.titre}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{e.detail}</p>
                {e.declencheur && (
                  <p className="mt-2 text-xs font-medium text-slate-500">→ {e.declencheur}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Intégrations & données */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white shadow-card p-5">
          <h3 className="text-sm font-bold text-[#0b0b0f]">À connecter</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {plan.integrations.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1 text-brand-600/50">→</span> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white shadow-card p-5">
          <h3 className="text-sm font-bold text-[#0b0b0f]">Données à préparer</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {plan.donnees.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1 text-brand-600/50">→</span> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prompts prêts à copier */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-2xl">
          Vos prompts prêts à l'emploi
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          À copier-coller dans ChatGPT ou Claude pour construire et faire tourner votre
          automatisation.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {plan.prompts.map((p, i) => (
            <div
              key={p.titre + i}
              className="rounded-2xl border border-black/5 bg-white shadow-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#0b0b0f]">{p.titre}</h4>
                  <p className="mt-0.5 text-xs text-slate-500">Pour {p.pour}</p>
                </div>
                <BoutonCopier texte={p.contenu} />
              </div>
              <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-black/5 bg-[#f7f6fb] p-4 font-sans text-sm leading-relaxed text-slate-600">
                {p.contenu}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Prise de rendez-vous */}
      <div className="mt-12 overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] px-7 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#0b0b0f] sm:text-3xl">
            Vous voulez qu'on la mette en place pour vous ?
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            En 30 minutes, on valide ensemble le bon outil et on vous dit exactement comment
            construire cette automatisation — ou on la construit pour vous, clé en main.
          </p>
          <a
            href={ICLOSED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b0f] px-7 py-3.5 font-display text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
          >
            Réserver un échange de 30 min
            <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
              ››
            </span>
          </a>
          <p className="mt-4 text-xs text-slate-500">Sans engagement · En visio</p>
        </div>
      </div>

      {/* Note de méthode */}
      <p className="mt-8 rounded-2xl border border-black/5 bg-[#f7f6fb] p-5 text-xs leading-relaxed text-slate-500">
        {source === "ia"
          ? "Plan généré sur-mesure à partir de votre besoin. C'est un point de départ fiable ; les détails exacts dépendent de vos outils et de vos règles métier."
          : "Plan-cadre établi à partir de votre besoin. Pour une version entièrement personnalisée et une mise en place accompagnée, réservez un échange ci-dessus."}
      </p>
    </motion.div>
  );
}
