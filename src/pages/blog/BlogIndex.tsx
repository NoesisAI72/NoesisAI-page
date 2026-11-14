import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo, filAriane, ORGANISATION } from "../../components/Seo";
import { LightPage, CtaSection, HeroBackground } from "../../components/page/Blocks";
import { ARTICLES, CATEGORIES, dateLongue, type Categorie } from "../../blog/articles";
import { FINAL_CTA } from "../../data/content";
import { cn } from "../../components/ui/cn";

const TITRE = "Blog : l'IA appliquée aux PME | NoesisAI";
const DESCRIPTION =
  "Des guides concrets pour les dirigeants de PME : automatiser, s'équiper d'un agent IA, choisir un logiciel métier et former ses équipes.";

const BLOG_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://noesisai.fr/blog#blog",
  name: "Le blog NoesisAI",
  url: "https://noesisai.fr/blog",
  inLanguage: "fr-FR",
  publisher: ORGANISATION,
  blogPost: ARTICLES.map((a) => ({
    "@type": "BlogPosting",
    headline: a.titre,
    url: `https://noesisai.fr/blog/${a.slug}`,
    datePublished: a.date,
  })),
};

export function BlogIndex() {
  const [filtre, setFiltre] = useState<Categorie | null>(null);
  const presentes = (Object.keys(CATEGORIES) as Categorie[]).filter((c) => ARTICLES.some((a) => a.categorie === c));
  const visibles = filtre ? ARTICLES.filter((a) => a.categorie === filtre) : ARTICLES;

  return (
    <LightPage>
      <Seo
        title={TITRE}
        description={DESCRIPTION}
        path="/blog"
        image="/og/blog.jpg"
        imageAlt="Le blog NoesisAI : l'IA appliquée aux PME"
        jsonLd={[filAriane("Blog", "/blog"), BLOG_LD]}
      />
      <section className="relative pb-16 pt-36 sm:pt-40">
        <HeroBackground />
        <div className="container-page relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden /> Blog
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0b0b0f] sm:text-6xl">
            L'IA appliquée aux PME
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600">
            Des guides concrets pour automatiser, s'équiper et former vos équipes.
          </p>

          {presentes.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par thème">
              <Puce actif={filtre === null} onClick={() => setFiltre(null)}>
                Tout
              </Puce>
              {presentes.map((c) => (
                <Puce key={c} actif={filtre === c} onClick={() => setFiltre(c)}>
                  {CATEGORIES[c].label}
                </Puce>
              ))}
            </div>
          )}

          {visibles.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-black/10 bg-[#f7f6fb] px-6 py-12 text-center">
              <p className="font-display text-xl font-semibold">Les premiers articles arrivent bientôt.</p>
              <p className="mt-2 text-sm text-slate-600">
                En attendant,{" "}
                <a href="/ressources" className="font-medium text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4">
                  nos ressources gratuites
                </a>
                .
              </p>
            </div>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/blog/${a.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(11,11,15,0.35)] transition hover:-translate-y-0.5 hover:border-brand-500/40"
                  >
                    <span className="w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                      {CATEGORIES[a.categorie]?.label ?? a.categorie}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0b0b0f] group-hover:text-brand-700">
                      {a.titre}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{a.description}</p>
                    <p className="mt-auto pt-5 text-xs text-slate-500">
                      {dateLongue(a.date)} · {a.minutes} min{a.brouillon ? " · brouillon" : ""}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaSection title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
    </LightPage>
  );
}

function Puce({ actif, onClick, children }: { actif: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition",
        actif ? "border-[#0b0b0f] bg-[#0b0b0f] text-white" : "border-black/10 bg-white text-slate-600 hover:border-black/25 hover:text-[#0b0b0f]"
      )}
    >
      {children}
    </button>
  );
}
