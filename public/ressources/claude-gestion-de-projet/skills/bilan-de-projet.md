---
name: bilan-de-projet
description: "Dresse le bilan d'un projet terminé : objectifs tenus ou non, délai, budget, qualité, reste à faire. À utiliser pour clôturer un projet ou rédiger le rapport de fin."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Bilan de projet

**Ce que tu rends :** le prévu face au réalisé, objectif par objectif, ce qui reste ouvert avec un nom en face, et la liste de ce qu'il faut fermer.

## Méthode

1. **Reprends les objectifs de départ**, dans leur version validée. Pas ceux qui arrangent. Si un objectif a changé en route, montre les deux versions et la décision qui l'a changé.
2. **Donne un verdict par objectif** : atteint, partiellement, non atteint, pas encore mesurable (avec la date où il le sera et qui mesurera).
3. **Compare prévu et réalisé** : date de fin, budget, charge, contenu, qualité (anomalies restantes). Écarts en jours ouvrés, en euros et en pourcentage.
4. **Explique les écarts par les changements acceptés** d'un côté, et le reste de l'autre. Le deuxième groupe est le vrai écart.
5. **Liste ce qui reste ouvert** : réserves, actions, garanties, factures, promesses faites à l'oral. Une personne et une date par ligne.
6. **Passe la liste de fermeture** : factures émises et reçues, contrats et abonnements à résilier ou transférer, accès retirés, données personnelles supprimées ou archivées, documents rangés à un endroit nommé, matériel rendu, équipe et partenaires remerciés, personne qui prend le relais.
7. **Prévois la mesure des bénéfices** à 1, 3 ou 6 mois si l'objectif se mesure plus tard.
8. **Écris la synthèse en dernier**, en cinq lignes, sans triomphe ni excuse.

## Format du livrable

```markdown
# Bilan : [nom du projet], le [date]

**En cinq lignes :** …

## Objectifs
| N° | Objectif | Cible | Résultat | Mesuré le, par | Verdict |

## Prévu et réalisé
| | Prévu au départ | Après changements acceptés | Réalisé | Écart | Explication |
(date de fin, budget, charge, contenu, qualité)

## Changements acceptés
| N° | Changement | Effet délai | Effet budget |

## Reste ouvert
| Sujet | Responsable | Pour le |

## Liste de fermeture
| Point | Fait / à faire / sans objet | Responsable |

## À mesurer plus tard
## Ce que ce bilan ne permet pas de dire
```

## Contrôles avant de rendre

- Un objectif sans mesure est « pas mesuré », jamais « atteint ».
- Les écarts sont recalculés avec l'outil d'exécution de code et se recoupent avec les changements acceptés.
- Le bilan ne contient pas les leçons : elles vont dans le retour d'expérience.
- Les données internes (coûts, marge) sont absentes de la version destinée au client.

## Exemple

| N° | Objectif | Cible | Résultat | Verdict |
|---|---|---|---|---|
| O1 | Diviser par deux les appels « où en est mon dossier » | 20 par semaine | Pas mesuré : le comptage de départ n'a pas été fait | pas mesurable, comptage à lancer le 08/03 |

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
