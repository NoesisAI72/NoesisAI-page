import { Seo, filAriane, service, donneesFaq } from "../../components/Seo";
import { LightPage, PageHero, TestimonialsSection, GuidesSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { Problem } from "../../components/Problem";
import { AutomationNetwork } from "../../components/page/AutomationNetwork";
import { AutomationProcess } from "../../components/page/AutomationProcess";
import { GUIDES, PAGES } from "../../data/content";

const TITRE = "Agence Automatisation IA & Agents Vocaux | NoesisAI";
const DESCRIPTION =
  "Automatisez vos tâches avec des workflows n8n/Make et un agent vocal IA qui décroche 24/7. Audit gratuit, premiers résultats en quelques semaines.";

export function Automatisation() {
  const p = PAGES.automatisation;
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/automatisation"
        image="/og/automatisation.jpg"
        imageAlt="Automatisations IA et agents vocaux pour PME"
        jsonLd={[service("Automatisation IA et agents vocaux", DESCRIPTION, "/automatisation"), filAriane("Automatisation IA", "/automatisation"), ...donneesFaq(p.faq.items)]}
      />
      <PageHero {...p.hero} visual={<AutomationNetwork />} />
      <Problem />
      <AutomationProcess />
      <TestimonialsSection />
      <GuidesSection
        title="Préparer votre projet"
        subtitle="Nos guides pour chiffrer un agent IA et choisir quoi automatiser."
        items={[GUIDES.prixAgent, GUIDES.n8n, GUIDES.couts]}
      />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
