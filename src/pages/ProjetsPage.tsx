import { Helmet } from "react-helmet-async";
import { LightPage, CtaSection, HeroBackground } from "../components/page/Blocks";
import { Projets } from "../components/Projets";
import { FINAL_CTA } from "../data/content";

export function ProjetsPage() {
  return (
    <LightPage>
      <Helmet>
        <title>Projets clients : logiciels métier et agents IA | NoesisAI</title>
        <meta name="description" content="Une sélection de missions NoesisAI : logiciels métier sur-mesure, agents vocaux, automatisations n8n/Make et formations IA, classées par type." />
        <link rel="canonical" href="https://noesisai.fr/projets" />
      </Helmet>
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
