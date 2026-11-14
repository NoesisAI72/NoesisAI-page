import { Seo, filAriane } from "../components/Seo";
import { LightPage, CtaSection, HeroBackground } from "../components/page/Blocks";
import { Projets } from "../components/Projets";
import { FINAL_CTA } from "../data/content";

const TITRE = "Projets clients : logiciels métier et agents IA | NoesisAI";
const DESCRIPTION =
  "Une sélection de missions NoesisAI : logiciels métier sur-mesure, agents vocaux, automatisations n8n/Make et formations IA, classées par type.";

export function ProjetsPage() {
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/projets"
        image="/og/projets.jpg"
        imageAlt="Projets clients de NoesisAI"
        jsonLd={[filAriane("Projets clients", "/projets")]}
      />
      <div className="relative pt-20">
        <HeroBackground />
        <div className="relative">
          <Projets headingAs="h1" title="Nos projets clients" subtitle="Logiciels métier, agents vocaux, automatisations et formations : une sélection de missions, classées par type." />
        </div>
      </div>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
