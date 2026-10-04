import { Link } from "react-router-dom";
import { Section, SectionHeading, Reveal } from "../components/ui/Section";
import {
  LightPage,
  PageHero,
  MethodSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
} from "../components/page/Blocks";
import { filled } from "../components/page/ToFill";
import { ScreenshotFrame } from "../components/ui/ScreenshotFrame";
import { AutomationNetwork } from "../components/page/AutomationNetwork";
import { BeforeAfterPreview } from "../components/ui/BeforeAfter";
import { Projets } from "../components/Projets";
import { FAQ, FINAL_CTA, HERO, HOME, SERVICES_MENU } from "../data/content";

const SERVICE_IMAGES: Record<string, string | undefined> = {
  "/logiciel-metier": "/projets/muller-dashboard.webp",
  "/formation-ia": "/formation/plateforme-seances.webp",
};

/** « Pensé pour vos équipes » : une carte par service, vers sa page. */
function ServicesGrid() {
  return (
    <Section className="bg-[#f7f6fb]">
      <SectionHeading
        title={HOME.services.title}
        accent={HOME.services.titleAccent}
        subtitle={filled(HOME.services.subtitle) ? HOME.services.subtitle : undefined}
        tone="light"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {SERVICES_MENU.map((s, i) => {
          const img = SERVICE_IMAGES[s.to];
          return (
            <Reveal key={s.to} delay={(i % 2) * 0.08}>
              <Link
                to={s.to}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(76,29,149,0.45)]"
              >
                {s.to === "/logiciel-metier" ? (
                  <div className="flex aspect-[16/10] items-center bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff] p-5">
                    <BeforeAfterPreview after="/projets/muller-dashboard.webp" afterAlt="fichiers éparpillés, puis l'application Müller Hub" />
                  </div>
                ) : s.to === "/automatisation" ? (
                  <div className="flex aspect-[16/10] items-center bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff] px-4">
                    <AutomationNetwork labels={false} />
                  </div>
                ) : img ? (
                  <ScreenshotFrame src={img} alt="" className="aspect-[16/10]" />
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff] p-6 font-display text-2xl font-semibold tracking-[-0.03em] text-brand-700">
                    {s.label}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{s.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.text}</p>
                  <span className="mt-auto pt-5 font-display text-sm font-semibold underline decoration-brand-600/40 decoration-2 underline-offset-4 group-hover:decoration-brand-600">
                    Découvrir ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function Home() {
  return (
    <LightPage>
      <PageHero
        badge={HERO.badge}
        title="Des systèmes d'IA"
        boxed="sur-mesure"
        titleEnd="qui transforment votre entreprise"
        subtitle={HERO.subtitle}
        showRating
        images={["/projets/muller-dashboard.webp", "/projets/odas-diffusion.webp", "/projets/hohiohen-dashboard.webp"]}
      />
      <ServicesGrid />
      <MethodSection />
      <Projets badge="Projets" title={HOME.projectsTitle} limit={6} showAllLink />
      <TestimonialsSection />
      <FaqSection title={FAQ.title} items={FAQ.items} />
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}
