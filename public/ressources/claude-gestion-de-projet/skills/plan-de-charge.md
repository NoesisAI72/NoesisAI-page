---
name: plan-de-charge
description: "Compare la charge de travail à la disponibilité réelle de chaque personne, semaine par semaine. À utiliser pour repérer les surcharges ou savoir si l'équipe peut tenir."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Plan de charge

**Ce que tu rends :** semaine par semaine et personne par personne, le travail demandé face au temps vraiment disponible, les surcharges, et des solutions chiffrées.

## Méthode

1. **Rassemble la charge** : tâche, personne, jours de travail, période. Elle vient du découpage ou du planning. Une tâche sans personne ou sans période est signalée, pas répartie au hasard.
2. **Rassemble la disponibilité réelle** : jours travaillés par semaine, part du temps donnée à ce projet, congés, fériés, autres projets. Pose la question de la part du temps : c'est celle que tout le monde oublie.
3. **Compte 80 % de temps planifiable** par défaut (mails, imprévus, réunions hors projet). L'utilisateur peut changer ce taux, qui reste écrit dans le livrable.
4. **Écris les données** dans `donnees.json` et lance `python3 ${CLAUDE_SKILL_DIR}/scripts/plan_de_charge.py donnees.json`.
5. **Lis les surcharges** : rouge au-dessus de 100 %, orange de 80 à 100 %. Une semaine orange suivie d'une rouge est déjà un problème.
6. **Propose des solutions**, dans cet ordre : décaler une tâche qui a de la marge, réaffecter à quelqu'un qui sait faire, réduire le contenu, décaler une date, renforcer. Pour chacune, dis ce que ça libère en jours et ce que ça coûte.
7. **Regarde aussi les creux** : une personne à 20 % pendant trois semaines peut en soulager une autre.

```json
{
  "debut": "14/12/2026", "fin": "15/01/2027", "taux_planifiable": 0.8,
  "personnes": [
    {"nom": "Léa", "jours_par_semaine": 5, "part_projet": 0.5, "absences": ["24/12/2026-01/01/2027"]}
  ],
  "charges": [
    {"tache": "T1.1", "qui": "Léa", "jours": 4, "debut": "14/12/2026", "fin": "18/12/2026"}
  ]
}
```

**Si le script ne peut pas tourner**, fais le calcul pas à pas avec les mêmes règles et préviens que le résultat est à vérifier.

## Format du livrable

```markdown
# Plan de charge : [nom du projet], du [date] au [date]

**En bref :** [n] surcharges, la plus forte : [personne], semaine du [date], il manque [n] jours.

## Par personne
| Semaine du | Charge (j) | Disponible (j) | Taux | Statut | Tâches |

## Surcharges et solutions
| Personne, semaine | Il manque (j) | Solution proposée | Ce que ça libère | Contrepartie |

## Creux utilisables
## Hypothèses de disponibilité
```

## Contrôles avant de rendre

- Le plan parle de disponibilité, jamais de rendement : aucune comparaison entre personnes, aucun classement.
- Les congés et les fériés sont déduits, et la liste est visible.
- Une solution qui crée une surcharge ailleurs n'est pas une solution : recalcule après chaque proposition.
- Le document peut être montré à l'équipe. Si une absence a un motif personnel, écris seulement « absent ».

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
