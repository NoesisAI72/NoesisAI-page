import { Link, useParams } from "react-router-dom";
import { Seo, ORGANISATION } from "../../components/Seo";
import { LightPage, HeroBackground } from "../../components/page/Blocks";
import { BoutonDemande } from "../../components/DemandeInfos";
import { Chevrons } from "../../components/ui/Button";
import { ARTICLES, CATEGORIES, dateLongue, trouverArticle, type Article } from "../../blog/articles";
import { NotFound } from "../NotFound";

const SITE = "https://noesisai.fr";
const AUTEUR = {
  "@type": "Person",
  name: "Ugo Sartini",
  url: "https://www.linkedin.com/in/ugo-sartini-04a14620a/",
  sameAs: ["https://www.linkedin.com/in/ugo-sartini-04a14620a/", "https://www.instagram.com/ugoia2025/"],
};

function donneesStructurees(a: Article) {
  const url = `${SITE}/blog/${a.slug}`;
  const cat = CATEGORIES[a.categorie];
  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: a.titre.slice(0, 110),
      description: a.description,
      image: `${SITE}/og/blog/${a.slug}.jpg`,
      url,
      mainEntityOfPage: url,
      inLanguage: "fr-FR",
      datePublished: a.date,
      dateModified: a.maj ?? a.date,
      author: AUTEUR,
      publisher: ORGANISATION,
      ...(cat ? { articleSection: cat.label } : {}),
      ...(a.mot_cle ? { keywords: a.mot_cle } : {}),
      isPartOf: { "@id": `${SITE}/blog#blog` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: a.titre, item: url },
      ],
    },
  ];
  if (a.faq?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
    });
  }
  return ld;
}

export function BlogArticle() {
  const { slug } = useParams();
  const a = trouverArticle(slug);
  if (!a) return <NotFound />;
  const cat = CATEGORIES[a.categorie];
  const offre = a.offre ?? cat?.offre ?? "/";
  const offreLabel = cat?.offreLabel ?? "Nos offres";
  const lies = [
    ...ARTICLES.filter((x) => x.slug !== a.slug && x.categorie === a.categorie),
    ...ARTICLES.filter((x) => x.slug !== a.slug && x.categorie !== a.categorie),
  ].slice(0, 3);

  return (
    <LightPage>
      <Seo
        title={`${a.titre} | NoesisAI`}
        description={a.description}
        path={`/blog/${a.slug}`}
        image={`/og/blog/${a.slug}.jpg`}
        imageAlt={a.titre}
        type="article"
        jsonLd={donneesStructurees(a)}
      />

      <header className="relative pb-10 pt-36 sm:pt-40">
        <HeroBackground />
        <div className="container-page relative max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-xs text-slate-500">
            <Link to="/" className="hover:text-[#0b0b0f]">Accueil</Link>
            <span className="mx-1.5" aria-hidden>›</span>
            <Link to="/blog" className="hover:text-[#0b0b0f]">Blog</Link>
            {cat && (
              <>
                <span className="mx-1.5" aria-hidden>›</span>
                <span>{cat.label}</span>
              </>
            )}
          </nav>
          <h1 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#0b0b0f] sm:text-5xl">{a.titre}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-600 sm:text-lg">{a.description}</p>
          <p className="mt-6 text-sm text-slate-500">
            Par Ugo Sartini · {dateLongue(a.date)} · {a.minutes} min de lecture
            {a.maj && a.maj !== a.date ? ` · mis à jour le ${dateLongue(a.maj)}` : ""}
            {a.brouillon ? " · brouillon (visible en local seulement)" : ""}
          </p>
        </div>
      </header>

      <div className="container-page max-w-5xl pb-20">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          {a.sommaire.length > 1 ? (
            <aside className="hidden lg:block">
              <nav aria-label="Sommaire" className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Sommaire</p>
                <ol className="mt-3 flex flex-col gap-2 border-l border-black/10">
                  {a.sommaire.map((s) => (
                    <li key={s.id} className={s.niveau === 3 ? "pl-6" : "pl-4"}>
                      <a href={`#${s.id}`} className="text-sm leading-snug text-slate-600 hover:text-[#0b0b0f]">
                        {s.titre}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}

          <div className="min-w-0">
            <article className="article-corps" dangerouslySetInnerHTML={{ __html: a.html }} />

            {a.faq && a.faq.length > 0 && (
              <section className="mt-14" aria-labelledby="faq-article">
                <h2 id="faq-article" className="text-2xl font-semibold tracking-[-0.03em] text-[#0b0b0f]">Questions fréquentes</h2>
                <div className="mt-5 flex flex-col gap-3">
                  {a.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-black/10 bg-[#f7f6fb] px-5 py-4">
                      <summary className="cursor-pointer list-none font-medium text-[#0b0b0f] marker:hidden">{f.q}</summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{f.r}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] px-6 py-8 sm:px-8">
              <p className="font-display text-xl font-semibold tracking-[-0.02em] text-[#0b0b0f]">Un projet dans ce sens ?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Premier échange offert, on regarde ensemble ce qui vaut le coup chez vous.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BoutonDemande emplacement={`article ${a.slug}`} variant="dark" size="lg">
                  Parler de votre projet <Chevrons />
                </BoutonDemande>
                <Link to={offre} className="text-sm font-medium text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 hover:decoration-brand-600">
                  Voir l'offre : {offreLabel}
                </Link>
              </div>
            </section>

            {lies.length > 0 && (
              <section className="mt-14" aria-labelledby="a-lire-aussi">
                <h2 id="a-lire-aussi" className="text-xl font-semibold tracking-[-0.02em] text-[#0b0b0f]">À lire aussi</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {lies.map((x) => (
                    <li key={x.slug}>
                      <Link to={`/blog/${x.slug}`} className="block h-full rounded-2xl border border-black/10 p-4 transition hover:border-brand-500/40">
                        <p className="text-xs text-brand-700">{CATEGORIES[x.categorie]?.label}</p>
                        <p className="mt-1.5 font-medium leading-snug text-[#0b0b0f]">{x.titre}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </LightPage>
  );
}
