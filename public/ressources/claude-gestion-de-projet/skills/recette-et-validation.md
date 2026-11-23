---
name: recette-et-validation
description: "Prépare la recette : cahier de tests, critères d'acceptation, suivi des anomalies, procès-verbal. À utiliser pour valider un livrable ou organiser la recette d'un projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Recette et validation

**Ce que tu rends :** un cahier de tests tiré de ce qui a été promis, les règles d'acceptation, le suivi des anomalies et le procès-verbal à signer.

## Méthode

1. **Pars de l'engagement** : périmètre, objectifs, devis. Chaque exigence donne au moins un test. Une exigence qu'on ne sait pas tester révèle une promesse floue : signale-la avant la recette.
2. **Écris chaque test** pour qu'une personne extérieure puisse le faire : situation de départ, gestes, résultat attendu. Un test, un résultat.
3. **Couvre trois familles** : le cas normal, le cas limite (vide, trop grand, deux personnes en même temps, téléphone), le cas d'erreur (mauvaise saisie, coupure, droit manquant).
4. **Fixe la gravité par l'effet** : bloquante (on ne peut pas utiliser, ou une donnée se perd), majeure (on peut, avec un contournement pénible), mineure (gêne ou défaut visuel).
5. **Propose les critères d'acceptation** et fais-les valider avant de commencer : par exemple aucune bloquante, aucune majeure, les mineures listées avec une date. Ce sont des propositions.
6. **Organise** : qui teste (des vrais utilisateurs), où, avec quelles données (fictives ou anonymisées), quand, combien de tours.
7. **Suis les anomalies** : numéro, test, gravité, description reproductible, qui corrige, pour quand, re-testée le.
8. **Prépare le procès-verbal** : sans réserve, avec réserves (liste et dates), ou refus motivé. Tu ne remplis jamais la décision ni la signature.

## Format du livrable

```markdown
# Cahier de recette : [livrable], version [n]
Critères d'acceptation proposés : … Validés par : `À DÉCIDER`

| N° | Exigence (source) | Départ | Gestes | Résultat attendu | Obtenu | Verdict |

## Exigences sans test possible
## Organisation
| Qui | Quoi | Quand | Données utilisées |

## Anomalies
| N° | Test | Gravité | Description pour reproduire | Corrigée par | Pour le | Re-testée le | Statut |

## Synthèse
[n] tests, [n] réussis, [n] échoués, [n] non faits. Bloquantes : … Majeures : … Mineures : …

## Procès-verbal (à signer)
Objet, date, présents, version testée, décision (à cocher), réserves et dates, signatures.
```

## Contrôles avant de rendre

- Toutes les exigences du périmètre ont un test, ou figurent dans « sans test possible ». Compte-les.
- Un test non fait n'est pas un test réussi.
- Une demande nouvelle repérée pendant la recette n'est pas une anomalie : demande de changement.
- Le procès-verbal est une trame : rappelle que ses effets (garantie, paiement) dépendent du contrat, à relire avant signature.

## Exemple

| N° | Exigence (source) | Départ | Gestes | Résultat attendu |
|---|---|---|---|---|
| V7 | Dépôt jusqu'à 50 Mo (brief, ligne 4) | Dossier ouvert, fichier de 51 Mo | Déposer le fichier | Refus clair, la limite est affichée, rien n'est enregistré |

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
