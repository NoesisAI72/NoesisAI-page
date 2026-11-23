---
name: parties-prenantes
description: "Cartographie les parties prenantes d'un projet : influence, attentes, rôles (RACI) et plan de communication. À utiliser pour savoir qui décide, qui consulter et qui informer."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Parties prenantes

**Ce que tu rends :** qui compte dans le projet, ce que chacun attend, qui décide de quoi, et qui doit être informé de quoi et quand.

## Méthode

1. **Liste tout le monde**, puis passe en revue les oubliés habituels : la personne qui paie, celle qui signe, celle qui utilisera le résultat tous les jours, celle dont le travail change, l'accueil, la comptabilité, l'informatique, le juridique, le fournisseur du fournisseur, le client final, les représentants du personnel si l'organisation du travail change.
2. **Pour chacun, note** ce qu'il attend, ce qu'il craint, son influence (forte, moyenne, faible) et sa position (favorable, neutre, réservé, inconnue). Ces informations viennent de la matière : sinon `À CONFIRMER`. Ne devine jamais une intention.
3. **Écris le RACI** sur les livrables et les décisions, pas sur les tâches : R réalise, A décide et rend des comptes, C est consulté avant, I est informé après.
4. **Vérifie le RACI** : exactement un A par ligne ; au moins un R ; pas plus de trois C ; personne avec un A partout (goulet d'étranglement) ; personne dont on attend un travail sans R.
5. **Construis le plan de communication** : quoi, à qui, à quel rythme, par quel canal, qui l'envoie.
6. **Propose une action par personne sensible** : influence forte et position réservée ou inconnue. Une action concrète et datée, pas « la rassurer ».

## Format du livrable

```markdown
# Parties prenantes : [nom du projet]

## Qui compte
| Personne ou groupe | Rôle dans le projet | Attend | Craint | Influence | Position | Prochaine action |

## Qui décide de quoi (RACI)
| Livrable ou décision | [Nom 1] | [Nom 2] | [Nom 3] |

## Alertes sur les rôles
(lignes sans A, deux A, personne surchargée, rôle sans nom)

## Plan de communication
| Information | Pour qui | Rythme | Canal | Envoyé par |

## Absents de la liste à vérifier
```

## Contrôles avant de rendre

- Le document peut être lu par toutes les personnes qu'il cite : faits et attentes, aucun jugement. Si une remarque sensible est utile, propose de la garder hors du document.
- Chaque décision importante du projet a un A nommé, pas un service.
- Le plan de communication ne crée pas une réunion de plus : il utilise d'abord ce qui existe.

## Exemple

« Le comptable n'a pas été prévenu mais c'est lui qui recevra les factures du nouvel outil » : ajoute une ligne Comptabilité, attend `À CONFIRMER`, influence moyenne, position inconnue, prochaine action : 15 minutes avec lui avant le choix de l'outil.

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
