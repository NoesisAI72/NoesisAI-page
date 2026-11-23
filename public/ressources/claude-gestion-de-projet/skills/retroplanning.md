---
name: retroplanning
description: "Construit un rétroplanning en jours ouvrés depuis une date butoir, fériés français et congés déduits. À utiliser pour savoir quand démarrer ou si une date tient."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Rétroplanning

**Ce que tu rends :** le calendrier à rebours depuis la date butoir, la date de démarrage au plus tard, et un verdict net : la date tient, ou il manque tant de jours.

## Ce qu'il te faut

La date butoir, les tâches avec leur durée en jours ouvrés, et ce que chacune attend. Utiles aussi : la date du jour, les congés de l'équipe, les fermetures. S'il manque les durées, propose d'abord le découpage en tâches. S'il n'y a pas de date butoir, c'est ta seule question.

## Méthode

1. **Écris les données** dans un fichier `donnees.json` au format ci-dessous. Une durée inconnue se demande ou se note comme hypothèse, elle ne s'invente pas.
2. **Lance le calcul** : `python3 ${CLAUDE_SKILL_DIR}/scripts/retroplanning.py donnees.json` (le script est dans le dossier `scripts` de cette skill). Il retire les week-ends, les jours fériés français et les absences, puis remonte depuis la date butoir.
3. **Relis le verdict** et présente le tableau trié par date de début au plus tard.
4. **Si la date ne tient pas**, propose trois leviers et recalcule avec chacun : retirer du contenu, mener des tâches en parallèle, renforcer une personne sur une tâche précise. Donne le gain réel en jours, pas une intuition. Dis aussi le coût de chaque levier.
5. **Ajoute une réserve** avant la date butoir (champ `reserve_jours`). Sans consigne, propose 10 % de l'enchaînement le plus long, arrondi, et marque-le comme hypothèse. Le script place la réserve entre la fin de la dernière tâche et la date butoir.
6. **Repère les trois dates de bascule** : les « fin au plus tard » des tâches les plus serrées, celles après lesquelles la date butoir ne tient plus.

```json
{
  "date_butoir": "01/03/2027",
  "aujourdhui": "23/11/2026",
  "reserve_jours": 3,
  "absences": ["24/12/2026-01/01/2027"],
  "alsace_moselle": false,
  "taches": [
    {"id": "T1.1", "nom": "Valider la fiche de cadrage", "duree": 2, "apres": [], "qui": "Claire"},
    {"id": "T2.1", "nom": "Maquettes", "duree": 7, "apres": ["T1.1"], "qui": "Agence"}
  ]
}
```

Autres réglages : `"jours_travailles": [0,1,2,3,4,5]` si le samedi est travaillé (0 = lundi), `"feries_supplementaires"` pour un pont, `"sans_feries_francais": true` hors de France. Dans ce dernier cas, demande les jours fériés du pays.

**Si le script ne peut pas tourner**, fais le calcul pas à pas en montrant chaque date, préviens que le résultat est à vérifier, et liste les jours fériés que tu as déduits.

## Format du livrable

```markdown
# Rétroplanning : [nom du projet], date butoir le [date]

**Verdict :** [la date tient avec n jours de marge | il manque n jours ouvrés]
Démarrage au plus tard : [date]. Jours fériés et absences déduits : [liste].

| N° | Tâche | Qui | Durée (j) | Début au plus tard | Fin au plus tard | Marge (j) |

## Dates de bascule
## Si la date ne tient pas : trois leviers chiffrés
| Levier | Gain (j ouvrés) | Coût ou contrepartie |

## Hypothèses
```

## Contrôles avant de rendre

- Les dates viennent du script, pas de toi : recopie-les telles quelles.
- Les attentes extérieures (retour client, livraison, validation) ont une durée, sinon le calendrier est faux.
- La personne chargée de deux tâches en même temps est signalée : le rétroplanning ne vérifie pas la charge, propose le plan de charge.

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
