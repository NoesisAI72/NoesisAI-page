---
name: dependances-projet
description: "Repère les dépendances entre tâches, calcule le chemin critique et les marges. À utiliser pour savoir quoi faire dans quel ordre, ce qui bloque quoi ou l'effet d'un retard."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Dépendances et chemin critique

**Ce que tu rends :** l'ordre des tâches, celles qui n'ont aucune marge, et l'effet exact d'un retard sur la date de fin.

## Méthode

1. **Cherche les vraies dépendances.** Pour chaque tâche, une seule question : « peut-on commencer sans que l'autre soit finie ? » Si oui, ce n'est pas une dépendance, c'est une habitude.
2. **Classe-les** : technique (impossible autrement), décision (il faut un accord), ressource (la même personne), extérieure (fournisseur, client, administration). Les dépendances de décision et les extérieures sont les plus fragiles.
3. **Écris les données** dans `donnees.json` : numéro, nom, durée en jours ouvrés, liste de ce que chaque tâche attend.
4. **Lance le calcul** : `python3 ${CLAUDE_SKILL_DIR}/scripts/chemin_critique.py donnees.json`. Le script signale les boucles, donne la durée totale, le ou les chemins critiques, la marge totale et la marge libre de chaque tâche, en tenant compte des week-ends et des jours fériés français.
5. **Explique le résultat en clair** : le chemin critique est la suite de tâches où un jour perdu est un jour perdu pour le projet. Les autres ont de l'air, voici combien.
6. **Teste les retards** que l'utilisateur redoute avec le champ `retards`, ou propose d'en tester un sur la tâche critique la plus incertaine.
7. **Cherche à raccourcir** : sur le chemin critique seulement, quelles tâches peuvent se chevaucher, se couper en deux ou démarrer plus tôt. Recalcule à chaque proposition.

```json
{
  "debut": "23/11/2026",
  "absences": ["24/12/2026-01/01/2027"],
  "taches": [
    {"id": "T1.1", "nom": "Valider la fiche de cadrage", "duree": 2, "apres": []},
    {"id": "T2.1", "nom": "Maquettes", "duree": 7, "apres": ["T1.1"]}
  ],
  "retards": {"T2.1": 4}
}
```

**Si le script ne peut pas tourner**, calcule à la main en montrant chaque étape, aller puis retour, et préviens que le résultat est à vérifier.

## Format du livrable

```markdown
# Dépendances : [nom du projet]

**Durée :** [n] jours ouvrés, fin le [date]. **Chemin critique :** T… → T… → T…

| N° | Tâche | Attend | Type de dépendance | Début | Fin | Marge totale | Marge libre |

## Dépendances fragiles
| Dépendance | Pourquoi elle est fragile | Que faire maintenant |

## Effet d'un retard
| Retard testé | Effet sur la fin | Tâches décalées |

## Pistes pour raccourcir
| Piste | Gain (j ouvrés) | Contrepartie |
```

## Contrôles avant de rendre

- Toutes les tâches sont reliées : une tâche que personne n'attend et qui n'attend rien est isolée, demande pourquoi.
- Une dépendance de ressource (même personne) n'est pas mélangée avec une dépendance technique : la première se règle en réaffectant.
- Marge totale et marge libre sont expliquées : la marge totale se partage entre les tâches d'un même chemin, la marge libre appartient à la tâche.

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
