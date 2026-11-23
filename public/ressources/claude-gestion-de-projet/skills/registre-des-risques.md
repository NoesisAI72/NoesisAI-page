---
name: registre-des-risques
description: "Construit et met à jour le registre des risques : cause, événement, effet, probabilité, impact, parade, responsable. À utiliser pour identifier, noter ou suivre les risques."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Registre des risques

**Ce que tu rends :** huit à douze risques formulés pour qu'on puisse agir, notés, avec une parade, un plan B, un signal d'alerte et une personne.

## Méthode

1. **Écris chaque risque en trois morceaux** : « Parce que [cause déjà vraie], il se peut que [événement], ce qui entraînerait [effet chiffré] ». Sans cause, c'est une peur. Sans effet, c'est une remarque.
2. **Sépare trois choses** : le risque (peut arriver), le problème (c'est arrivé, donc une action), l'inconnue (on ne sait pas, donc une question). Range chacun au bon endroit.
3. **Cherche partout** : personnes et disponibilités, fournisseurs, technique, données, client et validations, juridique et conformité, calendrier, budget, adoption par les utilisateurs. Un thème sans risque : dis pourquoi.
4. **Note avec une échelle écrite.** Probabilité : 1 très improbable, 2 peu probable, 3 possible, 4 probable, 5 presque sûr. Impact : 1 moins d'un jour, 2 un à deux jours, 3 trois à cinq jours, 4 plus de cinq jours ou la date de fin, 5 l'objectif du projet. Adapte l'échelle aux montants si l'utilisateur donne un budget.
5. **Criticité = probabilité × impact** : faible de 1 à 5, moyenne de 6 à 11, forte à partir de 12. Les notes sont des propositions à valider : écris-le.
6. **Choisis une réponse** : éviter, réduire, transférer, accepter. « Accepter » est une vraie réponse si elle est écrite et validée.
7. **Pour chaque risque moyen ou fort** : la parade (avant), le plan B (après), le signal d'alerte observable, la personne, la date de revue.
8. **En mise à jour**, garde les numéros, montre ce qui monte, ce qui descend, ce qui est devenu un problème, ce qui est clos.

## Format du livrable

```markdown
# Risques : [nom du projet], au [date]
[n] ouverts : [n] forts, [n] moyens, [n] faibles.

| N° | Risque (parce que… il se peut que… ce qui entraînerait…) | P | I | Criticité | Réponse | Responsable | Revu le |

## Parades des risques moyens et forts
| N° | Parade (avant) | Plan B (après) | Signal d'alerte | Pour le |

## Déjà arrivé : à traiter en action
## Inconnues : questions à poser
## Évolution depuis la dernière revue
```

## Contrôles avant de rendre

- Douze risques au plus au premier passage. Une liste de trente ne sera relue par personne.
- Aucune parade du type « surveiller », « être vigilant », « communiquer davantage ».
- Chaque signal d'alerte se constate avec un oui ou un non.
- Aucun risque ne désigne une personne comme la cause : c'est une disponibilité, une charge, une décision.

## Exemple

R3. Parce que les textes dépendent d'une seule rédactrice en congé du 24/12 au 01/01, il se peut que 3 pages arrivent après le 08/02, ce qui décalerait l'intégration de 5 jours. P 4, I 3, criticité 12, forte. Réduire : livrer les 3 pages avant le 18/12. Plan B : ouvrir sans ces pages. Signal : moins de 5 pages livrées au 11/12.

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
