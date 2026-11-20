#!/usr/bin/env python3
"""Signale les pages nouvelles ou modifiées à Bing et aux moteurs IndexNow (Bing, Yandex, Seznam, Naver).

Pourquoi : Bing alimente Copilot et une partie des recherches de ChatGPT. Une page signalée y entre en
quelques heures au lieu de plusieurs semaines. À lancer APRÈS le déploiement : les pages doivent être en ligne.

  python3 scripts/indexnow.py                              # toutes les URL du plan du site
  python3 scripts/indexnow.py --recents 2                  # celles dont la date (lastmod) a moins de 2 jours
  python3 scripts/indexnow.py /blog/agent-ia /a-propos     # seulement ces pages
  ... --essai                                              # affiche la liste sans rien envoyer

Le mode --recents tourne tout seul après chaque mise en production (.github/workflows/indexnow.yml).
La clé est publique par construction : le fichier public/8b94960c5d8aacc044d40265c50dc080.txt prouve que le site est à nous.
"""
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SITE = "https://noesisai.fr"
CLE = "8b94960c5d8aacc044d40265c50dc080"


def plan_du_site() -> list:
    """(url, lastmod) de chaque page du plan du site ; lastmod vaut "" s'il manque."""
    xml = (RACINE / "public" / "sitemap.xml").read_text(encoding="utf-8")
    pages = []
    for bloc in re.findall(r"<url>(.*?)</url>", xml, re.S):
        loc = re.search(r"<loc>([^<]+)</loc>", bloc)
        mod = re.search(r"<lastmod>([^<]+)</lastmod>", bloc)
        if loc:
            pages.append((loc.group(1).strip(), mod.group(1).strip()[:10] if mod else ""))
    return pages


def main(args: list) -> None:
    essai = "--essai" in args
    args = [a for a in args if a != "--essai"]
    if args and args[0] == "--recents":
        jours = int(args[1]) if len(args) > 1 else 2
        limite = (datetime.now(timezone.utc) - timedelta(days=jours)).date().isoformat()
        urls = [u for u, mod in plan_du_site() if mod and mod >= limite]
        if not urls:
            print(f"IndexNow : aucune page datée du {limite} ou après, rien à signaler")
            return
    else:
        urls = [a if a.startswith("http") else SITE + a for a in args] or [u for u, _ in plan_du_site()]
    if essai:
        print(f"IndexNow (essai, rien n'est envoyé) : {len(urls)} URL")
        print("\n".join("  " + u for u in urls))
        return
    corps = json.dumps({"host": "noesisai.fr", "key": CLE, "keyLocation": f"{SITE}/{CLE}.txt", "urlList": urls})
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=corps.encode("utf-8"),
                                 headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f"IndexNow : réponse {r.status} pour {len(urls)} URL (200 ou 202 = reçu)")
    except urllib.error.HTTPError as e:
        # 400 requête mal formée, 403 clé refusée, 422 URL hors du site, 429 trop d'envois
        sys.exit(f"IndexNow : erreur {e.code} ({e.reason}) pour {len(urls)} URL")
    if len(urls) <= 20:
        print("\n".join("  " + u for u in urls))


if __name__ == "__main__":
    main(sys.argv[1:])
