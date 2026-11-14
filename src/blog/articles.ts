// =============================================================
//  Articles du blog : content/blog/<slug>.md, convertis au build
//  par le plugin « noesis-blog-markdown » de vite.config.ts.
//  Les brouillons (brouillon: true) ne sont visibles qu'en local
//  (npm run dev) ; les fichiers _*.md sont des modèles, jamais publiés.
// =============================================================

export type Categorie = "automatisation" | "agents-vocaux" | "logiciel-metier" | "formation" | "ia-par-metier";

export const CATEGORIES: Record<Categorie, { label: string; offre: string; offreLabel: string }> = {
  automatisation: { label: "Automatisation", offre: "/automatisation", offreLabel: "Automatisation IA et agents vocaux" },
  "agents-vocaux": { label: "Agents vocaux", offre: "/automatisation", offreLabel: "Agents vocaux IA" },
  "logiciel-metier": { label: "Logiciel métier", offre: "/logiciel-metier", offreLabel: "Logiciel métier sur-mesure" },
  formation: { label: "Formation IA", offre: "/formation-ia", offreLabel: "Formation IA en entreprise" },
  "ia-par-metier": { label: "IA par métier", offre: "/", offreLabel: "Agence IA pour les PME" },
};

type Meta = {
  titre: string;
  description: string;
  /** Date de publication, AAAA-MM-JJ */
  date: string;
  /** Dernière mise à jour, AAAA-MM-JJ (facultatif) */
  maj?: string;
  categorie: Categorie;
  /** Requête Google visée (suivie par le Pilote SEO) */
  mot_cle?: string;
  /** Page d'offre vers laquelle l'article amène (par défaut, celle de la catégorie) */
  offre?: string;
  brouillon?: boolean;
  faq?: { q: string; r: string }[];
};

type Module = { meta: Meta; html: string; sommaire: { id: string; titre: string; niveau: number }[]; minutes: number };

export type Article = Meta & {
  slug: string;
  html: string;
  sommaire: Module["sommaire"];
  minutes: number;
};

const modules = import.meta.glob<Module>(["/content/blog/*.md", "!/content/blog/_*.md"], { eager: true });

export const ARTICLES: Article[] = Object.entries(modules)
  .map(([chemin, m]) => ({
    ...m.meta,
    date: String(m.meta.date),
    maj: m.meta.maj ? String(m.meta.maj) : undefined,
    slug: chemin.split("/").pop()!.replace(/\.md$/, ""),
    html: m.html,
    sommaire: m.sommaire,
    minutes: m.minutes,
  }))
  .filter((a) => import.meta.env.DEV || !a.brouillon)
  .sort((a, b) => b.date.localeCompare(a.date));

export function trouverArticle(slug: string | undefined) {
  return ARTICLES.find((a) => a.slug === slug);
}

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** 2026-11-20 -> « 20 novembre 2026 » */
export function dateLongue(iso: string) {
  const [a, m, j] = iso.slice(0, 10).split("-").map(Number);
  return a && m && j ? `${j} ${MOIS[m - 1]} ${a}` : iso;
}
