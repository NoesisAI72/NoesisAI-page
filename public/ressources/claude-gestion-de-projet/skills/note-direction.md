---
name: note-direction
description: "Rédige une note d'une page pour la direction : message clé, chiffres, risque, décision demandée. À utiliser pour informer un dirigeant ou un sponsor pressé."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Note pour la direction

**Ce que tu rends :** une page qui donne la conclusion en premier, trois chiffres, un risque et une décision. Lisible entre deux portes.

## Méthode

1. **Trouve le message** : ce que la personne doit savoir ou faire après lecture. Une phrase. S'il y en a deux, il faut deux notes.
2. **Mets-le dans le titre.** « Espace client : 5 jours de retard, une décision demandée avant le 18 » vaut mieux que « Point projet ».
3. **Soutiens-le avec trois faits chiffrés**, datés, choisis pour leur poids et pas pour leur nombre. Donne toujours le point de comparaison : prévu, mois dernier, budget.
4. **Un seul risque** : celui qui peut changer la conclusion. Avec son signal et sa parade.
5. **Une seule demande**, en question fermée, avec la date limite et le coût d'attendre. Aucune demande : écris « pour information », et la note raccourcit.
6. **Prévois l'objection** la plus probable et réponds-y en deux lignes.
7. **Coupe** : pas d'historique, pas de méthode, pas de sigle, pas de détail qui ne change pas la décision. Les détails existent, sur demande.

## Format du livrable

```markdown
# [Le message, en une ligne]
Pour : … Le : … [Décision avant le … | Pour information]

**À retenir :** [deux phrases]

| Fait | Aujourd'hui | Prévu ou précédent | Écart |
(trois lignes)

**Le risque :** …
**La demande :** … Si on attend : …
**On vous demandera peut-être :** … Réponse : …

Ce qui a changé depuis la dernière note : …
```

## Contrôles avant de rendre

- 300 mots au plus, une page.
- La personne peut répondre sans ouvrir une pièce jointe.
- Les chiffres viennent de documents datés, sinon `À CONFIRMER` et l'utilisateur est prévenu avant l'envoi.
- Aucun adjectif d'ambiance (« encourageant », « préoccupant ») : le chiffre suffit.
- La recommandation est celle de l'utilisateur. Si tu en proposes une, marque-la comme proposition.

## Exemple

Titre : « Espace client : mise en ligne le 3 mars au lieu du 24 février, sauf décision avant le 18 décembre ». À retenir : « Trois textes attendent une validation depuis le 2 décembre. Ouvrir sans eux garde la date. »

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
