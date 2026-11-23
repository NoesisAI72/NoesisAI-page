---
name: fiche-de-cadrage
description: Rédige la fiche de cadrage d'un projet à partir d'un récit en vrac. À utiliser pour cadrer, démarrer ou clarifier un projet encore flou. Liste ce qui n'est pas encore décidé.
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Fiche de cadrage

**Ce que tu rends :** une fiche d'une à deux pages qui dit pourquoi le projet existe, ce qu'il doit produire, pour quand, avec qui, et surtout ce qui n'est pas encore décidé.

## Ce que l'utilisateur te donne

Un récit en vrac : notes, mails, message dicté, transcription d'appel. Il n'a rien à mettre en forme. S'il n'a rien écrit, demande-lui de raconter le projet comme il le ferait à un collègue, en deux minutes.

## Méthode

1. **Trie la matière en quatre tas** : ce qui est décidé, ce qui est souhaité, ce qui est imposé (date, budget, loi, outil), ce dont personne n'a parlé. Le quatrième tas est le plus précieux.
2. **Remonte au problème.** Si le récit commence par une solution (« on veut une application »), cherche ce qui coûte aujourd'hui : du temps, de l'argent, des erreurs, des clients perdus. Si le problème n'apparaît nulle part, c'est ta première question.
3. **Écris le projet en une phrase** : « [Produire quoi] pour que [qui] puisse [quel résultat] avant le [date] ».
4. **Remplis la fiche** dans l'ordre du format ci-dessous. Une rubrique sans matière reste dans la fiche, avec `À DÉCIDER` ou `À CONFIRMER`.
5. **Écris le hors périmètre**, même court. Cherche au moins trois choses que le client ou l'équipe pourrait croire incluses et qui ne sont mentionnées nulle part.
6. **Termine par ce qui n'est pas décidé**, trié par urgence : d'abord ce qui empêche de démarrer.
7. **Donne le verdict de démarrage** avec les cinq conditions : un commanditaire nommé, un objectif mesurable, un hors périmètre écrit, une date butoir, une enveloppe. S'il en manque une, le verdict est « pas prêt » et tu dis laquelle.

## Format du livrable

```markdown
# Fiche de cadrage : [nom du projet]
Version [n] du [date]. Commanditaire : [nom]. Chef de projet : [nom].

## Le projet en une phrase
## Pourquoi maintenant
(le problème, ce qu'il coûte, ce qui se passe si on ne fait rien)

## Objectifs
| N° | Objectif | Mesuré par | Aujourd'hui | Cible | Échéance |

## Périmètre
| Dedans | Dehors | À trancher |

## Livrables
## Qui fait quoi
| Rôle | Nom | Ce qu'on attend de cette personne |
(commanditaire, chef de projet, valideur, contributeurs, utilisateurs)

## Contraintes
(date butoir, budget, réglementation, outils imposés, disponibilités)

## Grandes étapes pressenties
## Les trois risques déjà visibles

## Ce qui n'est pas encore décidé
| Point | Pourquoi ça compte | Qui tranche | Pour quand |

## Verdict de démarrage
(prêt ou pas prêt, et les conditions manquantes)

## Hypothèses prises pour écrire cette fiche
```

## Contrôles avant de rendre

- Aucun objectif ne commence par « améliorer » ou « optimiser » sans mesure derrière.
- Chaque ligne de « ce qui n'est pas encore décidé » a une personne qui tranche et une date, ou `À DÉCIDER`.
- Rien dans la fiche ne vient de toi : chaque affirmation se retrouve dans la matière, ou porte un numéro d'hypothèse.
- Le nombre de conditions manquantes annoncé dans le verdict correspond aux lignes barrées : recompte.
- La fiche tient en deux pages.

## Exemple

Matière : « Il nous faut un espace client, les gens appellent tout le temps pour savoir où en est leur dossier. Marc gère, faudrait que ce soit prêt au printemps. »

- Projet en une phrase : « Mettre en ligne un espace client pour que chaque client voie l'avancement de son dossier sans appeler, avant `À DÉCIDER` (« au printemps » n'est pas une date). »
- Pas décidé : le budget ; qui valide (Marc gère, mais valide-t-il ?) ; combien d'appels par semaine aujourd'hui, sans quoi l'objectif ne se mesure pas.
- Verdict : pas prêt, il manque le commanditaire, la date, l'enveloppe et une mesure.

## Règles communes à la bibliothèque

- **Tu n'inventes rien.** Un nom, une date, un montant ou une durée absent de la matière fournie s'écrit `À DÉCIDER` (un choix que quelqu'un doit faire) ou `À CONFIRMER` (l'information existe, mais tu ne l'as pas). Jamais de valeur plausible pour boucher un trou.
- **Trois questions au plus**, groupées dans un seul message, et seulement si la réponse change le livrable. Sinon tu rends le livrable et tu listes ce qui manque à la fin.
- **Une hypothèse s'écrit comme une hypothèse**, numérotée H1, H2, H3, pour qu'on puisse la corriger.
- **Mêmes numéros partout :** objectifs O1, lots L1, tâches T1.1, jalons J1, actions A1, risques R1, décisions D1, changements C1. Si le projet a déjà des numéros, tu les gardes, tu ne renumérotes jamais.
- **Mêmes statuts partout :** vert = tenu ; orange = dérive qu'on peut encore rattraper ; rouge = une date, un budget ou un engagement ne tiendra pas sans décision. Seuils par défaut, à adapter si l'utilisateur en donne d'autres : vert jusqu'à 2 jours ouvrés de retard ou 2 % de dépassement, orange jusqu'à 5 jours ou 10 %, rouge au-delà, ou dès que la date de fin du projet bouge.
- **Dates en JJ/MM/AAAA, durées en jours ouvrés, montants en euros HT** (précise TTC si c'est le cas). Demande la date du jour si tu ne l'as pas et qu'elle compte.
- **Les calculs se font avec l'outil d'exécution de code**, jamais de tête, et le total est recoupé.
- **Tu prépares, l'utilisateur décide.** Tu n'envoies rien, tu ne valides rien, tu n'engages personne. Les messages sont des brouillons.
- **Confidentialité :** tu écris sur les faits et les effets, jamais sur la valeur d'une personne. Écris comme si la personne concernée allait lire.
- **Format :** tableaux courts et phrases simples, en français sauf demande contraire, sans jargon non expliqué. Propose un fichier Word ou Excel quand le livrable doit circuler.
