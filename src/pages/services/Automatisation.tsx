import { Helmet } from "react-helmet-async";
import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { Problem } from "../../components/Problem";
import { AutomationNetwork } from "../../components/page/AutomationNetwork";
import { AutomationProcess } from "../../components/page/AutomationProcess";
import { PAGES } from "../../data/content";

export function Automatisation() {
  const p = PAGES.automatisation;
  return (
    <LightPage>
      <Helmet>
        <title>Agence Automatisation IA & Agents Vocaux | NoesisAI</title>
        <meta name="description" content="Automatisez vos tâches avec des workflows n8n/Make et un agent vocal IA qui décroche 24/7. Audit gratuit, premiers résultats en quelques semaines." />
        <link rel="canonical" href="https://noesisai.fr/automatisation" />
      </Helmet>
      <PageHero {...p.hero} visual={<AutomationNetwork />} />
      <Problem />
      <AutomationProcess />
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
