---
titre: "Installer Claude Code : Windows, Mac, Linux, pas à pas"
description: "Une commande suffit pour installer Claude Code, mais il faut un abonnement payant. Commandes par système, erreurs fréquentes et bon choix pour une PME."
date: 2026-11-17
categorie: formation
mot_cle: "claude code install"
offre: /formation-ia
brouillon: false
faq:
  - q: "Claude Code est-il gratuit ?"
    r: "Non. Le logiciel s'installe gratuitement, mais il faut un compte Claude Pro, Max, Ultra, Team ou Enterprise, ou un compte Console payé à l'usage. En novembre 2026, l'offre gratuite de Claude ne donne pas accès à Claude Code ; l'offre la moins chère qui l'inclut est Pro, à 20 $ par mois hors taxes."
  - q: "Faut-il installer Node.js pour utiliser Claude Code ?"
    r: "Non, plus avec l'installeur recommandé. La commande native installe un programme autonome. Node.js 22 ou plus n'est nécessaire que si vous choisissez l'installation par npm, qui n'apporte rien de plus à un nouvel utilisateur."
  - q: "Comment installer Claude Code sur Windows ?"
    r: "Ouvrez PowerShell (sans droits administrateur) et lancez irm https://claude.ai/install.ps1 | iex, puis ouvrez une nouvelle fenêtre et tapez claude --version. Installer Git for Windows est recommandé pour que Claude Code puisse utiliser Bash ; sans lui, il passe par PowerShell."
  - q: "Quelle différence entre Claude Code dans le terminal et l'application de bureau ?"
    r: "C'est le même Claude Code. Le terminal convient à ceux qui sont à l'aise avec la ligne de commande ; l'application de bureau (onglet Code) offre une interface graphique, la relecture des modifications fichier par fichier et ne demande ni Node.js ni le terminal."
  - q: "Comment mettre à jour Claude Code ?"
    r: "L'installation native se met à jour seule en arrière-plan ; claude update force la mise à jour tout de suite. Les installations par Homebrew, WinGet, apt, dnf ou apk se mettent à jour avec la commande de leur gestionnaire de paquets."
---

Pour installer Claude Code, ouvrez un terminal et collez une seule commande : `curl -fsSL https://claude.ai/install.sh | bash` sur Mac et Linux, `irm https://claude.ai/install.ps1 | iex` dans PowerShell sur Windows. Lancez ensuite `claude` et connectez-vous. Le logiciel est gratuit, mais il exige un abonnement payant : Claude Pro à 20 $ par mois au minimum en novembre 2026.

> **En bref**
> - Commande d'installation sur Mac, Linux et WSL : `curl -fsSL https://claude.ai/install.sh | bash` ; sur Windows (PowerShell) : `irm https://claude.ai/install.ps1 | iex`.
> - Systèmes acceptés : macOS 13 ou plus, Windows 10 version 1809 ou plus, Ubuntu 20.04+, Debian 10+, avec 4 Go de mémoire vive.
> - Compte requis : Pro, Max, Ultra, Team ou Enterprise ; l'offre gratuite de Claude n'inclut pas Claude Code (tarifs vérifiés le 17/11/2026).
> - Node.js n'est plus nécessaire avec l'installeur natif, qui se met à jour tout seul.
> - Sans terminal : l'application de bureau Claude (onglet Code) ou l'extension VS Code donnent accès au même outil.

## Ce qu'il faut avant d'installer Claude Code

Claude Code est l'assistant d'Anthropic qui travaille directement dans les fichiers de votre ordinateur : il lit un dossier, écrit du code ou des documents, lance des commandes et vous montre ce qu'il a changé. Avant de l'installer, vérifiez trois points.

**Le système.** D'après la [page d'installation officielle](https://code.claude.com/docs/fr/setup), Claude Code fonctionne sur macOS 13.0 ou plus récent, Windows 10 version 1809 ou plus récent (et Windows Server 2019), Ubuntu 20.04+, Debian 10+ et Alpine Linux 3.19+. Il faut 4 Go de mémoire vive, un processeur x64 ou ARM64 et une connexion internet. La France fait partie des [pays couverts par Anthropic](https://www.anthropic.com/supported-countries).

**Les droits.** Sur Windows, l'installation ne demande pas de droits administrateur. Sur Mac et Linux, n'utilisez jamais `sudo` : la documentation le déconseille, car une installation faite en administrateur ne peut plus se mettre à jour seule.

**Le compte.** C'est le point que les tutoriels oublient. Claude Code demande un compte Claude payant ou un compte Console (paiement à l'usage, par l'API). Voici les offres sur la [page des tarifs de Claude](https://claude.com/pricing), relevées le 17 novembre 2026 :

| Offre | Prix (hors taxes) | Claude Code | Pour qui |
|---|---|---|---|
| Free | 0 $ | non | découvrir Claude en conversation |
| Pro | 20 $ par mois (17 $ par mois en annuel, 200 $ payés d'avance) | oui | un utilisateur, usage régulier |
| Max | 100 $ par mois (5 fois l'usage de Pro) | oui | un usage intensif |
| Ultra | 200 $ par mois | oui | un usage très intensif |
| Team, siège Standard | 25 $ par siège et par mois (20 $ en annuel) | oui | une équipe, facturation et administration communes |
| Team, siège Premium | 125 $ par siège et par mois (100 $ en annuel) | oui | les gros utilisateurs d'une équipe |
| Enterprise | 20 $ par siège et par mois en annuel, plus l'usage au tarif de l'API, 20 sièges minimum | oui | les grandes structures |

Pour un premier essai, Pro suffit. Si plusieurs personnes de l'entreprise s'y mettent, Team évite les cartes bancaires personnelles et permet de gérer les accès.

## Terminal, application de bureau ou VS Code : laquelle installer ?

Les recherches « claude code desktop » et « claude code terminal vs desktop app » montrent que la question se pose souvent. C'est le même Claude Code derrière les trois portes ; seule l'interface change.

| Votre situation | Ce qu'il faut installer | Pourquoi |
|---|---|---|
| Vous n'avez jamais ouvert un terminal | l'application de bureau Claude, onglet **Code** | interface graphique, rien d'autre à installer |
| Vous travaillez déjà dans VS Code ou Cursor | l'extension **Claude Code** de l'éditeur | Claude Code dans un panneau à côté de vos fichiers |
| Vous voulez automatiser, planifier, lancer des tâches en série | le terminal (installation native) | toutes les options, les scripts, les commandes `claude -p` |
| Vous êtes sur Windows avec des outils Linux | le terminal dans WSL 2 | l'environnement Linux complet, et l'isolement des commandes (sandbox) |
| Une équipe mixte (direction, opérationnels, développeurs) | application pour les uns, terminal pour les autres | le même compte, la même mémoire de projet (`CLAUDE.md`) |

**L'application de bureau.** Selon le [guide de démarrage de l'application](https://code.claude.com/docs/fr/desktop-quickstart), elle existe pour macOS (Intel et Apple Silicon), Windows (x64 et ARM64) et Linux en version bêta (Ubuntu et Debian). Elle inclut Claude Code : pas besoin de Node.js ni du programme en ligne de commande. Téléchargez-la, connectez-vous, cliquez sur l'onglet Code, choisissez un dossier.

**L'extension VS Code.** D'après la [documentation de l'extension](https://code.claude.com/docs/fr/vs-code), il faut VS Code 1.94.0 ou plus récent. Ouvrez le panneau des extensions (Ctrl+Maj+X sur Windows et Linux, Cmd+Maj+X sur Mac), cherchez « Claude Code » et installez celle d'Anthropic. Elle fonctionne aussi dans Cursor. Attention : l'extension embarque sa propre copie et n'ajoute pas la commande `claude` au terminal. Pour taper `claude` dans le terminal intégré, il faut en plus l'installation ci-dessous.

## Installer Claude Code sur Mac

1. Ouvrez l'application **Terminal** (Cmd+Espace, tapez « Terminal »).
2. Collez cette commande et validez :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

3. Patientez : l'installeur n'affiche pas de progression pendant le téléchargement.
4. Fermez le Terminal, rouvrez-en un, puis tapez `claude --version`. Un numéro de version suivi de « (Claude Code) » confirme l'installation.

**Avec Homebrew**, si vous l'utilisez déjà : `brew install --cask claude-code`. Ce paquet suit le canal « stable », environ une semaine derrière les dernières nouveautés. Il ne se met pas à jour tout seul : lancez `brew upgrade claude-code` de temps en temps.

## Installer Claude Code sur Windows

Windows propose deux terminaux, et la moitié des échecs vient d'une commande collée dans le mauvais. Regardez le début de la ligne : `PS C:\Users\...>` signifie PowerShell, `C:\Users\...>` sans « PS » signifie l'invite de commandes (CMD).

### Dans PowerShell (le plus simple)

1. Menu Démarrer, tapez « PowerShell », ouvrez **Windows PowerShell** (pas besoin de « Exécuter en tant qu'administrateur »).
2. Collez :

```powershell
irm https://claude.ai/install.ps1 | iex
```

3. Ouvrez une nouvelle fenêtre PowerShell et tapez `claude --version`.

### Dans l'invite de commandes (CMD)

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### Avec WinGet

```powershell
winget install Anthropic.ClaudeCode
```

Comme Homebrew, WinGet ne met pas Claude Code à jour tout seul : `winget upgrade Anthropic.ClaudeCode` de temps en temps.

### Git for Windows : recommandé, pas obligatoire

La [page d'installation](https://code.claude.com/docs/fr/setup) recommande d'installer [Git for Windows](https://git-scm.com/downloads/win). Avec lui, Claude Code exécute ses commandes dans Git Bash ; sans lui, il passe par PowerShell. Pour un usage de bureau (documents, tableurs, rapports), PowerShell suffit. Pour du développement, installez Git.

### Dans WSL

Si vous utilisez déjà WSL (un Linux intégré à Windows), ouvrez votre distribution et lancez la commande Linux ci-dessous. Claude Code s'installe et se lance alors dans le terminal WSL, pas dans PowerShell.

## Installer Claude Code sur Linux (Ubuntu, Debian)

La même commande que sur Mac, dans votre terminal habituel :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Puis, dans un nouveau terminal : `claude --version`.

Sur un poste géré par un service informatique, Anthropic publie aussi des dépôts signés **apt** (Debian, Ubuntu), **dnf** (Fedora, RHEL) et **apk** (Alpine). Ils passent par les mises à jour habituelles du système, ce qui plaît aux administrateurs. La procédure, avec l'empreinte de la clé à vérifier, est dans la [documentation officielle](https://code.claude.com/docs/fr/setup). Sur Alpine, installez d'abord `bash` et `curl` (`apk add bash curl`).

**Et npm ?** Beaucoup de tutoriels donnent encore `npm install -g @anthropic-ai/claude-code`. Cela marche (Node.js 22 ou plus requis), mais n'apporte rien à un nouvel utilisateur : l'installeur natif est la méthode recommandée. Si vous passez par npm, jamais avec `sudo`.

## Vérifier l'installation et se connecter

Trois commandes, dans l'ordre :

1. `claude --version` : affiche le numéro de version. Si le terminal répond « command not found » ou « n'est pas reconnu », voyez le tableau des erreurs plus bas.
2. `claude doctor` : un diagnostic complet en lecture seule (état de l'installation, mises à jour, réglages mal écrits), sans ouvrir de session.
3. `claude`, lancé depuis le dossier où vous voulez travailler : au premier lancement, Claude Code ouvre votre navigateur pour vous connecter à votre compte Claude. La connexion est mémorisée ensuite.

Pour changer de compte plus tard, tapez `/login` dans la session. Le [guide de démarrage officiel](https://code.claude.com/docs/fr/quickstart) détaille les autres types de comptes (Console, Amazon Bedrock, Google Cloud, Microsoft Foundry).

## Les erreurs d'installation les plus fréquentes

Ce tableau reprend les messages relevés dans la [page de dépannage d'Anthropic](https://code.claude.com/docs/fr/troubleshoot-install), avec leur cause réelle.

| Ce que vous voyez | La cause | La solution |
|---|---|---|
| `command not found: claude` (Mac, Linux) | le dossier `~/.local/bin` n'est pas dans le PATH (la liste des dossiers où le terminal cherche les programmes) | ouvrez un nouveau terminal ; sinon, sur Mac : `echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc` puis `source ~/.zshrc` (sur Linux, remplacez `.zshrc` par `.bashrc`) |
| `'claude' n'est pas reconnu` (Windows) | le dossier `%USERPROFILE%\.local\bin` n'est pas dans le PATH | ouvrez une nouvelle fenêtre ; sinon ajoutez ce dossier au PATH utilisateur (commande donnée par l'installeur et dans la page de dépannage) |
| `The token '&&' is not a valid statement separator` | la commande CMD a été collée dans PowerShell | utilisez la commande PowerShell (`irm ... \| iex`) |
| `'irm' n'est pas reconnu` | la commande PowerShell a été collée dans CMD | ouvrez PowerShell, ou utilisez la commande CMD |
| `syntax error near unexpected token '<'` ou `System.Xml.XmlDocument` | l'adresse d'installation a renvoyé une page web au lieu du script (réseau, proxy, panne passagère) | réessayez quelques minutes plus tard, ou passez par Homebrew ou WinGet |
| `curl: (22) ... error: 403` | souvent un pare-feu ou un proxy d'entreprise ; « App unavailable in region » signifie un pays non couvert | demandez au service informatique d'autoriser les domaines d'Anthropic, ou essayez depuis un autre réseau |
| `claude` lance une ancienne version | deux installations coexistent (npm et native, par exemple) | gardez la native : `npm uninstall -g @anthropic-ai/claude-code` |

Dans une entreprise équipée d'un proxy ou d'un pare-feu, prévenez votre prestataire informatique avant de déployer.

## Mettre à jour et désinstaller Claude Code

**Mettre à jour.** L'installation native vérifie les mises à jour au démarrage et pendant l'utilisation, les télécharge en arrière-plan et les applique au lancement suivant. Pour forcer : `claude update`. Si vous préférez une version un peu plus éprouvée, choisissez le canal « stable » dans `/config` (réglage Auto-update channel) : il sert une version d'environ une semaine, sans les mises à jour qui ont posé problème.

**Désinstaller** (installation native) :

```bash
# Mac, Linux, WSL
rm -f ~/.local/bin/claude
rm -rf ~/.local/share/claude
```

```powershell
# Windows PowerShell
Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force
```

Vos réglages et votre historique restent dans le dossier `~/.claude` et le fichier `~/.claude.json`. Supprimez-les seulement si vous voulez repartir de zéro.

## Après l'installation : les 15 premières minutes

Une fois Claude Code ouvert dans un dossier, ne lui demandez pas tout de suite un gros travail. Faites-lui d'abord découvrir le terrain :

1. **Une question simple** : « Que contient ce dossier ? » Il lit les fichiers et résume.
2. **La commande `/init`** : elle crée un fichier `CLAUDE.md`, la mémoire du projet, que Claude Code relit à chaque session.
3. **Une petite tâche vérifiable** : « Renomme ces fichiers au format AAAA-MM-JJ » ou « Fais un tableau des factures de ce dossier ». Selon le mode d'autorisation choisi (Maj+Tab pour en changer), il demande votre accord avant d'agir.
4. **`/help`** et la touche `/` : la liste des commandes disponibles.

Le fichier `CLAUDE.md` est la brique la plus rentable : bien rempli, il vous évite de tout réexpliquer chaque matin. Gardez-le court (moins de 200 lignes). Voici un point de départ à copier et adapter pour un dossier de travail d'une PME :

```markdown
# Contexte
Dossier de travail de [nom de l'entreprise], [activité], [nombre] salariés.
Je suis [fonction]. Les documents servent à [clients, équipe, comptable].

# Règles
- Toujours en français, vouvoiement dans les documents destinés aux clients.
- Ne jamais supprimer un fichier : déplacer dans le dossier _archive.
- Demander avant d'envoyer, de publier ou de modifier un fichier d'origine.
- Les montants s'écrivent 2 500 € HT.

# Où trouver quoi
- devis/ : les devis en cours, un fichier par client.
- modeles/ : les modèles de documents à réutiliser.

# Ce que j'attends
Des réponses courtes, puis le détail si je le demande.
```

## Équiper une équipe : ce qui change

Installer Claude Code sur un poste prend cinq minutes. L'installer sur dix postes sans désordre demande trois décisions :

- **Un compte d'équipe.** Avec Team, l'entreprise paie, ajoute et retire les utilisateurs, sans cartes bancaires personnelles.
- **Une méthode d'installation unique.** Native partout (mises à jour automatiques), ou WinGet, apt, Homebrew si le service informatique veut garder la main sur les versions.
- **Un canal de mise à jour.** « stable » pour les postes de non-développeurs : une version rodée, une semaine après sa sortie.

Le reste se joue après : un `CLAUDE.md` commun par projet, les mêmes règles d'autorisation pour tous, et quelques commandes partagées. Notre [carte des bonnes pratiques Claude Code](/ressources/claude-code-bonnes-pratiques) détaille ces réglages.

## Notre avis

Pour une PME, l'installation n'est jamais le vrai obstacle : une commande, cinq minutes. Ce qui fait la différence, c'est ce qui suit. Nous recommandons de commencer par deux personnes motivées sur l'offre Pro, avec l'application de bureau pour ceux qui ne connaissent pas le terminal, sur un seul cas d'usage précis (préparer des devis, ranger des dossiers, produire un rapport mensuel). Après deux semaines, vous savez si le gain justifie de passer en Team pour toute l'équipe. Ce qu'il faut éviter : dix comptes ouverts le même jour, sans `CLAUDE.md` ni règles, et l'outil abandonné un mois plus tard. Si vous voulez aller plus vite, notre [formation Cockpit IA](/formation-ia) installe Claude Code avec votre équipe et la fait travailler sur vos propres dossiers. Et si vous vous demandez où s'arrête l'assistant et où commence l'agent, lisez notre article [Agent IA : définition, exemples et usages](/blog/agent-ia).

## À télécharger : le mémo des commandes Claude Code

Une fois Claude Code installé, gardez sous la main [le mémo Claude Code](/ressources/memo-claude-code) : toutes les commandes `/` classées par usage (contexte, modèle, qualité, configuration, diagnostic), chacune expliquée en une ligne.
