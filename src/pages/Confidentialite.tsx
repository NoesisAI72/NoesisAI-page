import { LegalLayout, LegalBlock } from "./LegalLayout";
import { CONTACT_EMAIL } from "../data/content";

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <LegalBlock heading="Données collectées">
        <p>
          Lorsque vous remplissez un formulaire (demande de guide), nous collectons les
          informations que vous nous transmettez : prénom, société, secteur, téléphone, email et
          message. Ces données servent uniquement à traiter votre demande.
        </p>
      </LegalBlock>
      <LegalBlock heading="Finalité et base légale">
        <p>
          Le traitement repose sur votre consentement et sur notre intérêt légitime à répondre à vos
          demandes commerciales. Nous ne revendons aucune donnée à des tiers.
        </p>
      </LegalBlock>
      <LegalBlock heading="Vos droits (RGPD)">
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour
          l'exercer, écrivez-nous à{" "}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalBlock>
      <LegalBlock heading="Mesure d'audience et traceurs">
        <p>
          Nous utilisons Plausible Analytics (mesure d'audience respectueuse de la vie privée) et le
          Meta Pixel à des fins statistiques et publicitaires. Vous pouvez gérer vos préférences via
          les réglages de votre navigateur.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
