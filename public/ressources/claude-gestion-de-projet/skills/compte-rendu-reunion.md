---
name: compte-rendu-reunion
description: "Rédige le compte rendu d'une réunion à partir de notes ou d'une transcription : décisions, actions, points ouverts. À utiliser après une réunion, un appel ou une visio."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Compte rendu de réunion

**Ce que tu rends :** une page qui dit ce qui a été décidé, qui fait quoi pour quand, et ce qui reste ouvert. Pas le récit de la réunion.

## Méthode

1. **Lis toute la matière avant d'écrire.** Une décision prise à la dixième minute est souvent défaite à la quarantième : c'est la dernière version qui compte, et tu signales le revirement.
2. **Range chaque passage utile** dans une seule case : décision, action, information, point ouvert, désaccord.
3. **Décision :** une phrase active, la personne qui décide, la date d'effet. Si personne n'a clairement tranché, c'est un point ouvert, même si tout le monde avait l'air d'accord.
4. **Action :** verbe, une personne, une date. S'il en manque, `À CONFIRMER`, jamais une déduction.
5. **Désaccord :** les deux positions en une ligne chacune, sans dire qui a raison.
6. **N'attribue une phrase qu'à une personne identifiée sans doute.** Dans une transcription automatique, les noms et les chiffres sont souvent faux : marque `[à vérifier]` ce qui te semble douteux, et cite le passage.
7. **Laisse de côté** les digressions, les remarques personnelles, et ce qui a été dit « entre nous ». En cas de doute, demande.
8. **Propose les suites** : actions à ajouter à la liste, décisions à inscrire au journal, sans modifier ces documents d'office.

## Format du livrable

```markdown
# Compte rendu : [réunion], le [date]
Présents : … Absents : … Rédigé le : …

## Décisions
| N° | Décision | Décidé par | Prend effet le |

## Actions
| N° | Action | Responsable | Pour le |

## Points ouverts et désaccords
| Point | Positions | Qui tranche | Pour quand |

## Informations utiles
(trois lignes au plus)

## Prochaine réunion
## À vérifier avant envoi
| Passage | Pourquoi |
```

Puis le mail d'envoi en trois lignes, en brouillon.

## Contrôles avant de rendre

- Relecture inverse : chaque décision et chaque action se retrouve dans la matière.
- Une page. Si c'est plus long, ce sont des informations à couper.
- La mention « sans remarque sous [n] jours, ce compte rendu est considéré comme validé » s'ajoute seulement si l'utilisateur le demande.
- Les personnes citées étaient présentes, ou l'action est « à confirmer avec elle ».

## Exemple

Transcription : « Bon du coup on part sur le 15, enfin si Marc est ok, Claire tu relances pour les textes. »
Point ouvert : date de mise en ligne au 15, à valider par Marc, pour quand `À CONFIRMER`. Action A14 : relancer pour les textes. Claire. Pour le : `À CONFIRMER`.

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
