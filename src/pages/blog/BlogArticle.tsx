import { Link, useParams } from "react-router-dom";
import { Seo, ORGANISATION } from "../../components/Seo";
import { LightPage, HeroBackground } from "../../components/page/Blocks";
import { BoutonDemande } from "../../components/DemandeInfos";
import { Chevrons } from "../../components/ui/Button";
import { Partage } from "../../components/blog/Partage";
import { Sommaire, SommaireMobile } from "../../components/blog/Sommaire";
import { ARTICLES, CATEGORIES, dateLongue, trouverArticle, type Article } from "../../blog/articles";
import { NotFound } from "../NotFound";

const SITE = "https://noesisai.fr";
const AUTEUR = {
  "@type": "Person",
  name: "Ugo Sartini",
  url: `${SITE}/a-propos`,
  sameAs: ["https://www.linkedin.com/in/ugo-sartini-automatisation-ia/", "https://www.instagram.com/ugoia2025/"],
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

function IconeMeta({ type }: { type: "horloge" | "calendrier" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {type === "horloge" ? (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </>
      ) : (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </>
      )}
    </svg>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const a = trouverArticle(slug);
  if (!a) return <NotFound />;
  const cat = CATEGORIES[a.categorie];
  const offre = a.offre ?? cat?.offre ?? "/";
  const offreLabel = cat?.offreLabel ?? "Nos offres";
  const url = `${SITE}/blog/${a.slug}`;
  const majLe = a.maj && a.maj !== a.date ? a.maj : null;
  const avecSommaire = a.sommaire.length > 1;
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

      <header className="relative pb-10 pt-32 sm:pt-40">
        <HeroBackground />
        <div className="container-page relative max-w-6xl">
          <div className="max-w-[760px] xl:ml-[88px]">
            <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
              <Link to="/" className="hover:text-[#0b0b0f]">Accueil</Link>
              <span aria-hidden className="text-slate-300">/</span>
              <Link to="/blog" className="hover:text-[#0b0b0f]">Blog</Link>
              {cat && (
                <>
                  <span aria-hidden className="text-slate-300">/</span>
                  <span className="font-medium text-brand-700">{cat.label}</span>
                </>
              )}
            </nav>
            <h1 className="mt-6 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#0b0b0f] sm:text-5xl lg:text-[3.3rem]">
              {a.titre}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              {cat && (
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 font-medium text-[#0b0b0f] shadow-[0_6px_18px_-12px_rgba(0,0,0,0.35)]">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  {cat.label}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <IconeMeta type="horloge" />
                {a.minutes} min de lecture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconeMeta type="calendrier" />
                <time dateTime={a.date}>{dateLongue(a.date)}</time>
              </span>
              {a.brouillon && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Brouillon, visible en local</span>}
            </div>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-600 sm:text-[1.3rem] sm:leading-[1.6]">{a.description}</p>
          </div>
        </div>
      </header>

      <div className="container-page max-w-6xl pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[56px_minmax(0,1fr)_250px] xl:gap-8">
          <aside className="hidden xl:block" aria-label="Partager l'article">
            <div className="sticky top-28 flex flex-col items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Partager</p>
              <Partage url={url} titre={a.titre} sens="colonne" />
            </div>
          </aside>

          <div className="min-w-0 max-w-[720px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/equipe/ugo-sartini.jpg"
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border border-black/10 object-cover"
                />
                <div>
                  <p className="font-medium leading-tight text-[#0b0b0f]">
                    <Link to="/a-propos" className="hover:text-brand-700">Ugo Sartini</Link>
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    NoesisAI · {majLe ? `mis à jour le ${dateLongue(majLe)}` : `publié le ${dateLongue(a.date)}`}
                  </p>
                </div>
              </div>
              <div className="xl:hidden">
                <Partage url={url} titre={a.titre} sens="ligne" taille="sm" />
              </div>
            </div>

            {avecSommaire && (
              <div className="mt-8">
                <SommaireMobile titres={a.sommaire} />
              </div>
            )}

            <article className="article-corps mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />

            {a.faq && a.faq.length > 0 && (
              <section className="mt-16" aria-labelledby="faq-article">
                <h2 id="faq-article" className="text-2xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-[1.75rem]">
                  Questions fréquentes
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {a.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-black/10 bg-[#f7f6fb] px-5 py-4">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-[#0b0b0f] [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span aria-hidden className="text-lg leading-6 text-brand-600 transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{f.r}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-5">
              <p className="font-display text-base font-semibold text-[#0b0b0f]">Partager cet article</p>
              <Partage url={url} titre={a.titre} sens="ligne" taille="sm" />
            </div>

            <section className="mt-12 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] px-6 py-8 sm:px-8">
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
              <section className="mt-16" aria-labelledby="a-lire-aussi">
                <h2 id="a-lire-aussi" className="text-xl font-semibold tracking-[-0.02em] text-[#0b0b0f]">À lire aussi</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {lies.map((x) => (
                    <li key={x.slug}>
                      <Link to={`/blog/${x.slug}`} className="flex h-full flex-col rounded-2xl border border-black/10 p-5 transition-colors hover:border-brand-500/40">
                        <span className="text-xs font-medium text-brand-700">{CATEGORIES[x.categorie]?.label}</span>
                        <span className="mt-2 font-display font-semibold leading-snug text-[#0b0b0f]">{x.titre}</span>
                        <span className="mt-auto pt-3 text-sm text-slate-500">{x.minutes} min de lecture</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-8 overflow-y-auto pb-2">
              {avecSommaire && <Sommaire titres={a.sommaire} />}
              <div className="rounded-2xl border border-black/10 bg-[#f7f6fb] p-5">
                <p className="font-display text-base font-semibold leading-snug tracking-[-0.02em] text-[#0b0b0f]">Un projet dans ce sens ?</p>
                <p className="mt-1.5 text-sm text-slate-600">Premier échange offert.</p>
                <BoutonDemande emplacement={`article ${a.slug} · colonne`} variant="dark" className="mt-4 w-full justify-center">
                  Parler de votre projet <Chevrons />
                </BoutonDemande>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </LightPage>
  );
}
