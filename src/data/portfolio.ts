// =============================================================
//  Portfolio NoesisAI (/portfolio) : page non référencée, hors
//  menu, envoyée en lien direct aux prospects. Contenu repris du
//  portfolio Notion (page « 🏆 Portfolio NoesisAI » et sa base
//  « Réalisations »).
//
//  Mise en forme du texte : **mot** passe en gras.
//  Aucun tiret cadratin (règle du site) : deux-points à la place.
//  Ajouter un cas : une entrée dans CAS_CLIENTS (son slug donne
//  l'adresse /portfolio/<slug>, pré-rendue au build) et son logo
//  dans public/portfolio/logos/.
// =============================================================

export type Statut = "Livré" | "En cours" | "POC";

/** Sous-bloc d'une partie (colonne Notion : « Flow achat », « Workflow 1 »...). */
export type Bloc = { titre: string; texte?: string; points?: string[] };

export type Partie =
  | { type: "texte"; titre: string; texte: string }
  | {
      type: "liste";
      titre: string;
      intro?: string;
      points: string[];
      /** "probleme" : points de douleur ; "resultat" : coches violettes. */
      ton?: "probleme" | "resultat" | "neutre";
    }
  | { type: "blocs"; titre: string; intro?: string; blocs: Bloc[]; numerote?: boolean }
  | { type: "stack"; titre: string; outils: { nom: string; role?: string }[] };

export type CasClient = {
  slug: string;
  nom: string;
  /** Logo recadré dans public/portfolio/logos. fond : couleur de la plaque quand le logo
      n'est pas sur fond blanc ; photo : l'image remplit la plaque (enseigne photographiée) ;
      ratio : largeur / hauteur du fichier, pour donner à chaque logo le même poids visuel. */
  logo?: { src: string; fond?: string; photo?: boolean; ratio?: number };
  resume: string;
  secteur: string;
  pays: string;
  statut: Statut;
  /** Mois de livraison, "AAAA-MM". */
  livraison?: string;
  site?: string;
  services: string[];
  outils: string[];
  parties: Partie[];
  /** Captures d'écran de l'outil livré (déjà publiées sur le site, dans public/projets). */
  captures?: { src: string; alt: string }[];
};

export const PORTFOLIO = {
  badge: "Portfolio NoesisAI",
  titre: "Nos réalisations",
  titreEncadre: "IA",
  titreFin: "pour les PME",
  sousTitre:
    "Agence d'intégration et d'automatisation IA, nous concevons des agents vocaux, des systèmes RAG, des automatisations N8N et des machines de prospection pour les PME en France, en Belgique, en Suisse et au Québec.",
  bienvenue: {
    photo: "/equipe/ugo-sartini.jpg",
    texte: "Bienvenue ! Je suis **Ugo Sartini**, fondateur de NoesisAI",
  },
  cta: "Réserver un appel découverte",
  chiffres: [
    { valeur: "+30", label: "entreprises accompagnées" },
    // le nombre de cas détaillés est calculé à partir de CAS_CLIENTS
    { valeur: "4", label: "marchés francophones" },
  ],
  cas: {
    badge: "Cas clients",
    titre: "Quelques cas clients",
    sousTitre:
      "Des exemples de projets livrés pour nos clients. Cliquez sur un logo pour voir le détail du projet : contexte, problématique, solution et résultats.",
  },
  methode: {
    badge: "Méthode",
    titre: "Notre méthode en",
    accent: "3 étapes",
    etapes: [
      { n: "01", titre: "Audit", texte: "Analyse approfondie de vos processus pour identifier les leviers d'automatisation à plus fort ROI." },
      { n: "02", titre: "POC", texte: "Preuve de concept rapide pour valider la faisabilité technique et l'impact business avant déploiement." },
      { n: "03", titre: "Déploiement", texte: "Mise en production, formation de vos équipes et accompagnement continu." },
    ],
  },
  geographie: ["France", "Belgique", "Suisse", "Québec"],
  expertises: ["Agents vocaux", "RAG", "Automatisation", "Logiciels métier", "Formation IA", "Prospection"],
  final: {
    titre: "Vous avez un projet en tête ?",
    sousTitre: "Réservez votre appel découverte gratuit.",
  },
};

const L = "/portfolio/logos";

// Ordre de la galerie Notion : date de livraison, la plus récente d'abord, puis les cas sans date.
export const CAS_CLIENTS: CasClient[] = [
  {
    slug: "muller-and-comfort",
    nom: "Muller and Comfort",
    logo: { src: `${L}/muller-and-comfort.png`, ratio: 1.21 },
    resume:
      "Application web responsive qui couvre tout le cycle opérationnel, de la création d'un devis assistée par IA jusqu'au suivi de la marge réelle d'un chantier, en passant par la bibliothèque de prix multi-entités, les fiches clients, le pointage des heures et le rattachement des factures fournisseurs.",
    secteur: "BTP",
    pays: "Suisse",
    statut: "Livré",
    livraison: "2026-06",
    site: "https://www.mullerandcomfort.com/",
    services: ["Logiciel métier", "Automatisation N8N"],
    outils: ["Supabase", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Le **Groupe Müller** est une entreprise suisse du bâtiment qui opère **trois marques commerciales distinctes sous une même entité juridique** : **MC (Müller & Confort)**, **MYEXT (My Extérieur)** et **MYINT (My Intérieur)**. Chaque marque a ses propres fournisseurs, ses propres grilles de prix et ses propres chantiers, d'une intervention de 2 heures à un projet de promotion immobilière étalé sur 24 mois.\n\nPour moderniser des processus internes encore largement manuels (devis, bibliothèque de prix, suivi des heures, suivi de chantier), le Groupe Müller a fait appel à NoesisAI pour concevoir et développer **Müller Hub**, une application web responsive qui centralise toute l'activité opérationnelle des trois marques dans un seul outil.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Création de devis **chronophage et dépendante de l'expérience individuelle** des conducteurs de travaux, sans base de prix structurée",
          "Données de prix **éclatées** entre catalogues fournisseurs PDF et fichiers Excel, sans nomenclature commune",
          "**Trois marques à piloter en parallèle**, avec des niveaux de prix différenciés selon la typologie de client (B2B, privé, luxe)",
          "Normes suisses spécifiques à respecter (**codes CFC**) pour la classification des prestations",
          "**Nommage incohérent des chantiers**, source de doublons et d'erreurs de suivi",
          "Saisie des heures et rattachement des factures fournisseurs gérés **hors d'un outil unique**",
          "Besoin d'un outil **souple, qui s'adapte aux méthodes de l'entreprise** plutôt que d'imposer un processus rigide (mauvaise expérience passée avec un logiciel SaaS du marché, jugé trop contraignant)",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        intro:
          "**Müller Hub** : une application web responsive (ordinateur + smartphone), dont **le code et les données appartiennent au client**, hébergée sur une infrastructure cloud européenne.",
        numerote: true,
        blocs: [
          {
            titre: "Bibliothèque de prix multi-entités",
            points: [
              "**1 408 prestations** importées et structurées depuis les catalogues fournisseurs (PDF) du pôle MYEXT, avec une architecture extensible aux deux autres marques",
              "Classification aux **normes suisses (codes CFC)**",
              "**Trois niveaux de prix par article** pour un même libellé, selon la typologie client (B2B, privé, luxe)",
              "Remises fournisseurs négociées appliquées automatiquement",
              "Filtres multicritères (entité, fournisseur, famille) en accordéon",
            ],
          },
          {
            titre: "Génération de devis assistée par IA (voix + texte)",
            points: [
              "Parcours **mobile-first en 3 étapes** : sélection, dictée vocale, résultat",
              "**Décomposition automatique des tâches** : une commande comme « carrelage » génère la liste complète des sous-tâches (dépose, ponçage, préparation, fourniture) selon les standards de l'entreprise",
              "Sélection de l'entité pour appliquer automatiquement la bonne grille de prix",
              "Génération automatique du document de devis",
            ],
          },
          {
            titre: "Suivi des heures chantier",
            points: [
              "Saisie par **plage horaire (début, fin)**, avec répartition possible sur plusieurs chantiers dans une même journée",
              "**Auto-affectation** : l'ouvrier se positionne directement sur un chantier actif",
              "Référence indicative de 42 h par semaine, **sans aucun verrouillage**, une souplesse voulue par le client",
            ],
          },
          {
            titre: "Gestion des factures fournisseurs",
            points: ["Rattachement des factures aux chantiers par **glisser-déposer des PDF**", "Affectation directe des montants en charge"],
          },
          {
            titre: "Suivi de marge",
            points: [
              "Marge **suivie tout au long du chantier** par rapport au prix devisé par le conducteur de travaux (objectif : rester dans l'enveloppe)",
            ],
          },
          {
            titre: "Gestion des chantiers et nomenclature",
            points: [
              "**Nomenclature standardisée générée automatiquement** (préfixe entité, ville, numéro séquentiel) pour éliminer les doublons",
              "Adaptée à une activité très variable, de l'intervention courte au chantier long",
            ],
          },
          { titre: "Gestion clients", points: ["Centralisation des fiches clients, rattachées aux devis et aux chantiers"] },
          { titre: "Tableau de bord KPI", points: ["Vue consolidée multi-entités de l'activité, avec cartes KPI"] },
        ],
      },
      {
        type: "liste",
        titre: "Socle technique et design",
        points: [
          "Base de données, authentification et stockage sur **Supabase (Europe)**, couche d'automatisation **n8n**",
          "**Modèle de coûts maîtrisé** : les clés API des modèles d'IA sont détenues et payées directement par le client",
          "Interface noir et blanc avec accent indigo, **mode sombre** et optimisation mobile",
          "**Manuel d'utilisation intégré** + tutoriels vidéo pour la prise en main",
        ],
      },
    ],
    captures: [
      { src: "/projets/muller-dashboard.webp", alt: "Müller Hub : tableau de bord multi-entités" },
      { src: "/projets/muller-devis.webp", alt: "Müller Hub : devis assisté par IA" },
      { src: "/projets/muller-marge.webp", alt: "Müller Hub : suivi de la marge d'un chantier" },
    ],
  },
  {
    slug: "orpi",
    nom: "Orpi",
    logo: { src: `${L}/orpi.png`, ratio: 1.88 },
    resume:
      "Trois briques livrées pour une agence Orpi franchisée (9 collaborateurs) : automatisation des boîtes mail de toute l'équipe, système de création de contenu pour l'assistante de direction et outil d'analyse SweepBright sur le taux d'occupation et le taux de location du portefeuille.",
    secteur: "Immobilier",
    pays: "France",
    statut: "Livré",
    livraison: "2026-05",
    services: ["Automatisation N8N", "Intégration CRM"],
    outils: ["N8N", "Claude", "SweepBright"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Agence immobilière franchisée **Orpi** regroupant **9 collaborateurs** : assistante commerciale et de direction, conseillers location, gestionnaires locatifs, comptables syndic et agents de négociation transaction. Activité saisonnière marquée et outils morcelés (Joa, KIPS, SweepBright, Google Workspace).",
      },
      {
        type: "blocs",
        titre: "Mission livrée",
        intro: "Trois chantiers d'automatisation déployés en parallèle pour faire gagner du temps à l'équipe et fiabiliser le pilotage commercial.",
        numerote: true,
        blocs: [
          {
            titre: "Automatisation des boîtes mail des 9 collaborateurs",
            texte: "Un système d'orchestration des e-mails entrants pour toute l'équipe :",
            points: [
              "Tri et catégorisation automatiques des mails par typologie (locataires, propriétaires, syndics, prospects transaction)",
              "Routage intelligent vers le bon collaborateur selon le sujet et le dossier",
              "Pré-rédaction de réponses contextualisées pour les sollicitations récurrentes",
              "Suivi des relances et alertes sur les mails restés sans réponse au-delà du délai défini",
            ],
          },
          {
            titre: "Création de contenu automatisée pour l'assistante de direction",
            texte: "Un outil dédié pour industrialiser la production de contenu :",
            points: [
              "Génération assistée des publications réseaux sociaux et des communications internes",
              "Rédaction de fiches biens et de descriptifs dans le ton de l'agence",
              "Modèles dynamiques pour les annonces, les newsletters et les supports commerciaux",
              "Validation humaine avant publication, avec garde-fous éditoriaux",
            ],
          },
          {
            titre: "Analyse des données SweepBright",
            texte: "Connexion au CRM SweepBright et module d'analyse des indicateurs clés du portefeuille locatif et transaction :",
            points: [
              "**Taux d'occupation** des logements en gestion",
              "**Taux de logements loués** par rapport aux disponibles, suivi dans le temps",
              "Délai moyen de mise en location, rotation des locataires",
              "Vue consolidée par typologie de bien, secteur géographique et conseiller",
              "Tableaux de bord rafraîchis automatiquement pour le pilotage hebdomadaire",
            ],
          },
        ],
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "9 boîtes mail automatisées, charge de tri et de qualification fortement réduite",
          "Production de contenu accélérée pour l'assistante de direction",
          "Visibilité en temps réel sur les KPI locatifs, auparavant calculés à la main",
          "Équipe opérationnelle sur les trois briques",
        ],
      },
    ],
  },
  {
    slug: "woodys-camp",
    nom: "Woody's Camp",
    resume:
      "Formation IA flash pour l'équipe de Woody's Camp : montée en compétence rapide sur les usages quotidiens de l'IA générative appliqués à un e-commerce de tentes de toit (rédaction produit, support client, productivité).",
    secteur: "E-commerce",
    pays: "France",
    statut: "Livré",
    livraison: "2026-04",
    site: "https://tente-de-toit.shop",
    services: ["Formation IA"],
    outils: [],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "**Woody's Camp** (tente-de-toit.shop) est un e-commerce spécialisé dans la vente de tentes de toit pour véhicules. Équipe réduite, avec le besoin d'accélérer la prise en main des outils d'IA générative sans alourdir l'organisation.",
      },
      {
        type: "liste",
        titre: "Mission livrée",
        intro: "Une session de **formation IA flash** pour monter l'équipe en compétence sur les usages opérationnels du quotidien :",
        points: [
          "Prompts utiles pour la **rédaction de fiches produit** et de descriptifs SEO",
          "Assistance à la **gestion du support client** (réponses, FAQ, gestion des avis)",
          "Gains de **productivité bureautique** (mails, briefs, synthèses)",
          "Bonnes pratiques et garde-fous (vérification, ton de marque, confidentialité)",
        ],
      },
      {
        type: "texte",
        titre: "Format",
        texte:
          "Un format condensé, orienté pratique, sans surcharge théorique : l'équipe est repartie immédiatement opérationnelle sur les cas d'usage prioritaires.",
      },
    ],
  },
  {
    slug: "val-hainaut-auto",
    nom: "Val Hainaut Auto",
    logo: { src: `${L}/val-hainaut-auto.png`, ratio: 4.78, fond: "#41434d" },
    resume:
      "Solution complète d'automatisation pour un garage de véhicules d'occasion : digitalisation du parcours achat/vente, intégration CERFA, POC Lovable.",
    secteur: "Automobile",
    pays: "France",
    statut: "Livré",
    livraison: "2026-03",
    site: "https://www.valhainautauto.fr",
    services: ["Automatisation N8N", "POC Lovable", "Intégration CRM"],
    outils: ["N8N", "Lovable", "Supabase"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Garage de véhicules d'occasion basé à Valenciennes. L'activité repose sur des processus manuels pour l'achat auprès de particuliers et la revente en concession, avec beaucoup de saisie administrative (CERFA, cartes grises, mandats).",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Perte de temps sur la saisie des documents CERFA pour chaque transaction",
          "Process achat/revente non tracé ni digitalisé",
          "Risque d'erreur sur les pièces administratives",
          "Impossibilité de suivre le pipeline de véhicules (stock, négociation, vendus)",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        blocs: [
          {
            titre: "Flow achat",
            points: [
              "Capture particulier via formulaire intelligent",
              "Pré-remplissage automatique du CERFA",
              "Validation pièces + signature électronique",
              "Enregistrement en base",
            ],
          },
          {
            titre: "Flow revente",
            points: [
              "Publication multi-canal de l'annonce",
              "Qualification des leads entrants",
              "Génération du contrat de vente",
              "Transfert carte grise assisté",
            ],
          },
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "N8N", role: "orchestration des deux workflows" },
          { nom: "Lovable", role: "POC front pour démonstration du parcours client" },
          { nom: "Supabase", role: "base véhicules + transactions" },
          { nom: "Génération CERFA", role: "pré-remplissage PDF automatisé" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats attendus",
        ton: "resultat",
        points: [
          "Gain de temps administratif estimé à plusieurs heures par transaction",
          "Traçabilité complète du cycle de vie véhicule",
          "Expérience client modernisée",
        ],
      },
    ],
  },
  {
    slug: "fastparts",
    nom: "FastParts",
    logo: { src: `${L}/fastparts.jpg`, photo: true },
    resume:
      "Agent vocal dédié à la prise de demandes de pièces détachées : identification du véhicule, recherche de disponibilité, envoi de devis automatisé.",
    secteur: "Pièces détachées auto",
    pays: "Belgique",
    statut: "Livré",
    livraison: "2026-02",
    services: ["Agent vocal IA", "Automatisation N8N"],
    outils: ["Twilio", "OpenAI", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Acteur belge de la pièce détachée automobile. Le volume d'appels entrants (référence, disponibilité, prix) sature les équipes commerciales.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Appels interrompant en permanence le travail commercial",
          "Difficulté à capter les demandes hors horaires",
          "Perte d'opportunités sur des pièces simples à identifier",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        intro: "Agent vocal spécialisé pièces détachées :",
        points: [
          "Identifie marque, modèle et année du véhicule",
          "Qualifie la pièce recherchée",
          "Envoie automatiquement un SMS ou un e-mail de devis",
          "Bascule vers un commercial pour les cas complexes",
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Twilio", role: "ligne téléphonique et webhook" },
          { nom: "OpenAI", role: "compréhension du langage pour identifier le véhicule et la pièce" },
          { nom: "N8N", role: "interrogation du catalogue + envoi du devis" },
        ],
      },
    ],
  },
  {
    slug: "bungazur",
    nom: "Bungazur",
    logo: { src: `${L}/bungazur.png`, ratio: 0.98 },
    resume:
      "Agent vocal IA opéré en souscription mensuelle : prise d'appel, qualification, orientation vers les interlocuteurs humains.",
    secteur: "Services B2B",
    pays: "France",
    statut: "Livré",
    livraison: "2025-11",
    site: "https://www.bungazur.com/",
    services: ["Agent vocal IA"],
    outils: ["Twilio", "OpenAI", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Bungazur cherchait à fluidifier la prise d'appels entrants sans embaucher de standardiste. L'objectif : absorber le volume d'appels, qualifier les demandes et router vers les bons interlocuteurs.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Appels non décrochés pendant les pics d'activité",
          "Temps humain mobilisé sur des appels de premier niveau",
          "Pas de traçabilité des demandes entrantes",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        intro: "Agent vocal IA disponible 24/7 :",
        points: [
          "Décroche automatiquement les appels",
          "Qualifie la demande en conversation naturelle",
          "Route vers le bon interlocuteur ou prend un message structuré",
          "Notifie l'équipe par e-mail ou dans le CRM",
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Twilio", role: "gestion de la ligne téléphonique et routage SIP" },
          { nom: "OpenAI", role: "compréhension conversationnelle" },
          { nom: "N8N", role: "orchestration et post-traitement" },
        ],
      },
      {
        type: "texte",
        titre: "Modèle commercial",
        texte: "Abonnement mensuel récurrent : agent opéré et maintenu par NoesisAI.",
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "100 % des appels pris",
          "Messages qualifiés transmis par e-mail",
          "Baisse significative du temps passé sur les appels de premier niveau",
        ],
      },
    ],
  },
  {
    slug: "homelok",
    nom: "Homelok",
    logo: { src: `${L}/homelok.png`, ratio: 2.69 },
    resume:
      "Machine de prospection Leboncoin automatisée : scraping, qualification, envoi de SMS personnalisés et gestion intelligente des réponses.",
    secteur: "Conciergerie",
    pays: "France",
    statut: "Livré",
    livraison: "2025-10",
    services: ["Prospection Leboncoin", "Automatisation N8N", "Scraping & Enrichissement"],
    outils: ["N8N", "SMS Mode", "Supabase"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Homelok est une conciergerie Airbnb couvrant le sud du Morbihan (Bretagne). L'enjeu : identifier systématiquement les nouveaux propriétaires qui mettent leur bien en location saisonnière sur Leboncoin pour leur proposer une prestation de conciergerie.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Prospection manuelle chronophage sur Leboncoin",
          "Difficulté à différencier les particuliers des professionnels déjà équipés",
          "Réponses aux SMS entrants non structurées et perdues",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        blocs: [
          {
            titre: "Workflow 1 : prospection",
            points: [
              "Scraping des annonces Leboncoin",
              "Filtrage par type de propriétaire et zone géographique",
              "Conversion du format de téléphone",
              "Déduplication via **Supabase**",
              "Envoi des SMS via l'**API SMS Mode**",
            ],
          },
          {
            titre: "Workflow 2 : réponses",
            points: [
              "Réception des réponses SMS",
              "Qualification IA de l'intention",
              "Réponse automatique personnalisée",
              "Escalade vers l'équipe si le prospect est chaud",
            ],
          },
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Scraping Leboncoin" },
          { nom: "N8N", role: "deux workflows séparés (prospection + réponses)" },
          { nom: "SMS Mode", role: "envoi de SMS professionnels" },
          { nom: "Supabase", role: "base de déduplication et historique" },
        ],
      },
      {
        type: "texte",
        titre: "Contractualisation",
        texte: "Contrat de prestation de service signé couvrant la solution LBC Automated Prospecting.",
      },
    ],
  },
  {
    slug: "nrgy-up",
    nom: "NRGY UP",
    logo: { src: `${L}/nrgy-up.png`, ratio: 1.53 },
    resume:
      "Refonte Shopify d'un site e-commerce de bien-être électromagnétique : passage du prototype Replit à Shopify Liquid, design system bleu/blanc.",
    secteur: "Bien-être",
    pays: "France",
    statut: "Livré",
    livraison: "2025-09",
    services: ["Site web / Shopify"],
    outils: ["Shopify"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "NRGY UP est une boutique en ligne spécialisée dans les produits de protection contre les ondes électromagnétiques (bien-être électromagnétique). Besoin d'un site Shopify performant et d'une identité visuelle aboutie.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Prototype initial sur Replit non exploitable en production",
          "Besoin de passer sur Shopify pour la vente",
          "Design system à stabiliser (palette bleu/blanc)",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        points: [
          "Mise en place du design system bleu/blanc",
          "Configuration de **Shopify CLI v3**",
          "Optimisation des pages produit et du tunnel de conversion",
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [{ nom: "Shopify Liquid" }, { nom: "Design system maison" }, { nom: "Shopify CLI v3" }],
      },
    ],
  },
  {
    slug: "isci-international",
    nom: "ISCI International",
    logo: { src: `${L}/isci-international.png`, ratio: 2.03 },
    resume:
      "Plateforme IA pour une ESN québécoise : qualification automatique des demandes clients, matching sur un vivier de 15 000 consultants, préqualification par agent vocal, CRM unifié et veille de marché, le tout hébergé au Canada.",
    secteur: "Tech & Consulting",
    pays: "Québec",
    statut: "Livré",
    livraison: "2025-08",
    services: ["Appels d'offres", "Intégration CRM", "Agent vocal IA"],
    outils: [],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "ISCI International est une **ESN basée au Québec**, spécialisée dans le placement de consultants IT auprès de grandes organisations canadiennes (institutions financières, industriels, secteur public). L'activité repose sur trois flux distincts : la réception des demandes de mission des entreprises clientes, l'alimentation et la qualification d'un **vivier de 15 000 consultants**, et la production de shortlists qualifiées remises aux clients. La structure se transforme : recrutement prochain d'un directeur général, pilotage à distance et ambition d'automatiser **80 % des opérations courantes**.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "**Traitement manuel des demandes clients**, chronophage : chaque mail entrant exige lecture, qualification, recherche dans le vivier et prise de contact des candidats",
          "**Vivier sous-exploité** : sur 15 000 CV, seule une fraction est exploitable en pratique, le reste étant figé dans des PDF non structurés et difficiles à rechercher",
          "**Préqualification téléphonique coûteuse en temps** : vérifier la disponibilité réelle et le taux horaire de plusieurs candidats pour chaque demande mobilise les recruteurs plusieurs heures par dossier",
          "**Suivi commercial fragmenté** : pas de vision unifiée du chiffre d'affaires par client, de l'historique des échanges ni des opportunités d'upsell, et une mémoire perdue dès qu'un recruteur change",
          "**Veille marché manuelle** : aucun mécanisme structuré pour détecter en amont les signaux stratégiques (levées de fonds, projets de transformation, changements de direction chez les comptes clés)",
          "**Contraintes réglementaires fortes** : Loi 25, Charte québécoise, exigences de souveraineté des données ; toute solution doit être conforme dès sa conception, pas en rattrapage",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        numerote: true,
        blocs: [
          {
            titre: "Ingestion et qualification automatique des demandes",
            texte:
              "Connexion à la boîte mail dédiée d'ISCI, **analyse automatique en continu** et classification IA des mails entrants (demande client, candidature, communication interne, etc.). Chaque demande client identifiée crée aussitôt une **opportunité structurée** dans le tableau de bord, avec extraction automatique des éléments clés : poste recherché, compétences, dates, lieu, budget.",
          },
          {
            titre: "Matching IA contre le vivier",
            texte:
              "Analyse IA des 15 000 CV existants : lecture, structuration et notation initiale réalisées en **une seule opération** dès la mise en route. Chaque nouvelle demande est confrontée au vivier qualifié, chaque consultant reçoit un score de pertinence avec une **justification lisible**, et les meilleurs profils sont automatiquement associés à l'opportunité.",
          },
          {
            titre: "Préqualification par agent vocal IA",
            texte:
              "Un agent vocal IA appelle automatiquement le meilleur profil, ou à la demande du recruteur. **Il vérifie la disponibilité réelle et le taux horaire accepté**, transcrit l'échange et structure les réponses. Le candidat peut à tout moment demander à être rappelé par un humain. La shortlist remise au recruteur intègre ainsi les conditions concrètes du candidat, pas seulement son CV.",
          },
          {
            titre: "CRM client unifié avec Kanban des demandes",
            texte:
              "Suivi visuel des demandes clients en Kanban : **Nouvelle demande → Qualifiée → Profils en cours → Shortlist envoyée → En négociation → Gagnée**. Pour chaque client : **historique complet des interactions** (mails, appels, réunions, notes), chiffre d'affaires cumulé et recommandations IA d'opportunités d'upsell. Une mémoire persistante, indépendante du recruteur en charge.",
          },
          {
            titre: "Pipeline ATS candidats en Kanban",
            texte:
              "Une vue Kanban dédiée au suivi des candidatures : **Reçu → Analysé → Préqualifié → Entretien → Présenté → Signé**, avec glisser-déposer et alertes sur les candidats qui stagnent plus de sept jours dans une étape. Le CRM suit les demandes, l'ATS suit les candidats.",
          },
          {
            titre: "Veille de marché automatisée",
            texte:
              "Agrégation continue de **dix sources stratégiques québécoises** (Direction Informatique, Les Affaires, InfoBref Pro Techno, La Presse Affaires Techno, Newswire et les associations TI : AQT, TechnoMontréal, TECHNOCompétences, ADRIQ, AQIII). Classification IA des signaux pertinents (levées de fonds, transformations numériques, changements de direction, nouveaux projets) avec un score de pertinence. Une opportunité commerciale se crée directement depuis un signal détecté.",
          },
          {
            titre: "Hébergement souverain et conformité réglementaire",
            texte:
              "Architecture entièrement déployée sur une **infrastructure canadienne** (région Canada Central), avec sécurité native : chiffrement, authentification par lien magique, journal d'audit, suppression sécurisée. **Conformité Loi 25 dès la conception** : décision finale du recruteur sur les choix critiques, démarche anti-biais explicitée, évaluation des facteurs relatifs à la vie privée (EFVP) et politique de confidentialité fournies à ISCI.",
          },
        ],
      },
    ],
  },
  {
    slug: "bt-propre",
    nom: "BT Propre",
    logo: { src: `${L}/bt-propre.png`, ratio: 1.25 },
    resume:
      "Solution complète de réponse aux appels d'offres pour une société de nettoyage B2B industriel : sourcing, notation go/no-go et rédaction automatisée du mémoire technique via RAG.",
    secteur: "Services B2B",
    pays: "France",
    statut: "Livré",
    services: ["Appels d'offres", "RAG", "Automatisation N8N"],
    outils: ["N8N", "Supabase", "OpenAI", "Claude"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "BT Propre est une société de **nettoyage B2B industriel** qui répond régulièrement à des appels d'offres publics et privés. Le travail de veille, de qualification et surtout de rédaction des mémoires techniques représente une charge considérable pour l'équipe commerciale.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Sourcing manuel des appels d'offres chronophage, avec le risque de manquer des opportunités pertinentes",
          "Difficulté à prioriser : tous les appels d'offres ne valent pas l'investissement en temps",
          "Rédaction du **mémoire technique** très longue, qui mobilise plusieurs personnes pendant plusieurs jours",
          "Capitalisation limitée sur les réponses précédentes (chaque mémoire repart quasiment de zéro)",
          "Délais de réponse serrés, incompatibles avec une rédaction 100 % manuelle",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        numerote: true,
        blocs: [
          {
            titre: "Sourcing automatisé",
            texte:
              "Veille continue sur les plateformes d'appels d'offres pertinentes pour le nettoyage industriel. Remontée quotidienne des opportunités, filtrées par géographie, montant et typologie.",
          },
          {
            titre: "Notation et go / no-go",
            texte:
              "Scoring automatique de chaque appel d'offres selon les critères de BT Propre (zone d'intervention, taille du marché, adéquation métier, concurrence probable). Recommandation **go / no-go** en un coup d'œil.",
          },
          {
            titre: "Rédaction automatisée du mémoire technique",
            texte:
              "Système **RAG** entraîné sur le corpus de BT Propre (mémoires précédents, certifications, références clients, procédures HSE). À partir du DCE ou du CCTP de l'appel d'offres :",
            points: [
              "Extraction automatique des exigences et des critères d'évaluation",
              "Génération d'un premier jet de mémoire technique structuré",
              "Intégration dynamique des références clients et des certifications pertinentes",
              "L'équipe n'a plus qu'à relire, personnaliser et valider, au lieu de rédiger de zéro",
            ],
          },
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "N8N", role: "orchestration des workflows (sourcing, scoring, génération)" },
          { nom: "Supabase pgvector", role: "vectorisation du corpus de BT Propre pour le RAG" },
          { nom: "OpenAI et Claude", role: "analyse des DCE et rédaction assistée" },
          { nom: "Connecteurs", role: "vers les plateformes d'appels d'offres" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "Aucune opportunité pertinente manquée sur les plateformes surveillées",
          "Décision go / no-go en quelques minutes au lieu de plusieurs heures",
          "Temps de rédaction du mémoire technique nettement réduit",
          "Qualité de réponse homogène, nourrie par l'historique de l'entreprise",
          "Capacité à répondre à davantage d'appels d'offres avec la même équipe",
        ],
      },
    ],
  },
  {
    slug: "ho-hio-hen-automobile",
    nom: "Ho Hio Hen Automobile",
    logo: { src: `${L}/ho-hio-hen-automobile.png`, ratio: 3.46 },
    resume:
      "POC d'agent vocal réceptionniste pour une concession martiniquaise, avec une logique d'upsell sur les services après-vente.",
    secteur: "Automobile",
    pays: "Martinique",
    statut: "Livré",
    services: ["Agent vocal IA"],
    outils: ["Twilio", "OpenAI", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Concession automobile en Martinique. Besoin d'un agent vocal pour absorber le flux d'appels et proposer intelligemment des services additionnels (entretien, garantie étendue, assurance).",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Appels majoritairement liés au SAV et à la prise de rendez-vous atelier",
          "Pas de capitalisation commerciale sur ces interactions",
        ],
      },
      {
        type: "texte",
        titre: "Solution proposée",
        texte:
          "Un agent vocal qui, après avoir qualifié la demande principale, propose des services additionnels pertinents, adaptés au profil du véhicule du client.",
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [{ nom: "Twilio" }, { nom: "OpenAI" }, { nom: "N8N" }],
      },
    ],
  },
  {
    slug: "shoptacrea",
    nom: "ShopTaCréa",
    logo: { src: `${L}/shoptacrea.png`, ratio: 4.21, fond: "#000000" },
    resume:
      "Refonte complète du site internet et automatisation des e-mails (relances, transactionnels, suivis commerciaux).",
    secteur: "E-commerce",
    pays: "France",
    statut: "Livré",
    services: ["Site web / Shopify", "Automatisation N8N"],
    outils: ["N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "ShopTaCréa avait un site internet vieillissant, peu performant en conversion et sans logique d'automatisation autour des e-mails transactionnels et commerciaux. L'enjeu : moderniser la vitrine digitale et fluidifier toute la communication client.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Site vieillissant, peu performant sur mobile et en conversion",
          "Communications e-mail entièrement manuelles (relances, confirmations, suivis)",
          "Perte de temps quotidienne sur des tâches répétitives",
          "Pas de scénarios automatisés pour faire mûrir les prospects",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        blocs: [
          {
            titre: "Refonte du site",
            points: [
              "Nouvelle identité visuelle",
              "Architecture de l'information revue",
              "Optimisation mobile",
              "Tunnel de conversion clarifié",
            ],
          },
          {
            titre: "Automatisation des e-mails",
            points: [
              "Scénarios de relance automatisés",
              "E-mails transactionnels déclenchés par événement",
              "Séquences de suivi commercial",
              "Personnalisation dynamique",
            ],
          },
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Refonte web et intégration" },
          { nom: "N8N", role: "orchestration des flux d'e-mails automatisés" },
          { nom: "Connexion aux outils métier du client" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "Site moderne, performant et orienté conversion",
          "Communications e-mail automatisées de bout en bout",
          "Gain de temps quotidien pour l'équipe",
        ],
      },
    ],
  },
  {
    slug: "la-maison-du-pret",
    nom: "La Maison du Prêt",
    logo: { src: `${L}/la-maison-du-pret.png`, ratio: 4.35 },
    resume:
      "Agent vocal IA activé hors horaires pour absorber les demandes de crédit entrantes et créer automatiquement les fiches prospects dans le CRM.",
    secteur: "Assurance",
    pays: "Belgique",
    statut: "Livré",
    services: ["Agent vocal IA", "Intégration CRM", "Automatisation N8N"],
    outils: ["Twilio", "ElevenLabs", "OpenAI", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "La Maison du Prêt est une société de **crédit et d'assurance** qui reçoit un flux continu de demandes de crédit par téléphone. Une partie significative de ces demandes arrive **en dehors des heures d'ouverture**, sans qu'aucune équipe ne soit disponible pour les traiter.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Demandes de crédit perdues hors horaires (soir, week-end, jours fériés)",
          "Impossible de qualifier un lead chaud à 22 h ou le dimanche",
          "Concurrence élevée sur le marché du crédit : le premier qui rappelle gagne souvent le dossier",
          "Saisie manuelle chronophage des données prospects dans le CRM",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        intro: "Agent vocal IA activé **pendant les heures de fermeture**, directement connecté au CRM :",
        points: [
          "Décroche tous les appels hors horaires",
          "Qualifie la demande de crédit (montant, objet, situation professionnelle, etc.)",
          "Recueille les coordonnées du prospect",
          "**Crée automatiquement la fiche prospect dans le CRM**",
          "Notifie l'équipe pour un rappel prioritaire à l'ouverture",
          "Envoie un e-mail ou un SMS de confirmation au prospect",
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Twilio", role: "ligne téléphonique et routage SIP" },
          { nom: "ElevenLabs", role: "voix naturelle francophone" },
          { nom: "OpenAI", role: "compréhension conversationnelle et extraction des critères de qualification" },
          { nom: "N8N", role: "orchestration et intégration CRM" },
          { nom: "Connecteur CRM", role: "création automatique des fiches prospects" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "Zéro demande de crédit perdue hors horaires",
          "Des leads qualifiés prêts à l'ouverture chaque matin",
          "Gain de réactivité face à la concurrence",
          "Plus de saisie manuelle : tout arrive directement dans le CRM",
        ],
      },
    ],
  },
  {
    slug: "asg-domotique",
    nom: "ASG Domotique",
    logo: { src: `${L}/asg-domotique.png`, ratio: 2.82 },
    resume: "Agent vocal IA pour le SAV et la prise de devis, intégré à Pennylane et Monday.",
    secteur: "BTP",
    pays: "France",
    statut: "En cours",
    services: ["Agent vocal IA", "Intégration CRM", "Automatisation N8N"],
    outils: ["N8N", "Pennylane", "Monday"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "ASG Domotique est spécialisée dans **l'installation de bornes de recharge pour véhicules électriques, la domotique et la sécurité**. L'équipe opérationnelle est réduite (3 personnes) et une partie du travail terrain est confiée à des sous-traitants. L'entreprise reçoit en continu des **appels de SAV et des demandes de devis**, dont une partie arrive pendant les interventions, les week-ends ou les absences, sans personne pour décrocher.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Appels SAV et demandes de devis perdus hors disponibilité (soir, week-end, interventions terrain)",
          "Équipe réduite : impossible de décrocher tout en étant sur le terrain",
          "Saisie manuelle chronophage et exports de données entre les outils (notamment depuis Esabora)",
          "Suivi des devis et des factures éclaté entre plusieurs plateformes",
          "Devis dormants jamais relancés, faute de temps administratif",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        intro: "Agent vocal IA activé **pendant les périodes d'indisponibilité**, connecté aux outils de gestion :",
        points: [
          "Décroche les appels entrants hors disponibilité",
          "Trie la demande : SAV ou demande de devis",
          "Pour le SAV, guide le client sur les pannes courantes (la majorité des cas se résolvent par téléphone avec des instructions simples)",
          "Recueille les coordonnées et qualifie la demande",
          "**Crée automatiquement le ticket dans Monday**",
          "**Pré-remplit le devis correspondant dans Pennylane**",
          "Synchronise les statuts des devis et factures entre Pennylane et Monday de façon quasi instantanée",
          "Automatise la prise de rendez-vous (SMS + synchronisation Google Agenda)",
        ],
      },
    ],
  },
  {
    slug: "moorea-bnb",
    nom: "Moorea B&B",
    resume:
      "Agent vocal IA connecté au PMS Cloudbeds pour une conciergerie Airbnb en Polynésie française : prise d'appel 24/7, disponibilités et réservations en temps réel.",
    secteur: "Conciergerie",
    pays: "Polynésie française",
    statut: "POC",
    services: ["Agent vocal IA", "Intégration CRM", "Automatisation N8N"],
    outils: ["Cloudbeds", "Twilio", "OpenAI", "N8N"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Moorea B&B est une conciergerie Airbnb basée en **Polynésie française** (île de Moorea). Elle gère un parc de logements via le PMS **Cloudbeds** et reçoit un flux constant d'appels pour la disponibilité, la réservation, les arrivées tardives et les questions pratiques pendant les séjours.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Décalage horaire important avec les marchés émetteurs (Europe, Amérique du Nord)",
          "Appels entrants difficiles à absorber sans équipe de nuit",
          "Disponibilités et tarifs à vérifier manuellement dans Cloudbeds à chaque appel",
          "Réservations perdues sur des appels non décrochés ou mal qualifiés",
        ],
      },
      {
        type: "liste",
        titre: "Solution déployée",
        intro: "Agent vocal IA connecté au PMS **Cloudbeds** en temps réel :",
        points: [
          "Réception automatique 24/7 de tous les appels entrants",
          "Interrogation directe de Cloudbeds pour les disponibilités, les tarifs et les informations logements",
          "Qualification de la demande (réservation, SAV séjour, informations pratiques)",
          "Prise d'une pré-réservation ou transmission d'un lead qualifié à l'équipe",
          "Escalade vers un interlocuteur humain pour les cas complexes",
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "Cloudbeds", role: "intégration API au PMS (disponibilités, tarifs, réservations)" },
          { nom: "Twilio", role: "ligne téléphonique et routage SIP" },
          { nom: "OpenAI", role: "compréhension conversationnelle" },
          { nom: "N8N", role: "orchestration, journalisation et transmission des leads" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats attendus",
        ton: "resultat",
        points: [
          "100 % des appels pris, quelle que soit l'heure",
          "Des informations toujours à jour (Cloudbeds reste la source de vérité)",
          "Moins de réservations perdues à cause du décalage horaire",
          "Du temps libéré pour l'équipe sur les tâches à forte valeur ajoutée",
        ],
      },
    ],
  },
  {
    slug: "werma",
    nom: "WERMA",
    logo: { src: `${L}/werma.png`, ratio: 5.93 },
    resume:
      "Proposition de 3 processus LinkedIn : prospection ICP, monitoring stratégique de comptes clés, production de contenu automatisée.",
    secteur: "Industrie",
    pays: "France",
    statut: "En cours",
    services: ["Prospection LinkedIn", "Scraping & Enrichissement", "Automatisation N8N"],
    outils: ["Unipile", "Dropcontact", "N8N", "Telegram"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "WERMA est un acteur industriel pour lequel NoesisAI a conçu une proposition commerciale couvrant **trois processus d'automatisation LinkedIn**, préparée pour le rendez-vous de second tour.",
      },
      {
        type: "blocs",
        titre: "Processus proposés",
        numerote: true,
        blocs: [
          { titre: "Prospection ICP", texte: "Identification et qualification automatisées des comptes cibles sur Sales Navigator." },
          { titre: "Monitoring stratégique", texte: "Surveillance continue des comptes clés : mouvements, publications, recrutements." },
          { titre: "Production de contenu", texte: "Production et planification automatisées des posts LinkedIn via un bot Telegram." },
        ],
      },
      {
        type: "stack",
        titre: "Stack proposée",
        outils: [
          { nom: "Unipile", role: "scraping de Sales Navigator (conforme RGPD pour le marché français)" },
          { nom: "Dropcontact", role: "enrichissement des e-mails B2B" },
          { nom: "N8N", role: "orchestration des trois workflows" },
          { nom: "Bot Telegram", role: "interface de production de contenu" },
        ],
      },
    ],
  },
  {
    slug: "ccmn-etchart",
    nom: "CCMN Etchart",
    logo: { src: `${L}/ccmn-etchart.png`, ratio: 0.89 },
    resume:
      "Solution d'automatisation 4-en-1 pour une société du BTP : suivi de chantier, extraction des factures, génération des devis et traitement des notes de frais.",
    secteur: "BTP",
    pays: "France",
    statut: "Livré",
    services: ["Automatisation N8N", "Scraping & Enrichissement", "Intégration CRM"],
    outils: ["N8N", "OpenAI", "Claude", "Supabase"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "CCMN Etchart est une société du **secteur du BTP** confrontée à une charge administrative élevée : suivi opérationnel des chantiers, traitement des factures fournisseurs, production de devis et gestion des notes de frais des équipes terrain.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Suivi de chantier dispersé entre plusieurs outils, peu de visibilité consolidée en temps réel",
          "Saisie manuelle des factures fournisseurs, chronophage et source d'erreurs",
          "Production de devis lente : récupération des prix, mise en forme, envoi au client",
          "Notes de frais des équipes terrain collectées sur papier ou en photo, puis ressaisies à la main",
          "Du temps administratif qui mobilise des ressources sur des tâches à faible valeur ajoutée",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        numerote: true,
        blocs: [
          {
            titre: "Suivi de chantier automatisé",
            points: [
              "Centralisation des données chantier dans un hub unique",
              "Remontée automatique des indicateurs clés (avancement, équipes affectées, événements)",
              "Notifications automatiques aux bonnes personnes (conducteur de travaux, direction) selon les seuils définis",
              "Reporting consolidé généré automatiquement",
            ],
          },
          {
            titre: "Extraction automatique des factures",
            points: [
              "Réception des factures fournisseurs (e-mail, envoi de fichier, scan)",
              "**OCR et extraction IA** des données clés : fournisseur, montants HT/TTC, TVA, date, numéro, lignes",
              "Rapprochement automatique avec le chantier concerné",
              "Injection directe dans l'outil comptable, sans ressaisie",
            ],
          },
          {
            titre: "Génération automatisée des devis",
            points: [
              "Brief du devis via un formulaire ou un message structuré",
              "Construction automatique du devis à partir des bases de prix et des modèles de CCMN Etchart",
              "Génération du PDF final aux couleurs de l'entreprise",
              "Envoi automatisé au client + suivi de la signature",
            ],
          },
          {
            titre: "Tickets et notes de frais automatisés",
            points: [
              "Prise en photo du ticket par l'équipe terrain",
              "**OCR + IA** : extraction du montant, de la date, du commerçant et de la catégorie",
              "Rattachement automatique au chantier ou au collaborateur",
              "Validation simplifiée par le manager",
              "Intégration directe dans le workflow comptable",
            ],
          },
        ],
      },
      {
        type: "stack",
        titre: "Stack technique",
        outils: [
          { nom: "N8N", role: "orchestration de l'ensemble des workflows" },
          { nom: "OpenAI / Claude", role: "extraction intelligente des données (factures, tickets, briefs de devis)" },
          { nom: "Supabase", role: "base de données centralisée (chantiers, factures, devis, notes de frais)" },
          { nom: "Connecteurs", role: "vers les outils comptables et de gestion existants" },
          { nom: "Interface mobile", role: "saisie terrain (photos de tickets et de factures)" },
        ],
      },
      {
        type: "liste",
        titre: "Résultats",
        ton: "resultat",
        points: [
          "Réduction significative du temps administratif sur les quatre processus",
          "Fin de la ressaisie manuelle des factures et des tickets",
          "Délai de production des devis divisé",
          "Visibilité en temps réel sur l'activité des chantiers",
          "Équipes terrain libérées de la charge administrative",
        ],
      },
    ],
  },
  {
    slug: "cci-paris",
    nom: "CCI Paris",
    logo: { src: `${L}/cci-paris.png`, ratio: 4.0, fond: "#373cf5" },
    resume:
      "Une journée complète de formation à l'IA en usage professionnel pour 50 à 60 dirigeants et collaborateurs d'entreprises adhérentes : choix des outils, méthode de prompting, fonctionnalités avancées et ateliers sur cas réels.",
    secteur: "Formation",
    pays: "France",
    statut: "Livré",
    services: ["Formation IA", "Prompting", "Claude"],
    outils: ["Claude", "ChatGPT", "Gemini"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "La Chambre de commerce et d'industrie de Paris accompagne les entrepreneurs et dirigeants de PME franciliennes dans leur **montée en compétence sur le numérique et l'intelligence artificielle**. Face à l'adoption massive mais souvent superficielle des IA génératives (Claude, ChatGPT, Gemini) chez ses adhérents, la CCI a fait appel à NoesisAI pour concevoir et animer **une journée de formation complète dédiée à l'usage professionnel de l'IA**.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Adoption massive des IA génératives chez les dirigeants et les collaborateurs, mais un usage limité à 10 à 20 % du potentiel réel des outils",
          "Résultats jugés « génériques » ou « robotiques », faute de méthode de prompting structurée",
          "Confusion entre les modèles disponibles : difficile de choisir l'outil adapté à chaque tâche (Claude, ChatGPT, Gemini)",
          "Méconnaissance des fonctionnalités avancées qui changent vraiment la productivité (Projects, Styles, Artifacts, Skills)",
          "Absence de cadre concret pour intégrer l'IA dans les processus métier au quotidien",
          "Besoin de passer d'une utilisation ponctuelle et frustrante à une utilisation systématique et productive",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        numerote: true,
        blocs: [
          {
            titre: "Journée complète « L'IA en usage professionnel »",
            points: [
              "**Format** : une journée de formation de **7 heures** en présentiel, qui alterne théorie, démonstrations en direct et ateliers pratiques",
              "**Public** : 50 à 60 dirigeants, entrepreneurs et collaborateurs d'entreprises adhérentes à la CCI Paris",
              "Approche progressive : panorama de l'écosystème IA, méthode de prompting, fonctionnalités avancées, puis mise en pratique sur des cas métiers réels",
            ],
          },
          {
            titre: "Panorama et choix des outils IA",
            points: [
              "Présentation comparative des principaux modèles du marché (Claude, ChatGPT, Gemini) et de leurs spécificités",
              "Grille de décision pour choisir l'outil adapté à la tâche (rédaction, analyse, recherche, création, code)",
              "Tour d'horizon des cas d'usage prioritaires en contexte professionnel : prospection, synthèse, rédaction, analyse, brainstorming",
            ],
          },
          {
            titre: "Maîtrise du prompting par le Context Engineering",
            points: [
              "Module dédié à **la méthode du Context Engineering**, structurée autour de 6 principes universels (clarté, contexte, rôle, exemples, structure, itération)",
              "Démonstrations en direct : un prompt faible transformé en brief professionnel structuré",
              "La règle des 80/20 comme repère : la qualité du résultat dépend à 80 % du contexte fourni",
            ],
          },
          {
            titre: "Fonctionnalités avancées et automatisations",
            points: [
              "Configuration des **Projects** Claude pour garder le contexte par client, par dossier ou par tâche récurrente",
              "Mise en place des **préférences de profil** et des **Styles** pour personnaliser durablement les réponses",
              "Présentation des **Artifacts** comme outil de production immédiate (mémos, tableaux de bord, scripts)",
              "Introduction aux **Skills** pour les utilisateurs avancés",
            ],
          },
          {
            titre: "Ateliers pratiques sur cas métiers",
            points: [
              "Chaque participant travaille sur **un cas concret tiré de son quotidien professionnel**",
              "Application directe de la méthode sur un livrable réel (e-mail de prospection, synthèse de réunion, analyse, post LinkedIn, etc.)",
              "Restitution collective avec comparaison avant/après pour ancrer l'apprentissage",
            ],
          },
          {
            titre: "Ressources opérationnelles fournies",
            points: [
              "**Pack de 250 prompts sectoriels** prêts à l'emploi, conçus avec la méthode du Context Engineering",
              "Trois ressources de référence : le cours interactif d'Anthropic, la documentation officielle « Prompting Best Practices » et un guide du Context Engineering",
              "Support de session complet et e-mail de suivi avec tous les liens d'accès",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sygma-france",
    nom: "Sygma France",
    logo: { src: `${L}/sygma-france.png`, ratio: 1.46 },
    resume:
      "Direction technique virtuelle pour une société de conseil d'une cinquantaine de collaborateurs : coaching de 12 heures sur l'écosystème Claude, puis automatisation souveraine des processus internes.",
    secteur: "Tech & Consulting",
    pays: "France",
    statut: "Livré",
    site: "https://sygma.link/fr/sygma-france-bureaux-etudes/",
    services: ["Prompting", "Claude", "Agent IA"],
    outils: ["Claude", "N8N", "Microsoft Presidio"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Sygma France est une société de conseil (filiale, environ 50 collaborateurs et 5 M€ de chiffre d'affaires) positionnée sur des marchés de niche, notamment les télécoms. L'entreprise utilise déjà des licences **Claude Team** pour des tâches simples, mais son directeur général veut franchir un cap : passer d'un usage ponctuel de l'IA à un **déploiement systématique**, puis industrialiser l'automatisation de ses processus, le tout sous une **forte contrainte de souveraineté des données**.\n\nFaute de ressource technique interne dédiée, Sygma France a fait appel à NoesisAI comme **partenaire technique de bout en bout** (« direction technique virtuelle »), et non comme simple fournisseur d'outils.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "**Usage de l'IA encore ponctuel** : les licences Claude Team servent à des tâches basiques, loin du potentiel réel de l'écosystème",
          "**Écosystème Claude mal maîtrisé** (Cowork, Team, Skills, Plugins) et **5 licences Team non consolidées** sous une organisation unique",
          "**Besoin d'automatiser les processus internes** (administratifs, commerciaux, sourcing RH) avec des outils **déterministes**, pour traiter de gros volumes sans risque d'hallucination",
          "**Exigence de souveraineté** : les données sensibles (RH, paie, clients) ne doivent pas dépendre uniquement d'outils cloud américains",
          "**Pas d'expertise technique ni cybersécurité en interne**, d'où le besoin de déléguer l'administration de la pile technologique tout en gardant la réversibilité",
          "**Échéance opérationnelle** : troisième trimestre 2026 (objectif fin août)",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        intro: "Une approche structurée en **deux phases**.",
        blocs: [
          {
            titre: "Phase 1 : acculturation et montée en compétence sur l'écosystème Claude",
            points: [
              "Pack de **coaching de 12 heures** dédié à l'écosystème Claude",
              "Première session avec le directeur général et 5 utilisateurs : prise en main de **Claude Cowork en mode Team** et **consolidation des comptes et abonnements** sous une organisation unique (Domain Capture)",
              "Programme : Skills, plugins, méthode de prompting structuré et intégration de l'IA dans les processus métier",
              "Objectif : rendre les équipes **autonomes au quotidien**",
            ],
          },
          {
            titre: "Phase 2 : industrialisation et automatisation souveraine (en cours de cadrage)",
            points: [
              "Orchestration des automatisations avec **N8N auto-hébergé sur une infrastructure européenne**",
              "**Anonymisation locale** des données sensibles (Microsoft Presidio) en amont des traitements",
              "Architecture pensée pour la **souveraineté et la réversibilité**",
              "Modèle économique : **forfait de développement + abonnement de maintenance** (maintien en condition opérationnelle, mises à jour, support)",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "laboratoire-cosderma",
    nom: "Laboratoire Cosderma",
    logo: { src: `${L}/laboratoire-cosderma.png`, ratio: 3.76 },
    resume:
      "Architecture d'IA 100 % souveraine, hébergée sur place, qui automatise la chaîne documentaire d'un laboratoire d'essais cosmétiques, de l'analyse de la demande client jusqu'au rapport d'étude final.",
    secteur: "Pharma",
    pays: "France",
    statut: "Livré",
    site: "https://cosderma.com/",
    services: ["RAG", "Automatisation N8N"],
    outils: ["N8N", "Mistral / Llama", "Docker", "Pennylane"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "**Cosderma** est un laboratoire d'essais cosmétiques basé à Bordeaux, avec une activité internationale (Chine). Depuis plus de 20 ans, il réalise des tests d'efficacité de produits cosmétiques pour de grands acteurs de la cosmétique : mesures instrumentales et scorages cliniques sur volontaires, encadrés par une documentation très standardisée et les bonnes pratiques cliniques. Face à un volume documentaire considérable et à des tâches répétitives à faible valeur ajoutée, le laboratoire a fait appel à NoesisAI pour concevoir une architecture d'intelligence artificielle **100 % souveraine** (hébergée sur place), capable d'automatiser sa chaîne documentaire, de l'analyse de la demande client jusqu'au rapport d'étude final.",
      },
      {
        type: "liste",
        titre: "Problématique",
        ton: "probleme",
        points: [
          "Chaîne documentaire entièrement manuelle : la rédaction des protocoles d'étude, la synthèse statistique et les rapports finaux (jusqu'à 300 pages) mobilisent un temps considérable",
          "Forte source d'erreurs dans le report manuel des données statistiques (copier-coller entre les sorties SPSS et les tableaux Word)",
          "Analyse des demandes clients chronophage, sans détection automatique des incohérences scientifiques ni des informations manquantes",
          "Expertise métier (20 ans de savoir-faire) non capitalisée dans un système interrogeable",
          "Contrainte de confidentialité absolue : les données clients et les résultats ne peuvent transiter par aucun service cloud tiers",
          "Besoin de fiabilité maximale : aucune sortie ne quitte le laboratoire sans validation humaine",
        ],
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        numerote: true,
        blocs: [
          {
            titre: "Architecture RAG souveraine, le socle du projet",
            points: [
              "Base de connaissances structurée en 6 bases distinctes (référentiel des techniques, briques de protocoles, CRM technique par promoteur, dictionnaire de correspondance statistique, règles métier, procédures qualité)",
              "Ingestion avec gestion stricte des versions : seules les versions « Master » à jour alimentent la génération, les archives de plus de 5 ans sont exclues",
              "Recherche hybride (vectorielle + mots-clés + filtres par métadonnées) pour une récupération précise et sans hallucination",
            ],
          },
          {
            titre: "Analyse des demandes et devis",
            points: [
              "Ingestion multicanal (mail, PDF formalisé, Excel) et extraction structurée",
              "« Filtre Expertise » : détection automatique des incohérences scientifiques (par exemple une tranche d'âge inadaptée à un test antirides) et des champs manquants",
              "Pré-remplissage automatisé des devis par API (Pennylane)",
            ],
          },
          {
            titre: "Génération du protocole d'étude, la brique prioritaire",
            points: [
              "Assemblage automatique des protocoles à partir de la matrice unique, personnalisés par promoteur",
              "Formatage Word rigoureusement conservé et validation humaine systématique",
            ],
          },
          {
            titre: "Post-étude : statistiques et rapport final",
            points: [
              "Rapprochement automatique et déterministe des données SPSS (fin des erreurs de report manuel)",
              "Génération de la synthèse statistique et compilation du rapport final (traduction, mise en forme, annexes)",
            ],
          },
          {
            titre: "Stack « boîte noire » 100 % sur site",
            points: [
              "LLM open source local (Mistral / Llama), base vectorielle, orchestration n8n, le tout conteneurisé (Docker)",
              "Garanties de sécurité : isolation réseau totale, modèle sans état, chiffrement, traçabilité complète et gestion des accès par rôles (RBAC), pour une conformité RGPD renforcée",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "odas-conseil",
    nom: "ŌDAS Conseil",
    logo: { src: `${L}/odas-conseil.png`, ratio: 3.85 },
    resume:
      "Application de recrutement en deux blocs : compte rendu d'entretien automatisé depuis Ringover vers Jarvi, et diffusion ciblée des CV aux cabinets clients.",
    secteur: "Cabinet de placement",
    pays: "France",
    statut: "En cours",
    site: "https://odas-conseil.fr",
    services: ["Logiciel métier", "Automatisation"],
    outils: ["Ringover", "Jarvi"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "ŌDAS Conseil est un cabinet de recrutement. Deux tâches occupent une grande partie du temps des équipes : la rédaction des comptes rendus d'entretien après chaque appel candidat, et la diffusion des CV vers les cabinets clients, qui suppose de croiser la mobilité du candidat avec la base clients et d'appliquer les règles propres à chaque cabinet.",
      },
      {
        type: "blocs",
        titre: "L'application démontrée",
        blocs: [
          {
            titre: "Bloc 1 : le compte rendu d'entretien",
            texte:
              "La chargée de recrutement passe son appel exactement comme aujourd'hui. Ringover transcrit, et le compte rendu se génère directement **dans la trame d'ŌDAS**. Elle le relit et le valide, puis il repart automatiquement vers la fiche Jarvi, bascule le statut en « entretien réalisé » et remonte à l'associé qui avait transmis le profil.",
          },
          {
            titre: "Bloc 2 : la diffusion des CV",
            texte:
              "Un CV est déposé dans l'application. Elle en extrait le profil, croise la **zone de mobilité** avec la base clients et propose les cabinets concernés. Les mails sont déjà rédigés, avec la bonne version du CV en pièce jointe et les **règles propres à chaque cabinet** appliquées : cabinets en pause, ton employé, bon interlocuteur.",
          },
        ],
      },
      {
        type: "liste",
        titre: "Principes de conception",
        ton: "resultat",
        points: ["Aucune donnée réelle utilisée dans la démo", "**Aucun envoi sans validation humaine**, à aucune étape du parcours"],
      },
    ],
    captures: [
      { src: "/projets/odas-diffusion.webp", alt: "Application ŌDAS : diffusion ciblée d'un CV aux cabinets clients" },
      { src: "/projets/odas-vue.webp", alt: "Application ŌDAS : vue d'ensemble" },
    ],
  },
  {
    slug: "opmobility",
    nom: "OPmobility",
    logo: { src: `${L}/opmobility.png`, ratio: 3.24 },
    resume:
      "Accompagnement individuel du directeur financier sur Claude : Projects, Skills et automatisation de ses reportings et de ses analyses de coûts.",
    secteur: "Automobile",
    pays: "France",
    statut: "Livré",
    services: ["Claude", "Prompting"],
    outils: ["Claude", "Excel", "Microsoft 365"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "OPmobility (ex-Plastic Omnium) est un équipementier automobile. Son **directeur financier** pilote un périmètre à forte composante Turquie : ses sujets d'analyse tournent autour des taux de change, de l'inflation locale et des droits de douane à l'import.\n\nIl produisait ses reportings et ses analyses de coûts à la main, à partir d'extractions et de fichiers Excel, et a sollicité NoesisAI pour un **accompagnement individuel sur Claude**, orienté vers l'automatisation de ses tâches financières récurrentes.",
      },
      {
        type: "liste",
        titre: "Format de l'accompagnement",
        points: [
          "Accompagnement **individuel**, en visio, sur un format condensé de deux semaines (du 10 au 23 août 2026)",
          "Sessions de **1 h 30** en début de matinée, à la demande du client",
          "Chaque séance enregistrée et partagée, suivie d'un récapitulatif écrit avec les actions à mener avant la séance suivante",
        ],
      },
      {
        type: "blocs",
        titre: "Ce qui a été mis en place",
        numerote: true,
        blocs: [
          {
            titre: "Cadrage des cas d'usage prioritaires",
            texte: "Quatre chantiers identifiés et priorisés avec lui :",
            points: [
              "**Reportings quotidiens et hebdomadaires** : chiffre d'affaires, volumes et temps de production",
              "**Analyse mensuelle des données d'achat** : suivi de l'évolution des prix et de leur impact sur les coûts",
              "**Veille économique** : taux de change et inflation en Turquie, lecture des facteurs et des prévisions",
              "**Optimisation des droits de douane** : analyse des données transitaires pour repérer les produits à droits élevés et les gisements d'économie",
            ],
          },
          {
            titre: "Structuration de l'espace de travail Claude",
            points: [
              "Distinction posée entre **Projects** (contexte persistant, organisation par sujet) et **Skills** (automatisation d'une tâche répétitive)",
              "Projects dédiés par sujet, avec instructions permanentes et fichiers de référence (PDF, Excel)",
              "Rédaction des **instructions globales** du compte pour cadrer toutes les conversations",
            ],
          },
          {
            titre: "Création de Skills",
            points: [
              "Méthode pas à pas : décrire la tâche en conversation et laisser Claude guider la construction",
              "Déclenchement par « / » ou par conditions automatiques",
              "Un Project dédié « Création de compétences » pour isoler les conversations de développement",
              "Première Skill produite avec lui : **analyse prévisionnelle des taux de change**",
            ],
          },
          {
            titre: "Paramétrage du compte et sécurité des données",
            points: [
              "Désactivation de **« Help Improve AI Models »** dans les paramètres de confidentialité",
              "Lecture accompagnée de la politique de confidentialité d'Anthropic",
              "Choix du modèle et du niveau d'effort selon la complexité de la tâche, lecture du tableau de bord d'usage, fonctionnement des limites",
            ],
          },
          {
            titre: "Atelier sur données réelles",
            texte:
              "Reconstitution d'un livrable existant à partir de ses propres extractions : extraction SAP des ventes, fichier type de produit, fichier de prix de vente. Le résultat qu'il produisait à la main a servi de référence de contrôle.",
          },
          {
            titre: "Levée du blocage de l'écosystème Microsoft",
            texte:
              "Le tenant Microsoft d'OPmobility dépendant de la DSI, trois briques restaient inaccessibles : le connecteur de messagerie, l'accès de Claude aux documents et l'extension Claude dans Excel. Solution mise en place : un **environnement d'apprentissage personnel** sur un abonnement Microsoft 365 Business Basic dont il est lui-même administrateur, avec la marche à suivre détaillée. Cet environnement ne donne aucun accès aux données d'OPmobility : il permet de reproduire les cas d'usage en conditions réelles, et de savoir exactement quoi demander à la DSI le jour où le sujet sera porté en interne.",
          },
        ],
      },
    ],
  },
  {
    slug: "abeille-assurances",
    nom: "Abeille Assurances",
    logo: { src: `${L}/abeille-assurances.png`, ratio: 2.65 },
    resume:
      "Cockpit IA pour une agence générale d'assurance : formation à Claude et mise en place, en 6 séances, d'un cockpit qui couvre le commercial, les animations, l'administratif et le pilotage.",
    secteur: "Assurance",
    pays: "France",
    statut: "En cours",
    services: ["Formation IA", "Claude"],
    outils: ["Claude"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Une petite agence générale d'assurance, portée par une agente générale en profession libérale et rattachée à un grand assureur.\n\nComme beaucoup d'agents généraux, la dirigeante mène tout de front : le développement commercial, le suivi du portefeuille, les animations commerciales demandées par la compagnie et une charge administrative importante. Elle utilisait déjà Claude et avait commencé à configurer ses propres projets, mais sans cadre d'ensemble pour en faire un véritable outil de pilotage de son agence.",
      },
      {
        type: "liste",
        titre: "Le Cockpit IA",
        intro:
          "L'objectif n'est pas de livrer un outil clé en main, mais de rendre la dirigeante **autonome sur Claude** et de construire avec elle, séance après séance, un cockpit qui couvre les grands pans de son activité. Chaque séance mêle **formation et mise en place** :",
        points: [
          "Prise en main approfondie de Claude : projets, instructions, organisation des documents de l'agence",
          "Projets dédiés à chaque usage (commercial, administratif, pilotage), alimentés avec ses propres supports et ses propres méthodes",
          "Exploration des connexions possibles entre Claude et les outils qu'elle utilise au quotidien",
          "Mise en pratique sur ses cas réels, pour que chaque usage soit adopté et pas seulement démontré",
        ],
      },
      {
        type: "blocs",
        titre: "Le parcours en 6 séances",
        numerote: true,
        blocs: [
          {
            titre: "Cartographie et architecture",
            texte:
              "État des lieux de l'activité et des usages existants, puis définition de l'architecture du cockpit : quels projets, pour quels usages, avec quelles sources.",
          },
          { titre: "Moteur commercial", texte: "Mise en place des usages liés à la prospection et au suivi client." },
          { titre: "Animations commerciales", texte: "Préparation et déclinaison des animations commerciales de l'agence avec l'appui de Claude." },
          { titre: "Pilotage administratif", texte: "Allègement des tâches administratives récurrentes." },
          { titre: "Cockpit dirigeante et veille", texte: "Un espace de pilotage pour la dirigeante, et une veille organisée sur son marché." },
          { titre: "Consolidation", texte: "Revue de l'ensemble, ajustements et ancrage des usages pour une utilisation en autonomie." },
        ],
      },
      {
        type: "liste",
        titre: "Principes de l'accompagnement",
        ton: "resultat",
        points: [
          "**Formation plutôt que dépendance** : la dirigeante repart en maîtrisant ses outils",
          "**Construit sur ses cas réels**, pas sur des exemples génériques",
          "**Aucune action automatique sans validation humaine**",
        ],
      },
    ],
  },
  {
    slug: "acces-sante",
    nom: "Accès Santé",
    logo: { src: `${L}/acces-sante.png`, ratio: 3.22, fond: "#2176ff" },
    resume:
      "Audit complet des processus actuels, mené sur place, pour un spécialiste des mutuelles et assurances santé destinées aux seniors.",
    secteur: "Assurance",
    pays: "France",
    statut: "Livré",
    site: "https://www.accessante.fr/",
    services: ["Audit des processus"],
    outils: [],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Accès Santé aide les particuliers, et en particulier les seniors, à choisir leur mutuelle et leur assurance santé : bilan santé gratuit, comparateur en ligne, accompagnement au changement de contrat. L'entreprise met en avant plus de 25 ans d'expérience et plus de 10 000 clients accompagnés.",
      },
      {
        type: "liste",
        titre: "Mission",
        intro: "NoesisAI a réalisé un **audit complet des processus actuels**, **sur place**, au contact des équipes :",
        points: [
          "Observation des processus tels qu'ils se déroulent au quotidien",
          "Cartographie des tâches, des outils utilisés et des échanges d'information",
          "Repérage des tâches répétitives et des points de friction",
          "Priorisation des leviers d'automatisation selon le temps qu'ils peuvent faire gagner",
        ],
      },
    ],
  },
  {
    slug: "trolem",
    nom: "Trolem",
    logo: { src: `${L}/trolem.png`, ratio: 4.78 },
    resume:
      "Accompagnement de bout en bout : installation d'un serveur (VPS) et de N8N, mise en place d'un CRM Twenty et automatisations qui font remonter tous les prospects et clients de chaque canal, avec relances automatiques.",
    secteur: "Équipement de golf",
    pays: "France",
    statut: "En cours",
    site: "https://trolem.fr/",
    services: ["Intégration CRM", "Automatisation N8N"],
    outils: ["Twenty", "N8N", "VPS"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Trolem conçoit et commercialise des chariots de golf électriques (gammes eTITAN, eLITE, NOX…). Prospects et clients arrivent par plusieurs canaux : l'enjeu est de tout réunir au même endroit, sans ressaisie, et de ne laisser aucun contact sans suite.",
      },
      {
        type: "blocs",
        titre: "Solution déployée",
        intro: "Un accompagnement de bout en bout, de l'infrastructure jusqu'aux automatisations.",
        numerote: true,
        blocs: [
          {
            titre: "Serveur et N8N",
            points: [
              "Installation d'un **serveur privé (VPS)** dédié à Trolem",
              "Déploiement de **N8N** sur ce serveur pour faire tourner les automatisations",
            ],
          },
          {
            titre: "CRM Twenty",
            points: [
              "Mise en place d'un **CRM Twenty**, structuré autour de l'activité de Trolem",
              "Un seul endroit pour suivre chaque prospect et chaque client",
            ],
          },
          {
            titre: "Automatisations",
            points: [
              "**Remontée automatique** dans le CRM de tous les prospects et clients, quel que soit leur canal d'arrivée",
              "**Relances automatiques** pour ne laisser aucun prospect sans suite",
              "Plusieurs autres automatisations du suivi commercial",
            ],
          },
          {
            titre: "Accompagnement",
            points: ["Accompagnement de l'équipe dans la prise en main des outils"],
          },
        ],
      },
    ],
  },
  {
    slug: "express-pare-brise",
    nom: "Express Pare-Brise",
    logo: { src: `${L}/express-pare-brise.png`, ratio: 2.4 },
    resume:
      "Audit des processus et des usages déjà en place sur Claude pour un spécialiste du remplacement de pare-brise pour les professionnels.",
    secteur: "Automobile",
    pays: "France et Luxembourg",
    statut: "Livré",
    site: "https://www.express-parebrise.com/",
    services: ["Audit des processus", "Claude"],
    outils: ["Claude"],
    parties: [
      {
        type: "texte",
        titre: "Contexte",
        texte:
          "Express Pare-Brise remplace les pare-brise des véhicules professionnels en France et au Luxembourg depuis 2013 : intervention sur site sous 24 à 48 heures, pose sur mesure et calibrage des aides à la conduite (ADAS).",
      },
      {
        type: "liste",
        titre: "Mission",
        intro: "NoesisAI a mené un **audit des processus** de l'entreprise et **des usages déjà en place sur Claude** :",
        points: [
          "Cartographie des processus actuels et des outils utilisés",
          "Revue de l'existant sur Claude : ce qui est déjà en place et comment c'est utilisé",
          "Repérage des tâches répétitives et des points de friction",
          "Priorisation des pistes d'amélioration et d'automatisation",
        ],
      },
    ],
  },
];

/** Icônes d'outils disponibles dans public/apps (les autres outils s'affichent avec leur initiale). */
export const ICONES_OUTILS: Record<string, string> = {
  N8N: "/apps/n8n.svg",
  OpenAI: "/apps/openai.svg",
  ChatGPT: "/apps/openai.svg",
  Claude: "/apps/claude.svg",
  Gemini: "/outils/googlegemini.svg",
  Twilio: "/apps/twilio.svg",
  Shopify: "/apps/shopify.svg",
  Pennylane: "/apps/pennylane.svg",
  Excel: "/apps/microsoft-excel.svg",
};

/** "2026-03" -> "mars 2026" */
export function moisLivraison(iso?: string): string | undefined {
  if (!iso) return undefined;
  const [a, m] = iso.split("-").map(Number);
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${mois[m - 1]} ${a}`;
}
