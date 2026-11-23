---
name: decoupage-en-taches
description: "Découpe un projet en lots, livrables et tâches avec responsable, durée et critère de fin. À utiliser pour lister les tâches, construire un backlog ou préparer un planning."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Découpage en tâches

**Ce que tu rends :** la liste complète des tâches du projet, rangée par lot et par livrable, avec pour chacune un responsable, une durée, ce qu'elle attend et la phrase qui dit quand elle est finie.

## Méthode

1. **Pars des livrables**, pas des métiers ni du calendrier. Un lot = un livrable ou un groupe de livrables (L1, L2…). Si le périmètre n'existe pas, demande-le ou propose d'abord de l'écrire.
2. **Applique la règle des 100 %** : la somme des tâches d'un lot couvre tout le lot, et rien d'autre. Ce qui ne rentre dans aucun lot est hors périmètre ou révèle un livrable oublié.
3. **Écris chaque tâche** avec un verbe et un objet (« Rédiger les 8 pages »), jamais un nom seul (« Contenu »).
4. **Garde des tâches de 0,5 à 5 jours.** Au-dessus, découpe. En dessous, regroupe. Une tâche longue cache toujours ce qu'on n'a pas compris.
5. **Ajoute un critère de fin vérifiable** : « Fait quand les 8 pages sont validées par écrit par la direction ». « Fait quand c'est prêt » n'est pas un critère.
6. **Passe en revue les tâches que tout le monde oublie** : relectures et validations, attente d'un retour client, achats et délais fournisseurs, accès et comptes, reprise des données existantes, recette et corrections, formation, documentation, mise en service, sauvegarde, conformité, réunions de pilotage, clôture. Intègre celles qui s'appliquent et dis lesquelles tu as écartées.
7. **Durée et charge sont deux choses** : la charge est le travail (2 jours), la durée est le temps qui passe (5 jours si la personne est à mi-temps). Renseigne les deux quand elles diffèrent.
8. **Estimations :** celles de l'utilisateur ou de la personne qui fera. Sinon une fourchette, marquée hypothèse. Ne mets pas un chiffre rond pour faire propre.
9. **Note les dépendances** (colonne « attend ») : uniquement les vraies, quand la tâche ne peut pas commencer avant.

## Format du livrable

```markdown
# Découpage : [nom du projet]
[n] lots, [n] tâches, charge totale [n] jours, dont [n] jours à confirmer.

## L1. [Livrable]
| N° | Tâche | Responsable | Charge (j) | Durée (j) | Attend | Fait quand |

## Tâches souvent oubliées
| Tâche | Intégrée (n°) ou écartée, et pourquoi |

## À décider
(tâches sans responsable, durées à confirmer, lots au contenu flou)
```

Propose ensuite le même découpage en tableau CSV (colonnes : numéro, lot, tâche, responsable, charge, durée, attend, critère de fin), prêt à importer dans l'outil de l'équipe.

## Contrôles avant de rendre

- Une seule personne par tâche. « L'équipe » n'est pas un responsable.
- Somme des charges par lot recoupée avec l'outil d'exécution de code.
- Aucune tâche n'attend une tâche absente de la liste.
- Le découpage reste lisible : plus de 60 tâches, propose de ne détailler que les deux prochains mois et de garder le reste au niveau des lots.

## Exemple

L2. Contenus du site
| N° | Tâche | Responsable | Charge (j) | Durée (j) | Attend | Fait quand |
|---|---|---|---|---|---|---|
| T2.1 | Rédiger les 8 pages | Claire | 4 | 8 | T1.2 | Les 8 textes sont dans le dossier partagé |
| T2.2 | Valider les textes | `À DÉCIDER` | 0,5 | 5 | T2.1 | Validation écrite, page par page |

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
