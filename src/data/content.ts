// =============================================================
//  NOESIS AI — contenu centralisé du site
//  Modifiez ce fichier pour mettre à jour les textes, les cas
//  clients, les logos, la FAQ, etc. (pas besoin de toucher au JSX).
// =============================================================

/** Lien de prise de rendez-vous iClosed — utilisé par tous les CTA. */
export const ICLOSED_URL = "https://app.iclosed.io/e/NoesisAI/30min";

export const CONTACT_EMAIL = "contact@noesisiai.pro";

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/ugo-sartini-04a14620a/",
  instagram: "https://www.instagram.com/ugoia2025/",
};

export const NAV_LINKS = [
  { label: "Logiciels", href: "#logiciels" },
  { label: "Agents vocaux", href: "#agents-vocaux" },
  { label: "Formation", href: "#formation" },
  { label: "Projets", href: "#projets" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  badge: "Studio d'ingénierie IA · solutions sur-mesure",
  // Le titre est composé dans Hero.tsx (partie en dégradé).
  subtitle:
    "NOESIS.AI conçoit, déploie et opère des agents IA, des automatisations et des produits digitaux taillés pour vos enjeux métier — de l'audit à la mise en production.",
  primaryCta: "Échanger avec un expert",
  secondaryCta: "Voir nos réalisations",
  stats: [
    { value: "Sur-mesure", label: "chaque solution conçue pour vous" },
    { value: "24/7", label: "agents IA en production" },
    { value: "RGPD", label: "sécurité & conformité by design" },
  ],
};

export const TRUST_TITLE = "Ils nous font confiance";

/** Logos clients — fichiers dans /public/logos/clients/. */
// Versions blanches monochromes (fond transparent) générées à partir des originaux.
export const CLIENT_LOGOS: { name: string; src: string; label?: string }[] = [
  { name: "Muller", src: "/logos/clients/muller-w.png" },
  { name: "ISCI International", src: "/logos/clients/isci-w.png" },
  { name: "Homelok", src: "/logos/clients/homelok-w.png" },
  { name: "FastParts", src: "/logos/clients/fastparts-w.png" },
  { name: "BT Propre Nettoyage", src: "/logos/clients/bt-propre-w.png" },
  { name: "Bungazur", src: "/logos/clients/bungazur-w.png" },
  { name: "NRGY UP", src: "/logos/clients/nrgy-up-w.png" },
  { name: "Bunker Game", src: "/logos/clients/bunker-game-w.png" },
  { name: "Immobilier", src: "/logos/clients/client-immobilier-w.png" },
  { name: "ŌDAS Conseil", src: "/logos/clients/odas-conseil-w.png" },
  { name: "Abeille Assurances", src: "/logos/clients/abeille-assurances-w.png" },
  { name: "CCI Paris Île-de-France", src: "/logos/clients/cci-paris-w.png" },
  { name: "Sygma France", src: "/logos/clients/sygma-w.png", label: "Sygma" },
];

export const PROBLEM = {
  badge: "Le problème",
  title: "Vos équipes perdent un temps précieux sur des tâches sans valeur ajoutée",
  subtitle:
    "Avant de présenter nos solutions, voici les blocages que rencontrent la plupart des entreprises que nous accompagnons.",
  pains: [
    {
      title: "Des tâches répétitives chronophages",
      text: "Saisie manuelle, copier-coller entre outils, relances : jusqu'à 70% du temps part dans l'administratif à faible valeur.",
    },
    {
      title: "Des appels et des leads perdus",
      text: "Les appels hors disponibilité (soir, week-end, terrain) ne sont jamais décrochés, et les devis dormants ne sont jamais relancés.",
    },
    {
      title: "Des données éparpillées",
      text: "CRM, mails, factures, devis : l'information est dispersée entre plusieurs plateformes, sans vision unifiée ni suivi fiable.",
    },
  ],
};

export const SOLUTIONS = {
  badge: "Notre solution",
  title: "Des automatisations IA complètes, de l'audit au déploiement",
  subtitle:
    "Des solutions complètes pour transformer vos processus métier en workflows intelligents et automatisés.",
  items: [
    {
      title: "Audit & roadmap",
      text: "Analyse approfondie de vos processus pour identifier les opportunités d'automatisation les plus rentables.",
    },
    {
      title: "Développement n8n / Make",
      text: "Conception de workflows robustes connectés à vos outils via des intégrations API natives.",
    },
    {
      title: "Agents IA (texte & voix)",
      text: "Création d'agents conversationnels et vocaux intelligents pour automatiser vos interactions clients.",
    },
    {
      title: "Intégration & déploiement",
      text: "Mise en place complète de vos automatisations avec respect des standards de sécurité et RGPD.",
    },
    {
      title: "Optimisation continue",
      text: "Accompagnement long terme pour maintenir, fiabiliser et optimiser vos automatisations.",
    },
    {
      title: "Formation des équipes",
      text: "Montée en compétences de vos collaborateurs pour exploiter l'IA générative au quotidien.",
    },
  ],
};

export const EXPERTISE = {
  badge: "Nos expertises",
  title: "Ce que nous concevons pour vous",
  subtitle:
    "De l'application métier sur-mesure aux systèmes d'IA les plus avancés : nous couvrons toute la chaîne, du produit digital à l'intelligence artificielle.",
  categories: [
    {
      label: "Produits digitaux",
      items: [
        { title: "Logiciel métier", text: "Des outils internes sur-mesure qui digitalisent vos processus spécifiques." },
        { title: "Application web & SaaS", text: "Plateformes web performantes, du MVP au produit SaaS multi-utilisateurs." },
        { title: "Automatisation", text: "Workflows n8n / Make qui connectent vos outils et éliminent les tâches manuelles." },
        { title: "API & microservices", text: "Architectures modulaires et intégrations robustes entre vos systèmes." },
      ],
    },
    {
      label: "Solutions IA",
      items: [
        { title: "Agents autonomes & multi-agents", text: "Des agents IA qui exécutent des tâches complexes et collaborent entre eux." },
        { title: "Agentic Workflows", text: "Des chaînes de décision intelligentes orchestrant IA, outils et données." },
        { title: "AI Engineering", text: "Intégration de LLM, RAG et fine-tuning au cœur de vos applications." },
        { title: "Computer Vision", text: "Analyse d'images et de vidéos pour automatiser le contrôle et la détection." },
      ],
    },
  ],
};

export const VOICE_AGENTS = {
  badge: "Notre expertise phare",
  title: "Des agents vocaux IA qui décrochent à votre place, 24/7",
  subtitle:
    "Ne perdez plus jamais un appel. Nos agents vocaux répondent, qualifient la demande et déclenchent les bonnes actions dans vos outils — même quand vous êtes sur le terrain.",
  capabilities: [
    "Décroche les appels entrants hors disponibilité (soir, week-end, interventions)",
    "Trie et qualifie la demande (SAV, devis, prise de RDV…)",
    "Résout les cas simples par téléphone via des instructions guidées",
    "Crée automatiquement les tickets et pré-remplit les devis dans vos outils",
    "Planifie les rendez-vous (SMS + synchronisation agenda)",
    "Transcrit chaque échange et transfère à un humain à la demande",
  ],
  // Cas concret mis en avant
  highlight: {
    client: "FastParts",
    sector: "Pièces détachées auto · Belgique",
    quote:
      "Le volume d'appels (référence, disponibilité, prix) saturait les commerciaux. Notre agent vocal identifie le véhicule, qualifie la pièce recherchée et envoie automatiquement un devis par SMS/email — et bascule vers un commercial pour les cas complexes.",
    stack: ["n8n", "Twilio", "OpenAI"],
  },
};

export const ROI = {
  badge: "Calculateur ROI",
  title: "Combien vous coûtent vos appels manqués ?",
  subtitle:
    "Estimez le chiffre d'affaires que vous perdez chaque mois faute de décrocher — et ce qu'un agent vocal IA pourrait récupérer.",
  defaults: {
    appelsManquesParMois: 40,
    panierMoyen: 250,
    tauxConversion: 20,
  },
  cta: "Récupérer ce chiffre d'affaires",
};

export const REALISATIONS = {
  badge: "Réalisations",
  title: "Ce que nos clients ont transformé avec NOESIS AI",
  subtitle:
    "Découvrez comment nos clients ont automatisé leurs opérations et fiabilisé leur pilotage grâce à nos automatisations IA.",
  cases: [
    {
      client: "FastParts",
      sector: "Pièces détachées auto",
      country: "Belgique",
      summary:
        "Agent vocal IA dédié aux demandes de pièces détachées : il identifie le véhicule (marque, modèle, année), qualifie la pièce recherchée et envoie automatiquement un devis par SMS/email — et bascule vers un commercial pour les cas complexes.",
      results: ["Appels qualifiés 24/7, même hors horaires", "Devis envoyés automatiquement", "Commerciaux déchargés des appels simples"],
      tags: ["Agent vocal IA", "Automatisation n8n", "Twilio"],
    },
    {
      client: "Muller and Comfort",
      sector: "BTP",
      country: "Suisse",
      summary:
        "Application web couvrant tout le cycle opérationnel : devis assisté par IA, suivi de la marge réelle des chantiers, bibliothèque de prix multi-entités et gestion des fiches clients.",
      results: ["Devis assistés par IA", "Marge chantier suivie en temps réel", "Pointage & factures centralisés"],
      tags: ["App web", "IA générative", "Suivi de marge"],
    },
    {
      client: "ISCI International",
      sector: "Tech & Consulting (ESN)",
      country: "Québec",
      summary:
        "Préqualification par agent vocal IA + matching IA sur un vivier de 15 000 CV, CRM/ATS en Kanban et veille marché — le tout conforme à la Loi 25 par conception.",
      results: ["15 000 CV exploités", "80% des opérations visées en automatisation", "Hébergement souverain & conforme Loi 25"],
      tags: ["Agent vocal IA", "Matching IA", "Conformité"],
    },
    {
      client: "Woody's Camp",
      sector: "E-commerce",
      country: "France",
      summary:
        "Montée en compétences sur l'IA générative et assistance à la gestion du support client (réponses, FAQ, gestion des avis) pour une équipe réduite.",
      results: ["Support client assisté par IA", "Équipe formée à l'IA générative", "Prise en main accélérée"],
      tags: ["Formation IA", "Support client", "E-commerce"],
    },
  ],
};

export const PROCESS = {
  badge: "Comment ça marche",
  title: "Votre transformation en 4 étapes",
  subtitle:
    "Une démarche claire et progressive, de l'audit gratuit jusqu'à l'optimisation continue.",
  steps: [
    { n: "01", title: "Audit gratuit", text: "Nous analysons vos workflows actuels pour identifier les tâches les plus chronophages et les plus rentables à automatiser." },
    { n: "02", title: "Roadmap personnalisée", text: "Nous priorisons les automatisations selon leur ROI et construisons un plan d'action clair et chiffré." },
    { n: "03", title: "Intégration & déploiement", text: "Nous développons et connectons vos automatisations à vos outils, dans le respect du RGPD et de la sécurité." },
    { n: "04", title: "Optimisation continue", text: "Nous maintenons, mesurons et améliorons vos automatisations pour un ROI durable." },
  ],
};

export const LEAD_MAGNET = {
  badge: "Guide gratuit",
  title: "Les 5 processus les plus rentables à automatiser",
  subtitle:
    "Un guide étape par étape pour identifier les tâches chronophages et démarrer vos premières automatisations.",
  cta: "Télécharger le guide gratuit",
  placeholder: "Votre email professionnel",
};

export const TESTIMONIALS = {
  badge: "Avis clients",
  /** Note moyenne affichée avec les étoiles. */
  rating: { value: 4.8, outOf: 5, label: "de note moyenne sur nos avis clients" },
  /** Badges à lauriers (texte libre ; la partie `strong` est en gras). */
  badges: [
    { text: "Top 1 % des meilleures agences", strong: "IA de France" },
  ],
  title: "Ce que disent les entreprises que nous accompagnons",
  subtitle:
    "Des dirigeants et des équipes qui ont gagné du temps et fiabilisé leurs opérations grâce à l'automatisation IA.",
  items: [
    {
      quote:
        "Une équipe très réactive : chaque demande est prise en compte rapidement et la mise en place a été bouclée en un temps record. On a avancé vite, sans jamais perdre en qualité.",
      author: "Direction",
      company: "FastParts",
      logo: "/logos/clients/fastparts-w.png",
    },
    {
      quote:
        "Le suivi de marge par chantier a changé notre façon de piloter. Les devis assistés par IA nous font gagner un temps fou.",
      author: "Direction",
      company: "Muller and Comfort",
      logo: "/logos/clients/muller-w.png",
    },
    {
      quote:
        "Il suffit de déposer un CV pour que l'outil retrouve les cabinets de la zone et prépare les envois. On gagne un temps énorme et on est beaucoup plus réactifs auprès de nos clients.",
      author: "Direction",
      company: "ŌDAS Conseil",
      logo: "/logos/clients/odas-conseil-w.png",
    },
  ],
};

export const FAQ = {
  badge: "FAQ",
  title: "Questions fréquemment posées",
  subtitle:
    "Réponses aux questions sur l'automatisation IA, les agents vocaux, les intégrations (n8n / Make), la sécurité et les délais.",
  items: [
    {
      q: "Comment fonctionne un audit d'automatisation ?",
      a: "Nous analysons gratuitement vos workflows actuels pour repérer les tâches répétitives les plus chronophages et estimer le ROI de leur automatisation. Vous repartez avec une roadmap claire, même sans travailler avec nous.",
    },
    {
      q: "Combien de temps faut-il pour mettre en place une automatisation ?",
      a: "Cela dépend de la complexité, mais un premier workflow utile est généralement livré en quelques semaines. Nous procédons par étapes pour générer un retour sur investissement visible dès les premiers mois.",
    },
    {
      q: "Qu'est-ce qu'un agent vocal IA et que peut-il faire ?",
      a: "C'est un assistant téléphonique qui décroche à votre place, comprend la demande, y répond ou la qualifie, puis déclenche les bonnes actions dans vos outils (tickets, devis, prises de RDV). Il fonctionne 24/7 et transfère à un humain à la demande.",
    },
    {
      q: "Avez-vous des exemples concrets d'automatisations réussies ?",
      a: "Oui : agent vocal pour les demandes de pièces détachées chez FastParts, application de gestion de chantiers pour Muller and Comfort, et préqualification + matching IA sur 15 000 CV pour ISCI International.",
    },
    {
      q: "Mes données sont-elles en sécurité ?",
      a: "Oui. Nous respectons les normes RGPD et appliquons les standards de sécurité (chiffrement, contrôle d'accès, hébergement adapté). Pour ISCI, nous avons par exemple déployé une architecture souveraine conforme à la Loi 25.",
    },
    {
      q: "Avec quels outils travaillez-vous ?",
      a: "n8n, Make, OpenAI, Claude, ElevenLabs, Twilio, Supabase, HubSpot, Pennylane, Monday, et bien d'autres. Nous nous intégrons à votre stack existante via des API natives.",
    },
  ],
};

export const FINAL_CTA = {
  title: "Prêt à transformer vos processus ?",
  subtitle:
    "Un premier échange de 30 minutes, sans engagement, pour comprendre votre fonctionnement et identifier ce qui vous fera gagner le plus de temps.",
  cta: "Parler de votre projet",
};

export const FOOTER = {
  tagline:
    "Agence d'automatisation IA sur-mesure : n8n, Make, LLM et agents vocaux pour éliminer les tâches répétitives et accélérer votre croissance.",
  navTitle: "Navigation",
  nav: NAV_LINKS,
  legalTitle: "Légal",
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGU / CGV", href: "/cgu" },
  ],
};

// =============================================================
//  Logiciels métier (section inspirée de clickway.fr/erp)
// =============================================================
export const LOGICIELS = {
  badge: "Web-application, outil métiers & SaaS",
  title: "Un outil métier, c'est un logiciel construit",
  titleAccent: "autour de votre façon de travailler.",
  before: "Avant : des fichiers Excel copiés-collés et des heures perdues.",
  after: "Après : un seul logiciel qui fait le travail.",
  afterImage: "/projets/muller-dashboard.webp",
  afterAlt: "Tableau de bord de l'application Müller Hub",
  services: [
    {
      title: "Outils métier & ERP",
      text: "Vos process, vos données et votre équipe réunis dans un seul outil : devis, chantiers, heures, factures, pilotage.",
    },
    {
      title: "Applications & espaces clients",
      text: "Des applications web sur-mesure pour vos équipes, vos partenaires ou vos clients, utilisables sur ordinateur comme sur mobile.",
    },
    {
      title: "Automatisations & IA intégrées",
      text: "L'IA travaille dans l'outil : devis dictés à la voix, comptes rendus générés, mails pré-rédigés, tâches répétitives qui tournent seules.",
    },
  ],
  featured: {
    tag: "Logiciel métier · BTP · Suisse",
    client: "Muller and Comfort",
    image: "/projets/muller-devis.webp",
    imageAlt: "Création d'un devis dicté à la voix dans Müller Hub",
    text: "Avant, devis, prix, heures et factures se géraient à la main, entre des PDF fournisseurs et des fichiers Excel copiés-collés pour trois marques. Nous avons conçu Müller Hub : une seule application pour générer les devis à la voix grâce à l'IA, suivre les chantiers et leur marge réelle, centraliser la bibliothèque de prix et pointer les heures de chaque ouvrier.",
    stats: [
      { value: "1 408", label: "prestations centralisées dans la bibliothèque de prix" },
      { value: "3", label: "marques pilotées dans un seul outil" },
      { value: "À la voix", label: "devis générés par dictée grâce à l'IA" },
    ],
  },
  /** Autres réalisations présentées comme le projet phare (capture + texte + points clés). */
  showcase: [
    {
      tag: "Application métier · Cabinet de placement",
      client: "ŌDAS Conseil",
      logo: "/logos/clients/odas-conseil-w.png",
      image: "/projets/odas-diffusion.webp",
      imageAlt: "Diffusion d'un CV aux cabinets situés dans la zone de mobilité du candidat",
      text: "Avant, la diffusion des CV se pilotait dans un grand fichier Excel, cabinet par cabinet. Avec l'application, il suffit de déposer un CV : elle retrouve tous les cabinets situés dans la zone de mobilité du candidat et prépare les mails, avec le CV anonymisé ou aux couleurs du cabinet. Un gain de réactivité décisif quand chaque candidat placé représente plusieurs milliers d'euros.",
      stats: [
        { value: "1 upload", label: "pour diffuser un CV à tous les cabinets de la zone" },
        { value: "Carte", label: "des cabinets selon la mobilité du candidat" },
        { value: "Anonymisé", label: "ou aux couleurs du cabinet, au choix" },
      ],
    },
    {
      tag: "Dashboard interne · Concession automobile · Martinique",
      client: "Ho Hio Hen Automobile",
      logo: "",
      image: "/projets/hohiohen-dashboard.webp",
      imageAlt: "Tableau de bord interne de suivi des appels et des demandes",
      text: "Une réceptionniste IA prend tous les appels, récupère les informations et qualifie chaque demande. Derrière, un dashboard interne donne à chaque employé le suivi des appels, des demandes de pièces détachées, des rappels à faire et des verbatims clients, avec les statistiques de l'activité.",
      stats: [
        { value: "Appels", label: "décrochés et qualifiés par la réceptionniste IA" },
        { value: "1 dashboard", label: "pour suivre appels, pièces et rappels" },
        { value: "Statistiques", label: "de l'activité téléphonique en temps réel" },
      ],
    },
    {
      tag: "Site & réservation en ligne · Locations de prestige · Finistère",
      client: "Villa Chantalain & Villa des Légendes",
      logo: "",
      image: "/projets/villa-1.webp",
      image2: "/projets/villa-2.webp",
      imageAlt: "Sites de la Villa des Légendes et de la Villa Chantalain",
      text: "Deux villas d'exception sur la Côte des Légendes et au cœur du parc d'Armorique. Nous avons refait leurs deux sites, pensés pour donner envie dès la première image, et construit derrière la réservation en ligne et le back-office de gestion des réservations : les clients réservent et paient directement, sans intermédiaire.",
      stats: [
        { value: "2 sites", label: "refaits, un par villa" },
        { value: "En direct", label: "réservation et paiement sécurisé, sans intermédiaire" },
        { value: "Back-office", label: "de gestion des réservations" },
      ],
    },
  ],
};

// =============================================================
//  Formation IA — offre Cockpit IA
// =============================================================
export const FORMATION = {
  badge: "Formation IA",
  title: "Le Cockpit IA : devenez autonomes sur l'IA",
  titleAccent: "et récupérez jusqu'à 10 h par semaine.",
  subtitle:
    "Un accompagnement de 3 mois, en présentiel ou à distance, pour maîtriser les bases, automatiser vos tâches avec des skills et construire le second cerveau de votre entreprise.",
  chips: ["3 mois d'accompagnement", "Présentiel ou distanciel", "Sur vos cas réels"],
  toolsTitle: "Les outils IA sur lesquels nous vous formons",
  tools: [
    { name: "Claude", logo: "/outils/claude.svg" },
    { name: "Claude Code", logo: "/outils/claude.svg" },
    { name: "ChatGPT", logo: "/outils/openai.svg" },
    { name: "Gemini", logo: "/outils/googlegemini.svg" },
    { name: "Microsoft Copilot", logo: "/outils/microsoft-copilot.svg" },
    { name: "Perplexity", logo: "/outils/perplexity.svg" },
  ],
  pillars: [
    {
      n: "01",
      title: "Maîtriser les bases",
      text: "Les bons outils, les bons réflexes et une méthode pour obtenir des résultats précis, sur vos cas réels plutôt que sur des exemples génériques.",
    },
    {
      n: "02",
      title: "Automatiser avec des skills",
      text: "Vos tâches récurrentes (reportings, analyses, rédaction, relances) transformées en skills réutilisables par toute l'équipe.",
    },
    {
      n: "03",
      title: "Un second cerveau d'entreprise",
      text: "Vos documents, process et savoir-faire organisés pour que l'IA travaille avec le contexte de votre entreprise.",
    },
  ],
  referencesTitle: "Ils se sont formés avec nous",
  references: [
    { name: "OPmobility", detail: "Accompagnement du directeur financier", logo: "", label: "" },
    { name: "Abeille Assurances", detail: "Cockpit IA d'une agence générale", logo: "/logos/clients/abeille-assurances-w.png", label: "" },
    { name: "CCI Paris Île-de-France", detail: "Journée « L'IA en usage professionnel »", logo: "/logos/clients/cci-paris-w.png", label: "" },
    { name: "Sygma France", detail: "Coaching de l'équipe de direction sur Claude", logo: "/logos/clients/sygma-w.png", label: "Sygma France" },
  ],
  formats: {
    title: "Deux façons de vous former",
    presentiel: {
      label: "Présentiel",
      title: "En salle ou dans vos locaux",
      text: "Des journées et ateliers en groupe, pour embarquer toute une équipe et pratiquer ensemble sur vos cas réels.",
      points: ["Ateliers pratiques sur vos cas réels", "Idéal pour former toute une équipe", "Dans vos locaux ou en salle"],
      caption: "Journée de formation à la CCI Paris Île-de-France",
      photos: [
        { src: "/formation/cci-1.webp", alt: "Participants en atelier pendant la formation IA à la CCI Paris Île-de-France" },
        { src: "/formation/cci-2.webp", alt: "Photo de groupe des participants de la journée de formation IA" },
        { src: "/formation/cci-3.webp", alt: "Échanges avec les participants pendant la formation" },
      ],
    },
    distanciel: {
      label: "Distanciel",
      title: "En visio, avec votre plateforme dédiée",
      text: "Des séances en visio, et un espace privé où chaque séance regroupe son enregistrement vidéo, le récapitulatif des points clés, vos actions à mener et les ressources associées.",
      points: ["Séances en visio, enregistrées", "Replays disponibles à tout moment", "Points clés, actions et ressources par séance"],
      screens: [
        { src: "/formation/plateforme-seances.webp", alt: "Espace privé de formation : liste des séances" },
        { src: "/formation/plateforme-video.webp", alt: "Page d'une séance avec son enregistrement vidéo" },
      ],
    },
  },
  cta: "Parler de la formation",
};

// =============================================================
//  Projets clients — classés par type
// =============================================================
export type ProjectCategory = "Applications" | "Automatisation" | "Formation";

export const PROJECT_CATEGORIES: ProjectCategory[] = ["Applications", "Automatisation", "Formation"];

export type Project = {
  client: string;
  sector: string;
  country?: string;
  categories: ProjectCategory[];
  tags: string[];
  /** Capture d'écran ; sans image, la carte affiche une couverture typographique. */
  image?: string;
  /** Logo blanc sur fond transparent (/logos/clients/*-w.png). */
  logo?: string;
  /** Logos d'applications pour la couverture animée (si pas d'image). */
  network?: string[];
  /** true si l'image est une photo (affichée plein cadre, sans fenêtre). */
  photo?: boolean;
  kpi?: { value: string; label: string };
  summary: string;
  before: string;
  solution: string;
};

export const PROJETS = {
  badge: "Projets clients",
  title: "Ils ont repris le contrôle de leurs opérations",
  subtitle: "Une sélection de nos projets, classés par type de mission.",
  confidential: "D'autres projets sont confidentiels et ne peuvent pas être montrés ici.",
  confidentialCta: "On vous en parle de vive voix",
  items: [
    {
      client: "Muller and Comfort",
      sector: "BTP",
      country: "Suisse",
      logo: "/logos/clients/muller-w.png",
      categories: ["Applications"],
      tags: ["Suivi de chantier", "Rentabilité", "Devis par IA"],
      image: "/projets/muller-dashboard.webp",
      summary: "Suivi de chantier et de rentabilité en temps réel, et génération de devis centralisée, assistée par l'IA.",
      before:
        "Aucun logiciel : les devis se faisaient par copier-coller entre plusieurs fichiers Excel et des PDF fournisseurs, pour trois marques.",
      solution:
        "Müller Hub centralise tout : génération de devis à la voix grâce à l'IA, bibliothèque de prix multi-entités, suivi de chantier et de marge réelle, pointage des heures par ouvrier, factures fournisseurs et tableau de bord.",
    },
    {
      client: "ŌDAS Conseil",
      sector: "Cabinet de placement",
      logo: "/logos/clients/odas-conseil-w.png",
      categories: ["Applications", "Automatisation"],
      tags: ["Application métier", "Recrutement"],
      image: "/projets/odas-diffusion.webp",
      kpi: { value: "1 upload", label: "pour diffuser un CV à tous les cabinets de la zone" },
      summary: "Un CV déposé, et l'application trouve et contacte tous les cabinets dans la zone de mobilité du candidat.",
      before:
        "Un grand fichier Excel pour suivre les envois de CV et une diffusion faite à la main, cabinet par cabinet.",
      solution:
        "Il suffit de déposer un CV : l'application retrouve les cabinets situés dans la zone de mobilité du candidat et envoie les mails, avec le CV anonymisé ou aux couleurs du cabinet. Les comptes rendus d'entretien sont générés automatiquement depuis la transcription des appels. Un gain de réactivité décisif quand chaque candidat placé représente plusieurs milliers d'euros.",
    },
    {
      client: "Ho Hio Hen Automobile",
      sector: "Concession automobile",
      country: "Martinique",
      categories: ["Applications", "Automatisation"],
      tags: ["Réceptionniste IA", "Logiciel de suivi"],
      image: "/projets/hohiohen-dashboard.webp",
      summary: "Une réceptionniste IA qui qualifie chaque appel, et un logiciel de suivi pour toute l'équipe.",
      before: "Des appels surtout liés au SAV et aux rendez-vous atelier, sans suivi centralisé ni ventes additionnelles.",
      solution:
        "Une réceptionniste IA prend toutes les informations, qualifie les demandes et propose des services complémentaires adaptés au véhicule. Une plateforme de suivi donne à chaque employé une vue sur les appels, les demandes de pièces détachées et les rappels.",
    },
    {
      client: "Villa Chantalain & Villa des Légendes",
      sector: "Locations de prestige",
      country: "Finistère",
      image: "/projets/villa-1.webp",
      categories: ["Applications"],
      tags: ["Site web", "Réservation en ligne", "Back-office"],
      summary: "Deux sites de villas d'exception, avec réservation et paiement en direct et un back-office de gestion.",
      before: "Des sites qui ne reflétaient pas le standing des villas, et des réservations à gérer sans outil dédié.",
      solution:
        "Refonte des deux sites, pensés pour mettre en valeur chaque villa, avec réservation et paiement sécurisé en direct, sans intermédiaire, et un back-office pour gérer les réservations.",
    },
    {
      client: "FastParts",
      network: ["/apps/twilio.svg", "/apps/openai.svg", "/apps/n8n.svg", "/apps/whatsapp-icon.svg", "/apps/gmail.svg"],
      sector: "Pièces détachées auto",
      country: "Belgique",
      logo: "/logos/clients/fastparts-w.png",
      categories: ["Automatisation"],
      tags: ["Agent vocal IA", "n8n", "Twilio"],
      summary: "Un agent vocal qui identifie le véhicule, qualifie la pièce et envoie le devis tout seul.",
      before:
        "Les appels (référence, disponibilité, prix) saturaient les commerciaux, et les demandes hors horaires étaient perdues.",
      solution:
        "L'agent vocal identifie le véhicule et la pièce recherchée, envoie automatiquement un devis par SMS ou email, et bascule vers un commercial pour les cas complexes.",
    },
    {
      client: "Bunker Game",
      sector: "Loisirs",
      country: "France",
      logo: "/logos/clients/bunker-game-w.png",
      network: ["/apps/phone.svg", "/apps/twilio.svg", "/apps/openai.svg", "/apps/google-calendar.svg"],
      categories: ["Automatisation"],
      tags: ["Réceptionniste IA", "Agent vocal"],
      summary: "Une réceptionniste IA qui décroche les appels, répond aux questions des clients et transmet les demandes à l'équipe.",
      before: "Des appels à gérer en continu par l'équipe, au détriment de l'accueil sur place.",
      solution:
        "Une réceptionniste IA prend les appels, répond aux questions fréquentes des clients et transmet les demandes qui le nécessitent à l'équipe.",
    },
    {
      client: "ISCI International",
      network: ["/apps/microsoft-outlook.svg", "/apps/openai.svg", "/apps/phone.svg", "/apps/hubspot.svg", "/apps/notion.svg"],
      sector: "ESN · placement IT",
      logo: "/logos/clients/isci-w.png",
      country: "Québec",
      categories: ["Automatisation"],
      tags: ["Matching IA", "Agent vocal", "Loi 25"],
      kpi: { value: "15 000", label: "CV exploités par le matching IA" },
      summary: "Préqualification vocale, matching IA sur le vivier de CV, CRM et ATS en Kanban.",
      before:
        "Demandes clients traitées à la main, vivier de 15 000 CV figé en PDF, préqualification téléphonique longue.",
      solution:
        "Classification IA des mails, matching IA sur le vivier, préqualification par agent vocal, CRM et ATS en Kanban, veille marché, le tout hébergé au Canada et conforme à la Loi 25.",
    },
    {
      client: "ASG Domotique",
      network: ["/apps/phone.svg", "/apps/n8n.svg", "/apps/pennylane.svg", "/apps/google-calendar.svg"],
      sector: "Domotique & bornes de recharge",
      country: "France",
      categories: ["Automatisation"],
      tags: ["Agent vocal IA", "Pennylane", "Monday"],
      summary: "SAV et demandes de devis pris en charge hors disponibilité, directement reliés aux outils de l'équipe.",
      before:
        "Une équipe de trois personnes qui perdait des appels SAV et des demandes de devis, avec beaucoup de ressaisie entre les outils.",
      solution:
        "Un agent vocal trie SAV et devis, guide le client sur les pannes courantes, crée le ticket dans Monday, pré-remplit le devis dans Pennylane et automatise la prise de rendez-vous.",
    },
    {
      client: "BT Propre",
      network: ["/apps/google-drive.svg", "/apps/openai.svg", "/apps/n8n.svg", "/apps/microsoft-excel.svg"],
      sector: "Nettoyage industriel",
      logo: "/logos/clients/bt-propre-w.png",
      country: "France",
      categories: ["Automatisation"],
      tags: ["Appels d'offres", "RAG", "n8n"],
      summary: "Veille des appels d'offres, décision go/no-go et mémoire technique rédigé par l'IA.",
      before: "Veille manuelle des appels d'offres et mémoires techniques rédigés de zéro, sur plusieurs jours.",
      solution:
        "Sourcing automatisé des appels d'offres, notation go/no-go en quelques minutes et rédaction du mémoire technique par un système RAG nourri des documents de l'entreprise.",
    },
    {
      client: "CCMN Etchart",
      network: ["/apps/gmail.svg", "/apps/openai.svg", "/apps/microsoft-excel.svg", "/apps/pennylane.svg", "/apps/google-drive.svg"],
      sector: "BTP",
      country: "France",
      categories: ["Automatisation"],
      tags: ["OCR & IA", "Devis", "Notes de frais"],
      summary: "Quatre process automatisés : suivi de chantier, factures, devis et notes de frais.",
      before: "Suivi de chantier dispersé et ressaisie manuelle des factures, des devis et des notes de frais.",
      solution:
        "Suivi de chantier centralisé, extraction des factures par OCR et IA, génération des devis en PDF et notes de frais créées à partir d'une simple photo du ticket.",
    },
    {
      client: "Orpi",
      network: ["/apps/gmail.svg", "/apps/claude.svg", "/apps/n8n.svg", "/apps/google-drive.svg"],
      sector: "Agence immobilière",
      country: "France",
      categories: ["Automatisation"],
      tags: ["Mails automatisés", "Création de contenu", "Analyse"],
      kpi: { value: "9", label: "boîtes mail automatisées" },
      summary: "Tri, routage et brouillons de réponse automatisés pour toute l'équipe d'une agence franchisée.",
      before: "Des outils morcelés, des mails triés à la main et des indicateurs calculés à la main.",
      solution:
        "Automatisation des boîtes mail de l'équipe (tri, routage, brouillons, relances), outil de création de contenu pour l'assistante de direction et analyse du taux d'occupation du portefeuille.",
    },
    {
      client: "OPmobility",
      network: ["/apps/claude.svg", "/apps/sap.svg", "/apps/microsoft-excel.svg"],
      sector: "Équipementier automobile",
      categories: ["Formation"],
      tags: ["Accompagnement individuel", "Claude", "Skills"],
      summary: "Le directeur financier formé à Claude pour automatiser ses reportings et analyses de coûts.",
      before: "Reportings et analyses de coûts faits à la main, à partir d'extractions et de fichiers Excel.",
      solution:
        "Accompagnement individuel à distance : cadrage des cas d'usage, Projects et Skills (dont une skill d'analyse des taux de change), ateliers sur ses données réelles.",
    },
    {
      client: "Abeille Assurances",
      network: ["/apps/claude.svg", "/apps/gmail.svg", "/apps/google-calendar.svg", "/apps/notion.svg"],
      sector: "Agence générale d'assurance",
      logo: "/logos/clients/abeille-assurances-w.png",
      categories: ["Formation"],
      tags: ["Cockpit IA", "Claude"],
      summary: "Un Cockpit IA en 6 séances : commercial, animations, administratif et pilotage.",
      before: "La dirigeante utilisait déjà l'IA, mais sans cadre d'ensemble pour piloter son agence.",
      solution:
        "Six séances mêlant formation et mise en place, construites sur ses cas réels : moteur commercial, animations, pilotage administratif, cockpit de la dirigeante et veille.",
    },
    {
      client: "CCI Paris Île-de-France",
      sector: "Institutionnel",
      logo: "/logos/clients/cci-paris-w.png",
      image: "/formation/cci-1.webp",
      photo: true,
      country: "France",
      categories: ["Formation"],
      tags: ["Journée de formation", "Présentiel"],
      kpi: { value: "50-60", label: "dirigeants et collaborateurs formés" },
      summary: "Une journée « L'IA en usage professionnel » pour dirigeants, entrepreneurs et collaborateurs.",
      before: "Une IA générative adoptée, mais sous-utilisée faute de méthode.",
      solution:
        "Panorama des outils, méthode de context engineering, fonctions avancées de Claude et ateliers sur des cas réels, avec un pack de 250 prompts sectoriels.",
    },
    {
      client: "Sygma France",
      sector: "Tech & Consulting",
      country: "France",
      logo: "/logos/clients/sygma-w.png",
      image: "/formation/plateforme-seances.webp",
      categories: ["Formation"],
      tags: ["Coaching Claude", "Distanciel", "Plateforme dédiée"],
      summary: "Le directeur général et son équipe accompagnés sur Claude, avec une plateforme de replays dédiée.",
      before: "Des licences Claude utilisées pour des tâches simples, sans méthode ni expertise technique en interne.",
      solution:
        "Un pack de coaching sur l'écosystème Claude pour le directeur général et cinq utilisateurs, en visio, avec chaque séance enregistrée et disponible sur un espace privé.",
    },
    {
      client: "Woody's Camp",
      network: ["/apps/shopify.svg", "/apps/openai.svg", "/apps/gmail.svg"],
      sector: "E-commerce",
      country: "France",
      categories: ["Formation"],
      tags: ["Formation flash", "Support client"],
      summary: "Une équipe e-commerce formée à l'IA générative : fiches produit, support client, productivité.",
      before: "Une petite équipe à faire monter rapidement en compétence sur l'IA générative.",
      solution:
        "Une formation flash orientée pratique : rédaction produit et SEO, support client assisté par IA et bonnes pratiques.",
    },
  ] as Project[],
};

// =============================================================
//  Organisation multi-pages (inspirée de clickway.fr)
//  Laissez un texte vide ("") ou une liste vide ([]) : le bloc
//  s'affiche en « À compléter » en local et disparaît en ligne.
// =============================================================

/** Lien WhatsApp (ex. "https://wa.me/33600000000"). Vide = bouton masqué. */
export const WHATSAPP_URL = "";

export const SERVICES_MENU = [
  { label: "Web-application, outil métiers & SaaS", to: "/logiciel-metier", text: "Sur mesure, après un diagnostic complet" },
  { label: "Automatisation & IA", to: "/automatisation", text: "Workflows et agents vocaux IA : les tâches répétitives tournent toutes seules." },
  { label: "Formation IA", to: "/formation-ia", text: "Devenez autonomes sur l'IA et récupérez jusqu'à 10 h par semaine." },
];

export const MAIN_MENU = [
  { label: "Projets", to: "/projets" },
  { label: "Témoignages", to: "/temoignages" },
];

export type FaqItem = { q: string; a: string };

export type ServicePage = {
  hero: { badge: string; title: string; boxed?: string; titleEnd?: string; subtitle: string; images: string[] };
  rules: { title: string; subtitle: string; items: { title: string; text: string }[] };
  projects: { title: string; subtitle: string };
  faq: { title: string; items: FaqItem[] };
  cta: { title: string; subtitle: string };
};

const AUTO_FAQ = FAQ.items;

export const PAGES: Record<"logiciel" | "automatisation" | "formation", ServicePage> = {
  logiciel: {
    hero: {
      badge: "Web-application, outil métiers & SaaS",
      title: "Votre activité centralisée dans un logiciel",
      boxed: "sur-mesure",
      titleEnd: "",
      subtitle:
        "Devis, chantiers, heures, factures, suivi client : on part de votre fonctionnement réel pour construire l'outil qui fait vraiment gagner du temps à vos équipes.",
      images: ["/projets/muller-dashboard.webp", "/projets/odas-diffusion.webp", "/projets/hohiohen-dashboard.webp"],
    },
    rules: { title: "", subtitle: "", items: [] },
    projects: { title: "Ils ont repris le contrôle de leurs opérations", subtitle: "Une sélection de nos logiciels sur-mesure." },
    faq: {
      title: "Les questions avant de lancer votre outil",
      items: [
        {
          q: "Pourquoi un logiciel sur-mesure plutôt qu'un logiciel du marché ?",
          a: "Un logiciel du marché vous oblige à adapter votre façon de travailler à l'outil, et à empiler les abonnements pour couvrir tous vos besoins. Un outil sur-mesure part de vos process réels : il ne contient que ce dont vos équipes ont besoin, reprend votre vocabulaire et vos règles métier, et se connecte aux logiciels que vous utilisez déjà.",
        },
        {
          q: "Comment se passe le premier échange ?",
          a: "Un appel de 30 minutes, sans engagement. Vous nous expliquez votre fonctionnement actuel et ce qui vous fait perdre du temps. On vous dit ensuite honnêtement si un outil sur-mesure est pertinent, et sous quelle forme.",
        },
        {
          q: "Combien coûte un outil sur-mesure ?",
          a: "Le budget dépend du périmètre : nombre d'écrans, d'utilisateurs, d'intégrations et de fonctionnalités d'IA. Il est chiffré précisément après le cadrage technique, et validé avec vous avant le début du développement. Nous priorisons les fonctionnalités qui apportent le plus de valeur pour démarrer avec une première version utile.",
        },
        {
          q: "En combien de temps aurons-nous un outil utilisable ?",
          a: "Nous livrons par itérations : une première version qui couvre l'essentiel arrive rapidement, puis l'outil s'enrichit au fil des semaines. Le planning précis est fixé lors du cadrage, et vous testez l'avancement chaque semaine.",
        },
        {
          q: "Nos équipes vont-elles vraiment l'utiliser ?",
          a: "C'est la priorité. L'outil est conçu à partir de la façon dont vos équipes travaillent vraiment, avec des écrans simples, utilisables sur ordinateur comme sur mobile. Vos utilisateurs le testent pendant le développement, et nous les formons à la prise en main au lancement.",
        },
        {
          q: "L'outil peut-il se connecter à nos logiciels actuels ?",
          a: "Oui, dès que vos logiciels le permettent (API, exports, connecteurs). Nous connectons couramment des outils comme votre messagerie, votre CRM, votre logiciel de facturation ou vos fichiers Excel, pour éviter toute double saisie.",
        },
        {
          q: "Peut-on reprendre nos données existantes ?",
          a: "Oui. Nous reprenons vos données actuelles (fichiers Excel, exports de vos anciens outils, catalogues de prix…) et les importons dans le nouvel outil, pour que vos équipes démarrent avec leur historique.",
        },
        {
          q: "Où sont hébergées nos données ?",
          a: "Vos données sont hébergées de façon sécurisée, avec un contrôle des accès par utilisateur et par rôle, dans le respect du RGPD. L'hébergement est choisi selon vos contraintes, y compris quand une localisation précise des données est exigée.",
        },
        {
          q: "Que se passe-t-il après la livraison ?",
          a: "Nous restons à vos côtés : maintenance, corrections, et évolutions de l'outil au rythme de votre activité. Vous n'êtes jamais seul face à un logiciel qui ne bouge plus.",
        },
      ],
    },
    cta: { title: "Parlons de l'outil qui manque à votre équipe.", subtitle: "" },
  },
  automatisation: {
    hero: {
      badge: "Automatisation & IA",
      title: "Des automatisations IA qui font",
      boxed: "le travail",
      titleEnd: "à votre place.",
      subtitle:
        "Workflows n8n / Make, agents IA et agents vocaux qui décrochent à votre place : nous automatisons vos process de bout en bout, connectés à vos outils.",
      images: [],
    },
    rules: { title: SOLUTIONS.title, subtitle: "", items: SOLUTIONS.items },
    projects: { title: "Ils ont automatisé leurs opérations", subtitle: "Une sélection de nos automatisations et agents vocaux." },
    faq: { title: FAQ.title, items: AUTO_FAQ },
    cta: { title: FINAL_CTA.title, subtitle: FINAL_CTA.subtitle },
  },
  formation: {
    hero: {
      badge: "Formation IA",
      title: "Devenez",
      boxed: "autonomes",
      titleEnd: "sur l'IA et récupérez jusqu'à 10 h par semaine.",
      subtitle: FORMATION.subtitle,
      images: [],
    },
    rules: { title: "", subtitle: "", items: [] },
    projects: { title: "Ils se sont formés avec nous", subtitle: "Formations et accompagnements réalisés." },
    faq: {
      title: "Vos questions sur la formation",
      items: [
        {
          q: "À qui s'adresse le Cockpit IA ?",
          a: "Aux dirigeants, managers et équipes qui veulent utiliser l'IA au quotidien sans être techniciens : direction, finance, commercial, administratif, RH… Nous l'avons déjà mené avec un directeur financier, une dirigeante d'agence d'assurance ou l'équipe de direction d'une entreprise de conseil.",
        },
        {
          q: "Faut-il des connaissances techniques ?",
          a: "Non. Nous partons de votre niveau actuel, que vous n'ayez jamais utilisé l'IA ou que vous l'utilisiez déjà sans méthode. L'objectif est que vous soyez autonome, pas que vous deveniez développeur.",
        },
        {
          q: "Comment se déroule l'accompagnement sur 3 mois ?",
          a: "Des séances régulières, construites sur vos cas réels : d'abord les bases et la méthode, puis la création de skills qui automatisent vos tâches récurrentes, et enfin l'organisation d'un second cerveau d'entreprise. Entre les séances, vous mettez en pratique sur votre propre travail.",
        },
        {
          q: "Présentiel ou distanciel : comment choisir ?",
          a: "Le présentiel est idéal pour embarquer toute une équipe lors d'ateliers en groupe, dans vos locaux ou en salle. Le distanciel offre plus de souplesse : séances en visio, enregistrées, avec un espace privé où retrouver les replays, les points clés et les ressources de chaque séance. Les deux formats peuvent se combiner.",
        },
        {
          q: "Sur quels outils IA nous formez-vous ?",
          a: "Principalement Claude et Claude Code, ChatGPT, Gemini, Microsoft Copilot et Perplexity. Nous choisissons avec vous les outils adaptés à vos usages, à vos licences existantes et aux règles de votre entreprise.",
        },
        {
          q: "Travaille-t-on sur nos propres cas ?",
          a: "Oui, c'est le principe du Cockpit IA. Pas d'exemples génériques : nous travaillons sur vos documents, vos reportings, vos mails et vos process, pour que chaque usage appris soit directement utile dans votre quotidien.",
        },
        {
          q: "Nos données restent-elles confidentielles ?",
          a: "Nous vous apprenons à configurer vos outils pour protéger vos données (comptes professionnels, paramètres de confidentialité, règles sur ce qui peut ou non être partagé avec une IA), dans le respect du RGPD et des règles de votre entreprise.",
        },
        {
          q: "Que se passe-t-il à la fin des 3 mois ?",
          a: "Vous repartez autonomes, avec vos skills, votre second cerveau et vos replays. Si vous le souhaitez, nous pouvons continuer à vous accompagner ou automatiser plus loin certains process repérés pendant la formation.",
        },
      ],
    },
    cta: { title: "Parlons de la formation de vos équipes.", subtitle: "" },
  },
};

export const HOME = {
  services: {
    title: "Pensé pour vos équipes.",
    titleAccent: "Construit pour votre activité.",
    subtitle: "",
  },
  team: { title: "", text: "", image: "" },
  projectsTitle: "Nos meilleurs projets",
};

// =============================================================
//  Méthode projet logiciel — timeline (page Web-application)
// =============================================================
export const LOGICIEL_METHOD = {
  badge: "Notre méthode",
  title: "Comment se déroule",
  titleAccent: "votre projet.",
  subtitle:
    "Une démarche en cinq étapes, du diagnostic à l'outil adopté par vos équipes. Vous savez à chaque instant où en est votre projet.",
  steps: [
    {
      n: "01",
      kicker: "Identification du besoin",
      title: "On comprend votre fonctionnement",
      text: "Nous observons comment vos équipes travaillent vraiment : process, outils, fichiers, irritants. Nous identifions ce qui vous coûte le plus de temps et d'argent.",
      deliverable: "Diagnostic complet de vos process",
      visual: "diagnostic",
    },
    {
      n: "02",
      kicker: "Cadrage technique",
      title: "On définit le périmètre de l'outil",
      text: "Écrans, données, rôles des utilisateurs, intégrations avec vos logiciels existants : nous cadrons le périmètre technique et priorisons ce qui apporte le plus de valeur.",
      deliverable: "Périmètre fonctionnel et technique",
      visual: "cadrage",
    },
    {
      n: "03",
      kicker: "Validation",
      title: "Vous validez avant le développement",
      text: "Périmètre, planning et budget sont validés avec vous avant la première ligne de code. Pas d'effet tunnel, pas de mauvaise surprise.",
      deliverable: "Périmètre, planning et budget validés",
      visual: "validation",
    },
    {
      n: "04",
      kicker: "Développement",
      title: "On construit, avec un feedback chaque semaine",
      text: "Nous développons par itérations. Chaque semaine, vous testez l'avancement et nous ajustons, jusqu'à la livraison d'un outil qui colle à votre réalité.",
      deliverable: "Point de feedback hebdomadaire",
      visual: "dev",
    },
    {
      n: "05",
      kicker: "Accompagnement & formation",
      title: "On vous accompagne après le lancement",
      text: "Mise en production, formation de vos équipes à l'outil et accompagnement dans la durée pour le faire évoluer avec votre activité.",
      deliverable: "Équipes formées et outil adopté",
      visual: "formation",
    },
  ],
};

// =============================================================
//  Process d'automatisation — timeline horizontale (page Automatisation)
// =============================================================
export const AUTOMATION_PROCESS = {
  badge: "Notre process",
  title: "Comment nous automatisons",
  titleAccent: "vos opérations.",
  subtitle: "Six étapes, de la cartographie de vos tâches jusqu'au suivi des automatisations en production.",
  steps: [
    {
      n: "01",
      title: "Cartographie de vos process",
      text: "Nous recensons vos tâches répétitives, les outils utilisés et le temps qu'elles prennent à vos équipes.",
      visual: "map",
    },
    {
      n: "02",
      title: "Priorisation par le gain",
      text: "Chaque automatisation possible est classée selon le temps gagné et la facilité de mise en place. On commence par ce qui rapporte le plus.",
      visual: "matrix",
    },
    {
      n: "03",
      title: "Conception du workflow",
      text: "Nous dessinons le scénario : le déclencheur, les étapes, le rôle de l'IA et les outils connectés. Vous le validez avant le développement.",
      visual: "flow",
    },
    {
      n: "04",
      title: "Développement & connexions",
      text: "Nous construisons le workflow (n8n, Make, agents IA) et le connectons à vos outils existants via leurs API.",
      visual: "connect",
    },
    {
      n: "05",
      title: "Tests & mise en production",
      text: "Tests sur des cas réels, validation humaine sur les étapes sensibles, puis mise en ligne progressive.",
      visual: "tests",
    },
    {
      n: "06",
      title: "Suivi & optimisation",
      text: "Nous surveillons les exécutions, corrigeons les erreurs et faisons évoluer vos automatisations avec votre activité.",
      visual: "monitor",
    },
  ],
};
