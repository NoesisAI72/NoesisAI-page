---
name: compte-rendu-client
description: "Rédige un compte rendu pour le client : avancement, validations attendues, prochaines étapes, ton professionnel. À utiliser pour informer un client de l'état de son projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Compte rendu client

**Ce que tu rends :** un message que le client comprend en une minute, qui dit où en est son projet, ce qu'on attend de lui et ce qui vient. Et la liste de ce qui ne doit pas partir.

## Méthode

1. **Sépare l'interne de l'externe** avant d'écrire. Ne partent jamais : marge, coûts internes, charge de l'équipe, problèmes de personnes, autres clients, hésitations internes, outils utilisés sans intérêt pour lui.
2. **Pars de ce qu'il attend** : l'engagement qu'on lui a donné, puis l'état de cet engagement. Pas de la liste de nos tâches.
3. **Un retard qui le concerne se dit**, dans les cinq premières lignes : le fait, la cause sans accuser personne, la nouvelle date, ce qu'on fait pour la tenir. Cacher un retard coûte plus cher que l'annoncer. Si la nouvelle date n'est pas sûre, dis quand elle le sera.
4. **Demande les validations clairement** : quoi, pour quand, et ce qui se décale si elles arrivent plus tard. Une validation par ligne.
5. **Traduis le vocabulaire** : pas de jargon, pas de numéros internes sauf si le client les connaît.
6. **Termine par trois étapes datées** et le prochain rendez-vous.
7. **Adapte le ton** à la relation : reprends le tutoiement ou le vouvoiement des échanges fournis, sinon vouvoiement.
8. **Relève ce qui ressemble à une demande nouvelle** dans les messages du client et propose une demande de changement à part, sans y répondre ici.

## Format du livrable

```markdown
Objet : [projet], point au [date] : [l'essentiel en six mots]

Bonjour […],

[L'état de l'engagement en deux phrases.]

**Ce qui est fait**
**Ce que nous attendons de vous**
| Validation ou élément | Pour le | Si c'est plus tard |

**Ce qui vient**
| Étape | Date |

[Prochain rendez-vous, phrase de clôture.]
```

Puis, hors du message :

```markdown
## À ne pas envoyer
## À vérifier avant envoi
## Demandes nouvelles repérées
```

## Contrôles avant de rendre

- Aucun `À CONFIRMER` ne reste dans le message : soit il est levé, soit la phrase est retirée, soit l'utilisateur est prévenu en tête.
- Aucune promesse nouvelle : dates, montants et contenus viennent des documents validés.
- Le message se lit en une minute, environ 200 mots.
- Le nom, le projet et les pièces correspondent au bon client.

## Exemple

Interne : « Karim a été malade, on a 5 jours dans la vue. » Au client : « La mise en ligne passe du 24 février au 3 mars. Une partie du développement a pris 5 jours de plus que prévu. La recette commence le 22 février comme convenu pour les pages déjà prêtes. »

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
