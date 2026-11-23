---
name: ordre-du-jour
description: "Prépare l'ordre du jour d'une réunion de projet : but, sujets minutés, décisions attendues, lectures. À utiliser avant une réunion, ou pour juger si elle est utile."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Ordre du jour

**Ce que tu rends :** un ordre du jour minuté où chaque sujet porte une question, plus l'invitation prête à relire. Ou la preuve qu'un message suffit.

## Méthode

1. **Commence par le test d'utilité.** Si personne ne doit décider, débloquer ou construire quelque chose ensemble, propose un message à la place et rédige-le. Laisse l'utilisateur choisir.
2. **Écris le but en une phrase** : « À la fin, nous aurons… ». Si la phrase contient « faire le point », cherche ce qu'on attend vraiment de ce point.
3. **Transforme chaque sujet en question** à laquelle on répond dans la réunion. « Budget » devient « Accepte-t-on les 1 800 € de la reprise de données ? ».
4. **Donne un type à chaque sujet** : décider, débloquer, construire, informer. Les sujets « informer » passent en lecture préalable.
5. **Mets les décisions en premier**, pendant que tout le monde est là et frais.
6. **Minute chaque sujet** et garde 15 % du temps libre. Si la somme dépasse, retire des sujets et dis lesquels : ne comprime pas tout.
7. **Réduis la liste des présents** à ceux dont la réunion a besoin pour répondre aux questions. Les autres reçoivent le compte rendu.
8. **Liste les documents à lire avant**, avec le temps de lecture estimé et la personne qui les envoie.

## Format du livrable

```markdown
# [Réunion], le [date], de [heure] à [heure]
**À la fin, nous aurons :** [résultat]
**Présents utiles :** [noms et raison]. **Reçoivent le compte rendu :** [noms]

| Horaire | Sujet, en une question | Type | Porté par | Durée | Document |

Temps libre gardé : [n] minutes.

## À lire avant
| Document | Envoyé par | Temps de lecture |

## Retiré de l'ordre du jour, et traité comment
```

Puis l'invitation : objet, trois lignes de contexte, les questions à trancher, les lectures.

## Contrôles avant de rendre

- Somme des durées et horaires recalculés avec l'outil d'exécution de code.
- Chaque sujet a un porteur, et ce porteur est présent.
- Aucune décision n'est inscrite si la personne qui décide est absente : signale-le en tête.
- L'ordre du jour tient sur une page.

## Exemple

Demande : « Réunion d'une heure jeudi pour parler du site. » Matière : les textes sont en retard, il faut choisir entre décaler ou ouvrir sans deux pages.
Sujet 1, 14 h 00, 20 min, décider : « Ouvre-t-on le 1er mars avec 6 pages sur 8, ou le 15 mars avec 8 ? » Porté par Claire. Document : tableau des pages restantes.

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
