import { Section } from "./ui/Section";
import { BoutonDemande } from "./DemandeInfos";
import { Reveal } from "./ui/Section";
import { Chevrons } from "./ui/Button";
import { FINAL_CTA } from "../data/content";

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-4xl border border-brand-500/30 bg-gradient-to-br from-brand-800/40 via-night-card to-night px-7 py-14 text-center shadow-[0_24px_70px_-24px_rgba(124,58,237,0.55)] sm:px-12 sm:py-16">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {FINAL_CTA.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <BoutonDemande emplacement="bas de page" size="lg">
              {FINAL_CTA.cta} <Chevrons />
            </BoutonDemande>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
