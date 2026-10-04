import { LegalLayout, LegalBlock } from "./LegalLayout";

export function Cgu() {
  return (
    <LegalLayout title="Conditions générales (CGU / CGV)">
      <LegalBlock heading="Objet">
        <p>
          Les présentes conditions encadrent l'utilisation du site noesisai.fr ainsi que les
          prestations d'automatisation et de conseil proposées par NOESIS AI.
        </p>
      </LegalBlock>
      <LegalBlock heading="Prestations">
        <p>
          NOESIS AI fournit des services d'audit, de conception, d'intégration et d'optimisation
          d'automatisations IA. Le périmètre, les délais et les tarifs de chaque mission sont définis
          dans un devis dédié, accepté avant tout démarrage.
        </p>
      </LegalBlock>
      <LegalBlock heading="Responsabilité">
        <p className="text-slate-500">
          [À compléter : modalités de paiement, durée, résiliation, garanties, limitation de
          responsabilité, droit applicable et juridiction compétente.]
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
