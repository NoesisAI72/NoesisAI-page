import { Seo, ORGANISATION, filAriane, ficheOrganisation } from "../components/Seo";
import { LightPage, PageHero, TestimonialsSection, CtaSection } from "../components/page/Blocks";
import { Section, SectionHeading } from "../components/ui/Section";
import { EnBref } from "../components/page/EnBref";
import { A_PROPOS, SOCIALS } from "../data/content";
import { IDENTITE } from "../data/identite";

const SITE = "https://noesisai.fr";
const TITRE = "À propos : l'agence et son fondateur | NoesisAI";
const DESCRIPTION =
  "NoesisAI conçoit des solutions et automatisations IA sur mesure pour les PME. L'agence, son fondateur Ugo Sartini et son équipe.";

function IconeLinkedin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[17px] w-[17px]" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const lienRond =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#0b0b0f] transition-colors hover:border-brand-500/50 hover:text-brand-700";

export function AProposPage() {
  const { hero, chiffres, fondateur: f, equipe, methode, cta } = A_PROPOS;
  const [interview, formation] = f.interventions.photos;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${SITE}/a-propos#page`,
      name: "À propos de NoesisAI",
      url: `${SITE}/a-propos`,
      inLanguage: "fr-FR",
      about: { "@id": `${SITE}/#organisation` },
      mainEntity: { "@id": `${SITE}/a-propos#ugo-sartini` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE}/a-propos#ugo-sartini`,
      name: f.nom,
      jobTitle: f.role,
      image: `${SITE}${f.photo}`,
      url: `${SITE}/a-propos`,
      worksFor: ORGANISATION,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Université de Bordeaux" },
      sameAs: [SOCIALS.linkedin, SOCIALS.instagram],
    },
    filAriane("À propos", "/a-propos"),
    { "@context": "https://schema.org", ...ficheOrganisation(IDENTITE.une_phrase) },
  ];

  return (
    <LightPage>
      <Seo title={TITRE} description={DESCRIPTION} path="/a-propos" image="/og/a-propos.jpg" imageAlt="L'agence NoesisAI et son fondateur" jsonLd={jsonLd} />
      <PageHero {...hero} images={[]} />

      <section className="pb-4 pt-2">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
            {chiffres.map((c) => (
              <div key={c.label} className="rounded-3xl border border-black/5 bg-[#f7f6fb] px-6 py-7">
                <p className="font-display text-[2.3rem] font-semibold leading-none tracking-[-0.045em] text-[#0b0b0f]">{c.valeur}</p>
                <p className="mt-2.5 text-sm text-slate-600">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="fondateur" className="bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-16 md:gap-24">
          {/* 1. Le portrait à gauche, la bio à droite */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <figure className="w-full md:max-w-[420px]">
              <div className="overflow-hidden rounded-3xl border border-black/5 bg-[#f7f6fb] shadow-[0_24px_48px_-28px_rgba(30,20,60,0.45)]">
                <img src={f.photo} alt={`${f.nom}, fondateur de NoesisAI`} width={400} height={400} className="aspect-square w-full object-cover" />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-semibold tracking-[-0.03em] text-[#0b0b0f]">{f.nom}</p>
                  <p className="text-sm text-slate-600">{f.role}</p>
                </div>
                <div className="flex gap-2">
                  <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Ugo Sartini sur LinkedIn" title="LinkedIn" className={lienRond}>
                    <IconeLinkedin />
                  </a>
                  <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ugo Sartini sur Instagram" title="Instagram" className={lienRond}>
                    <IconeInstagram />
                  </a>
                </div>
              </figcaption>
            </figure>
            <div>
              <SectionHeading badge={f.badge} title={`${f.nom}, fondateur de NoesisAI`} tone="light" align="left" />
              <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed text-slate-700">
                {f.bio.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Le texte à gauche, l'interview à droite */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <figure className="w-full md:order-2 md:max-w-[380px] md:justify-self-end">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-black/5 bg-[#f7f6fb]">
                <img src={interview.src} alt={interview.alt} width={interview.largeur} height={interview.hauteur} loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-sm text-slate-600">{interview.legende}</figcaption>
            </figure>
            <div className="md:order-1">
              <h3 className="text-balance font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#0b0b0f] sm:text-3xl">{f.terrain.titre}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{f.terrain.texte}</p>
            </div>
          </div>

          {/* 3. La formation à gauche, la citation à droite */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <figure className="w-full">
              <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-black/5 bg-[#f7f6fb]">
                <img src={formation.src} alt={formation.alt} width={formation.largeur} height={formation.hauteur} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-slate-600">{formation.legende}</figcaption>
            </figure>
            <blockquote className="border-l-4 border-brand-600 pl-6">
              <p className="text-balance font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-[#0b0b0f]">« {f.citation} »</p>
              <footer className="mt-3 text-sm text-slate-500">{f.nom}</footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section id="equipe" className="bg-[#f7f6fb]">
        <SectionHeading badge={equipe.badge} title={equipe.title} tone="light" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {equipe.roles.map((r) => (
            <div key={r.titre} className="rounded-3xl border border-black/5 bg-white p-7">
              <p className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">{r.titre}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.texte}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="methode" className="bg-white">
        <SectionHeading badge={methode.badge} title={methode.title} tone="light" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {methode.items.map((m, i) => (
            <div key={m.titre} className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
              <p className="font-display text-sm font-semibold text-brand-700">0{i + 1}</p>
              <p className="mt-3 font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">{m.titre}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{m.texte}</p>
            </div>
          ))}
        </div>
      </Section>

      <TestimonialsSection />
      <EnBref />
      <CtaSection {...cta} />
    </LightPage>
  );
}
