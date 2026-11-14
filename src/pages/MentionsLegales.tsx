import { LegalLayout, LegalBlock } from "./LegalLayout";
import { IDENTITE, rempli, aCompleter } from "../data/identite";

/** Une ligne des mentions : affichée si renseignée, « [à compléter] » si l'info manque encore,
    masquée si le champ est vide (« ne s'applique pas », ex. capital d'une entreprise individuelle).
    Les valeurs viennent de src/data/identite.json, comme la fiche d'entreprise des données structurées. */
function Ligne({ label, valeur }: { label: string; valeur: string }) {
  if (!rempli(valeur) && !aCompleter(valeur)) return null;
  return (
    <li>
      {label} : {rempli(valeur) ? valeur : <span className="text-slate-400">[à compléter]</span>}
    </li>
  );
}

export function MentionsLegales() {
  const s = IDENTITE.societe;
  const a = s.siege;
  const adresseComplete = rempli(a.rue) && rempli(a.code_postal) && rempli(a.ville);
  const siege = adresseComplete ? [a.rue, `${a.code_postal} ${a.ville}`, a.pays].filter(rempli).join(", ") : "À compléter";
  const email = IDENTITE.contact.email;
  return (
    <LegalLayout title="Mentions légales">
      <LegalBlock heading="Éditeur du site">
        <p>Le site noesisai.fr est édité par {rempli(s.raison_sociale) ? s.raison_sociale : IDENTITE.marque}.</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <Ligne label="Raison sociale" valeur={s.raison_sociale} />
          <Ligne label="Forme juridique" valeur={s.forme_juridique} />
          <Ligne label="Capital social" valeur={s.capital} />
          <Ligne label="SIREN" valeur={s.siren} />
          <Ligne label="Immatriculation" valeur={s.rcs} />
          <Ligne label="Siège social" valeur={siege} />
          <Ligne label="TVA intracommunautaire" valeur={s.tva} />
          <Ligne label="Téléphone" valeur={s.telephone} />
          <li>
            E-mail :{" "}
            <a className="underline" href={`mailto:${email}`}>
              {email}
            </a>
          </li>
          <Ligne label="Directeur de la publication" valeur={s.directeur_publication} />
        </ul>
      </LegalBlock>
      <LegalBlock heading="Hébergement">
        <p>{s.hebergeur}</p>
      </LegalBlock>
      <LegalBlock heading="Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, visuels, logo) est protégé. Les
          logos des clients et partenaires restent la propriété de leurs titulaires respectifs et
          sont affichés avec leur accord.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
