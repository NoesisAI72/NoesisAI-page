---
name: suivi-des-ecarts
description: "Compare le planning prévu au réel pour attraper les glissements tôt : quelle tâche dérive, de combien, effet sur la fin. À utiliser pour les retards et les dérives."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Suivi des écarts

**Ce que tu rends :** les tâches qui dérivent, de combien, depuis quand, et ce que ça change pour la fin. Cette skill sert à attraper la semaine qui glisse par petits morceaux.

## Méthode

1. **Garde le planning d'origine comme référence.** Il ne se modifie pas quand une date bouge. S'il n'existe pas, propose de figer celui d'aujourd'hui comme référence et dis que les écarts passés sont perdus.
2. **Rassemble, pour chaque tâche**, la fin prévue à l'origine, toutes les dates annoncées ensuite dans l'ordre, la fin réelle si elle est finie, et les pourcentages annoncés au fil des points.
3. **Écris les données** dans `donnees.json` et lance `python3 ${CLAUDE_SKILL_DIR}/scripts/suivi_ecarts.py donnees.json`.
4. **Cherche les dérives silencieuses**, plus importantes que les gros retards visibles : tâche reportée au moins deux fois, avancement bloqué depuis trois points, date dépassée sans mise à jour.
5. **Mesure l'effet réel** : un retard sur une tâche qui a de la marge n'est pas un problème, un petit retard sur une tâche sans marge en est un. Si les marges manquent, propose de calculer le chemin critique.
6. **Donne la cause par famille** : estimation, attente extérieure, décision en retard, contenu ajouté, disponibilité, imprévu. Cause inconnue : `À CONFIRMER`. Si une famille revient trois fois, c'est le vrai sujet.
7. **Propose une action par dérive** : rattraper (comment), absorber (avec quelle marge), accepter (nouvelle date, qui prévenir). Pas d'action « surveiller ».
8. **Écris la phrase à dire** à la personne qui décide, si la date de fin bouge.

```json
{
  "aujourdhui": "12/02/2027", "fin_projet_prevue": "25/02/2027",
  "taches": [
    {"id": "T3.1", "nom": "Développement", "qui": "Agence", "fin_prevue": "08/02/2027",
     "previsions": ["10/02/2027", "12/02/2027", "16/02/2027"], "avancements": [60, 80, 80, 80],
     "apres": ["T2.2"], "marge": 2}
  ]
}
```

**Si le script ne peut pas tourner**, compare à la main en jours ouvrés, montre le détail et préviens que c'est à vérifier.

## Format du livrable

```markdown
# Écarts : [nom du projet], au [date]
**Fin du projet : prévue le [date], annoncée le [date], [n] jours ouvrés.**

## Dérives silencieuses
| N° | Tâche | Ce qui le montre | Qui l'attend | Action, qui, pour quand |

## Tous les écarts
| N° | Tâche | Qui | Fin prévue | Fin annoncée | Écart (j ouvrés) | Reports | Marge | Statut | Cause |

## Causes qui reviennent
## Décision à prendre, et la phrase pour l'annoncer
## Données manquantes
```

## Contrôles avant de rendre

- Les écarts sont en jours ouvrés, calculés par le script.
- Aucune durée, marge ou cause n'est déduite : si elle manque, elle va dans « données manquantes ».
- La référence d'origine est datée et n'a pas été réécrite.
- Le texte parle de tâches et de dates, pas de la ponctualité des personnes.
- S'il n'y a aucune dérive, dis-le en une ligne et n'en fabrique pas.

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
