// =============================================================
//  NOESIS AI — Diagnostic IA (ressource cloisonnée /diagnostic-ia)
//  Modèle de données + moteur de calcul.
//  Aucune dépendance UI ici : ce fichier est la source de vérité
//  des questions, des taux d'automatisation et des formules.
// =============================================================

import { CONTACT_EMAIL } from "./content";

/* -------------------------------------------------------------
 *  Destination des leads
 * -----------------------------------------------------------*/

/**
 * URL qui reçoit le diagnostic complet en JSON (POST).
 * Tant que cette constante est vide, on bascule automatiquement
 * sur un email pré-rempli (mailto) — la ressource reste donc
 * fonctionnelle sans configuration.
 *
 * Options qui envoient directement un email, sans serveur :
 *   • Formspree   → https://formspree.io/f/xxxxxxx
 *   • Web3Forms   → https://api.web3forms.com/submit  (ajouter access_key)
 *   • n8n / Make  → URL du webhook, puis nœud « Send Email »
 */
/**
 * Destination des diagnostics.
 *
 *  • "web3forms"  — actif. Notifie la boîte de contact. Le prospect ne
 *    reçoit rien : il garde ses résultats via le téléchargement PDF.
 *
 *  • "serverless" — api/diagnostic.ts, déjà écrit et prêt. Envoie en
 *    plus le diagnostic personnalisé au prospect via Resend. Ne pas
 *    activer avant d'avoir vérifié un domaine dans Resend et
 *    configuré RESEND_API_KEY, DIAGNOSTIC_FROM et DIAGNOSTIC_TO sur
 *    Vercel : sans ces variables la route renvoie une erreur et plus
 *    aucun lead n'est collecté.
 *
 * Le basculement se fait en changeant cette seule valeur.
 */
export const MODE_ENVOI: "web3forms" | "serverless" = "web3forms";

const ENDPOINTS = {
  web3forms: "https://api.web3forms.com/submit",
  serverless: "/api/diagnostic",
} as const;

export const DIAGNOSTIC_ENDPOINT = ENDPOINTS[MODE_ENVOI];

/**
 * Clé publique Web3Forms. Elle transite forcément par le navigateur :
 * c'est le fonctionnement prévu du service, et elle n'ouvre aucun
 * accès en lecture aux soumissions passées.
 */
export const DIAGNOSTIC_ACCESS_KEY = "890e6b15-0a45-4fed-89d4-54bbf78234b9";

/** Nombre de semaines réellement travaillées dans l'année (congés déduits). */
export const SEMAINES_TRAVAILLEES = 45;

/** Base horaire d'un équivalent temps plein, en heures / semaine. */
export const HEURES_ETP = 35;

/* -------------------------------------------------------------
 *  Étape 1 — L'entreprise
 * -----------------------------------------------------------*/

export const SECTEURS = [
  "BTP / Bâtiment",
  "Immobilier",
  "Santé / Médical",
  "E-commerce / Retail",
  "Services B2B",
  "Industrie / Production",
  "Transport / Logistique",
  "Hôtellerie / Restauration",
  "Cabinet comptable / Juridique",
  "Agence / Conseil",
  "Autre",
];

export const TRANCHES_CA = [
  "Moins de 250 K€",
  "250 K€ – 1 M€",
  "1 M€ – 5 M€",
  "5 M€ – 20 M€",
  "Plus de 20 M€",
  "Je préfère ne pas répondre",
];

/* -------------------------------------------------------------
 *  Étape 2 — Les pôles et leurs collaborateurs
 * -----------------------------------------------------------*/

export type Pole = {
  id: string;
  label: string;
  hint: string;
  /** Valeurs pré-remplies quand l'utilisateur active le pôle. */
  collabs: number;
  heures: number;
};

export const POLES: Pole[] = [
  {
    id: "direction",
    label: "Direction / Gérance",
    hint: "Pilotage, arbitrages, reporting",
    collabs: 1,
    heures: 6,
  },
  {
    id: "commercial",
    label: "Commercial / Vente",
    hint: "Prospection, devis, relances",
    collabs: 2,
    heures: 10,
  },
  {
    id: "admin",
    label: "Administratif / Back-office",
    hint: "Saisie, dossiers, coordination",
    collabs: 2,
    heures: 15,
  },
  {
    id: "compta",
    label: "Comptabilité / Finance",
    hint: "Factures, rapprochements, notes de frais",
    collabs: 1,
    heures: 12,
  },
  {
    id: "sav",
    label: "Service client / SAV",
    hint: "Appels, emails, réclamations",
    collabs: 2,
    heures: 14,
  },
  {
    id: "marketing",
    label: "Marketing / Communication",
    hint: "Contenus, réseaux sociaux, campagnes",
    collabs: 1,
    heures: 8,
  },
  {
    id: "rh",
    label: "Ressources humaines",
    hint: "Recrutement, plannings, onboarding",
    collabs: 1,
    heures: 7,
  },
  {
    id: "ops",
    label: "Production / Opérations",
    hint: "Planification, suivi terrain, qualité",
    collabs: 3,
    heures: 9,
  },
  {
    id: "tech",
    label: "Technique / IT",
    hint: "Support interne, intégrations, données",
    collabs: 1,
    heures: 8,
  },
];

/* -------------------------------------------------------------
 *  Étape 3 — Les tâches répétitives
 *  `auto` = part réaliste de cette tâche automatisable aujourd'hui.
 *  Volontairement conservateur : on ne promet jamais 100 %.
 * -----------------------------------------------------------*/

export type Tache = {
  id: string;
  label: string;
  hint: string;
  auto: number;
  /** Nom du chantier proposé dans les résultats. */
  chantier: string;
  solution: string;
  stack: string[];
};

export const TACHES: Tache[] = [
  {
    id: "saisie",
    label: "Saisie et recopie de données",
    hint: "Retaper les mêmes infos d'un outil à l'autre",
    auto: 0.85,
    chantier: "Synchronisation automatique de vos outils",
    solution:
      "Un pipeline connecte vos logiciels entre eux : la donnée saisie une fois se propage partout, sans double saisie ni erreur de recopie.",
    stack: ["n8n", "API natives", "Supabase"],
  },
  {
    id: "devis",
    label: "Rédaction de devis et de factures",
    hint: "Création, envoi, archivage des documents",
    auto: 0.7,
    chantier: "Génération automatisée des devis et factures",
    solution:
      "À partir d'une demande client, le document est généré, personnalisé, envoyé et archivé automatiquement : vous n'intervenez que pour valider.",
    stack: ["n8n", "LLM", "Pennylane"],
  },
  {
    id: "relances",
    label: "Relances clients et impayés",
    hint: "Suivre qui n'a pas répondu ou pas payé",
    auto: 0.8,
    chantier: "Séquences de relance intelligentes",
    solution:
      "Chaque devis sans réponse et chaque facture impayée déclenche sa propre séquence de relance, personnalisée et arrêtée dès que le client réagit.",
    stack: ["n8n", "CRM", "Email / SMS"],
  },
  {
    id: "rdv",
    label: "Prise et confirmation de rendez-vous",
    hint: "Allers-retours pour caler un créneau",
    auto: 0.75,
    chantier: "Prise de rendez-vous autonome",
    solution:
      "Un agent gère la prise de RDV de bout en bout : proposition de créneaux, confirmation, rappel automatique et replanification en cas d'annulation.",
    stack: ["Agent IA", "Google Calendar", "Twilio"],
  },
  {
    id: "appels",
    label: "Réception et qualification des appels",
    hint: "Décrocher, filtrer, prendre le message",
    auto: 0.6,
    chantier: "Agent vocal IA 24/7",
    solution:
      "Un agent vocal décroche à chaque appel, y compris le soir et le week-end, qualifie le besoin, prend le RDV et vous transmet un compte-rendu.",
    stack: ["ElevenLabs", "Twilio", "n8n"],
  },
  {
    id: "emails",
    label: "Réponses aux emails récurrents",
    hint: "Les mêmes questions, tous les jours",
    auto: 0.65,
    chantier: "Tri et pré-rédaction des emails",
    solution:
      "Les emails entrants sont classés par intention et les réponses aux demandes récurrentes sont pré-rédigées à partir de votre base de connaissances.",
    stack: ["LLM", "Gmail / Outlook", "n8n"],
  },
  {
    id: "reporting",
    label: "Reporting et tableaux de bord",
    hint: "Consolider des chiffres à la main",
    auto: 0.8,
    chantier: "Reporting consolidé en temps réel",
    solution:
      "Vos indicateurs se consolident automatiquement depuis toutes vos sources et vous recevez la synthèse commentée au rythme que vous choisissez.",
    stack: ["Supabase", "n8n", "LLM"],
  },
  {
    id: "documents",
    label: "Recherche et classement de documents",
    hint: "Retrouver le bon fichier, le bon contrat",
    auto: 0.7,
    chantier: "Base documentaire interrogeable",
    solution:
      "Vos documents sont indexés et deviennent interrogeables en langage naturel : la bonne information remonte en quelques secondes, sourcée.",
    stack: ["RAG", "Vector DB", "LLM"],
  },
  {
    id: "commandes",
    label: "Suivi des commandes et livraisons",
    hint: "Vérifier les statuts, informer les clients",
    auto: 0.6,
    chantier: "Suivi de commandes automatisé",
    solution:
      "Chaque changement de statut déclenche l'information du client et l'alerte interne en cas de retard : plus personne ne relance manuellement.",
    stack: ["n8n", "ERP", "Notifications"],
  },
  {
    id: "recrutement",
    label: "Tri de CV et présélection",
    hint: "Lire des candidatures en série",
    auto: 0.7,
    chantier: "Présélection assistée des candidatures",
    solution:
      "Les candidatures sont analysées, scorées sur vos critères et synthétisées : vous ne lisez que les profils réellement pertinents.",
    stack: ["LLM", "n8n", "ATS"],
  },
  {
    id: "contenu",
    label: "Production de contenu marketing",
    hint: "Posts, newsletters, fiches produit",
    auto: 0.55,
    chantier: "Chaîne de production de contenu",
    solution:
      "Une chaîne éditoriale produit vos contenus à votre ton de voix, les décline par canal et les programme : vous gardez la validation finale.",
    stack: ["LLM", "n8n", "Réseaux sociaux"],
  },
  {
    id: "rapprochement",
    label: "Rapprochement bancaire et notes de frais",
    hint: "Pointer les lignes une par une",
    auto: 0.75,
    chantier: "Rapprochement comptable automatisé",
    solution:
      "Les justificatifs sont lus, catégorisés et rapprochés des écritures automatiquement ; seules les anomalies remontent pour arbitrage.",
    stack: ["OCR", "LLM", "Qonto / Pennylane"],
  },
  {
    id: "planning",
    label: "Planification des interventions",
    hint: "Caler les équipes, gérer les imprévus",
    auto: 0.5,
    chantier: "Optimisation des plannings",
    solution:
      "Les interventions sont réparties selon les compétences, les zones et les disponibilités, avec replanification automatique en cas d'imprévu.",
    stack: ["Solveur", "n8n", "Mobile"],
  },
  {
    id: "veille",
    label: "Veille et recherche d'informations",
    hint: "Appels d'offres, marché, concurrence",
    auto: 0.7,
    chantier: "Veille automatisée et synthétisée",
    solution:
      "Vos sources sont surveillées en continu et vous recevez une synthèse filtrée sur vos critères, sans avoir à consulter dix sites par jour.",
    stack: ["Scraping", "LLM", "n8n"],
  },
];

/* -------------------------------------------------------------
 *  Étape 4 — Maturité et contexte technique
 * -----------------------------------------------------------*/

export type Choix = { id: string; label: string; hint: string; facteur: number };

export const MATURITES: Choix[] = [
  {
    id: "aucune",
    label: "Aucune automatisation",
    hint: "Tout est fait manuellement",
    facteur: 1,
  },
  {
    id: "tests",
    label: "Quelques usages ponctuels",
    hint: "ChatGPT de temps en temps, rien d'industrialisé",
    facteur: 0.95,
  },
  {
    id: "partielle",
    label: "Automatisations partielles",
    hint: "Un ou deux process déjà automatisés",
    facteur: 0.85,
  },
  {
    id: "avancee",
    label: "Automatisations avancées",
    hint: "Plusieurs workflows en production",
    facteur: 0.7,
  },
];

export const DONNEES: Choix[] = [
  {
    id: "centralisees",
    label: "Centralisées et propres",
    hint: "Un CRM ou ERP fait référence",
    facteur: 1.1,
  },
  {
    id: "partielles",
    label: "Réparties sur plusieurs outils",
    hint: "Les outils communiquent mal entre eux",
    facteur: 1,
  },
  {
    id: "eparpillees",
    label: "Éparpillées",
    hint: "Excel, boîtes mail, papier",
    facteur: 0.85,
  },
];

export const OUTILS = [
  "CRM (HubSpot, Pipedrive…)",
  "ERP / logiciel métier",
  "Comptabilité (Pennylane, Sage…)",
  "Excel / Google Sheets",
  "Gmail / Outlook",
  "Slack / Teams",
  "Notion / Monday / Trello",
  "Site web / e-commerce",
  "Téléphonie professionnelle",
  "Aucun outil structurant",
];

/* -------------------------------------------------------------
 *  Étape 5 — Priorités
 * -----------------------------------------------------------*/

export const OBJECTIFS = [
  { id: "temps", label: "Libérer du temps", hint: "Sortir mes équipes des tâches sans valeur" },
  { id: "couts", label: "Réduire les coûts", hint: "Absorber plus de volume à effectif constant" },
  { id: "reactivite", label: "Gagner en réactivité", hint: "Ne plus rater d'opportunité client" },
  { id: "croissance", label: "Croître sans recruter", hint: "Encaisser la croissance sans embaucher" },
];

export const URGENCES = [
  { id: "immediat", label: "Dès que possible", hint: "Le sujet est prioritaire" },
  { id: "trimestre", label: "Dans les 3 mois", hint: "C'est planifié" },
  { id: "semestre", label: "Dans les 6 mois", hint: "En réflexion" },
  { id: "exploration", label: "Je me renseigne", hint: "Pas de calendrier arrêté" },
];

export const BUDGETS = [
  "Moins de 5 000 €",
  "5 000 € – 15 000 €",
  "15 000 € – 40 000 €",
  "Plus de 40 000 €",
  "À définir selon le ROI",
];

/* -------------------------------------------------------------
 *  État du questionnaire
 * -----------------------------------------------------------*/

export type PoleState = { actif: boolean; collabs: number; heures: number };

export type DiagnosticState = {
  secteur: string;
  effectif: number;
  ca: string;
  coutHoraire: number;
  poles: Record<string, PoleState>;
  taches: Record<string, number>;
  maturite: string;
  donnees: string;
  outils: string[];
  objectif: string;
  urgence: string;
  budget: string;
};

export const ETAT_INITIAL: DiagnosticState = {
  secteur: "",
  effectif: 5,
  ca: "",
  coutHoraire: 38,
  poles: Object.fromEntries(
    POLES.map((p) => [p.id, { actif: false, collabs: p.collabs, heures: p.heures }])
  ),
  taches: {},
  maturite: "",
  donnees: "",
  outils: [],
  objectif: "",
  urgence: "",
  budget: "",
};

/* -------------------------------------------------------------
 *  Moteur de calcul
 * -----------------------------------------------------------*/

export type Chantier = {
  tache: Tache;
  heuresAn: number;
  economieAn: number;
};

export type Resultats = {
  /** Heures répétitives déclarées, toutes équipes confondues. */
  heuresRepetitivesSemaine: number;
  /** Part de ces heures réellement automatisable. */
  tauxAutomatisation: number;
  heuresGagneesSemaine: number;
  heuresGagneesAn: number;
  economieAn: number;
  economieMois: number;
  etpLiberes: number;
  joursOuvresAn: number;
  /** Score de potentiel 0–100 + libellé associé. */
  score: number;
  niveau: string;
  /** Part du temps total de l'entreprise récupérable. */
  partCapacite: number;
  chantiers: Chantier[];
  collaborateursConcernes: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function niveauDuScore(score: number) {
  if (score >= 75) return "Potentiel critique";
  if (score >= 50) return "Potentiel élevé";
  if (score >= 25) return "Potentiel réel";
  return "Potentiel modéré";
}

export function calculer(s: DiagnosticState): Resultats {
  /* 1. Volume déclaré par les équipes ------------------------- */
  const polesActifs = POLES.filter((p) => s.poles[p.id]?.actif);
  const heuresRepetitivesSemaine = polesActifs.reduce((total, p) => {
    const e = s.poles[p.id];
    return total + e.collabs * e.heures;
  }, 0);
  const collaborateursConcernes = polesActifs.reduce(
    (total, p) => total + s.poles[p.id].collabs,
    0
  );

  /* 2. Taux d'automatisation pondéré par les tâches ------------ */
  const tachesChoisies = TACHES.filter((t) => (s.taches[t.id] ?? 0) > 0);
  const heuresTaches = tachesChoisies.reduce((total, t) => total + s.taches[t.id], 0);
  const tauxBrut =
    heuresTaches > 0
      ? tachesChoisies.reduce((total, t) => total + s.taches[t.id] * t.auto, 0) / heuresTaches
      : 0;

  /* 3. Correction par le contexte (maturité, qualité des données) */
  const fMaturite = MATURITES.find((m) => m.id === s.maturite)?.facteur ?? 1;
  const fDonnees = DONNEES.find((d) => d.id === s.donnees)?.facteur ?? 1;
  const tauxAutomatisation = clamp(tauxBrut * fMaturite * fDonnees, 0, 0.9);

  /* 4. Gains ---------------------------------------------------- */
  const heuresGagneesSemaine = heuresRepetitivesSemaine * tauxAutomatisation;
  const heuresGagneesAn = heuresGagneesSemaine * SEMAINES_TRAVAILLEES;
  const economieAn = heuresGagneesAn * s.coutHoraire;

  /* 5. Chantiers prioritaires ----------------------------------
   * Les heures déclarées par tâche sont ramenées au total des pôles,
   * puis au taux d'automatisation retenu (plafond de 0,9 compris).
   * La somme de tous les chantiers égale ainsi exactement le gain
   * affiché en haut de page : aucun chiffre ne se contredit. */
  const ratio = heuresTaches > 0 ? heuresRepetitivesSemaine / heuresTaches : 0;
  const ajustement = tauxBrut > 0 ? tauxAutomatisation / tauxBrut : 0;
  const chantiers: Chantier[] = tachesChoisies
    .map((t) => {
      const heuresSemaine = s.taches[t.id] * ratio * t.auto * ajustement;
      const heuresAn = heuresSemaine * SEMAINES_TRAVAILLEES;
      return { tache: t, heuresAn, economieAn: heuresAn * s.coutHoraire };
    })
    .sort((a, b) => b.heuresAn - a.heuresAn)
    .slice(0, 3);

  /* 6. Score de potentiel --------------------------------------
   * Référence : libérer 35 % de la capacité totale = score 100.
   * On retient le plus grand des deux effectifs déclarés, sinon un
   * total de collaborateurs par pôle supérieur à l'effectif global
   * ferait dépasser 100 % de capacité. */
  const effectifRetenu = Math.max(s.effectif, collaborateursConcernes, 1);
  const capaciteTotale = effectifRetenu * HEURES_ETP;
  const partCapacite = clamp(heuresGagneesSemaine / capaciteTotale, 0, 1);
  const score = Math.round(clamp((partCapacite / 0.35) * 100, 0, 100));

  return {
    heuresRepetitivesSemaine,
    tauxAutomatisation,
    heuresGagneesSemaine,
    heuresGagneesAn,
    economieAn,
    economieMois: economieAn / 12,
    etpLiberes: heuresGagneesSemaine / HEURES_ETP,
    joursOuvresAn: heuresGagneesAn / 7,
    score,
    niveau: niveauDuScore(score),
    partCapacite,
    chantiers,
    collaborateursConcernes,
  };
}

/* -------------------------------------------------------------
 *  Formatage
 * -----------------------------------------------------------*/

export function euro(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function nombre(n: number, decimales = 0) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(n);
}

/* -------------------------------------------------------------
 *  Envoi du diagnostic
 * -----------------------------------------------------------*/

export type Contact = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  poste: string;
  /** Demandé en toute fin de parcours seulement : à l'étape 1, la
   *  question est perçue comme intrusive avant toute contrepartie. */
  societe: string;
};

/** Récapitulatif lisible — utilisé dans l'email reçu. */
export function resumeTexte(s: DiagnosticState, r: Resultats, c: Contact) {
  const lignesPoles = POLES.filter((p) => s.poles[p.id]?.actif).map((p) => {
    const e = s.poles[p.id];
    return `  - ${p.label} : ${e.collabs} collaborateur(s) x ${e.heures} h/sem = ${
      e.collabs * e.heures
    } h/sem`;
  });

  const lignesTaches = TACHES.filter((t) => (s.taches[t.id] ?? 0) > 0).map(
    (t) => `  - ${t.label} : ${s.taches[t.id]} h/sem`
  );

  const lignesChantiers = r.chantiers.map(
    (ch, i) =>
      `  ${i + 1}. ${ch.tache.chantier} — ${nombre(ch.heuresAn)} h/an, ${euro(ch.economieAn)}/an`
  );

  return [
    "=== NOUVEAU DIAGNOSTIC IA ===",
    "",
    "--- CONTACT ---",
    `Prénom / Nom : ${c.prenom} ${c.nom}`,
    `Poste : ${c.poste || "non renseigné"}`,
    `Email : ${c.email}`,
    `Téléphone : ${c.telephone}`,
    "",
    "--- ENTREPRISE ---",
    `Société : ${c.societe || "non renseignée"}`,
    `Secteur : ${s.secteur}`,
    `Effectif total : ${s.effectif}`,
    `Chiffre d'affaires : ${s.ca || "non renseigné"}`,
    `Coût horaire chargé retenu : ${s.coutHoraire} €`,
    "",
    "--- ÉQUIPES CONCERNÉES ---",
    ...lignesPoles,
    `  Total déclaré : ${nombre(r.heuresRepetitivesSemaine)} h/sem sur ${
      r.collaborateursConcernes
    } collaborateurs`,
    "",
    "--- TÂCHES RÉPÉTITIVES ---",
    ...lignesTaches,
    "",
    "--- CONTEXTE ---",
    `Maturité : ${MATURITES.find((m) => m.id === s.maturite)?.label ?? "-"}`,
    `Données : ${DONNEES.find((d) => d.id === s.donnees)?.label ?? "-"}`,
    `Outils : ${s.outils.join(", ") || "-"}`,
    `Objectif : ${OBJECTIFS.find((o) => o.id === s.objectif)?.label ?? "-"}`,
    `Urgence : ${URGENCES.find((u) => u.id === s.urgence)?.label ?? "-"}`,
    `Budget : ${s.budget || "-"}`,
    "",
    "--- RÉSULTATS ---",
    `Score de potentiel : ${r.score}/100 (${r.niveau})`,
    `Taux d'automatisation : ${Math.round(r.tauxAutomatisation * 100)} %`,
    `Heures gagnées : ${nombre(r.heuresGagneesSemaine, 1)} h/sem — ${nombre(
      r.heuresGagneesAn
    )} h/an`,
    `Équivalent : ${nombre(r.etpLiberes, 1)} ETP — ${nombre(r.joursOuvresAn)} jours ouvrés`,
    `Économie estimée : ${euro(r.economieAn)}/an (${euro(r.economieMois)}/mois)`,
    "",
    "--- CHANTIERS PRIORITAIRES ---",
    ...lignesChantiers,
  ].join("\n");
}

export type ModeEnvoi = "webhook" | "mailto";

/**
 * Envoie le diagnostic. Retourne le mode utilisé afin que l'UI
 * puisse adapter son message de confirmation.
 */
export async function envoyerDiagnostic(
  s: DiagnosticState,
  r: Resultats,
  c: Contact
): Promise<ModeEnvoi> {
  const resume = resumeTexte(s, r, c);

  if (!DIAGNOSTIC_ENDPOINT) {
    const sujet = encodeURIComponent(
      `Diagnostic IA — ${c.societe || `${c.prenom} ${c.nom}`}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${sujet}&body=${encodeURIComponent(
      resume
    )}`;
    return "mailto";
  }

  /* Payload structuré : la fonction serverless s'en sert pour composer
   * les deux emails (fiche de lead interne, diagnostic au prospect). */
  const corps = {
    contact: c,
    entreprise: {
      secteur: s.secteur,
      effectif: s.effectif,
      ca: s.ca,
      coutHoraire: s.coutHoraire,
    },
    equipes: POLES.filter((p) => s.poles[p.id]?.actif).map((p) => ({
      pole: p.label,
      collaborateurs: s.poles[p.id].collabs,
      heuresParCollaborateur: s.poles[p.id].heures,
      heuresTotales: s.poles[p.id].collabs * s.poles[p.id].heures,
    })),
    taches: TACHES.filter((t) => (s.taches[t.id] ?? 0) > 0).map((t) => ({
      tache: t.label,
      heuresSemaine: s.taches[t.id],
      tauxAutomatisable: t.auto,
    })),
    contexte: {
      maturite: MATURITES.find((m) => m.id === s.maturite)?.label ?? "",
      donnees: DONNEES.find((d) => d.id === s.donnees)?.label ?? "",
      outils: s.outils,
      objectif: OBJECTIFS.find((o) => o.id === s.objectif)?.label ?? "",
      urgence: URGENCES.find((u) => u.id === s.urgence)?.label ?? "",
      budget: s.budget,
    },
    resultats: {
      score: r.score,
      niveau: r.niveau,
      heuresRepetitivesSemaine: r.heuresRepetitivesSemaine,
      tauxAutomatisation: r.tauxAutomatisation,
      heuresGagneesSemaine: r.heuresGagneesSemaine,
      heuresGagneesAn: r.heuresGagneesAn,
      economieAn: r.economieAn,
      economieMois: r.economieMois,
      etpLiberes: r.etpLiberes,
      joursOuvresAn: r.joursOuvresAn,
      chantiers: r.chantiers.map((ch) => ({
        chantier: ch.tache.chantier,
        solution: ch.tache.solution,
        stack: ch.tache.stack,
        heuresAn: ch.heuresAn,
        economieAn: ch.economieAn,
      })),
    },
    resume,
  };

  /* Web3Forms rend mal les objets imbriqués : on lui envoie donc les
   * champs de qualification à plat, plus le détail en JSON dans un
   * seul champ. La fonction serverless, elle, consomme le payload
   * structuré tel quel. */
  const charge =
    MODE_ENVOI === "serverless"
      ? corps
      : {
          access_key: DIAGNOSTIC_ACCESS_KEY,
          subject: `Diagnostic IA — ${c.societe || `${c.prenom} ${c.nom}`}`,
          from_name: "Diagnostic IA · noesisai.fr",
          // Repris comme adresse de réponse : « Répondre » écrit au prospect.
          email: c.email,
          message: resume,

          prenom: c.prenom,
          nom: c.nom,
          telephone: c.telephone,
          fonction: c.poste,
          societe: c.societe,
          secteur: s.secteur,
          effectif: s.effectif,
          score: `${r.score}/100 — ${r.niveau}`,
          heures_gagnees_par_an: Math.round(r.heuresGagneesAn),
          economie_par_an: Math.round(r.economieAn),
          chantier_prioritaire: r.chantiers[0]?.tache.chantier ?? "—",
          objectif: corps.contexte.objectif,
          urgence: corps.contexte.urgence,
          budget: s.budget || "non renseigné",

          donnees_completes: JSON.stringify(
            {
              entreprise: corps.entreprise,
              equipes: corps.equipes,
              taches: corps.taches,
              contexte: corps.contexte,
              resultats: corps.resultats,
            },
            null,
            2
          ),
        };

  const reponse = await fetch(DIAGNOSTIC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(charge),
  });

  if (!reponse.ok) {
    const detail = await reponse.json().catch(() => null);
    throw new Error(detail?.error ?? `Envoi refusé (${reponse.status})`);
  }

  /* Web3Forms répond 200 même lorsqu'il rejette la soumission :
   * sans ce contrôle, un échec passerait pour un succès. */
  const resultat = await reponse.json().catch(() => null);
  if (resultat && resultat.success === false) {
    throw new Error(resultat.message ?? "Envoi refusé");
  }

  return "webhook";
}
