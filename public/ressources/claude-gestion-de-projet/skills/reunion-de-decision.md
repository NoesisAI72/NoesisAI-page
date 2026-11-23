---
name: reunion-de-decision
description: "Prépare une décision : question claire, options comparées, critères, recommandation, conséquences. À utiliser pour trancher un choix, un arbitrage ou un prestataire."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Réunion de décision

**Ce que tu rends :** une note d'une page qui permet de trancher, le déroulé d'une réunion de 30 minutes, et l'acte de décision à remplir.

## Méthode

1. **Écris la question fermée**, avec la date limite et la personne qui décide. Si deux personnes décident, demande laquelle l'emporte.
2. **Fixe les critères et leurs poids avant de noter les options.** Poids sur 100, trois à six critères. Demande à l'utilisateur de valider les poids : c'est là que se joue la décision.
3. **Liste deux à quatre options**, dont « ne rien faire maintenant ». Élimine d'abord celles qui ne passent pas un critère obligatoire, et dis pourquoi.
4. **Note chaque option de 0 à 5 par critère**, avec une preuve par note : devis, essai, référence, mesure. Une note sans preuve porte la mention hypothèse.
5. **Calcule les totaux** avec l'outil d'exécution de code, puis **teste la solidité** : l'option gagnante reste-t-elle première si le poids le plus fort baisse de 10 points, ou si la note la moins sûre perd un point ?
6. **Recommande**, et écris ce qui te ferait changer d'avis.
7. **Dis si la décision se défait** facilement ou non. Si elle se défait vite, propose de trancher tout de suite et d'essayer. Si elle engage longtemps, propose un test court avant.
8. **Chiffre l'attente** : ce que coûte une semaine de plus sans décision.

## Format du livrable

```markdown
# Décision : [question fermée]
Décide : [nom]. Avant le : [date]. Se défait : [facilement | difficilement].

## Contexte en cinq lignes
## Options
| Option | En une phrase | Coût | Délai | Ce qu'on perd |

## Comparaison
| Critère | Poids | Option A | Option B | Ne rien faire | Preuve |

## Solidité du résultat
## Recommandation, et ce qui la ferait changer
## Coût de l'attente
## Déroulé (30 minutes)
(5 contexte, 10 objections, 10 échange, 5 décision à voix haute)

## Acte de décision
D[n] le [date] : [décision], par [nom], parce que […]. Options écartées : […]. À revoir le : […].
```

## Contrôles avant de rendre

- Les poids ont été fixés avant les notes, et ça se voit dans l'ordre du document.
- L'option préférée de l'utilisateur n'a pas reçu de notes plus généreuses que les preuves.
- L'option « ne rien faire » est traitée honnêtement.
- L'acte de décision reste vide tant que la décision n'est pas prise.

## Exemple

Solidité : l'option B gagne avec 78 sur 100 contre 74. Si le poids du prix passe de 40 à 30, A repasse devant (77 contre 75). Conclusion à écrire : « Le choix tient au poids du prix. C'est la seule question à poser en séance. »

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
