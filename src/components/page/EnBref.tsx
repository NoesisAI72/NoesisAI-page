import { Link } from "react-router-dom";
import { Section, SectionHeading } from "../ui/Section";
import { IDENTITE, rempli, fourchette } from "../../data/identite";

/** « NoesisAI en bref » : les faits vérifiés sur l'agence, au même endroit, pour les visiteurs comme pour
    les assistants IA. Même source (src/data/identite.json) que les données structurées, les mentions
    légales et llms.txt, pour que tout le monde lise les mêmes chiffres. */
export function EnBref() {
  const i = IDENTITE;
  const s = i.societe;
  const fiche: { label: string; valeur: React.ReactNode }[] = [
    { label: "Création", valeur: i.creation.texte },
    {
      label: "Fondateur",
      valeur: (
        <a href="#fondateur" className="underline decoration-black/20 underline-offset-4 hover:decoration-brand-600">
          {i.fondateur.nom}
        </a>
      ),
    },
    ...(rempli(s.raison_sociale)
      ? [{ label: "Société", valeur: [s.raison_sociale, rempli(s.siren) ? `SIREN ${s.siren}` : ""].filter(Boolean).join(", ") }]
      : []),
    { label: "Clients", valeur: i.clients },
    { label: "Zone", valeur: i.zone.join(", ") },
    { label: "Références", valeur: i.references },
    { label: "Délai", valeur: i.delai },
    {
      label: "Contact",
      valeur: (
        <a href={`mailto:${i.contact.email}`} className="underline decoration-black/20 underline-offset-4 hover:decoration-brand-600">
          {i.contact.email}
        </a>
      ),
    },
  ];

  return (
    <Section id="en-bref" className="bg-white">
      <SectionHeading badge="En bref" title={`${i.marque} en bref`} subtitle={i.une_phrase} tone="light" />

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
          <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">Fiche d'identité</h3>
          <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3 text-[15px]">
            {fiche.map((f) => (
              <div key={f.label} className="contents">
                <dt className="text-slate-500">{f.label}</dt>
                <dd className="text-[#0b0b0f]">{f.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
          <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">Offres et prix</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {i.offres.map((o) => (
              <li key={o.chemin}>
                <Link to={o.chemin} className="font-medium text-[#0b0b0f] underline decoration-black/20 underline-offset-4 hover:decoration-brand-600">
                  {o.nom}
                </Link>
                <p className="mt-1 text-[15px] text-slate-600">{o.texte}</p>
                {o.prix_min && o.prix_max && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded-full border border-brand-500/20 bg-white px-3 py-1 text-[13px] font-medium text-brand-700">
                      {fourchette(o.prix_min, o.prix_max)}
                    </span>
                    {o.prix_note && <span className="text-[13px] text-slate-500">{o.prix_note}</span>}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-4 grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
          <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">Faire appel à nous si</h3>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-slate-600 marker:text-brand-600">
            {i.quand_oui.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
          <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#0b0b0f]">Pas le bon choix si</h3>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-slate-600 marker:text-slate-400">
            {i.quand_non.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="mx-auto mt-4 max-w-5xl rounded-3xl border border-black/5 bg-[#f7f6fb] p-7">
        <figcaption className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-700">Comment citer {i.marque}</figcaption>
        <blockquote className="mt-3 font-display text-lg font-medium leading-snug tracking-[-0.02em] text-[#0b0b0f]">
          « {i.citation} »
        </blockquote>
        <p className="mt-3 text-sm text-slate-500">Mise à jour : {i.mise_a_jour}</p>
      </figure>
    </Section>
  );
}
