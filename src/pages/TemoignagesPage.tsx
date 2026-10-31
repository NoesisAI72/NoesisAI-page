import { Helmet } from "react-helmet-async";
import { LightPage, CtaSection, TestimonialsSection } from "../components/page/Blocks";
import { FINAL_CTA } from "../data/content";

export function TemoignagesPage() {
  return (
    <LightPage>
      <Helmet>
        <title>Avis clients et témoignages | NoesisAI</title>
        <meta name="description" content="Avis des entreprises accompagnées par NoesisAI sur leurs projets d'agents IA, d'automatisation et de logiciels métier." />
        <link rel="canonical" href="https://noesisai.fr/temoignages" />
      </Helmet>
      <div className="pt-20">
        <TestimonialsSection headingAs="h1" />
      </div>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
