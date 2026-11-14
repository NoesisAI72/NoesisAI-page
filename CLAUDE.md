# NoesisAI-page : site noesisai.fr

Site vitrine React (vite-react-ssg, pré-rendu au build) + ressources en HTML statique sous
`public/ressources/<slug>/index.html`, hors du routeur React. Déployé par Vercel à chaque push
sur `main`.

## Règle d'écriture : aucun tiret cadratin

Le tiret cadratin « — » fait « texte écrit par une IA ». Il n'apparaît dans **aucun texte
visible** : titres, descriptions, contenu des ressources, pages du site.

- Incise → virgules, ou parenthèses si elle contient déjà des virgules.
- Explication ou étiquette → deux-points (« Étape 1 : … »).
- Case de tableau vide → « - ».
- Jamais de demi-cadratin « – » à la place.

Exception : le script du formulaire lead contient `[—-]` dans une expression régulière.
Ne pas y toucher.

## Ressources : ce qui doit continuer à marcher

- **Formulaire lead** (`#lead-gate`, envoi à `/api/lead`, base Notion « Prospects — Ressources
  NoesisAI ») : il se déclenche à ~48 % de la hauteur de `main.resource` et nomme la ressource
  à partir du `<title>` en retirant le suffixe « - NoesisAI ». Donc :
  - titre de page au format `<Titre> - NoesisAI` ;
  - ne rien ajouter **dans** `main.resource` qui changerait sa hauteur sans raison ;
  - changer un titre change le libellé des nouveaux prospects dans Notion : le signaler.
- **Versions `-instagram`** (tunnel Skool des DM Instagram) : `noindex`, hors sitemap, pas de
  bloc « À lire aussi ». Ne pas les rediriger.

## Publier une nouvelle ressource

1. Créer `public/ressources/<slug>/index.html` en partant d'une ressource existante
   (gabarit, formulaire lead, bloc conversion).
2. L'ajouter à `public/ressources/index.html` (le hub) et à `public/sitemap.xml`.
3. Ajouter le slug à un thème de `CLUSTERS` dans `scripts/maillage_ressources.py`, puis lancer
   `python3 scripts/maillage_ressources.py public/ressources` (blocs « À lire aussi »).
4. Lancer `uv run --with pillow python3 scripts/seo_ressources.py` : il sort les images intégrées en
   base64 dans `public/ressources/img/` (avec leurs dimensions, pour que la hauteur de `main.resource`
   ne bouge pas), crée l'image d'aperçu `public/ressources/og/<slug>.jpg`, écrit les balises d'aperçu et
   les données structurées entre `<!-- seo:debut -->` et `<!-- seo:fin -->`, et régénère `public/llms.txt`.
   Ne rien écrire à la main entre ces deux marqueurs : le script les réécrit.
   Les dates de publication et de mise à jour viennent de git : un commit purement technique qui
   touche beaucoup de ressources commence par « SEO : » pour qu'elles ne soient pas datées du jour.
5. `npm run build`, vérifier la page, puis commit et push après validation d'Ugo.

## Blog (/blog)

Un article = un fichier `content/blog/<slug>.md` : en-tête YAML (titre, description, date,
categorie, mot_cle, offre, brouillon, faq) puis le texte en Markdown. Le plugin
`noesis-blog-markdown` de `vite.config.ts` le convertit en HTML au build ; `src/blog/articles.ts`
liste les articles, `src/pages/blog/` contient l'accueil du blog et le modèle d'article (sommaire,
FAQ, appel à l'action qui ouvre la fenêtre « Parlons de votre projet », articles liés, données
structurées BlogPosting + fil d'Ariane + FAQ).

Publier un article :
1. Copier `content/blog/_modele.md` (jamais publié, comme tout fichier `_*.md`) en
   `content/blog/<slug>.md`, avec `brouillon: true`.
2. Relire en local : `npm run dev`, puis `/blog/<slug>` (les brouillons ne sont visibles qu'en local).
3. Passer `brouillon: false`, puis lancer `uv run --with pillow python3 scripts/seo_ressources.py` :
   image d'aperçu `public/og/blog/<slug>.jpg`, entrées du plan du site entre
   `<!-- blog:debut -->` et `<!-- blog:fin -->`, section Blog de `public/llms.txt`.
4. `npm run build`, vérifier, puis commit et push après validation d'Ugo.

Règles d'écriture : vouvoiement (public de dirigeants), aucun tiret cadratin, aucun nom de client,
une réponse claire dès le premier paragraphe, un lien vers l'offre concernée. Le blog est en
ligne depuis le 14/11/2026 (lien « Blog » dans le menu et le pied de page). Écrire les montants avec
des espaces insécables (2 500 €) pour qu'ils ne se coupent pas en fin de ligne.

## Balises des pages du site React

Titre, description, canonical, aperçus et données structurées passent par le composant
`src/components/Seo.tsx` (une seule source par page) ; `index.html` n'en contient plus. Les images
d'aperçu des pages sont dans `public/og/` (générées par le même script).

## Liens vers les ressources depuis le site React

`/ressources` est servi en statique : un `<Link>` du routeur afficherait la 404 du site.
Utiliser un `<a href>` classique, ou `<Button href="/ressources" reload>`.
