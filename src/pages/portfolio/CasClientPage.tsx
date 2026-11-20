import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Seo } from "../../components/Seo";
import { LightPage, HeroBackground, CtaSection } from "../../components/page/Blocks";
import { Reveal } from "../../components/ui/Section";
import { Chevrons } from "../../components/ui/Button";
import { ScreenshotFrame } from "../../components/ui/ScreenshotFrame";
import { BoutonDemande } from "../../components/DemandeInfos";
import { cn } from "../../components/ui/cn";
import { FlecheRonde, IconeOutil, PastilleStatut, PlaqueLogo, Puce, Riche, Scene, typo } from "../../components/portfolio/Elements";
import { CAS_CLIENTS, PORTFOLIO, moisLivraison, type CasClient, type Partie } from "../../data/portfolio";
import { NotFound } from "../NotFound";

/** Puce de liste : point violet (neutre), gris (problème) ou coche dégradée (résultat). */
function Marque({ ton }: { ton?: "probleme" | "resultat" | "neutre" }) {
  if (ton === "resultat")
    return (
      <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="m3.5 8.5 3 3 6-7" />
        </svg>
      </span>
    );
  return <span aria-hidden className={cn("mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full", ton === "probleme" ? "bg-slate-400" : "bg-brand-500")} />;
}

function Points({ points, ton }: { points: string[]; ton?: "probleme" | "resultat" | "neutre" }) {
  return (
    <ul className="flex flex-col gap-3">
      {points.map((pt) => (
        <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-slate-700 sm:text-base">
          <Marque ton={ton} />
          <span>
            <Riche texte={pt} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function ContenuPartie({ partie }: { partie: Partie }) {
  switch (partie.type) {
    case "texte":
      return (
        <div className="flex flex-col gap-4">
          {partie.texte.split("\n\n").map((para) => (
            <p key={para.slice(0, 40)} className="text-[17px] leading-[1.75] text-slate-700">
              <Riche texte={para} />
            </p>
          ))}
        </div>
      );
    case "liste": {
      const encadre =
        partie.ton === "resultat"
          ? "rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-[#eef2ff] p-6 sm:p-7"
          : partie.ton === "probleme"
            ? "rounded-3xl border border-black/5 bg-[#f7f6fb] p-6 sm:p-7"
            : "";
      return (
        <div className="flex flex-col gap-4">
          {partie.intro && (
            <p className="text-[17px] leading-[1.75] text-slate-700">
              <Riche texte={partie.intro} />
            </p>
          )}
          <div className={encadre}>
            <Points points={partie.points} ton={partie.ton ?? "neutre"} />
          </div>
        </div>
      );
    }
    case "blocs": {
      const n = partie.blocs.length;
      // Deux colonnes (la colonne de texte est trop étroite pour trois) ; nombre impair :
      // le dernier bloc prend toute la largeur.
      const dernierLarge = (i: number) => (n % 2 === 1 && i === n - 1 ? "sm:col-span-2" : "");
      return (
        <div className="flex flex-col gap-4">
          {partie.intro && (
            <p className="text-[17px] leading-[1.75] text-slate-700">
              <Riche texte={partie.intro} />
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {partie.blocs.map((b, i) => (
              <div
                key={b.titre}
                className={cn(
                  "flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_40px_-32px_rgba(30,20,60,0.45)] sm:p-7",
                  dernierLarge(i)
                )}
              >
                <div className="flex items-center gap-3">
                  {partie.numerote && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-[#0b0b0f]">{typo(b.titre)}</h3>
                </div>
                {b.texte && (
                  <p className="text-[15px] leading-relaxed text-slate-700 sm:text-base">
                    <Riche texte={b.texte} />
                  </p>
                )}
                {b.points && <Points points={b.points} />}
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "stack":
      return (
        <ul className="divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-white">
          {partie.outils.map((o) => (
            <li key={o.nom} className="flex items-center gap-4 px-5 py-4 sm:px-6">
              <IconeOutil nom={o.nom} />
              <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="shrink-0 font-display text-[15px] font-semibold text-[#0b0b0f] sm:w-44">{o.nom}</span>
                {o.role && <span className="text-[15px] leading-snug text-slate-600">{typo(o.role.charAt(0).toUpperCase() + o.role.slice(1))}</span>}
              </div>
            </li>
          ))}
        </ul>
      );
  }
}

/** Cas précédent / suivant, en boucle. */
function Voisins({ cas }: { cas: CasClient }) {
  const i = CAS_CLIENTS.findIndex((c) => c.slug === cas.slug);
  const n = CAS_CLIENTS.length;
  const voisins = [
    { sens: "Cas précédent", c: CAS_CLIENTS[(i - 1 + n) % n] },
    { sens: "Cas suivant", c: CAS_CLIENTS[(i + 1) % n] },
  ];
  return (
    <section className="border-t border-black/5 bg-[#f7f6fb] py-14 sm:py-16">
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2">
          {voisins.map(({ sens, c }) => (
            <Link
              key={sens}
              to={`/portfolio/${c.slug}`}
              className="group flex min-w-0 items-center gap-4 rounded-3xl border border-black/5 bg-white p-3 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(76,29,149,0.45)] sm:gap-5 sm:p-4 sm:pr-6"
            >
              <Scene className="aspect-[16/10] w-24 shrink-0 rounded-2xl p-2.5 sm:w-40 sm:p-3">
                <PlaqueLogo cas={c} className="rounded-xl" />
              </Scene>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xs font-medium uppercase tracking-wider text-slate-500">{sens}</p>
                <p className="mt-1 truncate font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">{c.nom}</p>
                <p className="truncate text-[13px] text-slate-500">
                  {c.secteur} · {c.pays}
                </p>
              </div>
              <FlecheRonde />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/portfolio#cas-clients"
            className="font-display text-sm font-semibold text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-600"
          >
            Voir tous les cas clients
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CasClientPage() {
  const { slug } = useParams();
  const cas = CAS_CLIENTS.find((c) => c.slug === slug);
  if (!cas) return <NotFound />;

  const faits = [
    { label: "Secteur", valeur: cas.secteur },
    { label: "Localisation", valeur: cas.pays },
    { label: "Statut", valeur: <PastilleStatut statut={cas.statut} /> },
    ...(cas.livraison ? [{ label: "Livraison", valeur: moisLivraison(cas.livraison) }] : []),
  ];

  return (
    <LightPage>
      <Seo
        title={`${cas.nom} : cas client | Portfolio NoesisAI`}
        description={cas.resume}
        path={`/portfolio/${cas.slug}`}
        image="/og/portfolio.jpg"
        imageAlt={`Cas client ${cas.nom} réalisé par NoesisAI`}
        noindex
      />

      {/* En-tête : texte à gauche, plaque du logo à droite */}
      <section className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <HeroBackground />
        <div className="container-page relative z-10">
          <Link
            to="/portfolio#cas-clients"
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 font-display text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition-colors hover:text-[#0b0b0f]"
          >
            <span aria-hidden>←</span> Tous les cas clients
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="inline-flex items-center gap-2 font-display text-sm font-medium text-brand-700">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                Cas client · {cas.secteur}
              </p>
              <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[#0b0b0f] sm:text-6xl">{cas.nom}</h1>
              <p className="mt-5 max-w-xl font-display text-base leading-relaxed text-slate-600 sm:text-lg">
                <Riche texte={cas.resume} />
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {cas.services.map((s) => (
                  <Puce key={s}>{s}</Puce>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BoutonDemande emplacement={`cas ${cas.nom} · haut`} size="lg" variant="dark">
                  Un projet similaire ? Parlons-en <Chevrons />
                </BoutonDemande>
                {cas.site && (
                  <a
                    href={cas.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 font-display text-sm font-semibold text-[#0b0b0f] underline decoration-brand-600/40 decoration-2 underline-offset-4 hover:decoration-brand-600"
                  >
                    Voir le site du client ↗
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <Scene className="aspect-[4/3] rounded-[2rem] border border-black/5 p-8 shadow-[0_30px_60px_-36px_rgba(30,20,60,0.5)] sm:p-12">
                <PlaqueLogo cas={cas} grand />
              </Scene>
            </motion.div>
          </div>

          {/* Repères */}
          <dl
            className={cn(
              "mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 shadow-[0_20px_50px_-30px_rgba(76,29,149,0.3)]",
              faits.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            )}
          >
            {faits.map((f, i) => (
              <div
                key={f.label}
                className={cn(
                  "flex flex-col gap-2 bg-white/90 px-5 py-5 backdrop-blur sm:px-6",
                  // nombre impair sur deux colonnes (mobile) : la dernière case prend toute la largeur
                  faits.length % 2 === 1 && i === faits.length - 1 && "col-span-2 md:col-span-1"
                )}
              >
                <dt className="font-display text-xs font-medium uppercase tracking-wider text-slate-500">{f.label}</dt>
                <dd className="font-display text-base font-semibold tracking-[-0.01em] text-[#0b0b0f] first-letter:uppercase">{f.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Corps de la fiche + colonne de côté */}
      <section className="bg-white pb-20 pt-6 sm:pt-10">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <article className="flex flex-col">
            {cas.parties.map((p, i) => (
              <Reveal key={p.titre} className={cn("border-black/5 py-10", i > 0 && "border-t", i === 0 && "pt-4")}>
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-[1.75rem]">
                  <span className="font-display text-sm font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                  {p.titre}
                </h2>
                <div className="mt-6">
                  <ContenuPartie partie={p} />
                </div>
              </Reveal>
            ))}
            {cas.captures && cas.captures.length > 0 && (
              <Reveal className="border-t border-black/5 py-10">
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[#0b0b0f] sm:text-[1.75rem]">
                  <span className="font-display text-sm font-semibold tabular-nums text-brand-600">
                    {String(cas.parties.length + 1).padStart(2, "0")}
                  </span>
                  En images
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {cas.captures.map((c, i) => (
                    <figure
                      key={c.src}
                      className={cn(
                        "group overflow-hidden rounded-3xl border border-black/5 shadow-[0_20px_40px_-32px_rgba(30,20,60,0.45)]",
                        // nombre impair : la première capture prend toute la largeur
                        cas.captures!.length % 2 === 1 && i === 0 && "sm:col-span-2"
                      )}
                    >
                      <ScreenshotFrame src={c.src} alt={c.alt} className="aspect-[16/10]" />
                      <figcaption className="border-t border-black/5 bg-white px-5 py-3 text-[13px] text-slate-500">{c.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            )}
          </article>

          <aside className="lg:pt-4">
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {cas.outils.length > 0 && (
                <div className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-6">
                  <p className="font-display text-xs font-medium uppercase tracking-wider text-slate-500">Outils</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {cas.outils.map((o) => (
                      <li key={o} className="flex items-center gap-3">
                        <IconeOutil nom={o} className="h-9 w-9" />
                        <span className="font-display text-sm font-semibold text-[#0b0b0f]">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="relative overflow-hidden rounded-3xl bg-[#0b0b0f] p-6 text-white">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.55),transparent)]" />
                <p className="relative font-display text-lg font-semibold leading-snug tracking-[-0.02em]">{typo("Un besoin similaire ?")}</p>
                <p className="relative mt-2 text-sm leading-relaxed text-white/70">{PORTFOLIO.final.sousTitre}</p>
                <BoutonDemande emplacement={`cas ${cas.nom} · colonne`} variant="white" className="relative mt-5 w-full">
                  Réserver un appel <Chevrons />
                </BoutonDemande>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Voisins cas={cas} />
      <CtaSection title={PORTFOLIO.final.titre} subtitle={PORTFOLIO.final.sousTitre} cta={PORTFOLIO.cta} />
    </LightPage>
  );
}
