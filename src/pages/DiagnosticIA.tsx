// =============================================================
//  Ressource cloisonnée — /diagnostic-ia
//  Page autonome : elle ne réutilise ni la Navbar ni le Footer du
//  site et n'est liée depuis aucune page. Accessible uniquement
//  par son URL directe, et exclue de l'indexation.
// =============================================================

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BUDGETS,
  DONNEES,
  ETAT_INITIAL,
  MATURITES,
  OBJECTIFS,
  OUTILS,
  POLES,
  SECTEURS,
  SEMAINES_TRAVAILLEES,
  TACHES,
  TRANCHES_CA,
  URGENCES,
  calculer,
  envoyerDiagnostic,
  euro,
  nombre,
  type Contact,
  type DiagnosticState,
  type Resultats as TResultats,
} from "../data/diagnostic";
import { CONTACT_EMAIL } from "../data/content";
import { CadreRessource } from "../components/diagnostic/Cadre";
import {
  CarteChoix,
  Champ,
  Compteur,
  Curseur,
  EnteteEtape,
  Liste,
  Navigation,
  Progression,
} from "../components/diagnostic/Controles";
import { Resultats } from "../components/diagnostic/Resultats";

const TITRES = [
  "Votre entreprise",
  "Vos équipes",
  "Vos tâches répétitives",
  "Votre contexte",
  "Vos priorités",
  "Vos résultats",
];

const CONTACT_INITIAL: Contact = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  poste: "",
  societe: "",
};

type Statut = "webhook" | "mailto" | "echec";

export function DiagnosticIA() {
  // -1 = écran d'accueil · 0…5 = étapes · 6 = résultats
  const [etape, setEtape] = useState(-1);
  const [etat, setEtat] = useState<DiagnosticState>(ETAT_INITIAL);
  const [contact, setContact] = useState<Contact>(CONTACT_INITIAL);
  const [consent, setConsent] = useState(false);
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [resultats, setResultats] = useState<TResultats | null>(null);
  const [statut, setStatut] = useState<Statut>("webhook");

  /* --- Cloisonnement : hors index, y compris si le lien fuite --- */
  useEffect(() => {
    const titrePrecedent = document.title;
    document.title = "Diagnostic IA — NoesisAI";

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow, noarchive";
    document.head.appendChild(robots);

    return () => {
      document.title = titrePrecedent;
      document.head.removeChild(robots);
    };
  }, []);

  /* --- Remontée en haut à chaque changement d'écran --- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [etape]);

  const maj = <K extends keyof DiagnosticState>(cle: K, valeur: DiagnosticState[K]) =>
    setEtat((e) => ({ ...e, [cle]: valeur }));

  const majPole = (id: string, champs: Partial<DiagnosticState["poles"][string]>) =>
    setEtat((e) => ({ ...e, poles: { ...e.poles, [id]: { ...e.poles[id], ...champs } } }));

  const basculerTache = (id: string) =>
    setEtat((e) => {
      const taches = { ...e.taches };
      if (taches[id]) delete taches[id];
      else taches[id] = 3;
      return { ...e, taches };
    });

  const basculerOutil = (outil: string) =>
    setEtat((e) => ({
      ...e,
      outils: e.outils.includes(outil)
        ? e.outils.filter((o) => o !== outil)
        : [...e.outils, outil],
    }));

  /* --- Totaux affichés en direct --- */
  const totaux = useMemo(() => {
    const actifs = POLES.filter((p) => etat.poles[p.id].actif);
    return {
      heures: actifs.reduce((t, p) => t + etat.poles[p.id].collabs * etat.poles[p.id].heures, 0),
      collabs: actifs.reduce((t, p) => t + etat.poles[p.id].collabs, 0),
      poles: actifs.length,
    };
  }, [etat.poles]);

  const heuresTaches = useMemo(
    () => Object.values(etat.taches).reduce((t, h) => t + h, 0),
    [etat.taches]
  );

  /* --- Validation par étape --- */
  const valide = (() => {
    switch (etape) {
      case 0:
        return etat.secteur !== "" && etat.effectif >= 1;
      case 1:
        return totaux.poles > 0 && totaux.heures > 0;
      case 2:
        return heuresTaches > 0;
      case 3:
        return etat.maturite !== "" && etat.donnees !== "";
      case 4:
        return etat.objectif !== "" && etat.urgence !== "";
      case 5:
        return (
          contact.prenom.trim().length >= 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
          contact.telephone.trim().length >= 8 &&
          consent
        );
      default:
        return true;
    }
  })();

  const suivant = () => {
    if (!valide) return;
    setErreur("");
    setEtape((e) => e + 1);
  };

  /**
   * Ouvre la boîte d'impression du navigateur, dont l'option
   * « Enregistrer au format PDF » produit le fichier. Le nom proposé
   * reprend le titre du document : on le renomme le temps de
   * l'impression pour éviter un « Diagnostic IA — NoesisAI.pdf »
   * identique pour tout le monde.
   */
  const telechargerPdf = () => {
    const titrePrecedent = document.title;
    const identifiant = (contact.societe || contact.prenom || "diagnostic")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    document.title = `Diagnostic-IA-${identifiant}`;

    const restaurer = () => {
      document.title = titrePrecedent;
      window.removeEventListener("afterprint", restaurer);
    };
    window.addEventListener("afterprint", restaurer);

    window.print();
  };

  const soumettre = async () => {
    if (!valide || envoi) return;
    setEnvoi(true);
    setErreur("");
    const r = calculer(etat);
    try {
      const mode = await envoyerDiagnostic(etat, r, contact);
      setStatut(mode);
    } catch {
      setStatut("echec");
    }
    setResultats(r);
    setEtape(6);
    setEnvoi(false);
  };

  return (
    <CadreRessource mention="Diagnostic confidentiel" piedDePage="Document confidentiel, établi à partir de vos déclarations">
      {/* ---------------- Écran d'accueil ---------------- */}
      {etape === -1 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 font-display text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            Diagnostic gratuit · 4 minutes
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-[#0b0b0f] sm:text-5xl">
            Combien d'heures votre équipe perd-elle chaque semaine sur des{" "}
            <span className="text-brand-600">tâches automatisables</span> ?
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ce diagnostic analyse votre organisation pôle par pôle : effectifs, temps réellement
            passé par collaborateur, nature des tâches répétitives et maturité de vos outils. En
            sortie, vous obtenez un chiffrage précis des heures récupérables et les trois
            chantiers à lancer en priorité.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                titre: "Un chiffrage complet",
                texte: "Heures récupérables par semaine et par an, équivalents temps plein libérés, valeur en euros.",
              },
              {
                titre: "Vos 3 chantiers prioritaires",
                texte: "Classés par impact réel, avec la solution technique et le gain estimé pour chacun.",
              },
              {
                titre: "Un score de potentiel",
                texte: "Pondéré par votre maturité actuelle et la qualité de vos données — pas une promesse en l'air.",
              },
            ].map((c) => (
              <div key={c.titre} className="rounded-2xl border border-black/5 bg-white shadow-card p-5">
                <h2 className="text-sm font-bold text-[#0b0b0f]">{c.titre}</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{c.texte}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setEtape(0)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b0f] w-full px-7 py-4 font-display text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black sm:w-auto"
            >
              Démarrer mon diagnostic
              <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
                ››
              </span>
            </button>
            <p className="mt-4 text-xs text-slate-500">
              6 étapes · Aucune carte bancaire · Vos réponses ne servent qu'à établir votre
              diagnostic
            </p>
          </div>
        </motion.div>
      )}

      {/* ---------------- Questionnaire ---------------- */}
      {etape >= 0 && etape <= 5 && (
        <div>
          <Progression etape={etape} total={6} titres={TITRES} />

          <motion.div
            key={etape}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Étape 1 — Entreprise */}
            {etape === 0 && (
              <>
                <EnteteEtape
                  titre="Parlons de votre entreprise"
                  sousTitre="Ces informations calibrent le calcul : un cabinet de 6 personnes et une PME industrielle de 80 n'ont ni les mêmes gisements ni les mêmes leviers."
                />
                <div className="flex flex-col gap-5">
                  <Liste
                    label="Votre secteur d'activité"
                    value={etat.secteur}
                    onChange={(v) => maj("secteur", v)}
                    options={SECTEURS}
                    placeholder="Sélectionnez un secteur"
                    requis
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Compteur
                      label="Effectif total de l'entreprise"
                      value={etat.effectif}
                      onChange={(v) => maj("effectif", v)}
                      min={1}
                      max={500}
                      suffixe="Dirigeants inclus"
                    />
                    <Liste
                      label="Chiffre d'affaires annuel"
                      value={etat.ca}
                      onChange={(v) => maj("ca", v)}
                      options={TRANCHES_CA}
                      placeholder="Sélectionnez une tranche"
                    />
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-white shadow-card p-5">
                    <Curseur
                      label="Coût horaire chargé moyen"
                      value={etat.coutHoraire}
                      onChange={(v) => maj("coutHoraire", v)}
                      min={15}
                      max={150}
                      step={1}
                      suffixe="€"
                      aide="Salaire brut + charges patronales, divisé par les heures travaillées. Autour de 35–45 € pour un profil administratif, 60 € et plus pour un profil cadre."
                    />
                  </div>
                </div>
              </>
            )}

            {/* Étape 2 — Équipes */}
            {etape === 1 && (
              <>
                <EnteteEtape
                  titre="Qui perd du temps, et combien ?"
                  sousTitre="Activez les pôles concernés, puis indiquez le nombre de collaborateurs et le temps que chacun consacre chaque semaine à des tâches répétitives — pas son temps de travail total."
                />
                <div className="flex flex-col gap-3">
                  {POLES.map((p) => {
                    const e = etat.poles[p.id];
                    return (
                      <CarteChoix
                        key={p.id}
                        titre={p.label}
                        hint={p.hint}
                        actif={e.actif}
                        onClick={() => majPole(p.id, { actif: !e.actif })}
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Compteur
                            label="Nombre de collaborateurs"
                            value={e.collabs}
                            onChange={(v) => majPole(p.id, { collabs: v })}
                            min={1}
                            max={200}
                          />
                          <Curseur
                            label="Heures répétitives / semaine / personne"
                            value={e.heures}
                            onChange={(v) => majPole(p.id, { heures: v })}
                            min={1}
                            max={35}
                            suffixe="h"
                          />
                        </div>
                        <p className="mt-4 text-xs font-medium text-slate-500">
                          Soit{" "}
                          <span className="font-bold text-[#0b0b0f]">
                            {nombre(e.collabs * e.heures)} h
                          </span>{" "}
                          par semaine pour ce pôle.
                        </p>
                      </CarteChoix>
                    );
                  })}
                </div>

                {totaux.poles > 0 && (
                  <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5">
                    <p className="text-sm text-slate-600">Total déclaré</p>
                    <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-[#0b0b0f]">
                      {nombre(totaux.heures)} h / semaine
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      réparties sur {totaux.collabs} collaborateurs, soit{" "}
                      {euro(totaux.heures * etat.coutHoraire * SEMAINES_TRAVAILLEES)} par an au
                      coût horaire indiqué.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Étape 3 — Tâches */}
            {etape === 2 && (
              <>
                <EnteteEtape
                  titre="Sur quoi ce temps part-il ?"
                  sousTitre="Sélectionnez les tâches qui pèsent chez vous, puis estimez le temps hebdomadaire qu'elles représentent à l'échelle de toute l'entreprise. C'est ce qui détermine vos chantiers prioritaires."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {TACHES.map((t) => (
                    <CarteChoix
                      key={t.id}
                      titre={t.label}
                      hint={t.hint}
                      actif={Boolean(etat.taches[t.id])}
                      onClick={() => basculerTache(t.id)}
                    >
                      <Curseur
                        label="Heures / semaine (entreprise)"
                        value={etat.taches[t.id] ?? 3}
                        onChange={(v) =>
                          setEtat((e) => ({ ...e, taches: { ...e.taches, [t.id]: v } }))
                        }
                        min={1}
                        max={60}
                        suffixe="h"
                      />
                    </CarteChoix>
                  ))}
                </div>
                {heuresTaches > 0 && (
                  <p className="mt-6 text-sm text-slate-500">
                    {Object.keys(etat.taches).length} tâche
                    {Object.keys(etat.taches).length > 1 ? "s" : ""} sélectionnée
                    {Object.keys(etat.taches).length > 1 ? "s" : ""} ·{" "}
                    <span className="font-bold text-[#0b0b0f]">{nombre(heuresTaches)} h</span> par
                    semaine
                  </p>
                )}
              </>
            )}

            {/* Étape 4 — Contexte */}
            {etape === 3 && (
              <>
                <EnteteEtape
                  titre="Où en êtes-vous aujourd'hui ?"
                  sousTitre="Votre maturité et l'état de vos données déterminent la part réellement atteignable. C'est ce qui distingue une estimation honnête d'un argumentaire commercial."
                />
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#0b0b0f]">
                      Votre niveau d'automatisation actuel
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {MATURITES.map((m) => (
                        <CarteChoix
                          key={m.id}
                          titre={m.label}
                          hint={m.hint}
                          actif={etat.maturite === m.id}
                          onClick={() => maj("maturite", m.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#0b0b0f]">
                      L'état de vos données
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {DONNEES.map((d) => (
                        <CarteChoix
                          key={d.id}
                          titre={d.label}
                          hint={d.hint}
                          actif={etat.donnees === d.id}
                          onClick={() => maj("donnees", d.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#0b0b0f]">
                      Vos outils actuels{" "}
                      <span className="font-normal text-slate-500">(optionnel)</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {OUTILS.map((o) => {
                        const actif = etat.outils.includes(o);
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => basculerOutil(o)}
                            aria-pressed={actif}
                            className={
                              actif
                                ? "rounded-full border border-brand-500/60 bg-brand-50 px-4 py-2 text-xs font-medium text-brand-700 transition-colors"
                                : "rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-black/25 hover:text-[#0b0b0f]"
                            }
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Étape 5 — Priorités */}
            {etape === 4 && (
              <>
                <EnteteEtape
                  titre="Qu'est-ce qui compte le plus pour vous ?"
                  sousTitre="Cela nous permet d'ordonner vos chantiers selon votre objectif réel et de préparer un échange utile plutôt qu'une présentation générique."
                />
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#0b0b0f]">Votre objectif principal</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {OBJECTIFS.map((o) => (
                        <CarteChoix
                          key={o.id}
                          titre={o.label}
                          hint={o.hint}
                          actif={etat.objectif === o.id}
                          onClick={() => maj("objectif", o.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-[#0b0b0f]">Votre horizon</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {URGENCES.map((u) => (
                        <CarteChoix
                          key={u.id}
                          titre={u.label}
                          hint={u.hint}
                          actif={etat.urgence === u.id}
                          onClick={() => maj("urgence", u.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <Liste
                    label="Budget envisagé (optionnel)"
                    value={etat.budget}
                    onChange={(v) => maj("budget", v)}
                    options={BUDGETS}
                    placeholder="Sélectionnez une fourchette"
                  />
                </div>
              </>
            )}

            {/* Étape 6 — Coordonnées */}
            {etape === 5 && (
              <>
                <EnteteEtape
                  titre="Où envoyons-nous votre diagnostic ?"
                  sousTitre="Vos résultats s'affichent immédiatement après validation. Nous conservons vos coordonnées uniquement pour vous transmettre le diagnostic détaillé et, si vous le souhaitez, en discuter."
                />

                <div className="rounded-3xl border border-black/5 bg-white shadow-card p-6 sm:p-7">
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Champ
                        label="Prénom"
                        value={contact.prenom}
                        onChange={(v) => setContact((c) => ({ ...c, prenom: v }))}
                        placeholder="Ugo"
                        requis
                        autoComplete="given-name"
                      />
                      <Champ
                        label="Nom"
                        value={contact.nom}
                        onChange={(v) => setContact((c) => ({ ...c, nom: v }))}
                        placeholder="Sartini"
                        autoComplete="family-name"
                      />
                    </div>
                    <Champ
                      label="Email professionnel"
                      type="email"
                      value={contact.email}
                      onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                      placeholder="vous@votresociete.fr"
                      requis
                      autoComplete="email"
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Champ
                        label="Téléphone"
                        type="tel"
                        value={contact.telephone}
                        onChange={(v) => setContact((c) => ({ ...c, telephone: v }))}
                        placeholder="06 12 34 56 78"
                        requis
                        autoComplete="tel"
                      />
                      <Champ
                        label="Votre fonction"
                        value={contact.poste}
                        onChange={(v) => setContact((c) => ({ ...c, poste: v }))}
                        placeholder="Dirigeant, DAF, Responsable ops…"
                        autoComplete="organization-title"
                      />
                    </div>
                    <Champ
                      label="Votre société (optionnel)"
                      value={contact.societe}
                      onChange={(v) => setContact((c) => ({ ...c, societe: v }))}
                      placeholder="Ex. Martin & Associés"
                      autoComplete="organization"
                    />

                    <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-500">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
                      />
                      <span>
                        J'accepte que NoesisAI me contacte au sujet de ce diagnostic. Mes données
                        sont traitées conformément au RGPD et ne sont ni revendues ni cédées. Je
                        peux demander leur suppression à tout moment à{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </span>
                    </label>
                  </div>
                </div>

                {erreur && (
                  <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                    {erreur}
                  </p>
                )}
              </>
            )}
          </motion.div>

          <Navigation
            onPrecedent={() => setEtape((e) => e - 1)}
            onSuivant={etape === 5 ? soumettre : suivant}
            libelleSuivant={etape === 5 ? "Afficher mes résultats" : "Continuer"}
            desactive={!valide}
            chargement={envoi}
          />

          {!valide && etape >= 0 && (
            <p className="mt-3 text-right text-xs text-slate-500">
              {etape === 1
                ? "Activez au moins un pôle pour continuer."
                : etape === 2
                  ? "Sélectionnez au moins une tâche pour continuer."
                  : etape === 5
                    ? "Renseignez prénom, email, téléphone et acceptez les conditions."
                    : "Complétez les champs obligatoires pour continuer."}
            </p>
          )}
        </div>
      )}

      {/* ---------------- Résultats ---------------- */}
      {etape === 6 && resultats && (
        <>
          <Resultats
            r={resultats}
            contact={contact}
            societe={contact.societe}
            statut={statut}
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
            <button
              type="button"
              onClick={telechargerPdf}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-black/20 bg-white px-5 py-2.5 font-display text-sm font-semibold text-[#0b0b0f] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 hover:border-black/40"
            >
              <span aria-hidden>↓</span> Télécharger mon diagnostic en PDF
            </button>
            <button
              type="button"
              onClick={() => {
                setEtat(ETAT_INITIAL);
                setContact(CONTACT_INITIAL);
                setConsent(false);
                setResultats(null);
                setEtape(-1);
              }}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-[#0b0b0f]"
            >
              Refaire un diagnostic
            </button>
          </div>
        </>
      )}
    </CadreRessource>
  );
}
