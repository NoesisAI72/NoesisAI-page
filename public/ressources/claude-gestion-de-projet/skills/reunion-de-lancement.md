---
name: reunion-de-lancement
description: "Prépare la réunion de lancement d'un projet : déroulé, rôles, règles de travail, points à verrouiller. À utiliser pour un kick-off avec une équipe ou un client."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Réunion de lancement

**Ce que tu rends :** tout ce qu'il faut pour lancer un projet en une réunion : invitation, déroulé minuté, trame de présentation, points à verrouiller, et la trame du compte rendu.

## Méthode

1. **Relis la fiche de cadrage** ou la matière disponible. S'il manque l'objectif, le périmètre ou la personne qui décide, dis-le : une réunion de lancement ne sert pas à découvrir ça devant tout le monde.
2. **Adapte au public** : équipe interne (qui fait quoi, comment on travaille) ou client (ce qu'il aura, ce qu'on attend de lui, comment il valide). Deux publics, deux versions.
3. **Construis le déroulé**, 60 à 90 minutes : pourquoi ce projet, ce qu'on livre et ce qu'on ne livre pas, qui décide, calendrier et jalons, règles de travail, risques déjà vus, prochaine étape.
4. **Prépare les sept points à verrouiller** avant de se quitter : objectif, périmètre et hors périmètre, personne qui valide, dates clés, canal et délai de réponse, façon de traiter une nouvelle demande, prochaine étape datée.
5. **Écris les règles de travail** en phrases concrètes : « Réponse sous 2 jours ouvrés, sinon rappel », « Une demande nouvelle passe par écrit et reçoit un chiffrage avant tout travail ». Ce sont des propositions à faire valider.
6. **Prépare cinq questions à poser** à l'autre partie, celles dont la réponse change le plan.
7. **Prévois les trois moments délicats** : un désaccord sur le périmètre, une date irréaliste, une personne qui valide mais n'est pas là. Pour chacun, une phrase à dire.

## Format du livrable

```markdown
# Lancement : [nom du projet], le [date]

## Invitation (brouillon)
## Déroulé minuté
| Horaire | Séquence | Qui parle | Support |

## Trame de présentation
(8 écrans au plus : titre et trois lignes par écran)

## À verrouiller avant de se quitter
| Point | Ce qu'on propose | Validé par | Oui / non |

## Règles de travail proposées
## Questions à poser
## Moments délicats, et quoi dire
## Trame du compte rendu de lancement
## Dans les 24 heures
(compte rendu, accès, prochaine date)
```

## Contrôles avant de rendre

- La personne qui décide est dans les invités, ou l'alerte est en tête du livrable.
- La somme des durées tient dans le créneau avec 15 % de marge, calcul vérifié.
- Le hors périmètre a son écran à lui : c'est le seul moment où tout le monde écoute.
- Rien n'est annoncé au client qui ne soit dans le devis ou le contrat.

## Exemple

Règle de travail proposée : « Les validations se font par écrit sous 3 jours ouvrés. Sans retour, la date de fin se décale d'autant, et le compte rendu de la semaine le dit. » À faire accepter en séance, ligne 5 du tableau.

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
