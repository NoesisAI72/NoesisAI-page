---
name: liste-des-actions
description: "Tient la liste des actions d'un projet : quoi, qui, pour quand, statut, relances prêtes. À utiliser pour extraire les actions de notes ou de mails, ou préparer les relances."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Liste des actions

**Ce que tu rends :** une seule liste à jour, sans doublon, avec les retards en tête et les relances prêtes à relire.

## Méthode

1. **Extrais les actions** des notes, mails, messages et comptes rendus. Une action a un verbe, un responsable et une date. « Il faudrait regarder » n'est pas une action : range-le dans « à transformer en action ou à abandonner ».
2. **Un responsable, une personne.** Si le texte dit « l'équipe » ou « on », écris `À DÉCIDER` et propose la question.
3. **Une date réelle.** « Rapidement », « fin de semaine » deviennent une date seulement si le contexte la donne sans doute possible, sinon `À CONFIRMER`.
4. **Fusionne avec la liste existante** : mêmes numéros, pas de doublon. Si deux actions se ressemblent, demande avant de fusionner.
5. **Cinq statuts** : à faire, en cours, en attente (de qui), fait (le), abandonnée (pourquoi). Rien ne s'efface : une action finie ou abandonnée reste en bas de liste.
6. **Calcule les retards** par rapport à la date du jour, en jours ouvrés, avec l'outil d'exécution de code.
7. **Mets en tête les cinq actions qui bloquent le plus** : celles que d'autres attendent ou qui précèdent un jalon.
8. **Prépare les relances** : une par personne, pas une par action. Ton neutre : le fait, la date, ce que ça débloque, une question fermée. Troisième relance sur la même action : propose plutôt un appel ou une escalade.

## Format du livrable

```markdown
# Actions : [nom du projet], au [date]
[n] ouvertes, dont [n] en retard et [n] sans responsable ou sans date.

## Les cinq qui bloquent
## Toutes les actions ouvertes
| N° | Action | Responsable | Pour le | Statut | Retard (j ouvrés) | Vient de | Bloque |

## À transformer en action, ou à abandonner
## Faites ou abandonnées depuis la dernière mise à jour
## Relances (brouillons)
**À [prénom] :** …
```

## Contrôles avant de rendre

- Le nombre d'actions avant et après se recoupe : anciennes, ajoutées, faites, abandonnées.
- Chaque action se rattache à sa source (réunion du…, mail du…).
- Les relances ne parlent que des actions de la personne à qui elles s'adressent.
- Aucune action n'est passée à « fait » sans que la matière le dise.

## Exemple

Note : « Claire voit avec l'hébergeur pour les sauvegardes, faudrait aussi que quelqu'un pense aux mentions légales. »
A12 : demander à l'hébergeur le détail des sauvegardes. Claire. Pour le : `À CONFIRMER`.
À transformer : mentions légales. Question : « Qui les rédige, et avant la mise en ligne ou après ? »

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
