import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { Problem } from "../../components/Problem";
import { AutomationNetwork } from "../../components/page/AutomationNetwork";
import { AutomationProcess } from "../../components/page/AutomationProcess";
import { PAGES } from "../../data/content";

export function Automatisation() {
  const p = PAGES.automatisation;
  return (
    <LightPage>
      <PageHero {...p.hero} visual={<AutomationNetwork />} />
      <Problem />
      <AutomationProcess />
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
