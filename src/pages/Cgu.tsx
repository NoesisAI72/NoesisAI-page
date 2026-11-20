import { LegalLayout, LegalBlock } from "./LegalLayout";

export function Cgu() {
  return (
    <LegalLayout title="Conditions générales (CGU / CGV)">
      <LegalBlock heading="Objet">
        <p>
          Les présentes conditions encadrent l'utilisation du site noesisai.fr ainsi que les
          prestations d'automatisation et de conseil proposées par NoesisAI.
        </p>
      </LegalBlock>
      <LegalBlock heading="Prestations">
        <p>
          NoesisAI fournit des services d'audit, de conception, d'intégration et d'optimisation
          d'automatisations IA. Le périmètre, les délais et les tarifs de chaque mission sont définis
          dans un devis dédié, accepté avant tout démarrage.
        </p>
      </LegalBlock>
      <LegalBlock heading="Paiement, durée et responsabilité">
        <p>
          Les modalités de paiement, la durée de la mission, les conditions de résiliation, les
          garanties et la limitation de responsabilité sont précisées dans le devis ou le contrat
          signé pour chaque mission. En cas de contradiction, le devis signé prévaut sur les
          présentes conditions.
        </p>
      </LegalBlock>
      <LegalBlock heading="Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige, les parties
          recherchent d'abord une solution amiable ; à défaut, le tribunal compétent est celui du
          ressort du siège social de NoesisAI.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
