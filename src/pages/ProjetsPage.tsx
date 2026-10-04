import { LightPage, CtaSection, HeroBackground } from "../components/page/Blocks";
import { Projets } from "../components/Projets";
import { FINAL_CTA } from "../data/content";

export function ProjetsPage() {
  return (
    <LightPage>
      <div className="relative pt-20">
        <HeroBackground />
        <div className="relative">
          <Projets title="Nos projets clients" subtitle="Logiciels métier, agents vocaux, automatisations et formations : une sélection de missions, classées par type." />
        </div>
      </div>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
