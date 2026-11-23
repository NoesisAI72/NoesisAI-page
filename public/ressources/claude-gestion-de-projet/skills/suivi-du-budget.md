---
name: suivi-du-budget
description: "Suit le budget d'un projet : dépensé, engagé, reste à faire, atterrissage, écarts expliqués. À utiliser pour savoir si le budget tient ou préparer un point financier."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Suivi du budget

**Ce que tu rends :** l'atterrissage du projet (ce qu'il coûtera vraiment à la fin), l'écart par poste avec sa cause, et l'alerte assez tôt pour agir.

## Méthode

1. **Pars du budget validé**, pas de la dernière version qui traîne. S'il a changé, reprends l'historique : budget initial, changements acceptés (C1, C2…), budget actuel.
2. **Pour chaque poste, trois montants distincts** : dépensé (facturé ou payé), engagé (commandé, pas encore facturé), reste à faire (ni l'un ni l'autre). Le reste à faire se **réestime à chaque suivi** : ce n'est jamais « budget moins dépensé », sinon l'atterrissage tombe toujours juste et ne sert à rien.
3. **N'oublie pas le temps interne** : jours passés multipliés par le coût journalier convenu, sinon écris que le suivi ne couvre que les dépenses externes.
4. **Écris les données** dans `donnees.json` et lance `python3 ${CLAUDE_SKILL_DIR}/scripts/suivi_budget.py donnees.json`. Ajoute `avancement` (0.4 pour 40 %) seulement si l'avancement repose sur des livrables acceptés.
5. **Explique chaque écart** de plus de 2 % : quantité, prix, contenu ajouté, erreur d'estimation, ou `À CONFIRMER`. Un changement de contenu doit avoir son numéro C. Sinon, c'est un changement accepté sans le dire : signale-le.
6. **Compare la projection au rythme actuel avec l'atterrissage déclaré.** Si elles divergent de plus de 10 %, le reste à faire est trop optimiste.
7. **Propose** : continuer, utiliser la réserve, réduire le contenu, demander une rallonge. Avec l'effet chiffré et la date limite pour décider.

```json
{
  "reserve": 800, "reserve_consommee": 100, "avancement": 0.4,
  "postes": [
    {"poste": "Développement", "budget": 5000, "depense": 2000, "engage": 1500, "reste_a_faire": 1800}
  ]
}
```

**Si le script ne peut pas tourner**, calcule avec les mêmes définitions, montre les additions et recoupe le total.

## Format du livrable

```markdown
# Suivi du budget : [nom du projet], au [date]
**Atterrissage : [montant] pour un budget de [montant], écart [montant] ([%]), statut [couleur].**

| Poste | Budget | Dépensé | Engagé | Reste à faire | Atterrissage | Écart | Cause | Statut |

## Réserve
## Écarts expliqués
| Poste | Écart | Cause | Changement lié | Action |

## Décision à prendre
| Option | Effet | À décider avant le |

## Factures attendues et échéances
## Données à confirmer
```

## Contrôles avant de rendre

- Aucun montant en double entre dépensé et engagé.
- HT partout, ou TTC partout, et c'est écrit.
- Un poste sans reste à faire est vraiment terminé : pose la question s'il ne l'est pas.
- Les marges et coûts internes ne figurent dans aucune version destinée au client.

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
