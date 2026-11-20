---
titre: "Skills Claude : c'est quoi, les meilleures, en créer une"
description: "Une skill apprend à Claude une méthode qu'il applique seul. Définition, meilleures skills, installation et un modèle testé à copier pour votre PME."
date: 2026-11-20
categorie: formation
mot_cle: "claude skills"
offre: /formation-ia
brouillon: false
faq:
  - q: "Les skills Claude sont-elles gratuites ?"
    r: "Oui, d'après le centre d'aide d'Anthropic, les skills sont disponibles sur toutes les offres de claude.ai, gratuite comprise, à condition d'activer l'exécution de code. Claude Code et Cowork, en revanche, demandent un abonnement payant, à partir de Pro."
  - q: "Quelle différence entre une skill et un MCP ?"
    r: "Un MCP (Model Context Protocol) branche Claude sur un outil externe : votre CRM, Notion, votre messagerie. Une skill lui apprend une méthode : comment rédiger une relance, analyser un bilan, mettre en page une offre. Les deux se combinent : le MCP donne l'accès, la skill dit comment s'en servir."
  - q: "Une skill créée sur claude.ai marche-t-elle dans Claude Code ?"
    r: "Oui, si vous ouvrez Claude Code avec le même compte claude.ai : les skills activées sur votre compte s'y synchronisent depuis la version 2.1.273, dans un seul sens. Les skills envoyées par l'API restent séparées et doivent être téléversées à part."
  - q: "Combien de skills peut-on installer ?"
    r: "La documentation ne fixe pas de nombre maximal. Chaque skill installée ne coûte qu'une centaine de jetons au démarrage (son nom et sa description), le reste n'est lu que lorsqu'elle sert. Si vous en installez beaucoup, Claude Code retire d'abord les descriptions des skills que vous utilisez le moins pour tenir dans sa limite."
---

Les skills Claude sont des dossiers d'instructions, parfois accompagnés de scripts, que Claude charge tout seul quand votre demande correspond. Vous écrivez une fois votre méthode (relancer un devis, mettre en page une offre, analyser un bilan) et Claude l'applique ensuite à l'identique. Elles fonctionnent sur claude.ai, dans Cowork, dans Claude Code et par l'API. Les meilleures pour commencer sont celles d'Anthropic, et créer la vôtre prend un quart d'heure.

> **En bref**
> - Une skill est un dossier qui contient un fichier SKILL.md : un nom, une description qui dit quand s'en servir, puis les instructions.
> - Disponibles sur toutes les offres de claude.ai, gratuite comprise, avec l'exécution de code activée (centre d'aide Anthropic, novembre 2026).
> - Anthropic fournit d'office les skills Word, Excel, PowerPoint et PDF, et publie 19 skills sur GitHub, dont skill-creator, qui aide à écrire les vôtres.
> - Trois façons de créer une skill : écrire le fichier, le faire écrire par Claude, ou vous filmer en train de faire la tâche (« Record a skill », Cowork sur Mac).
> - Une skill trouvée sur internet s'audite avant installation : sur 31 132 skills analysées, 26,1 % contenaient une faille selon le scanner SkillSpector de NVIDIA.

## C'est quoi une skill Claude ?

Une skill, c'est une fiche de méthode que Claude range dans sa boîte à outils. Anthropic la définit comme [un dossier d'instructions, de scripts et de ressources que Claude charge dynamiquement](https://support.claude.com/en/articles/12512176-what-are-skills) pour mieux réussir une tâche précise, de façon répétable.

Le fonctionnement repose sur un chargement en trois temps, que la [documentation des Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) détaille :

1. **Au démarrage**, Claude ne lit que le nom et la description de chaque skill, environ 100 jetons (l'unité de texte des IA) par skill.
2. **Quand votre demande correspond à une description**, il lit le reste du fichier SKILL.md, moins de 5 000 jetons en général.
3. **Si la méthode le demande**, il ouvre les fichiers joints (un modèle de devis, une grille tarifaire) ou lance un script, dont seul le résultat entre dans la conversation.

Conséquence pratique : vous pouvez installer beaucoup de skills sans alourdir Claude. Et c'est la description qui décide de tout : si elle ne contient pas les mots que vous employez, la skill ne se déclenche pas.

## Skill, projet, MCP ou CLAUDE.md : que choisir ?

C'est la confusion la plus fréquente, d'après les recherches Google (« claude skills vs mcp », « vs projects », « claude md vs skills »). La grille que nous utilisons en formation :

| Votre besoin | La bonne brique | Pourquoi |
|---|---|---|
| Claude doit connaître vos documents dans une série de conversations | Un projet | Le contenu d'un projet est chargé à chaque conversation du projet |
| Claude doit appliquer une méthode, quelle que soit la conversation | Une skill | Elle ne se charge que lorsqu'elle sert, partout dans Claude |
| Claude doit lire ou écrire dans un outil (CRM, Notion, messagerie) | Un MCP (connecteur) | Il donne l'accès ; la skill dit comment s'en servir |
| Une préférence qui vaut pour toutes vos conversations (style, langue) | Les instructions personnalisées | Elles s'appliquent toujours, d'où l'intérêt de les garder courtes |
| Un fait sur un projet de code (commandes, conventions) | Le fichier CLAUDE.md | Lu à chaque session de Claude Code ; une procédure longue s'y range mieux en skill |
| Un lot de skills, de connecteurs et d'automatismes à distribuer à une équipe | Un plugin | Il emballe le tout pour l'installer d'un coup |

La documentation de Claude Code donne un bon repère : créez une skill quand vous collez sans cesse les mêmes consignes ou la même checklist, ou quand une partie de votre CLAUDE.md est devenue une procédure plutôt qu'un fait.

## Sur quelles offres et dans quels outils ?

Les skills existent partout chez Anthropic, mais chaque outil a ses règles. Relevé le 19 novembre 2026 sur les pages officielles, dont la [grille des offres Claude](https://claude.com/fr/pricing) :

| Outil | Offres | Où les gérer | À savoir |
|---|---|---|---|
| claude.ai (web, bureau, mobile) | Free, Pro, Max, Ultra, Team, Enterprise | Customize, puis Skills | Exécution de code obligatoire ; description limitée à 200 caractères |
| Cowork (l'agent de l'appli de bureau) | Pro, Max, Ultra, Team, Enterprise | Les skills du compte claude.ai | « Record a skill » sur Mac, en Pro, Max, Ultra et Team |
| Claude Code | Pro, Max, Ultra, Team, Enterprise, ou compte Console payé à l'usage | Dossiers ~/.claude/skills (personnel) et .claude/skills (projet) | Synchronise les skills du compte claude.ai depuis la version 2.1.273, dans un seul sens |
| API Claude | Payée à l'usage | Points d'accès /v1/skills | Pas d'accès à internet ni d'installation de paquets pendant l'exécution |

Une limite à connaître pour une entreprise : une skill téléversée sur claude.ai n'existe pas dans l'API, et inversement. Sur les offres Team et Enterprise, le propriétaire du compte peut [distribuer des skills à toute l'organisation](https://support.claude.com/en/articles/12512180-using-skills-in-claude) : elles apparaissent dans la liste de chaque collaborateur, activées ou non par défaut. Chacun peut aussi partager une skill en lecture seule ou la proposer à toute l'organisation (« Publish to org »).

## Quelles sont les meilleures skills Claude ?

Il n'existe pas de classement officiel. Notre sélection, des plus utiles pour une PME aux plus techniques :

| Skill | Ce qu'elle fait | Où la trouver |
|---|---|---|
| Word, Excel, PowerPoint, PDF | Crée et modifie de vrais fichiers bureautiques | Incluses dans claude.ai, rien à installer |
| skill-creator | Crée une skill, l'améliore et mesure si elle fonctionne | Dépôt GitHub d'Anthropic |
| doc-coauthoring | Guide la rédaction d'une proposition, d'une spécification ou d'une note de décision | Dépôt GitHub d'Anthropic |
| internal-comms | Rédige vos communications internes au format de l'entreprise | Dépôt GitHub d'Anthropic, à adapter à vos modèles |
| Skills partenaires | Exploitent les connecteurs Notion, Figma, Atlassian | Annuaire de claude.ai (Customize, Skills, +, Browse skills) |
| mcp-builder | Aide à construire un connecteur MCP pour un outil maison | Dépôt GitHub d'Anthropic |
| /code-review, /run, /verify, /doctor | Revue de code, lancement et vérification d'une appli, diagnostic de l'installation | Livrées avec Claude Code |

Le [dépôt anthropics/skills](https://github.com/anthropics/skills) comptait 19 skills le 19 novembre 2026, sous licence libre pour la plupart. Anthropic précise qu'elles servent d'exemples : à tester chez vous avant de vous y fier. Pour les milliers de skills de la communauté, l'annuaire skills.sh de Vercel est le point d'entrée ; notre fiche [trouver la bonne skill avec skills.sh](/ressources/skills-sh-trouver-skill-claude) explique comment faire chercher Claude à votre place.

## Comment installer une skill ?

### Sur claude.ai

1. Dans les réglages, section Capabilities, activez l'exécution de code et la création de fichiers.
2. Ouvrez Customize, puis Skills : activez ou coupez chaque skill avec son interrupteur.
3. Pour ajouter une skill reçue en fichier .zip : bouton +, puis Create skill, puis Upload a skill.

Le .zip doit contenir le dossier de la skill, pas ses fichiers en vrac, et le nom du dossier doit être celui de la skill.

### Dans Claude Code

Une skill est un dossier posé au bon endroit, sans téléversement. Dans `~/.claude/skills/`, elle sert dans tous vos projets ; dans `.claude/skills/` à la racine d'un projet, elle ne vaut que pour lui et se partage avec l'équipe par le dépôt de code. Vous l'appelez en tapant `/nom-de-la-skill`, ou Claude la lance seul quand la demande correspond ([documentation Claude Code](https://code.claude.com/docs/en/skills)).

Pour installer les skills d'Anthropic, deux commandes dans Claude Code :

```
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

Pour une skill de la communauté, l'outil [skills de Vercel Labs](https://github.com/vercel-labs/skills) l'installe en une commande (`npx skills add <dépôt>`), avec Node.js 22.20 ou plus récent. Si Claude Code n'est pas encore sur votre poste, suivez notre guide [installer Claude Code](/blog/installer-claude-code).

## Comment créer une skill Claude ?

Trois méthodes, de la plus simple à la plus précise.

1. **Vous filmer.** Dans Cowork sur Claude pour Mac (offres Pro, Max, Ultra et Team), bouton + puis « Record a skill » : vous faites la tâche en la commentant, environ 10 minutes au plus, et Claude propose la skill. Ni Windows, ni l'offre gratuite, ni Enterprise. La vidéo et le son ne sont pas conservés, mais tout ce qui passe à l'écran est capturé : fermez les fichiers sensibles avant ([centre d'aide](https://support.claude.com/en/articles/12512198-creating-custom-skills)).
2. **La faire écrire par Claude.** Décrivez-lui votre méthode et demandez-lui le fichier SKILL.md. Dans Claude Code, installez d'abord skill-creator, la skill d'Anthropic qui sert à créer, améliorer et tester des skills.
3. **L'écrire vous-même.** Un dossier, un fichier SKILL.md, un en-tête et des consignes. C'est la méthode qui donne le plus de contrôle.

### Les règles du fichier SKILL.md

- **Le nom** : 64 caractères au plus, minuscules, chiffres et tirets. Les mots « claude » et « anthropic » sont interdits par l'API : `relance-devis`, pas `claude-relance`.
- **La description** : ce que fait la skill et quand s'en servir, avec les mots que vos équipes emploient. Restez sous 200 caractères, la limite de claude.ai ; l'API en accepte 1 024.
- **Les consignes** : des étapes numérotées, le format attendu et un exemple. Mettez l'essentiel en haut : quand une longue session est résumée, Claude Code peut ne garder que le début de la skill.
- **Une tâche par skill.** Une skill qui veut tout faire se déclenche mal.

### Le modèle à copier : relancer un devis

Voici une skill métier complète, en français, à copier dans un dossier `relance-devis`. Nous l'avons testée le 19 novembre 2026 : validée par la commande `claude plugin validate`, puis déclenchée automatiquement par Claude Code 2.1.328 sous Linux, sur la simple demande « Relance le devis n° 2026-204 envoyé le 5 novembre, le client n'a pas répondu », sans que la skill soit nommée. Claude a appliqué la règle de la deuxième relance, proposé deux créneaux et n'a pas cité de remise.

```markdown
---
name: relance-devis
description: Rédige la relance d'un devis non signé, au ton de l'entreprise. À utiliser quand on demande de relancer un client, un devis ou une proposition commerciale restée sans réponse.
---

# Relance de devis

## Ce qu'il faut demander si l'information manque
- Le nom du contact, le numéro et le montant du devis, la date d'envoi.
- La dernière réponse du client, s'il y en a eu une.

## Les règles
1. Vouvoiement, 120 mots au plus, une seule question à la fin.
2. Rappeler le besoin du client en une phrase, pas les détails techniques du devis.
3. Proposer deux créneaux d'appel précis dans la semaine qui suit.
4. Première relance à J+7 : ton cordial. Deuxième à J+15 : proposer d'ajuster le périmètre.
   Troisième à J+30 : demander si le projet est abandonné, sans insister.
5. Ne jamais accorder de remise : la proposer seulement si on le demande.

## Le format rendu
Objet du mail, puis le texte, puis une ligne « À relancer le : <date> ».

## Exemple
Objet : Votre projet de site, devis n° 2026-118
« Bonjour Madame Martin, vous souhaitiez un site prêt pour le printemps. ... »
```

Remplacez les règles par les vôtres : délais de relance, style, ce qu'un commercial n'a pas le droit de promettre. Sur claude.ai, compressez le dossier en .zip et téléversez-le ; dans Claude Code, posez-le dans `~/.claude/skills/`.

## Les skills sont-elles sûres ?

Une skill n'est pas un simple texte : elle peut lancer des commandes et utilise les accès de Claude (fichiers, connecteurs, messagerie). Anthropic recommande de n'utiliser que des skills [écrites par vous ou fournies par Anthropic](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), et d'auditer tout le reste comme un logiciel : chaque fichier, chaque script, chaque adresse internet appelée.

Le risque est mesuré. [SkillSpector](https://github.com/NVIDIA/SkillSpector), le scanner gratuit de NVIDIA, cite une étude de 2026 portant sur 31 132 skills : 26,1 % contenaient au moins une faille et 5,2 % montraient une intention probablement malveillante. Il cherche 71 motifs répartis en 17 familles. Notre fiche [scanner vos skills avant de les installer](/ressources/scanner-skills-ia) explique comment le lancer. En entreprise, l'offre Enterprise de Claude peut aussi analyser les skills téléversées.

## Notre avis

Pour une PME, les skills sont la façon la plus simple de faire travailler Claude « à la manière de la maison », sans développement. Notre recommandation en novembre 2026 : commencez par une seule tâche répétée chaque semaine (une relance, un compte rendu, une réponse type), écrivez la méthode avec la personne qui la fait le mieux, testez-la sur dix cas réels, puis distribuez-la à l'équipe avec une offre Team. N'installez pas de skills de la communauté sans audit. Et quand la skill doit tourner sans personne derrière, sur un mail reçu ou un formulaire rempli, c'est le moment de passer à un [agent IA](/blog/agent-ia). C'est ce que nous faisons pratiquer dans notre [formation IA pour les entreprises](/formation-ia), sur vos propres tâches.

## Le catalogue des 63 skills pour votre PME

Pour aller plus vite qu'en partant de zéro : notre ressource gratuite [apprendre une compétence à Claude](/ressources/skills-claude-pme) détaille « Record a skill » pas à pas et classe 63 skills testées par domaine (documents, tableurs, marketing, stratégie, code, sécurité), avec qui les pilote dans l'entreprise et le top 10 pour démarrer sans technique.
