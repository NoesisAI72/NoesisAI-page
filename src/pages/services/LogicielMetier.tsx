import { LightPage, PageHero, TestimonialsSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { MethodTimeline } from "../../components/page/MethodTimeline";
import { Logiciels, FeaturedProject } from "../../components/Logiciels";
import { Section, SectionHeading } from "../../components/ui/Section";
import { PAGES } from "../../data/content";

export function LogicielMetier() {
  const p = PAGES.logiciel;
  return (
    <LightPage>
      <PageHero {...p.hero} />
      <Logiciels />
      <MethodTimeline />
      {/* Réalisations : Muller, ŌDAS Conseil, Ho Hio Hen */}
      <Section id="realisations" className="bg-white">
        <SectionHeading badge="Réalisations" title={p.projects.title} subtitle={p.projects.subtitle} tone="light" />
        <div className="mt-10">
          <FeaturedProject />
        </div>
      </Section>
      <TestimonialsSection />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
