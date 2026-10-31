"""Injecte un bloc « À lire aussi » (4 ressources du même thème + lien vers /ressources)
juste APRÈS </main> de chaque ressource : hors de main.resource, donc sans effet sur
le déclenchement du formulaire lead (calculé sur la hauteur de main.resource).
Idempotent : un bloc déjà présent (entre les marqueurs) est remplacé.

Usage : python3 scripts/maillage_ressources.py public/ressources [--dry]
Nouvelle ressource : l'ajouter à un thème de CLUSTERS, sinon le script s'arrête et la liste."""
import re, sys, pathlib
from collections import Counter

root = pathlib.Path(sys.argv[1])  # .../public/ressources
dry = "--dry" in sys.argv

CLUSTERS = {
    "strategie": ["implementation-ia-parfaite", "implementer-ia-entreprise", "5-solutions", "cockpit-ia",
                  "boussole-ia", "diagnostic-ia", "score-ia-metier", "couts-ia", "posseder-son-ia", "ia-locale",
                  "logiciel-sur-mesure-ia", "presidio-sas-rgpd", "enterprise-managed-auth",
                  "panorama-2026-outils-ia", "carte-claude-2026", "chatgpt-ecosysteme-2026"],
    "metier": ["claude-de-ton-metier", "outil-metier-claude", "5-briques-claude-metier", "claude-excel-powerpoint",
               "claude-google-workspace", "claude-microsoft-365", "claude-crm", "compte-rendu-reunion-claude",
               "claude-balance-comptable", "paperasse-claude", "claude-legifrance", "analyse-cctp-claude",
               "btp-metre-devis-appel-offres", "tri-cv-claude-cowork", "agent-immo-claude", "agent-finances-finary",
               "claude-logiciels-sans-api", "sources-branchees-claude", "markitdown", "skills-claude-pme"],
    "usage": ["5-reglages-claude", "18-fonctions-claude", "claude-vs-cowork", "plugins-claude",
              "prompt-claude-honnete", "llm-council", "loop-claude-3-prompts", "audit-historique-claude",
              "claude-duet", "claude-regarde-videos", "claude-seo-10-outils", "skills-sh-trouver-skill-claude",
              "scanner-skills-ia"],
    "memoire": ["10-niveaux-memoire-entreprise", "memoire-entreprise", "memoire-ia", "5-etages-contexte-claude",
                "llm-wiki", "second-cerveau-claude", "claude-obsidian-boucles", "agent-curator"],
    "dev": ["claude-code-bonnes-pratiques", "memo-claude-code", "prompts-claude-code", "unlazy-claude-code",
            "speckit", "mods-claude-code", "codex-orchestration", "kimi-agent-swarm", "outils-securite-vibe-coding",
            "claudetube", "chatcut-claude-code", "audit-stockage-mac", "kumar-method"],
    "agents": ["6-agents-ia-claude", "3-paliers-agents-ia", "guide-automatisation-2026", "150-templates-n8n-claude",
               "hermes-cloud", "hermes-agent-cloud", "carte-hermes-agent", "hermes-17-prompts",
               "hermes-automation-templates", "hermes-livrables-office", "agent-ia-whatsapp-production",
               "agent-whatsapp-claude-kapso", "whatsapp-registres-etat", "agent-reach", "cowork-sans-toi"],
    "clients": ["16-canaux-acquisition", "7-canaux-clients-ia", "attirer-clients-sans-demarcher",
                "prospects-google-maps", "scrapegraph-prospection", "scraping-open-source", "obscura-scraper",
                "linkedin-skills-claude", "monetiser-competences-ia", "niches-ia-2026", "marche-formation-conseil-ia"],
}
N_RELATED = 4
START = "<!-- ============ À LIRE AUSSI : maillage interne ============ -->"
END = "<!-- ============ /À LIRE AUSSI ============ -->"
LINK = 'style="color:var(--ink);text-decoration:underline;text-underline-offset:3px"'

pages = sorted(p.parent.name for p in root.glob("*/index.html"))
targets = [s for s in pages if not s.endswith("-instagram")]  # tunnel Instagram : on n'y touche pas
assigned = [s for c in CLUSTERS.values() for s in c]
dups = [s for s, n in Counter(assigned).items() if n > 1]
missing = sorted(set(targets) - set(assigned))
unknown = sorted(set(assigned) - set(targets))
assert not dups and not missing and not unknown, (dups, missing, unknown)


def title_of(slug):
    html = (root / slug / "index.html").read_text(encoding="utf-8")
    t = re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()
    return re.sub(r"\s*[—·|-]\s*NoesisAI.*$", "", t)


titles = {s: title_of(s) for s in targets}
inbound = Counter()
for cluster in CLUSTERS.values():
    for i, slug in enumerate(cluster):
        # Voisins suivants dans le thème (en boucle) : chaque page reçoit autant de liens qu'elle en donne.
        related = [cluster[(i + k) % len(cluster)] for k in range(1, min(N_RELATED, len(cluster) - 1) + 1)]
        inbound.update(related)
        items = "\n".join(f'    <li><a href="/ressources/{r}" {LINK}>{titles[r]}</a></li>' for r in related)
        block = (f'{START}\n<nav class="resource" aria-label="À lire aussi"><div class="wrap">\n'
                 f'  <h2>À lire aussi</h2>\n  <ul>\n{items}\n  </ul>\n'
                 f'  <p><a href="/ressources" {LINK}>Toutes les ressources NoesisAI →</a></p>\n'
                 f'</div></nav>\n{END}\n')
        path = root / slug / "index.html"
        html = path.read_text(encoding="utf-8")
        html = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\n", "", html, flags=re.S)
        assert html.count("</main>") == 1, slug
        html = html.replace("</main>\n", "</main>\n\n" + block, 1)
        if not dry:
            path.write_text(html, encoding="utf-8")

print(f"{len(targets)} ressources traitées, liens entrants par page : min {min(inbound.values())}, max {max(inbound.values())}")
