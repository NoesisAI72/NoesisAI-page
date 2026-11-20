import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Seo } from "../../components/Seo";
import { LightPage, HeroBackground, CtaSection } from "../../components/page/Blocks";
import { Section, SectionHeading, Reveal } from "../../components/ui/Section";
import { Button, Chevrons } from "../../components/ui/Button";
import { BoutonDemande } from "../../components/DemandeInfos";
import { FlecheRonde, PlaqueLogo, Puce, Riche, Scene } from "../../components/portfolio/Elements";
import { CAS_CLIENTS, PORTFOLIO, type CasClient } from "../../data/portfolio";

const TITRE = "Portfolio NoesisAI : nos cas clients";
const DESCRIPTION =
  "Agents vocaux, systèmes RAG, automatisations N8N et machines de prospection : une sélection de projets livrés par NoesisAI pour des PME.";

function Hero() {
  const p = PORTFOLIO;
  const chiffres = [p.chiffres[0], { valeur: String(CAS_CLIENTS.length), label: "cas clients détaillés" }, p.chiffres[1]];
  return (
    <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
      <HeroBackground />
      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Mot d'accueil d'Ugo, à la place du badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 py-1.5 pl-1.5 pr-5 text-left shadow-[0_10px_30px_-16px_rgba(76,29,149,0.45)] backdrop-blur"
          >
            <img src={p.bienvenue.photo} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white" />
            <span className="font-display text-[0.8rem] leading-snug text-slate-600 sm:text-sm">
              <Riche texte={p.bienvenue.texte} />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-8 text-balance text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] text-[#0b0b0f] sm:text-6xl md:text-7xl"
          >
            {p.titre}{" "}
            <span className="relative inline-block whitespace-nowrap rounded-lg border-[3px] border-dashed border-brand-600 bg-white px-3 shadow-[0_10px_30px_-12px_rgba(76,29,149,0.35)] sm:px-4">
              {p.titreEncadre}
            </span>{" "}
            <span className="text-brand-600">{p.titreFin}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-7 max-w-2xl font-display text-base leading-relaxed text-slate-600 sm:text-xl"
          >
            {p.sousTitre}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <BoutonDemande emplacement="haut du portfolio" size="lg" variant="dark">
              {p.cta} <Chevrons />
            </BoutonDemande>
            <Button href="#cas-clients" size="lg" variant="outlineLight">
              Voir les cas clients
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-14 grid w-full max-w-2xl grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/5 bg-white/80 py-6 shadow-[0_20px_50px_-24px_rgba(76,29,149,0.22)] backdrop-blur-md"
          >
            {chiffres.map((c) => (
              <div key={c.label} className="flex flex-col-reverse px-2">
                <dt className="mt-1.5 text-[0.7rem] leading-tight text-slate-500 sm:text-sm">{c.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#0b0b0f] sm:text-4xl">{c.valeur}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

/** Carte d'un cas client : plaque du logo, nom, secteur et pays, étiquettes. Toute la carte mène à la fiche. */
function CarteCas({ cas }: { cas: CasClient }) {
  return (
    <Link
      to={`/portfolio/${cas.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_40px_-32px_rgba(30,20,60,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_64px_-30px_rgba(76,29,149,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <Scene className="aspect-[16/10] p-7 sm:p-8">
        <PlaqueLogo cas={cas} className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]" />
      </Scene>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-[#0b0b0f]">{cas.nom}</h3>
            <p className="mt-0.5 text-[13px] text-slate-500">
              {cas.secteur} · {cas.pays}
            </p>
          </div>
          <FlecheRonde />
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {cas.services.slice(0, 3).map((s) => (
            <Puce key={s} className="bg-[#f7f6fb] text-[11px]">
              {s}
            </Puce>
          ))}
        </div>
      </div>
    </Link>
  );
}

function CasClients() {
  const c = PORTFOLIO.cas;
  return (
    <Section id="cas-clients" className="bg-white">
      <SectionHeading badge={c.badge} title={c.titre} subtitle={c.sousTitre} tone="light" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CAS_CLIENTS.map((cas, i) => (
          <Reveal key={cas.slug} delay={(i % 3) * 0.06} className="h-full">
            <CarteCas cas={cas} />
          </Reveal>
        ))}
        <Reveal delay={(CAS_CLIENTS.length % 3) * 0.06} className="h-full">
          <CarteProchainCas />
        </Reveal>
      </div>
    </Section>
  );
}

/** Dernière carte de la grille : l'invitation à devenir le prochain cas client. */
function CarteProchainCas() {
  return (
    <div className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-[#0b0b0f] p-7 text-white sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.55),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),transparent)]" />
      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-display text-xs font-medium text-white/80">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
        Votre projet
      </span>
      <div className="relative">
        <p className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">Et si le prochain cas client, c'était vous ?</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{PORTFOLIO.final.sousTitre}</p>
        <BoutonDemande emplacement="grille du portfolio" variant="white" className="mt-6">
          {PORTFOLIO.cta} <Chevrons />
        </BoutonDemande>
      </div>
    </div>
  );
}

function Methode() {
  const m = PORTFOLIO.methode;
  return (
    <Section className="bg-[#f7f6fb]">
      <SectionHeading badge={m.badge} title={m.titre} accent={m.accent} tone="light" />
      <div className="relative mt-12 grid gap-4 md:grid-cols-3">
        {/* Fil qui relie les étapes (grand écran) */}
        <div aria-hidden className="absolute left-[16%] right-[16%] top-[3.25rem] hidden border-t-2 border-dashed border-brand-300 md:block" />
        {m.etapes.map((e, i) => (
          <Reveal key={e.n} delay={i * 0.08}>
            <div className="relative h-full rounded-3xl border border-black/5 bg-white p-7 shadow-[0_20px_40px_-32px_rgba(76,29,149,0.4)]">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient font-display text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)]">
                {e.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{e.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function IconeGlobe() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function IconeEtincelle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round">
      <path d="M12 3.5 13.9 9a2 2 0 0 0 1.2 1.2l5.4 1.8-5.4 1.8a2 2 0 0 0-1.2 1.2L12 20.5l-1.9-5.5a2 2 0 0 0-1.2-1.2L3.5 12l5.4-1.8A2 2 0 0 0 10.1 9L12 3.5Z" />
    </svg>
  );
}

function Reperes() {
  const blocs = [
    { titre: "Géographie", icone: <IconeGlobe />, items: PORTFOLIO.geographie },
    { titre: "Expertises", icone: <IconeEtincelle />, items: PORTFOLIO.expertises },
  ];
  return (
    <section className="bg-white pt-14 sm:pt-20">
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-2">
          {blocs.map((b, i) => (
            <Reveal key={b.titre} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-black/5 bg-[#f7f6fb] p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 ring-1 ring-black/5">{b.icone}</span>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">{b.titre}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {b.items.map((it) => (
                    <Puce key={it} className="px-3.5 py-1.5 text-[13px] text-[#0b0b0f]">
                      {it}
                    </Puce>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  // Retour depuis une fiche (« Tous les cas clients ») : le routeur ne descend pas seul jusqu'à l'ancre.
  // Corps entre accolades : scrollIntoView peut renvoyer une promesse, que React prendrait pour un nettoyage.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#cas-clients") return;
    document.getElementById("cas-clients")?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <LightPage>
      <Seo title={TITRE} description={DESCRIPTION} path="/portfolio" image="/og/portfolio.jpg" imageAlt="Portfolio NoesisAI : nos cas clients" noindex />
      <Hero />
      <CasClients />
      <Methode />
      <Reperes />
      <CtaSection title={PORTFOLIO.final.titre} subtitle={PORTFOLIO.final.sousTitre} cta={PORTFOLIO.cta} />
    </LightPage>
  );
}
