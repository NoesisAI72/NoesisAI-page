---
name: perimetre-projet
description: "Délimite le périmètre d'un projet : dedans, dehors, à trancher. À utiliser pour écrire le périmètre ou le hors périmètre, ou vérifier si une demande est comprise dans le projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Périmètre du projet

**Ce que tu rends :** une liste vérifiable de ce qui est compris, de ce qui ne l'est pas et de ce qui reste à trancher. Ou, en mode vérification, une réponse nette à « est-ce que cette demande est comprise ? ».

## Méthode : écrire le périmètre

1. **Liste les livrables** cités dans la matière (devis, mails, fiche de cadrage, notes).
2. **Pour chaque livrable, écris les limites en quantités** : nombre de pages, d'utilisateurs, de sites, de langues, d'allers-retours de correction, de jours de formation. Une limite absente devient `À DÉCIDER`.
3. **Passe le test des voisins.** Pour chaque livrable, cherche ce que l'autre partie pourrait croire inclus : textes et photos, reprise des données existantes, formation, documentation, hébergement, sauvegardes, maintenance, corrections après livraison, déplacements, traductions, mise en conformité, achats et licences. Range chacun dans dedans, dehors ou à trancher. Ne laisse aucun voisin dans le vide.
4. **Écris qui fournit quoi.** Une ligne « fourni par le client » pour chaque chose attendue de lui, avec une date.
5. **Note les hypothèses** sur lesquelles le périmètre repose (H1, H2…) : si l'une tombe, le périmètre change.
6. **Signale les zones grises**, c'est-à-dire les formulations qui se lisent de deux façons. Propose pour chacune une rédaction sans ambiguïté.

## Méthode : vérifier une demande

1. Reformule la demande en une phrase.
2. Cherche la ligne du périmètre qui la couvre et **cite-la mot pour mot**, avec sa source (devis, mail du…, fiche de cadrage).
3. Réponds par un seul des trois verdicts : **comprise**, **pas comprise**, **zone grise**.
4. Zone grise : donne les deux lectures possibles et la question à poser pour trancher.
5. Pas comprise : propose d'enchaîner avec une demande de changement, sans la rédiger d'office.

## Format du livrable

```markdown
# Périmètre : [nom du projet]
Version [n] du [date], d'après : [sources]

## Dedans
| Livrable | Limite (quantité) | Critère de fin |

## Dehors
| Élément | Pourquoi il est dehors | Possible plus tard ? |

## À trancher
| Point | Lecture 1 | Lecture 2 | Qui tranche | Pour quand |

## Fourni par le client
| Élément | Responsable | Attendu le |

## Hypothèses
```

## Contrôles avant de rendre

- Chaque ligne « dedans » peut être vérifiée par quelqu'un qui n'a pas participé aux discussions.
- Le hors périmètre compte au moins cinq lignes, sinon le test des voisins n'a pas été fait sérieusement.
- Aucun « etc. », « notamment », « si besoin » : ce sont des portes ouvertes.
- En mode vérification, la réponse s'appuie sur une phrase citée, jamais sur une impression.

## Exemple

Demande : « Vous pouvez aussi traduire le site en anglais ? » Périmètre : « 8 pages en français, textes fournis par le client ».
Verdict : **pas comprise**. Source : devis, ligne 2, « en français ». À chiffrer en demande de changement si le client confirme.

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
