import { LightPage, CtaSection, TestimonialsSection } from "../components/page/Blocks";
import { FINAL_CTA } from "../data/content";

export function TemoignagesPage() {
  return (
    <LightPage>
      <div className="pt-20">
        <TestimonialsSection />
      </div>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
