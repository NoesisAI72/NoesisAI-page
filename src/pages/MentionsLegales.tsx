import { LegalLayout, LegalBlock } from "./LegalLayout";
import { CONTACT_EMAIL } from "../data/content";

export function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">
      <LegalBlock heading="Éditeur du site">
        <p>
          Le site noesisai.fr est édité par NOESIS AI. Pour toute question, vous pouvez nous
          contacter à l'adresse <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p className="text-slate-500">
          [À compléter : raison sociale, forme juridique, capital, SIREN/SIRET, adresse du siège,
          numéro de TVA intracommunautaire, directeur de la publication.]
        </p>
      </LegalBlock>
      <LegalBlock heading="Hébergement">
        <p className="text-slate-500">[À compléter : nom et adresse de l'hébergeur.]</p>
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
