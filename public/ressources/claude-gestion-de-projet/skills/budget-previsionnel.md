---
name: budget-previsionnel
description: "Construit le budget prévisionnel d'un projet : postes, hypothèses, fourchettes basse et haute, réserve. À utiliser pour estimer un coût, une enveloppe ou le prix d'un projet."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Budget prévisionnel

**Ce que tu rends :** un budget par poste avec une fourchette, la source de chaque chiffre, une réserve justifiée par les risques, et les hypothèses qui feraient tout bouger.

## Méthode

1. **Pars du travail à faire.** S'il existe un découpage en tâches, chiffre lot par lot. Sinon, propose les postes et demande confirmation.
2. **Passe en revue les familles de coûts** : temps interne (jours multipliés par coût journalier), prestataires, achats et matériel, licences et abonnements, déplacements, formation, communication, temps de validation du client ou de la direction, mise en conformité, et ce qui continue après la livraison (maintenance, hébergement, support).
3. **Sépare** ce qui se paie une fois et ce qui revient chaque année. Donne le coût de la première année et celui des suivantes.
4. **Pour chaque ligne**, écris quantité, prix unitaire, montant, et **la source du prix** : devis reçu, facture passée, contrat, barème, ou hypothèse. Un prix sans source est une hypothèse et se numérote.
5. **Donne trois valeurs par ligne incertaine** : basse, probable, haute. Montant retenu = (basse + 4 × probable + haute) ÷ 6. Demande les trois valeurs à l'utilisateur si elles manquent, ou marque `À CONFIRMER` ; ne les fabrique pas.
6. **Calcule la réserve à partir des risques** : pour chaque risque chiffrable, impact en euros multiplié par probabilité, puis somme. Sans registre de risques, propose 10 % comme hypothèse à valider, jamais comme une règle.
7. **Trace l'échéancier** des dépenses par mois ou par jalon, pour la trésorerie.
8. **Teste la sensibilité** : les trois hypothèses qui, si elles bougent de 20 %, changent le plus le total. Calcule l'effet de chacune.

## Format du livrable

```markdown
# Budget prévisionnel : [nom du projet]
Version [n] du [date]. Montants HT.

## Synthèse
| | Bas | Retenu | Haut |
(coût du projet, réserve, total, coût annuel ensuite)

## Détail par poste
| Poste | Quantité | Prix unitaire | Bas | Probable | Haut | Retenu | Source |

## Réserve
| Risque | Impact | Probabilité | Provision |

## Échéancier
| Mois ou jalon | Dépense | Cumul |

## Ce qui ferait bouger le total
| Hypothèse | Si elle bouge de 20 % | Nouveau total |

## Hypothèses et chiffres à confirmer
```

## Contrôles avant de rendre

- Les totaux sont calculés par l'outil d'exécution de code et recoupés par lot et par poste.
- TVA : montants HT, taux et TTC indiqués à part si l'utilisateur en a besoin.
- Le temps interne apparaît, même s'il ne sort pas de la trésorerie : sinon le projet a l'air gratuit.
- Aucun prix de marché cité de mémoire : soit une source, soit `À CONFIRMER`.

## Exemple

Poste « Rédaction des textes » : 8 pages. Basse 1 200 €, probable 1 600 €, haute 2 600 € (devis de deux prestataires). Retenu : (1 200 + 4 × 1 600 + 2 600) ÷ 6 = 1 700 €.

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
