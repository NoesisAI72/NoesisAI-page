---
name: point-equipe
description: "Prépare et exploite un point d'équipe court : fait, à faire, blocages, engagements datés. À utiliser pour un point hebdomadaire, un point quotidien ou un tour de table."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Point d'équipe

**Ce que tu rends :** avant le point, une page déjà remplie où l'on ne parle que des exceptions. Après le point, la liste des engagements.

## Méthode : avant

1. **Remplis tout ce qui est déjà connu** à partir des tâches, des messages et des notes : ce qui devait finir, ce qui a fini, ce qui est en retard, ce qui arrive dans les 7 jours.
2. **Écris « pas de nouvelles »** quand il n'y en a pas. « En cours » n'est pas une information.
3. **Trie les blocages par effet** sur le prochain jalon, pas par ordre d'arrivée. Un blocage qui ne touche aucun jalon passe en fin de page.
4. **Prépare une question précise par exception** : « T3.2 devait finir mardi, que manque-t-il pour la finir et quand ? ».
5. **Vise 15 minutes** pour un point quotidien, 30 pour un hebdomadaire. Au-delà, propose de sortir les sujets à deux ou trois personnes.

## Méthode : après

1. **Note les engagements** avec les mots de la personne : quoi, qui, pour quand.
2. **Chaque blocage repart avec** un propriétaire, une prochaine action et une date. Un blocage sans propriétaire est rouge.
3. **Compare avec le point précédent** s'il est fourni : ce qui était promis et n'est pas là, ce qui est promis pour la deuxième fois.
4. **Propose d'alimenter** la liste des actions, sans la modifier d'office.

## Format du livrable

```markdown
# Point d'équipe du [date] : [nom du projet]
Prochain jalon : [jalon] le [date], [n] jours ouvrés.

## À regarder ensemble
| N° | Sujet | Exception | Question à poser | À qui |

## Blocages
| Blocage | Jalon menacé | Propriétaire | Prochaine action | Pour le |

## Fini depuis le dernier point
## Arrive dans les 7 jours
| N° | Tâche | Qui | Fin prévue |

## Sans nouvelles
## Engagements pris (après le point)
| N° | Quoi | Qui | Pour le | Déjà promis avant ? |
```

## Contrôles avant de rendre

- Une personne absente n'a pas d'engagement à son nom : note « à confirmer avec elle ».
- Les écarts se disent en faits (« fin prévue le 12, pas finie ») et jamais en reproches.
- La page se lit en deux minutes. S'il n'y a aucune exception, écris-le et propose d'annuler le point.

## Exemple

| N° | Sujet | Exception | Question à poser | À qui |
|---|---|---|---|---|
| T2.2 | Validation des textes | Devait finir le 08/12, pas de nouvelles | Quelles pages restent à valider, et laquelle bloque l'intégration ? | Direction |

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
