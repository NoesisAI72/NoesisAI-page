import { Helmet } from "react-helmet-async";

const SITE = "https://noesisai.fr";

/** L'agence, telle qu'on la décrit aux moteurs (fournisseur des services, éditeur des pages). */
export const ORGANISATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organisation`,
  name: "NoesisAI",
  alternateName: "NOESIS AI",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/logos/noesis-mark.png`, width: 350, height: 350 },
  sameAs: ["https://www.linkedin.com/in/ugo-sartini-04a14620a/", "https://www.instagram.com/ugoia2025/"],
};

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
  jsonLd?: object[];
};

/** Titre, description, canonical, aperçus (Open Graph, X) et données structurées d'une page. */
export function Seo({ title, description, path, image, imageAlt, jsonLd = [] }: Props) {
  const url = `${SITE}${path}`;
  const img = `${SITE}${image}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
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
