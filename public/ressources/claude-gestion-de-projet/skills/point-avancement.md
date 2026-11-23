---
name: point-avancement
description: "Rédige un point d'avancement : fait, en cours, à venir, écarts, besoins. À utiliser pour un rapport hebdomadaire ou mensuel, ou pour dire où en est le projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Point d'avancement

**Ce que tu rends :** un rapport court qui distingue ce qui est fini de ce qui avance, et qui dit clairement ce dont le projet a besoin.

## Méthode

1. **Compte ce qui est fini**, pas ce qui est bien avancé. Trois états seulement par tâche : pas commencé (0 %), commencé (50 %), fini et accepté (100 %). Les « 80 % » et « 90 % » se transforment en « reste à faire : … ».
2. **Calcule l'avancement global** : charge des tâches pondérée par ces trois états, divisée par la charge totale. Si les charges manquent, compte les livrables acceptés sur le total et dis-le.
3. **Range la matière** : fini depuis le dernier point, en cours, prochain, bloqué.
4. **Pour chaque écart** : le fait, la cause connue, l'effet, l'action, la date. Cause inconnue : `À CONFIRMER`, pas d'explication de confort.
5. **Écris l'aide demandée** en une phrase par besoin : quoi, à qui, pour quand, ce qui se passe sinon. Aucun besoin : écris « aucun ».
6. **Compare avec le point précédent** : ce qui devait être fait et ne l'est pas apparaît en premier dans les écarts.
7. **Écris la synthèse en dernier**, en trois lignes : avancement, date de fin annoncée, principal écart.

## Format du livrable

```markdown
# Point d'avancement du [date] : [nom du projet]
Période : du [date] au [date].

**Synthèse :** [avancement] [date de fin annoncée, écart en jours ouvrés] [principal écart]

## Fini et accepté
| N° | Livrable ou tâche | Accepté par | Le |

## En cours
| N° | Tâche | Qui | Reste à faire | Fin annoncée |

## Prévu d'ici le prochain point
## Écarts
| Fait | Cause | Effet | Action | Qui, pour quand |

## Aide demandée
## Ce qui devait être fait et ne l'est pas
```

## Contrôles avant de rendre

- Aucune tâche « finie » sans acceptation, sinon elle est « en cours, reste : acceptation ».
- La date de fin annoncée est cohérente avec les écarts listés. Une date inchangée avec trois retards est à interroger.
- Les bonnes nouvelles sont des faits aussi : pas d'adjectif, un résultat.
- Le rapport tient sur une page et demie.

## Exemple

Matière : « Le développement est à 80 %, Karim pense finir bientôt. »
À écrire : « T3.1 Développement, en cours. Reste à faire : dépôt de documents et mail automatique. Fin annoncée : `À CONFIRMER` avec Karim. » Pas de 80 %.

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
