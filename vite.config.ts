import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import type {} from "vite-react-ssg";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Marked } from "marked";
import { parse as lireYaml } from "yaml";

// =============================================================
//  Blog : les articles sont des fichiers content/blog/<slug>.md
//  (en-tête YAML entre --- puis texte en Markdown). Ils sont
//  convertis en HTML au build : le navigateur ne reçoit aucun
//  outil de conversion, seulement le texte final.
// =============================================================

const DOSSIER_BLOG = resolve(__dirname, "content/blog");

function decouper(source: string) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!m) throw new Error("Article de blog sans en-tête --- ... --- au début du fichier");
  return { meta: (lireYaml(m[1]) ?? {}) as Record<string, unknown>, corps: m[2] };
}

function slugifier(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Articles à pré-rendre : ni brouillon, ni modèle (fichiers commençant par _). */
function articlesPublies(): string[] {
  try {
    return readdirSync(DOSSIER_BLOG)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .filter((f) => !decouper(readFileSync(resolve(DOSSIER_BLOG, f), "utf8")).meta.brouillon)
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

function blogMarkdown(): Plugin {
  return {
    name: "noesis-blog-markdown",
    transform(code, id) {
      if (!id.endsWith(".md") || !id.includes("/content/blog/")) return null;
      const { meta, corps } = decouper(code);
      const sommaire: { id: string; titre: string; niveau: number }[] = [];
      const vus = new Set<string>();
      const md = new Marked({ gfm: true });
      md.use({
        renderer: {
          // Intertitres avec ancre, pour le sommaire de l'article.
          heading(texte: string, niveau: number, brut: string) {
            if (niveau !== 2 && niveau !== 3) return `<h${niveau}>${texte}</h${niveau}>\n`;
            let ident = slugifier(brut) || `partie-${sommaire.length + 1}`;
            while (vus.has(ident)) ident += "-bis";
            vus.add(ident);
            sommaire.push({ id: ident, titre: brut.replace(/[*_`]/g, ""), niveau });
            return `<h${niveau} id="${ident}">${texte}</h${niveau}>\n`;
          },
          // Liens externes dans un nouvel onglet ; liens internes inchangés.
          link(href: string, titre: string | null | undefined, texte: string) {
            const externe = /^https?:\/\//.test(href) && !href.startsWith("https://noesisai.fr");
            const t = titre ? ` title="${titre}"` : "";
            return externe
              ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${texte}</a>`
              : `<a href="${href}"${t}>${texte}</a>`;
          },
        },
      });
      const html = md.parse(corps) as string;
      const mots = corps.split(/\s+/).filter(Boolean).length;
      return {
        code:
          `export const meta = ${JSON.stringify(meta)};\n` +
          `export const html = ${JSON.stringify(html)};\n` +
          `export const sommaire = ${JSON.stringify(sommaire)};\n` +
          `export const minutes = ${Math.max(1, Math.round(mots / 220))};\n`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), blogMarkdown()],
  // Pré-rendu statique (vite-react-ssg build) : un fichier HTML par route.
  ssgOptions: {
    entry: "src/main.tsx",
    // /automatisation -> dist/automatisation/index.html, servi tel quel par Vercel
    dirStyle: "nested",
    // /agents-vocaux est redirigé par Vercel (vercel.json) : rien à pré-rendre.
    // /404 rend la route « * » : Vercel la sert pour toute adresse inconnue.
    // /blog/<slug> : un fichier par article publié.
    includedRoutes: (paths) => [
      ...new Set([
        ...paths.filter((p) => p !== "/agents-vocaux" && !p.includes(":")),
        "/404",
        "/blog",
        ...articlesPublies().map((s) => `/blog/${s}`),
      ]),
    ],
  },
});
