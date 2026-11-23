---
name: pre-mortem
description: "Imagine que le projet a échoué dans six mois et raconte pourquoi, pour corriger avant. À utiliser pour un pré-mortem, éprouver un plan ou dire ce que personne n'ose dire."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Pré-mortem

**Ce que tu rends :** le récit de l'échec du projet, écrit comme s'il avait déjà eu lieu, puis les causes, les signes visibles dès aujourd'hui et trois corrections pour cette semaine. Ce n'est pas agréable à lire, et c'est le but.

## Ce qu'il te faut

Tout ce que l'utilisateur a : fiche de cadrage, planning, budget, mails, notes de réunion. Plus il y en a, plus le récit fait mal au bon endroit. Avec deux lignes de matière, dis que le résultat restera général et demande un document.

## Méthode

1. **Pose la scène** : nous sommes six mois après aujourd'hui (ou une date donnée), le projet a échoué. Pas « a rencontré des difficultés » : échoué, par rapport à son objectif principal.
2. **Écris le récit en dix à quinze lignes**, au passé, avec des dates et des étapes **tirées du projet réel**. Chaque tournant s'appuie sur un fait de la matière. Ce que tu imagines se lit comme une suite logique, pas comme un accident tombé du ciel.
3. **Liste huit à douze causes.** Pour chacune : le mécanisme, le signe déjà visible aujourd'hui (cite la phrase ou le chiffre, ou écris « aucun signe pour l'instant »), la date après laquelle on ne pourra plus corriger.
4. **Cherche les causes humaines** sans viser personne : une validation que personne n'ose demander, un commanditaire absent, un désaccord poli, une personne indispensable, un projet que les utilisateurs n'ont pas demandé.
5. **Nomme la cause que personne ne dit.** Une seule, formulée avec respect, et marquée comme ton interprétation, avec les indices qui t'y conduisent. Sans indice, écris qu'il n'y en a pas.
6. **Trie** : probable et évitable (à corriger), probable et inévitable (à préparer), peu probable et grave (à surveiller avec un signal).
7. **Donne trois corrections pour cette semaine**, chacune faisable par une personne nommée en moins de deux jours.
8. **Écris les critères d'arrêt** : deux ou trois faits qui, s'ils se produisent, devraient faire arrêter ou revoir le projet.

## Format du livrable

```markdown
# Pré-mortem : [nom du projet]
Nous sommes le [date + 6 mois]. Le projet a échoué.

## Ce qui s'est passé
## Les causes
| N° | Cause | Mécanisme | Signe visible aujourd'hui | Trop tard après le | Probable ? | Évitable ? |

## La cause que personne ne dit
(interprétation, à discuter)

## Trois corrections pour cette semaine
| Correction | Qui | Pour le | Cause visée |

## On devrait arrêter si
## À reporter dans le registre des risques
```

## Contrôles avant de rendre

- Aucune phrase rassurante, aucun « mais tout devrait bien se passer ». L'utilisateur a demandé l'échec.
- Retire toute cause qui irait à n'importe quel projet. Si on peut changer le nom du projet sans que la phrase sonne faux, elle est trop générale.
- Le récit accuse des mécanismes, jamais une personne.
- Les faits cités sont dans la matière. Le récit est une fiction et le dit une fois, en tête.

## Exemple

Cause 4. La direction valide les textes « quand elle a un moment ». Signe : deux validations demandées le 02/12 et le 09/12, aucune réponse. Trop tard après le 18/12 : l'intégration démarre avec des pages non validées, et les corrections tombent pendant la recette.

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
