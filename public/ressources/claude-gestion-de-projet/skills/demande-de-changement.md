---
name: demande-de-changement
description: "Analyse une demande de changement : effet sur délai, coût, contenu et risques, options et réponse prête. À utiliser quand un client ou la direction demande un ajout."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Demande de changement

**Ce que tu rends :** l'effet chiffré d'une demande, les options pour y répondre, et le brouillon de la réponse.

## Méthode

1. **Reformule la demande** en une phrase, avec qui la fait, quand, et pourquoi. Si le pourquoi manque, c'est ta première question : il existe souvent une réponse plus simple.
2. **Vérifie si elle est comprise** dans le périmètre, en citant la ligne. Si elle l'est, ce n'est pas un changement : dis-le et arrête-toi là.
3. **Mesure l'effet** par rapport à la référence (périmètre, planning, budget validés) : tâches touchées, charge ajoutée, jours sur la date de fin, euros, qualité, risques, travail déjà fait à reprendre. Sans référence, l'effet ne se mesure pas : dis ce qu'il manque.
4. **Compte aussi ce qui ne se voit pas** : tests à refaire, documentation, formation, validation, maintenance ensuite.
5. **Propose quatre options** quand elles existent : accepter en plus (prix et délai), échanger contre autre chose (quoi), reporter à une version suivante, refuser. Une phrase de contrepartie par option.
6. **Recommande une option** et dis jusqu'à quelle date la réponse peut attendre sans coût supplémentaire.
7. **Donne un numéro** (C1, C2…), même aux demandes refusées. Les petites demandes non numérotées sont la première cause de dépassement.
8. **Rédige la réponse** : positive sur l'intention, factuelle sur l'effet, deux options claires, une question fermée à la fin.

## Format du livrable

```markdown
# C[n] : [demande en une phrase]
Demandé par [nom] le [date]. Raison : […]. Dans le périmètre ? Non, voir [source].

## Effet
| | Avant | Après | Écart |
(date de fin, budget, charge, contenu, risques)

Tâches touchées : …
Travail à reprendre : …

## Options
| Option | Délai | Coût | Contrepartie |

## Recommandation
À décider avant le [date], par [nom].

## Réponse proposée (brouillon)
## Si accepté : ce qui change dans le périmètre, le planning et le budget
```

## Contrôles avant de rendre

- Le total des changements déjà acceptés est rappelé : C1 à C[n], [n] jours, [n] euros.
- Aucun prix n'est inventé : il vient d'un taux fourni, d'un devis, ou reste `À CONFIRMER`.
- La réponse ne dit ni « simple » ni « petit » : ces mots se retournent toujours.
- Rien n'engage l'entreprise : la réponse est un brouillon, et l'avenant éventuel se relit avec le contrat.

## Exemple

« Ajouter un export PDF. » Effet : 2 jours de développement, 0,5 jour de tests, + 2 jours sur la date de fin car la tâche suit T3.1, sans marge. Options : + 2 jours et prix `À CONFIRMER` ; échange contre l'historique des dépôts ; version suivante.

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
