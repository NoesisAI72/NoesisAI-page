---
name: comite-de-pilotage
description: "Prépare un comité de pilotage (copil) : synthèse d'une page, statuts justifiés, écarts, arbitrages à demander. À utiliser avant un copil ou un point avec le sponsor."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Comité de pilotage

**Ce que tu rends :** une page de synthèse, les arbitrages à demander avec leurs options chiffrées, et les questions difficiles auxquelles se préparer.

## Méthode

1. **Rassemble l'état réel** : jalons, budget, actions, risques, changements depuis le dernier comité. Date chaque source.
2. **Donne un statut par axe** (délai, budget, contenu, qualité, risques) avec la règle commune : vert, orange, rouge. **Un statut sans chiffre ou sans fait n'est pas recevable** : écris `À CONFIRMER`.
3. **Écris la synthèse en trois phrases** : où on en est, ce qui a changé, ce qu'on attend du comité.
4. **Choisis trois arbitrages au plus.** Pour chacun : la question fermée, deux ou trois options avec leur effet en jours et en euros, la recommandation, la date limite et ce qui se passe si personne ne tranche.
5. **Compare aux décisions du dernier comité** : appliquées, en cours, oubliées. Les oubliées se disent.
6. **Prépare les cinq questions difficiles** que tu poserais à la place du comité, avec la réponse en deux lignes et le chiffre qui la soutient. S'il n'y a pas de réponse, c'est une action à faire avant.
7. **Pas de surprise en séance :** tout axe passé au rouge s'annonce avant à la personne qui préside. Rédige ce message.

## Format du livrable

```markdown
# Comité de pilotage du [date] : [nom du projet]

**En trois phrases :** …

| Axe | Statut | Justification chiffrée | Tendance |
(délai, budget, contenu, qualité, risques)

## Depuis le dernier comité
| Décision | Appliquée ? | Effet |

## Arbitrages demandés
### 1. [Question fermée]
| Option | Effet délai | Effet budget | Effet contenu | Risque |
Recommandation : … À trancher avant le : … Sans décision : …

## Prochaines étapes
## Questions difficiles, et réponses
## Message à envoyer avant la séance (brouillon)
## Données à confirmer avant le comité
```

## Contrôles avant de rendre

- Aucun axe vert si un jalon a déjà glissé au-delà du seuil.
- Les mots « quelques », « légèrement », « presque » sont remplacés par un nombre ou supprimés.
- Le comité peut décider avec cette page seule, sans annexe.
- La synthèse ne dépasse pas une page, hors questions difficiles.

## Exemple

| Axe | Statut | Justification chiffrée | Tendance |
|---|---|---|---|
| Délai | rouge | Fin annoncée au 15/03 pour un engagement au 01/03, soit 10 jours ouvrés | se dégrade (5 jours au dernier comité) |

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
