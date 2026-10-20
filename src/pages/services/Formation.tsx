import { Helmet } from "react-helmet-async";
import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { FormationIA } from "../../components/FormationIA";
import { PAGES } from "../../data/content";

export function Formation() {
  const p = PAGES.formation;
  return (
    <LightPage>
      <Helmet>
        <title>Formation IA Entreprise – Cockpit IA 3 Mois | NoesisAI</title>
        <meta name="description" content="Formation IA pour dirigeants et équipes : Claude, ChatGPT, Gemini. Présentiel ou distanciel, 3 mois, sur vos cas réels. Jusqu'à 10h/semaine gagnées." />
        <link rel="canonical" href="https://noesisai.fr/formation-ia" />
      </Helmet>
      <PageHero {...p.hero} />
      <FormationIA />
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
