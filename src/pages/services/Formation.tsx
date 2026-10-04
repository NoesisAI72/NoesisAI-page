import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { FormationIA } from "../../components/FormationIA";
import { PAGES } from "../../data/content";

export function Formation() {
  const p = PAGES.formation;
  return (
    <LightPage>
      <PageHero {...p.hero} />
      <FormationIA />
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
