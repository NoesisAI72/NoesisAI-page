// Écran de résultats du diagnostic : score, gains chiffrés,
// chantiers prioritaires et prise de rendez-vous.

import { motion } from "framer-motion";
import { CONTACT_EMAIL, ICLOSED_URL } from "../../data/content";
import {
  SEMAINES_TRAVAILLEES,
  euro,
  nombre,
  type Contact,
  type Resultats as TResultats,
} from "../../data/diagnostic";

/* ---------------------------------------------------------------
 *  Anneau de score
 * -------------------------------------------------------------*/

function AnneauScore({ score, niveau }: { score: number; niveau: string }) {
  const rayon = 54;
  const circonference = 2 * Math.PI * rayon;

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="grad-score" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="52%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c026d3" />
          </linearGradient>
        </defs>
        <circle
          cx="64"
          cy="64"
          r={rayon}
          fill="none"
          stroke="rgba(17,24,39,0.07)"
          strokeWidth="10"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={rayon}
          fill="none"
          stroke="url(#grad-score)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circonference}
          initial={{ strokeDashoffset: circonference }}
          animate={{ strokeDashoffset: circonference * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#0b0b0f]">{score}</span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          sur 100
        </span>
        <span className="mt-1 text-center text-xs font-semibold text-brand-600">{niveau}</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Tuile de statistique
 * -------------------------------------------------------------*/

function Tuile({
  valeur,
  label,
  detail,
  accent,
}: {
  valeur: string;
  label: string;
  detail?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-brand-500/30 bg-brand-50 p-5"
          : "rounded-2xl border border-black/5 bg-white shadow-card p-5"
      }
    >
      <div className="font-display text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#0b0b0f] sm:text-3xl">
        {valeur}
      </div>
      <div className="mt-1.5 text-sm font-medium text-slate-600">{label}</div>
      {detail && <div className="mt-0.5 text-xs text-slate-500">{detail}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Écran complet
 * -------------------------------------------------------------*/

const MESSAGES_STATUT: Record<string, string> = {
  webhook:
    "Diagnostic transmis à l'équipe NoesisAI. Nous revenons vers vous sous 24 h ouvrées.",
  mailto:
    "Votre logiciel de messagerie vient de s'ouvrir avec le diagnostic pré-rempli — envoyez-le pour que nous le recevions.",
  echec: `L'envoi automatique n'a pas abouti. Vos résultats restent affichés ci-dessous : écrivez-nous à ${CONTACT_EMAIL} et nous les reprendrons ensemble.`,
};

export function Resultats({
  r,
  contact,
  societe,
  statut,
}: {
  r: TResultats;
  contact: Contact;
  societe: string;
  statut: "webhook" | "mailto" | "echec";
}) {
  return (
    <motion.div
      className="diagnostic-print"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* En-tête réservé au PDF : à l'écran, le logo est déjà dans la
          barre du haut, qui ne s'imprime pas. */}
      <div className="print-only mb-8 hidden border-b border-slate-200 pb-4">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-lg font-bold">NoesisAI</span>
          <span className="text-xs">
            Diagnostic IA · {new Date().toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>

      {/* En-tête */}
      <div className="rounded-3xl border border-black/5 bg-white shadow-card p-7 sm:p-9">
        <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-9">
          <AnneauScore score={r.score} niveau={r.niveau} />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-slate-500">
              Diagnostic de {societe || "votre entreprise"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#0b0b0f] sm:text-[2rem]">
              {contact.prenom}, vous pouvez libérer{" "}
              <span className="text-brand-600">
                {nombre(r.heuresGagneesSemaine, 1)} heures par semaine
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Sur les {nombre(r.heuresRepetitivesSemaine)} h hebdomadaires que vos{" "}
              {r.collaborateursConcernes} collaborateurs consacrent à des tâches répétitives,{" "}
              <strong className="font-semibold text-[#0b0b0f]">
                {Math.round(r.tauxAutomatisation * 100)} %
              </strong>{" "}
              sont automatisables avec les technologies disponibles aujourd'hui.
            </p>
          </div>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tuile
          valeur={`${nombre(r.heuresGagneesAn)} h`}
          label="Récupérées par an"
          detail={`soit ${nombre(r.joursOuvresAn)} jours ouvrés`}
        />
        <Tuile
          valeur={`${nombre(r.etpLiberes, 1)} ETP`}
          label="Équivalents temps plein libérés"
          detail="à effectif constant"
        />
        <Tuile
          valeur={euro(r.economieAn)}
          label="Valeur récupérée par an"
          detail={`soit ${euro(r.economieMois)} par mois`}
          accent
        />
        <Tuile
          valeur={`${Math.round(r.partCapacite * 100)} %`}
          label="De votre capacité totale"
          detail="rendue à des tâches à valeur"
        />
      </div>

      {/* Chantiers prioritaires */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-2xl">
          Vos {r.chantiers.length} chantiers prioritaires
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Classés par impact décroissant, d'après le temps que vous y consacrez et ce qui est
          réellement automatisable.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {r.chantiers.map((ch, i) => (
            <motion.div
              key={ch.tache.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className="evite-coupure rounded-3xl border border-black/5 bg-white shadow-card p-6 sm:p-7"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h4 className="text-lg font-bold leading-tight text-[#0b0b0f]">
                      {ch.tache.chantier}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {ch.tache.solution}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ch.tache.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-black/5 bg-[#f7f6fb] px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 sm:text-right">
                  <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#0b0b0f]">
                    {nombre(ch.heuresAn)} h
                  </div>
                  <div className="text-xs font-medium text-slate-500">récupérées par an</div>
                  <div className="mt-2 text-sm font-bold text-brand-600">
                    {euro(ch.economieAn)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prise de rendez-vous */}
      <div className="mt-12 overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] px-7 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#0b0b0f] sm:text-3xl">
            Ces {nombre(r.heuresGagneesAn)} heures, on peut aller les chercher ensemble
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            En 30 minutes, on repasse votre diagnostic en détail, on valide les hypothèses avec vos
            vrais chiffres et on vous remet une feuille de route chiffrée — que vous travailliez
            avec nous ensuite ou non.
          </p>
          <a
            href={ICLOSED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b0f] px-7 py-3.5 font-display text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black print:hidden"
          >
            Réserver mon échange de 30 min
            <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
              ››
            </span>
          </a>
          {/* Sur papier, un bouton ne se clique pas : on écrit l'adresse. */}
          <p className="print-only mt-6 hidden text-sm font-semibold">
            Réservez votre créneau : {ICLOSED_URL}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Sans engagement · Créneau de 30 minutes · En visio
          </p>
        </div>
      </div>

      {/* Confirmation d'envoi + méthodologie */}
      <div className="mt-8 rounded-2xl border border-black/5 bg-[#f7f6fb] p-5">
        <p
          className={
            statut === "echec"
              ? "text-sm font-medium text-amber-700"
              : "text-sm font-medium text-[#0b0b0f]"
          }
        >
          {MESSAGES_STATUT[statut]}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          <strong className="font-semibold text-slate-600">Méthodologie —</strong> les gains sont
          calculés sur {SEMAINES_TRAVAILLEES} semaines travaillées par an, en appliquant à chaque tâche un
          taux d'automatisation observé sur nos déploiements, pondéré par votre maturité actuelle et
          la qualité de vos données. Estimation indicative : les résultats réels dépendent de votre
          organisation et se valident lors de l'audit détaillé.
        </p>
      </div>
    </motion.div>
  );
}
