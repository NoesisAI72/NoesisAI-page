import { Seo, filAriane } from "../components/Seo";
import { LightPage, CtaSection, TestimonialsSection } from "../components/page/Blocks";
import { FINAL_CTA } from "../data/content";

const TITRE = "Avis clients et témoignages | NoesisAI";
const DESCRIPTION =
  "Avis des entreprises accompagnées par NoesisAI sur leurs projets d'agents IA, d'automatisation et de logiciels métier.";

export function TemoignagesPage() {
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/temoignages"
        image="/og/temoignages.jpg"
        imageAlt="Témoignages des clients de NoesisAI"
        jsonLd={[filAriane("Témoignages", "/temoignages")]}
      />
      <div className="pt-20">
        <TestimonialsSection headingAs="h1" />
      </div>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
