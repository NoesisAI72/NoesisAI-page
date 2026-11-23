---
name: jalons-projet
description: "Définit les jalons d'un projet : date, preuve de franchissement, qui valide, décision à prendre. À utiliser pour fixer les étapes clés ou un calendrier de validation."
license: Usage libre, noesisai.fr
metadata:
  auteur: NoesisAI
  version: "1.0.0"
---

# Jalons du projet

**Ce que tu rends :** quatre à huit points de passage datés, chacun avec la preuve qui permet de dire « c'est passé », la personne qui le dit et la décision qui en découle.

## Méthode

1. **Un jalon est un événement, pas une période.** Il a une durée nulle : « Textes validés », pas « Rédaction ».
2. **Cherche les cinq familles** : décision (on continue ou on arrête), livraison, validation par le client ou la direction, dépendance extérieure (livraison d'un fournisseur, accord d'une administration), paiement.
3. **Pour chaque jalon, écris la preuve** : un document signé, un mail de validation, un test réussi, une mise en service constatée. Si la preuve est « on a fini », ce n'est pas un jalon.
4. **Nomme une seule personne qui prononce le passage.**
5. **Donne deux dates** : la date visée et la date au plus tard, celle qui met la fin du projet en danger. Les deux viennent du planning ou restent `À CONFIRMER`.
6. **Écris la décision attachée** : continuer, ajuster, arrêter, payer. Un jalon où rien ne se décide est une ligne de planning, supprime-le.
7. **Place un jalon tôt**, avant 30 % de la durée, qui prouve que l'hypothèse la plus risquée tient (le fournisseur livre, les données se reprennent, l'utilisateur comprend).
8. **Espace de six semaines au maximum.** Au-delà, une dérive a le temps de s'installer sans être vue.
9. **Le dernier jalon est l'acceptation**, pas la fin des travaux.

## Format du livrable

```markdown
# Jalons : [nom du projet]

| N° | Jalon | Date visée | Au plus tard | Preuve de passage | Prononcé par | Décision attachée | Facturation liée |

## Si un jalon n'est pas passé
| N° | Ce qui se passe le lendemain | Qui prévenir |

## Jalon de vérité
(le premier qui prouve que le projet est faisable, et l'hypothèse qu'il teste)

## À décider
```

## Contrôles avant de rendre

- Chaque preuve peut être montrée à quelqu'un d'extérieur au projet.
- Aucun intervalle de plus de six semaines entre deux jalons, ou l'exception est justifiée.
- Les dates tombent un jour ouvré. Vérifie week-ends et jours fériés avec l'outil d'exécution de code.
- Les jalons de paiement correspondent au contrat ou au devis. Cite la ligne.

## Exemple

| N° | Jalon | Date visée | Preuve de passage | Prononcé par | Décision attachée |
|---|---|---|---|---|---|
| J1 | Reprise de 20 dossiers réussie | 18/12/2026 | Tableau de contrôle signé, 20 lignes sur 20 | Responsable d'exploitation | Continuer, ou revoir la reprise avant d'aller plus loin |

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
