---
name: journal-des-decisions
description: "Tient le journal des décisions d'un projet : quoi, qui, quand, pourquoi, options écartées. À utiliser pour consigner une décision ou retrouver pourquoi un choix a été fait."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Journal des décisions

**Ce que tu rends :** l'historique daté des choix du projet, avec leurs raisons. Et la réponse, plus tard, à « pourquoi avait-on choisi ça ? ».

## Méthode : consigner

1. **Vérifie que c'est une décision** : quelqu'un qui en a le pouvoir a tranché entre plusieurs possibilités. Une envie, une tendance ou une habitude n'en est pas une.
2. **Écris-la en phrase active** : « On ouvre avec 6 pages sur 8 ». Pas « il a été convenu d'envisager ».
3. **Note la raison telle qu'elle a été donnée**, pas celle qui te semble bonne. Raison absente : `À CONFIRMER`, et c'est la question à poser tout de suite, car dans trois mois personne ne s'en souviendra.
4. **Garde les options écartées** avec la raison de leur rejet. C'est la moitié de la valeur du journal.
5. **Note les effets** sur le périmètre, le planning, le budget, et le changement lié s'il existe (C1…).
6. **Compare avec les décisions en vigueur.** Si la nouvelle en contredit une, ne l'écrase pas : l'ancienne passe à « remplacée par D[n] » et tu signales le conflit.
7. **Ajoute une date de revue** quand la décision repose sur une hypothèse qui peut tomber.

## Méthode : retrouver

1. Cherche dans le journal, puis dans les comptes rendus fournis.
2. Réponds avec la décision, la date, la personne, la raison et la source citée.
3. Si la décision a été remplacée, donne la chaîne complète.
4. Rien trouvé : dis-le et liste où chercher. Ne reconstitue jamais une raison.

## Format du livrable

```markdown
# Journal des décisions : [nom du projet]

| N° | Date | Décision | Décidé par | Pourquoi | Options écartées (raison) | Effets | Statut | À revoir le | Source |

Statuts : en vigueur, remplacée par D[n], suspendue.

## Conflits à régler
## Raisons manquantes
| N° | Question à poser | À qui |
```

## Contrôles avant de rendre

- Une décision, une ligne. Deux choix dans la même phrase font deux lignes.
- Rien n'est supprimé ni réécrit après coup : on ajoute, on remplace, on date.
- Chaque ligne a une source (réunion du…, mail du…).
- Le journal ne contient aucune appréciation sur les personnes.

## Exemple

| N° | Date | Décision | Décidé par | Pourquoi | Options écartées (raison) | Effets | Statut | À revoir le |
|---|---|---|---|---|---|---|---|---|
| D4 | 08/12/2026 | Connexion par lien reçu par mail, sans mot de passe | Responsable d'exploitation | Les clients se connectent 2 ou 3 fois par an et oublieraient leur mot de passe | Mot de passe (oublis), connexion Google (clients sans compte) | T2.1 réduite d'un jour | en vigueur | Après le premier mois d'usage |

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
