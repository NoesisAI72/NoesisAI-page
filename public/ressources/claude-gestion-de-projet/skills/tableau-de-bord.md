---
name: tableau-de-bord
description: "Produit le tableau de bord d'un projet sur une page : jalons, budget, charge, risques, actions, statuts justifiés. À utiliser pour voir d'un coup d'œil où en est un projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Tableau de bord

**Ce que tu rends :** une page qui se lit en une minute et qui dit où regarder cette semaine.

## Méthode

1. **Date chaque donnée** que tu utilises. Un chiffre de plus de 10 jours ouvrés s'affiche avec la mention « ancien ».
2. **Remplis six blocs** : jalons, budget, charge, risques, actions, décisions attendues. Un bloc sans donnée reste affiché, avec « pas de donnée » et ce qu'il faudrait pour le remplir.
3. **Un statut par bloc**, selon la règle commune, avec le chiffre qui le justifie.
4. **Ajoute la tendance** si un tableau précédent est fourni : mieux, pareil, moins bien, avec l'écart.
5. **Écris « trois choses à regarder cette semaine »**, choisies par effet sur la date de fin, le budget ou le client. Trois, pas cinq.
6. **Statut global** : celui du pire bloc parmi jalons et budget, sauf décision contraire de l'utilisateur. Jamais une moyenne : une moyenne cache toujours un rouge.
7. **Propose une version à partager** (page web, Excel ou Word) après avoir montré le contenu.

## Format du livrable

```markdown
# Tableau de bord : [nom du projet], au [date]
**Statut global : [vert | orange | rouge]**, parce que [chiffre]. Prochain jalon : [jalon], [date], dans [n] jours ouvrés.

| Bloc | Statut | Chiffre clé | Tendance | Donnée du |
(jalons, budget, charge, risques, actions, décisions)

## Trois choses à regarder cette semaine
1. [fait chiffré] → [effet] → [qui fait quoi pour quand]

## Jalons
| N° | Jalon | Prévu | Annoncé | Écart (j ouvrés) | Statut |

## Budget
| Budget | Dépensé | Engagé | Reste à faire | Atterrissage | Écart |

## Actions en retard, risques forts, décisions attendues
(trois lignes au plus par rubrique)

## Données manquantes ou anciennes
```

## Contrôles avant de rendre

- Les écarts en jours ouvrés et les montants viennent de l'outil d'exécution de code.
- Chaque orange et chaque rouge a un fait à côté, et une action ou « aucune action prévue ».
- Aucun indicateur décoratif : si une ligne ne peut déclencher aucune décision, retire-la.
- La page reste une page.

## Exemple

| Bloc | Statut | Chiffre clé | Tendance | Donnée du |
|---|---|---|---|---|
| Budget | orange | Atterrissage 6 800 € pour 6 500 €, soit + 4,6 % | moins bien (+ 2,1 % au 30/11) | 11/12/2026 |
| Charge | pas de donnée | Il faut la part de temps de Léa et Karim sur janvier | - | - |

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
