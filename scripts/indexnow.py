#!/usr/bin/env python3
"""Signale les pages nouvelles ou modifiées à Bing et aux moteurs IndexNow (Bing, Yandex, Seznam, Naver).

Pourquoi : Bing alimente Copilot et une partie des recherches de ChatGPT. Une page signalée y entre en
quelques heures au lieu de plusieurs semaines. À lancer APRÈS le déploiement : les pages doivent être en ligne.

  python3 scripts/indexnow.py                              # toutes les URL du plan du site
  python3 scripts/indexnow.py /blog/agent-ia /a-propos     # seulement ces pages

La clé est publique par construction : le fichier public/8b94960c5d8aacc044d40265c50dc080.txt prouve que le site est à nous.
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SITE = "https://noesisai.fr"
CLE = "8b94960c5d8aacc044d40265c50dc080"


def urls_du_plan() -> list:
    xml = (RACINE / "public" / "sitemap.xml").read_text(encoding="utf-8")
    return re.findall(r"<loc>([^<]+)</loc>", xml)


def main(args: list) -> None:
    urls = [a if a.startswith("http") else SITE + a for a in args] or urls_du_plan()
    corps = json.dumps({"host": "noesisai.fr", "key": CLE, "keyLocation": f"{SITE}/{CLE}.txt", "urlList": urls})
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=corps.encode("utf-8"),
                                 headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    with urllib.request.urlopen(req, timeout=30) as r:
        print(f"IndexNow : réponse {r.status} pour {len(urls)} URL (200 ou 202 = reçu)")


if __name__ == "__main__":
    main(sys.argv[1:])
