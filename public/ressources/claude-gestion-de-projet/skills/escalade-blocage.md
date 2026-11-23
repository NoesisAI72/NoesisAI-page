---
name: escalade-blocage
description: "Rédige une escalade claire : blocage, faits, effet chiffré, ce qui a été tenté, décision demandée. À utiliser quand un blocage dépasse le chef de projet ou traîne."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Escalade d'un blocage

**Ce que tu rends :** un message de dix lignes qui permet à quelqu'un de débloquer la situation sans réunion, et sans que personne soit mis en cause.

## Méthode

1. **Vérifie que c'est le moment.** Trois conditions : un jalon ou un engagement est menacé, au moins deux tentatives datées ont échoué, une autre personne a le pouvoir de débloquer. S'il en manque une, propose la relance ou l'action qui manque, et rédige-la.
2. **Choisis le bon niveau** : la personne la plus proche qui peut trancher. Sauter un niveau se décide, et se dit à la personne sautée. Propose de la prévenir d'abord.
3. **Écris la décision demandée en premier** : une question fermée, une date.
4. **Pose les faits datés**, trois à cinq lignes, sans adjectif.
5. **Chiffre l'effet** si rien ne bouge : jours, euros, client, à partir de quelle date.
6. **Dis ce qui a été tenté**, avec les dates.
7. **Propose deux solutions** et celle que tu recommandes. Une escalade sans solution est une plainte.
8. **Adapte la forme** : mail, message court, version orale de 30 secondes.
9. **Prévois la suite** : quand relancer, vers qui, et ce qu'on fait en attendant pour limiter l'effet.

## Format du livrable

```markdown
## Faut-il escalader ?
| Condition | Oui / non | Preuve |

## Message (brouillon)
Objet : Décision demandée avant le [date] : [sujet]
**Décision demandée :** …
**Faits :** …
**Si rien ne bouge :** …
**Déjà tenté :** …
**Options :** … Recommandation : …

## Version courte (messagerie)
## Version orale (30 secondes)
## En attendant
## Suite prévue
| Si pas de réponse le | Alors |

## À prévenir avant l'envoi
```

## Contrôles avant de rendre

- Relis chaque phrase comme si la personne concernée était en copie. Si elle se sentirait accusée, remplace-la par un fait et un effet.
- Aucun « comme indiqué à plusieurs reprises » : une date et c'est tout.
- Le message se comprend sans connaître le projet.
- L'effet chiffré vient du planning ou du budget, sinon `À CONFIRMER`.

## Exemple

**Décision demandée :** valider les 3 derniers textes, ou accepter d'ouvrir sans eux, avant le 18/12. **Faits :** textes envoyés le 02/12, rappel le 09/12, pas de retour. **Si rien ne bouge :** l'intégration démarre incomplète le 09/02 et la mise en ligne passe du 24/02 au 03/03, soit 5 jours ouvrés.

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
