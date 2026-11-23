---
name: objectifs-projet
description: "Transforme une intention en objectifs mesurables : indicateur, valeur de départ, cible, échéance. À utiliser pour fixer les objectifs ou les critères de réussite d'un projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Objectifs du projet

**Ce que tu rends :** un objectif principal et deux à quatre objectifs secondaires, chacun mesurable, avec la façon de le mesurer et ce qui ne doit pas se dégrader en chemin.

## Méthode

1. **Sépare trois choses** souvent mélangées : l'activité (ce qu'on fait), le livrable (ce qu'on produit), l'objectif (ce qui change pour l'entreprise). « Former l'équipe » est une activité, « un guide » est un livrable, « 9 dossiers sur 10 traités sans aide » est un objectif.
2. **Pose « et alors ? »** à chaque intention jusqu'à tomber sur un résultat qui se voit de l'extérieur. Deux ou trois fois suffisent.
3. **Choisis un seul objectif principal** : celui qui, s'il est atteint, rend le projet réussi même si le reste est moyen. S'il y en a deux, demande lequel gagne en cas de conflit.
4. **Pour chaque objectif, écris** : le verbe et le résultat, l'indicateur, la valeur d'aujourd'hui avec sa source, la cible, l'échéance, qui mesure et comment.
5. **Valeur d'aujourd'hui inconnue ?** Écris `À CONFIRMER`, et ajoute la première action du projet : mesurer avant de commencer. Sans point de départ, la réussite sera indiscutable ou invérifiable, jamais démontrée.
6. **Ajoute un garde-fou** à chaque objectif : ce qui ne doit pas se dégrader (délai de réponse, satisfaction, marge, charge de l'équipe).
7. **Fais choisir la priorité** entre délai, budget et contenu : lequel est fixe, lequel est souple, lequel s'ajuste. Les trois ne peuvent pas être fixes. Si l'utilisateur ne tranche pas, écris `À DÉCIDER` en tête du livrable.

## Format du livrable

```markdown
# Objectifs : [nom du projet]

## Objectif principal
O1. [Verbe + résultat] : passer de [valeur] à [cible] avant le [date].

## Tous les objectifs
| N° | Objectif | Indicateur | Aujourd'hui (source, date) | Cible | Échéance | Qui mesure, comment | Garde-fou |

## Priorité en cas de conflit
| | Fixe | Souple | S'ajuste |
(délai, budget, contenu : une croix par ligne)

## À mesurer avant de commencer
## Ce qui a été écarté, et pourquoi
```

## Contrôles avant de rendre

- Deux personnes qui ne se parlent pas diraient la même chose sur « atteint ou pas atteint ».
- Aucun objectif ne dépend d'un chiffre que tu as supposé : une cible inventée est pire qu'une cible absente.
- Cinq objectifs au plus. Au-delà, ce sont des livrables déguisés.
- Chaque indicateur peut être relevé avec ce que l'entreprise a déjà, ou l'action pour le relever est écrite.

## Exemple

Intention : « Être plus réactifs avec les clients. »
Et alors ? Ils rappellent moins. Et alors ? L'accueil gagne du temps.
O1 : diviser par deux les appels « où en est mon dossier ». Indicateur : appels de ce type par semaine. Aujourd'hui : `À CONFIRMER`, à compter pendant deux semaines. Garde-fou : le délai de traitement d'un dossier n'augmente pas.

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
