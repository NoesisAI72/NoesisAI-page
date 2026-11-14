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

## Balises des pages du site React

Titre, description, canonical, aperçus et données structurées passent par le composant
`src/components/Seo.tsx` (une seule source par page) ; `index.html` n'en contient plus. Les images
d'aperçu des pages sont dans `public/og/` (générées par le même script).

## Liens vers les ressources depuis le site React

`/ressources` est servi en statique : un `<Link>` du routeur afficherait la 404 du site.
Utiliser un `<a href>` classique, ou `<Button href="/ressources" reload>`.
