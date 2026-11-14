import { Seo, filAriane, service } from "../../components/Seo";
import { LightPage, PageHero, TestimonialsSection, GuidesSection, FaqSection, CtaSection } from "../../components/page/Blocks";
import { MethodTimeline } from "../../components/page/MethodTimeline";
import { Logiciels, FeaturedProject } from "../../components/Logiciels";
import { Section, SectionHeading } from "../../components/ui/Section";
import { GUIDES, PAGES } from "../../data/content";

const TITRE = "Création de logiciel sur mesure pour PME | NoesisAI";
const DESCRIPTION =
  "Logiciel sur mesure pour PME : devis, chantiers, heures, factures, avec l'IA intégrée. De 2 500 à 10 000 € selon les utilisateurs et les fonctions.";

export function LogicielMetier() {
  const p = PAGES.logiciel;
  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/logiciel-metier"
        image="/og/logiciel-metier.jpg"
        imageAlt="Logiciel sur mesure pour PME"
        jsonLd={[service("Logiciel sur mesure pour PME", DESCRIPTION, "/logiciel-metier"), filAriane("Logiciel métier", "/logiciel-metier")]}
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
        subtitle="Nos guides pour chiffrer et cadrer un logiciel sur mesure."
        items={[GUIDES.prixLogiciel, GUIDES.logiciel, GUIDES.implementation, GUIDES.premierChantier]}
      />
      <FaqSection {...p.faq} />
      <CtaSection {...p.cta} />
    </LightPage>
  );
}
