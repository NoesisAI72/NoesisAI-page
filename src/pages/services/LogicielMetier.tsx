import { Seo, filAriane, service } from "../../components/Seo";
import { LightPage, PageHero, TestimonialsSection, GuidesSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { MethodTimeline } from "../../components/page/MethodTimeline";
import { Logiciels, FeaturedProject } from "../../components/Logiciels";
import { Section, SectionHeading } from "../../components/ui/Section";
import { GUIDES, PAGES } from "../../data/content";

const TITRE = "Logiciel Métier Sur-Mesure pour PME | NoesisAI";
const DESCRIPTION =
  "Devis, chantiers, heures, factures : un logiciel métier sur-mesure construit autour de votre activité, avec IA intégrée (devis à la voix, CR auto).";

export function LogicielMetier() {
  const p = PAGES.logiciel;
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/logiciel-metier"
        image="/og/logiciel-metier.jpg"
        imageAlt="Logiciel métier sur-mesure pour PME"
        jsonLd={[service("Logiciel métier sur-mesure", DESCRIPTION, "/logiciel-metier"), filAriane("Logiciel métier", "/logiciel-metier")]}
      />
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
      <GuidesSection
        title="Préparer votre projet"
        subtitle="Nos guides pour cadrer un logiciel métier et une implémentation IA."
        items={[GUIDES.implementation, GUIDES.logiciel, GUIDES.premierChantier]}
      />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
