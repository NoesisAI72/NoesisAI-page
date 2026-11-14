"""SEO des ressources statiques (public/ressources/<slug>/index.html).

    uv run --with pillow python3 scripts/seo_ressources.py            # tout
    uv run --with pillow python3 scripts/seo_ressources.py --sans-images-og

À relancer après chaque nouvelle ressource. Le script est idempotent :
  1. sort les images intégrées en base64 dans des fichiers partagés (public/ressources/img/),
     ce qui allège chaque page ; les images du contenu reçoivent leurs dimensions pour que la
     hauteur de main.resource (et donc le déclenchement du formulaire à 48 %) ne bouge pas ;
  2. génère une image d'aperçu 1200 x 630 par ressource (public/ressources/og/<slug>.jpg) ;
  3. écrit dans le <head>, entre <!-- seo:debut --> et <!-- seo:fin -->, les balises d'aperçu
     (og:image, og:url, twitter:*) et les données structurées Article + fil d'Ariane ;
  4. régénère public/llms.txt (sommaire du site pour les assistants IA) ;
  5. blog (content/blog/*.md publiés) : image d'aperçu public/og/blog/<slug>.jpg et entrées du
     plan du site entre <!-- blog:debut --> et <!-- blog:fin --> dans public/sitemap.xml.

Ne touche ni au <title> (il sert d'étiquette aux prospects dans Notion), ni au texte, ni au
script du formulaire.
"""
from __future__ import annotations

import base64
import hashlib
import html
import io
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
RESS = RACINE / "public" / "ressources"
DOSSIER_IMG = RESS / "img"
DOSSIER_OG = RESS / "og"
SITE = "https://noesisai.fr"
LOGO = RACINE / "public" / "logos" / "noesis-mark.png"
AUTEUR = {"@type": "Person", "name": "Ugo Sartini",
          "url": "https://noesisai.fr/a-propos",
          "sameAs": ["https://www.linkedin.com/in/ugo-sartini-automatisation-ia/", "https://www.instagram.com/ugoia2025/"]}
EDITEUR = {"@type": "Organization", "name": "NoesisAI", "url": SITE + "/",
           "logo": {"@type": "ImageObject", "url": SITE + "/logos/noesis-mark.png", "width": 350, "height": 350}}
EXT = {"png": "png", "jpeg": "jpg", "jpg": "jpg", "webp": "webp", "gif": "gif", "svg+xml": "svg", "avif": "avif"}
DEBUT, FIN = "<!-- seo:debut -->", "<!-- seo:fin -->"


# ------------------------------------------------------------------ lecture

def lire_meta(h: str, nom: str) -> str:
    m = re.search(rf'<meta[^>]+(?:name|property)=["\']{re.escape(nom)}["\'][^>]*content=(["\'])(.*?)\1', h, flags=re.I | re.S) \
        or re.search(rf'<meta[^>]+content=(["\'])(.*?)\1[^>]*(?:name|property)=["\']{re.escape(nom)}["\']', h, flags=re.I | re.S)
    return html.unescape(m.group(2)).strip() if m else ""


def titre_court(h: str) -> str:
    m = re.search(r"<title[^>]*>(.*?)</title>", h, flags=re.S | re.I)
    t = html.unescape(m.group(1)).strip() if m else ""
    return re.sub(r"\s*[-·|]\s*NoesisAI\s*$", "", t).strip()


def dates_git(chemin: Path) -> tuple:
    """(publication, dernière modification) d'après git. Les commits techniques « SEO : … » sont
    ignorés : ils touchent toutes les pages sans changer leur contenu."""
    def git(*args):
        r = subprocess.run(["git", "log", *args, "--format=%cs|%s", "--", str(chemin.relative_to(RACINE))],
                           cwd=RACINE, capture_output=True, text=True)
        lignes = [l.split("|", 1) for l in r.stdout.splitlines() if "|" in l]
        contenu = [d for d, sujet in lignes if not sujet.startswith("SEO :")]
        return contenu or [d for d, _ in lignes]
    toutes = git("--follow")
    jour = date.today().isoformat()
    return (toutes[-1] if toutes else jour, toutes[0] if toutes else jour)


# ------------------------------------------------------------------ 1. images intégrées

def taille_image(octets: bytes):
    try:
        from PIL import Image
        with Image.open(io.BytesIO(octets)) as im:
            return im.size
    except Exception:
        return None


def sortir_images(h: str) -> tuple:
    """Remplace chaque data:image;base64 par un fichier partagé. Renvoie (html, nb_images)."""
    debut_main, fin_main = h.find('<main class="resource"'), h.find("</main>")
    compte = {"n": 0}
    premiere_du_contenu = {"vue": False}

    def fichier(type_img: str, donnees: str) -> tuple:
        brut = base64.b64decode(donnees)
        nom = hashlib.md5(brut).hexdigest()[:12] + "." + EXT.get(type_img.lower(), "png")
        cible = DOSSIER_IMG / nom
        if not cible.exists():
            DOSSIER_IMG.mkdir(parents=True, exist_ok=True)
            cible.write_bytes(brut)
        compte["n"] += 1
        return "/ressources/img/" + nom, brut

    def balise(m: re.Match) -> str:
        tag = m.group(0)
        d = re.search(r'src=(["\'])data:image/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)\1', tag)
        if not d:
            return tag
        url, brut = fichier(d.group(2), re.sub(r"\s", "", d.group(3)))
        tag = tag.replace(d.group(0), f'src="{url}"')
        dans_contenu = debut_main < m.start() < fin_main
        if dans_contenu:
            # Dimensions réservées : la hauteur de main.resource reste la même avant chargement.
            dims = taille_image(brut)
            if dims and not re.search(r"\swidth=", tag) and not re.search(r"\sheight=", tag):
                tag = tag.replace("<img", f'<img width="{dims[0]}" height="{dims[1]}"', 1)
                style = re.search(r'style=(["\'])(.*?)\1', tag, flags=re.S)
                if style and "height" not in style.group(2):
                    tag = tag.replace(style.group(0), f'style="{style.group(2).rstrip(";")};height:auto"')
                elif not style:
                    tag = tag.replace("<img", '<img style="height:auto"', 1)
            if premiere_du_contenu["vue"] and "loading=" not in tag:
                tag = tag.replace("<img", '<img loading="lazy"', 1)
            premiere_du_contenu["vue"] = True
        elif "loading=" not in tag:
            tag = tag.replace("<img", '<img loading="lazy" decoding="async"', 1)
        return tag

    h = re.sub(r"<img\b[^>]*>", balise, h, flags=re.I | re.S)

    def fond(m: re.Match) -> str:
        url, _ = fichier(m.group(2), re.sub(r"\s", "", m.group(3)))
        return f'url("{url}")'

    h = re.sub(r'url\(\s*(["\']?)data:image/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)\1\s*\)', fond, h)
    return h, compte["n"]


# ------------------------------------------------------------------ 2. image d'aperçu

def image_og(slug: str, titre: str, forcer: bool = False, dossier: Path = DOSSIER_OG,
             etiquette: str = "RESSOURCE GRATUITE", pied: str = "noesisai.fr/ressources") -> None:
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
    cible = dossier / f"{slug}.jpg"
    manifeste_path = dossier / "manifeste.json"
    manifeste = json.loads(manifeste_path.read_text()) if manifeste_path.exists() else {}
    empreinte = hashlib.md5((titre + etiquette + pied).encode()).hexdigest()
    if cible.exists() and manifeste.get(slug) == empreinte and not forcer:
        return
    W, H = 1200, 630
    police = "/System/Library/Fonts/Avenir Next.ttc"
    img = Image.new("RGB", (W, H), (7, 10, 18))
    halo = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(halo)
    d.ellipse((760, -260, 1460, 420), fill=(33, 120, 255))
    d.ellipse((900, 260, 1500, 860), fill=(139, 92, 246))
    halo = halo.filter(ImageFilter.GaussianBlur(170))
    img = Image.blend(img, halo, 0.42)
    d = ImageDraw.Draw(img)
    logo = Image.open(LOGO).convert("RGBA").resize((76, 76), Image.LANCZOS)
    img.paste(logo, (64, 52), logo)
    d.text((156, 66), "NoesisAI", font=ImageFont.truetype(police, 36, index=2), fill=(234, 238, 247))
    d.text((64, 172), etiquette, font=ImageFont.truetype(police, 24, index=2), fill=(139, 160, 255))

    def lignes(taille: int):
        f = ImageFont.truetype(police, taille, index=0)
        res = []
        # Retour à la ligne après les deux-points : « Métré, devis, appel d'offres : » / « le guide BTP »
        morceaux = [p.strip() for p in re.split(r"(?<= :)\s+", titre) if p.strip()]
        for morceau in morceaux:
            cur = ""
            for m in morceau.split():
                essai = (cur + " " + m).strip()
                if d.textlength(essai, font=f) <= W - 128:
                    cur = essai
                else:
                    res.append(cur)
                    cur = m
            res.append(cur)
        return f, res

    taille = 68
    f, ls = lignes(taille)
    while (len(ls) > 4 or (len(ls) > 3 and taille > 52)) and taille > 44:
        taille -= 4
        f, ls = lignes(taille)
    y = 214
    for l in ls[:4]:
        d.text((64, y), l, font=f, fill=(255, 255, 255))
        y += int(taille * 1.18)
    d.text((64, 556), pied, font=ImageFont.truetype(police, 26, index=5), fill=(154, 166, 190))
    barre = Image.new("RGB", (W, 8))
    for x in range(W):
        t = x / (W - 1)
        barre.paste((int(33 + (139 - 33) * t), int(182 + (92 - 182) * t), int(255 + (246 - 255) * t)), (x, 0, x + 1, 8))
    img.paste(barre, (0, H - 8))
    dossier.mkdir(parents=True, exist_ok=True)
    img.save(cible, "JPEG", quality=84, optimize=True, progressive=True)
    manifeste[slug] = empreinte
    manifeste_path.write_text(json.dumps(dict(sorted(manifeste.items())), indent=1, ensure_ascii=False) + "\n")


# ------------------------------------------------------------------ 3. balises du <head>

def bloc_head(h: str, slug: str, url: str, titre: str, description: str, noindex: bool, hub: bool) -> str:
    image = f"{SITE}/ressources/og/{slug}.jpg"
    hors_bloc = re.sub(re.escape(DEBUT) + r".*?" + re.escape(FIN), "", h, flags=re.S)
    def manque(prop: str) -> bool:
        return not re.search(rf'(?:property|name)=["\']{re.escape(prop)}["\']', hors_bloc, flags=re.I)
    esc = lambda s: html.escape(s, quote=True)
    L = [DEBUT]
    if manque("og:type"):
        L.append(f'<meta property="og:type" content="{"website" if hub else "article"}">')
    if manque("og:title"):
        L.append(f'<meta property="og:title" content="{esc(titre)}">')
    if manque("og:description") and description:
        L.append(f'<meta property="og:description" content="{esc(description)}">')
    voulues = [("og:url", f'<meta property="og:url" content="{url}">'),
               ("og:site_name", '<meta property="og:site_name" content="NoesisAI">'),
               ("og:locale", '<meta property="og:locale" content="fr_FR">'),
               ("og:image", f'<meta property="og:image" content="{image}">'),
               ("og:image:width", '<meta property="og:image:width" content="1200">'),
               ("og:image:height", '<meta property="og:image:height" content="630">'),
               ("og:image:alt", f'<meta property="og:image:alt" content="{esc(titre)}">'),
               ("twitter:card", '<meta name="twitter:card" content="summary_large_image">'),
               ("twitter:title", f'<meta name="twitter:title" content="{esc(titre)}">')]
    if description:
        voulues.append(("twitter:description", f'<meta name="twitter:description" content="{esc(description)}">'))
    voulues.append(("twitter:image", f'<meta name="twitter:image" content="{image}">'))
    # Seulement ce que la page n'a pas déjà : jamais de balise en double.
    L += [balise for prop, balise in voulues if manque(prop)]
    if not noindex:
        publie, modifie = dates_git(RESS / slug / "index.html") if not hub else dates_git(RESS / "index.html")
        fil = {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Accueil", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Ressources", "item": SITE + "/ressources"}]}
        if hub:
            page = {"@type": "CollectionPage", "@id": url + "#page", "url": url, "name": titre,
                    "description": description, "inLanguage": "fr-FR", "isPartOf": {"@id": SITE + "/#site"},
                    "publisher": EDITEUR, "image": image}
            fil["itemListElement"] = fil["itemListElement"][:2]
        else:
            page = {"@type": "Article", "@id": url + "#article", "headline": titre[:110], "description": description,
                    "image": image, "url": url, "mainEntityOfPage": url, "inLanguage": "fr-FR",
                    "datePublished": publie, "dateModified": modifie, "author": AUTEUR, "publisher": EDITEUR,
                    "isAccessibleForFree": True}
            fil["itemListElement"].append({"@type": "ListItem", "position": 3, "name": titre, "item": url})
        graphe = {"@context": "https://schema.org", "@graph": [page, fil]}
        L.append('<script type="application/ld+json">' + json.dumps(graphe, ensure_ascii=False) + "</script>")
    L.append(FIN)
    bloc = "\n".join(L)
    if DEBUT in h:
        return re.sub(re.escape(DEBUT) + r".*?" + re.escape(FIN), lambda _: bloc, h, flags=re.S)
    return h.replace("</head>", bloc + "\n</head>", 1)


# ------------------------------------------------------------------ 4. llms.txt

# Faits officiels sur l'agence : même fichier que le bloc « NoesisAI en bref » de /a-propos,
# la fiche d'entreprise des données structurées et les mentions légales.
IDENTITE_LLMS = {k: (v.replace("\u00a0", " ") if isinstance(v, str) else v)
                 for k, v in json.loads((RACINE / "src" / "data" / "identite.json").read_text(encoding="utf-8")).items()}


def rempli(v) -> bool:
    """Champ renseigné : ni vide (« ne s'applique pas ») ni « À compléter »."""
    return isinstance(v, str) and v.strip() != "" and not v.strip().lower().startswith("à compléter")


def bloc_en_bref() -> list:
    i = IDENTITE_LLMS
    s = i["societe"]
    L = ["## En bref", "",
         f"- Création : {i['creation']['texte']}, par {i['fondateur']['nom']} ({i['fondateur']['role']})"]
    if rempli(s.get("raison_sociale")):
        L.append(f"- Société : {s['raison_sociale']}" + (f", SIREN {s['siren']}" if rempli(s.get("siren")) else ""))
    L += [f"- Clients : {i['clients']} ({', '.join(i['zone'])})",
          f"- Références : {i['references']}",
          f"- Délai : {i['delai']}"]
    for o in i["offres"]:
        fr = lambda n: f"{n:,}".replace(",", " ")
        prix = (f" ; prix : de {fr(o['prix_min'])} à environ {fr(o['prix_max'])} €"
                + (f", {o['prix_note']}" if o.get("prix_note") else "")) if o.get("prix_min") and o.get("prix_max") else ""
        L.append(f"- {o['nom']} ({SITE}{o['chemin']}) : {o['texte']}{prix}")
    L += [f"- Contact : {i['contact']['email']}, {i['contact']['rendez_vous']}", "",
          f"Comment citer NoesisAI : « {i['citation']} »", "",
          f"Fiche complète (mise à jour : {i['mise_a_jour']}) : {SITE}/a-propos#en-bref", ""]
    return L


def llms_txt(pages: list) -> None:
    offres = [
        ("Automatisation IA et agents vocaux", "/automatisation", "workflows n8n et Make, agents vocaux qui décrochent 24 h/24"),
        ("Logiciel sur mesure pour PME", "/logiciel-metier", "devis, chantiers, heures, factures, avec l'IA intégrée"),
        ("Formation IA en entreprise (Cockpit IA)", "/formation-ia", "former dirigeants et équipes à Claude et aux outils d'IA"),
        ("Projets clients", "/projets", "réalisations détaillées par type de mission"),
        ("Témoignages", "/temoignages", "avis des entreprises accompagnées"),
        ("À propos", "/a-propos", "l'agence, son fondateur Ugo Sartini et son équipe"),
    ]
    L = ["# NoesisAI", "", f"> {IDENTITE_LLMS['une_phrase']}", ""] + bloc_en_bref() + ["## Offres", ""]
    L += [f"- [{n}]({SITE}{p}): {d}" for n, p, d in offres]
    articles = articles_blog()
    if articles:
        L += ["", "## Blog", ""]
        L += [f"- [{a['titre']}]({SITE}/blog/{a['slug']}): {a['description'][:160]}" for a in articles]
    L += ["", "## Ressources gratuites", ""]
    for p in sorted(pages, key=lambda x: x["titre"].lower()):
        if p["noindex"] or p["hub"]:
            continue
        desc = re.sub(r"^Ressource gratuite NoesisAI\s*:\s*", "", p["description"])
        L.append(f"- [{p['titre']}]({p['url']}): {desc[:160].rstrip()}")
    (RACINE / "public" / "llms.txt").write_text("\n".join(L) + "\n", encoding="utf-8")


# ------------------------------------------------------------------ images des pages du site

PAGES_SITE = {
    "blog": "Le blog NoesisAI : l'IA appliquée aux PME",
    "accueil": "Agents IA, automatisations et logiciels métier pour PME",
    "automatisation": "Automatisations IA et agents vocaux qui décrochent 24 h/24",
    "formation-ia": "Le Cockpit IA : former vos équipes à l'IA en 3 mois",
    "logiciel-metier": "Un logiciel sur mesure pour votre PME, construit autour de votre métier",
    "projets": "Nos projets clients : logiciels métier, agents vocaux, automatisations",
    "temoignages": "Ce que disent les entreprises que nous accompagnons",
    "a-propos": "L'agence NoesisAI et son fondateur, Ugo Sartini",
}


def images_pages_site(forcer: bool = False) -> None:
    for nom, titre in PAGES_SITE.items():
        image_og(nom, titre, forcer=forcer, dossier=RACINE / "public" / "og",
                 etiquette="AGENCE IA POUR LES PME", pied="noesisai.fr")


# ------------------------------------------------------------------ blog

BLOG = RACINE / "content" / "blog"
CATEGORIES_BLOG = {"automatisation": "AUTOMATISATION", "agents-vocaux": "AGENTS VOCAUX",
                   "logiciel-metier": "LOGICIEL MÉTIER", "formation": "FORMATION IA", "ia-par-metier": "IA PAR MÉTIER"}


def articles_blog() -> list:
    """Articles publiés : ni brouillon, ni modèle (_*.md). Lecture simple de l'en-tête YAML."""
    res = []
    for f in sorted(BLOG.glob("*.md")) if BLOG.exists() else []:
        if f.name.startswith("_"):
            continue
        m = re.match(r"^---\r?\n(.*?)\r?\n---", f.read_text(encoding="utf-8"), flags=re.S)
        if not m:
            continue
        def champ(nom: str) -> str:
            mm = re.search(rf'^{nom}:\s*(?:"(.*?)"|([^#\n]*?))\s*(?:#.*)?$', m.group(1), flags=re.M)
            return ((mm.group(1) if mm and mm.group(1) is not None else (mm.group(2) if mm else "")) or "").strip()
        if champ("brouillon").lower() == "true":
            continue
        res.append({"slug": f.stem, "titre": champ("titre"), "description": champ("description"),
                    "date": champ("date")[:10], "maj": champ("maj")[:10], "categorie": champ("categorie")})
    return res


def blog(articles: list, forcer: bool = False, images: bool = True) -> None:
    if images:
        for a in articles:
            image_og(a["slug"], a["titre"], forcer=forcer, dossier=RACINE / "public" / "og" / "blog",
                     etiquette=CATEGORIES_BLOG.get(a["categorie"], "BLOG"), pied="noesisai.fr/blog")
    # Plan du site : /blog et chaque article, seulement s'il y a au moins un article publié.
    plan = RACINE / "public" / "sitemap.xml"
    x = plan.read_text(encoding="utf-8")
    x = re.sub(r"\n?\s*<!-- blog:debut -->.*?<!-- blog:fin -->", "", x, flags=re.S)
    if articles:
        dernier = max((a["maj"] or a["date"]) for a in articles)
        lignes = ["  <!-- blog:debut -->",
                  f"  <url>\n    <loc>{SITE}/blog</loc>\n    <lastmod>{dernier}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>"]
        for a in sorted(articles, key=lambda a: a["date"], reverse=True):
            lignes.append(f"  <url>\n    <loc>{SITE}/blog/{a['slug']}</loc>\n    <lastmod>{a['maj'] or a['date']}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>")
        lignes.append("  <!-- blog:fin -->")
        x = x.replace("</urlset>", "\n".join(lignes) + "\n</urlset>", 1)
    plan.write_text(x, encoding="utf-8")


# ------------------------------------------------------------------ main

def main(argv: list) -> None:
    fichiers = sorted(RESS.glob("*/index.html")) + [RESS / "index.html"]
    avant = apres = n_img = 0
    pages = []
    for f in fichiers:
        if f.parent.name in ("img", "og"):
            continue
        h = f.read_text(encoding="utf-8")
        avant += len(h.encode())
        hub = f == RESS / "index.html"
        slug = "ressources" if hub else f.parent.name
        titre = titre_court(h)
        description = lire_meta(h, "description")
        canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', h, flags=re.I)
        url = canon.group(1) if canon else (f"{SITE}/ressources" if hub else f"{SITE}/ressources/{slug}")
        noindex = "noindex" in lire_meta(h, "robots").lower()
        h, n = sortir_images(h)
        n_img += n
        if "--sans-images-og" not in argv:
            image_og(slug, "Toutes les ressources IA gratuites" if hub else titre, forcer="--forcer-og" in argv)
        h = bloc_head(h, slug, url, titre, description, noindex, hub)
        f.write_text(h, encoding="utf-8")
        apres += len(h.encode())
        pages.append({"slug": slug, "titre": titre, "description": description, "url": url, "noindex": noindex, "hub": hub})
    llms_txt(pages)
    if "--sans-images-og" not in argv:
        images_pages_site(forcer="--forcer-og" in argv)
    blog(articles_blog(), forcer="--forcer-og" in argv, images="--sans-images-og" not in argv)
    print(f"{len(pages)} pages, {n_img} images sorties du HTML, poids total {avant // 1024} Ko -> {apres // 1024} Ko")


if __name__ == "__main__":
    main(sys.argv[1:])
