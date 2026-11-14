import { Helmet } from "react-helmet-async";
import { IDENTITE, rempli } from "../data/identite";

const SITE = "https://noesisai.fr";

/** L'agence, telle qu'on la décrit aux moteurs (fournisseur des services, éditeur des pages). */
export const ORGANISATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organisation`,
  name: "NoesisAI",
  alternateName: IDENTITE.autres_noms,
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/logos/noesis-mark.png`, width: 350, height: 350 },
  sameAs: ["https://www.linkedin.com/in/ugo-sartini-automatisation-ia/", "https://www.instagram.com/ugoia2025/"],
};

/** Fiche complète de l'agence (accueil et À propos). Mêmes faits que le bloc « NoesisAI en bref »,
    les mentions légales et llms.txt : tout vient de src/data/identite.json. Les champs encore
    « À compléter » (SIREN, adresse...) ne sont pas envoyés aux moteurs. */
export function ficheOrganisation(description: string) {
  const s = IDENTITE.societe;
  const a = s.siege;
  return {
    ...ORGANISATION,
    ...(rempli(s.raison_sociale) ? { legalName: s.raison_sociale } : {}),
    description,
    slogan: IDENTITE.slogan,
    foundingDate: IDENTITE.creation.iso,
    founder: { "@type": "Person", "@id": `${SITE}/a-propos#ugo-sartini`, name: IDENTITE.fondateur.nom, url: `${SITE}/a-propos` },
    email: IDENTITE.contact.email,
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: IDENTITE.contact.email, availableLanguage: ["fr"] },
    areaServed: IDENTITE.zone,
    knowsAbout: ["Intelligence artificielle", "Automatisation", "n8n", "Make", "Agents vocaux", "Logiciel métier", "Formation IA"],
    ...(rempli(s.siren) ? { identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: s.siren.replace(/\s/g, "") } } : {}),
    ...(rempli(s.tva) ? { vatID: s.tva.replace(/\s/g, "") } : {}),
    ...(rempli(s.telephone) ? { telephone: s.telephone } : {}),
    ...(rempli(a.rue) && rempli(a.code_postal) && rempli(a.ville)
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: a.rue,
            postalCode: a.code_postal,
            addressLocality: a.ville,
            ...(rempli(a.pays) ? { addressCountry: a.pays } : {}),
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Offres ${IDENTITE.marque}`,
      itemListElement: IDENTITE.offres.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.nom, description: o.texte, url: `${SITE}${o.chemin}` },
        ...(o.prix_min && o.prix_max
          ? { priceSpecification: { "@type": "PriceSpecification", minPrice: o.prix_min, maxPrice: o.prix_max, priceCurrency: "EUR" } }
          : {}),
      })),
    },
  };
}

/** Questions fréquentes d'une page, en données structurées (rien si la page n'en affiche pas). */
export function donneesFaq(items: { q: string; a: string }[]): object[] {
  if (!items.length) return [];
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    },
  ];
}

/** Fil d'Ariane Accueil > page, en données structurées. */
export function filAriane(nom: string, chemin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: nom, item: `${SITE}${chemin}` },
    ],
  };
}

/** Un service de l'agence, en données structurées. */
export function service(nom: string, description: string, chemin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nom,
    description,
    url: `${SITE}${chemin}`,
    provider: ORGANISATION,
    areaServed: ["France", "Belgique", "Suisse"],
  };
}

type Props = {
  title: string;
  description: string;
  /** Chemin de la page, ex. "/automatisation" */
  path: string;
  /** Image d'aperçu 1200 x 630, ex. "/og/automatisation.jpg" */
  image: string;
  imageAlt: string;
  /** "article" pour les billets du blog */
  type?: "website" | "article";
  jsonLd?: object[];
};

/** Titre, description, canonical, aperçus (Open Graph, X) et données structurées d'une page. */
export function Seo({ title, description, path, image, imageAlt, type = "website", jsonLd = [] }: Props) {
  const url = `${SITE}${path}`;
  const img = `${SITE}${image}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="NoesisAI" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(d)}
        </script>
      ))}
    </Helmet>
  );
}
