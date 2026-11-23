---
name: retour-experience
description: "Organise le retour d'expérience (REX) : ce qui a marché, ce qui a coincé, causes, règles à garder. À utiliser en fin de projet ou de phase pour en tirer des leçons."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Retour d'expérience

**Ce que tu rends :** cinq règles au plus, écrites pour être appliquées au prochain projet, avec l'endroit exact où elles seront rangées. Un retour d'expérience qui finit dans un dossier n'a servi à rien.

## Méthode

1. **Recueille avant la réunion** avec six questions courtes, à envoyer à chacun : ce qui a bien marché et qu'on doit refaire ; ce qui a fait perdre le plus de temps ; ce qu'on savait et qu'on n'a pas dit ; la décision prise trop tard ; ce qui a surpris ; une chose à changer la prochaine fois. Rédige le message.
2. **Regroupe les réponses par thème**, sans nom. Deux réponses semblables pèsent plus qu'une bonne formule.
3. **Garde trois problèmes** : les plus coûteux en jours, en euros ou en confiance. Chiffre avec les écarts et les changements du projet.
4. **Remonte à la cause** avec « pourquoi ? » jusqu'à tomber sur une règle de travail, un outil ou une décision, jamais sur une personne. Si tu arrives à un nom, tu t'es arrêté un « pourquoi » trop tôt.
5. **Transforme chaque leçon en règle** : « La prochaine fois, quand [situation], on [action] ». Une règle doit pouvoir être oubliée sans conséquence, c'est-à-dire être inscrite quelque part : modèle, liste de contrôle, contrat, ou une skill de cette bibliothèque.
6. **Propose la modification exacte** du document ou de la skill concernée : la ligne à ajouter, l'endroit. L'utilisateur l'applique s'il est d'accord.
7. **Garde aussi ce qui a marché** : deux ou trois pratiques, avec la preuve qu'elles ont aidé.
8. **Prépare la réunion**, 60 minutes : 10 faits et chiffres, 20 ce qu'on garde, 20 les trois causes, 10 les règles et qui les inscrit.

## Format du livrable

```markdown
# Retour d'expérience : [nom du projet ou de la phase], le [date]

## À refaire
| Pratique | Preuve qu'elle a aidé | À inscrire où |

## Trois problèmes, leurs causes
| Problème | Coût constaté | Pourquoi (chaîne) | Cause de travail |

## Règles pour la prochaine fois
| N° | Quand… | On… | Inscrite dans | Par qui, pour le |

## Modifications proposées
(document ou skill, ligne exacte à ajouter)

## Questionnaire à envoyer (brouillon)
## Déroulé de la réunion
## Ce qui n'a pas fait consensus
```

## Contrôles avant de rendre

- Cinq règles au plus. Dix règles, c'est zéro règle.
- Aucune règle ne dit « mieux communiquer », « anticiper », « être plus rigoureux » : ce sont des vœux.
- Aucun nom dans les problèmes ni dans les causes.
- Chaque règle a une personne qui l'inscrit et une date, sinon elle est retirée.

## Exemple

Problème : 5 jours perdus à attendre des validations. Pourquoi ? Pas de délai écrit. Pourquoi ? La réunion de lancement n'en a pas parlé. Règle : « Quand on lance un projet, on écrit le délai de validation et ce qui se décale après. » À inscrire dans la skill `reunion-de-lancement`, liste des points à verrouiller.

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
