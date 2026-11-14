import { Seo, filAriane, service } from "../../components/Seo";
import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { FormationIA } from "../../components/FormationIA";
import { PAGES } from "../../data/content";

const TITRE = "Formation IA Entreprise : Cockpit IA 3 Mois | NoesisAI";
const DESCRIPTION =
  "Formation IA pour dirigeants et équipes : Claude, ChatGPT, Gemini. Présentiel ou distanciel, 3 mois, sur vos cas réels. Jusqu'à 10h/semaine gagnées.";

export function Formation() {
  const p = PAGES.formation;
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/formation-ia"
        image="/og/formation-ia.jpg"
        imageAlt="Le Cockpit IA, formation IA en entreprise"
        jsonLd={[service("Formation IA en entreprise (Cockpit IA)", DESCRIPTION, "/formation-ia"), filAriane("Formation IA", "/formation-ia")]}
      />
      <PageHero {...p.hero} />
      <FormationIA />
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
