import donnees from "./identite.json";

/** Faits officiels sur l'agence (voir le champ « _lisez_moi » de identite.json). */
export type Identite = {
  marque: string;
  autres_noms: string[];
  mise_a_jour: string;
  une_phrase: string;
  slogan: string;
  creation: { texte: string; iso: string };
  fondateur: { nom: string; role: string };
  clients: string;
  zone: string[];
  references: string;
  delai: string;
  contact: { email: string; rendez_vous: string };
  offres: { nom: string; chemin: string; texte: string; prix_min?: number; prix_max?: number; prix_note?: string }[];
  quand_oui: string[];
  quand_non: string[];
  citation: string;
  societe: {
    raison_sociale: string;
    forme_juridique: string;
    capital: string;
    siren: string;
    rcs: string;
    tva: string;
    siege: { rue: string; code_postal: string; ville: string; pays: string };
    telephone: string;
    directeur_publication: string;
    hebergeur: string;
  };
};

export const IDENTITE: Identite = donnees;

/** Fourchette de prix lisible, ex. « De 2 500 à 10 000 € environ » (espaces insécables). */
export function fourchette(min: number, max: number): string {
  const f = (n: number) => n.toLocaleString("fr-FR").replace(/\s/g, "\u00a0");
  return `De ${f(min)} à ${f(max)}\u00a0€ environ`;
}

/** Vrai si le champ est renseigné : ni vide (« ne s'applique pas ») ni « À compléter ». */
export function rempli(v: string | undefined | null): v is string {
  return !!v && v.trim() !== "" && !/^à compléter/i.test(v.trim());
}

/** Vrai si le champ reste à fournir (affiché « [à compléter] » sur les pages légales). */
export function aCompleter(v: string | undefined | null): boolean {
  return !!v && /^à compléter/i.test(v.trim());
}
