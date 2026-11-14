import { useState, type ReactNode } from "react";

/** Boutons de partage d'un article : réseaux, e-mail et copie du lien. */
type Props = { url: string; titre: string; sens?: "colonne" | "ligne"; taille?: "md" | "sm" };

function Icone({ children, trait = false }: { children: ReactNode; trait?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-[17px] w-[17px]"
      fill={trait ? "none" : "currentColor"}
      stroke={trait ? "currentColor" : "none"}
      strokeWidth={trait ? 1.8 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ICONES = {
  linkedin: (
    <Icone>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </Icone>
  ),
  x: (
    <Icone>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45z" />
    </Icone>
  ),
  facebook: (
    <Icone>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98v2.18H8v3h2.4V21h3.1z" />
    </Icone>
  ),
  whatsapp: (
    <Icone>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89a9.83 9.83 0 0 1 9.88 9.9c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42z" />
    </Icone>
  ),
  email: (
    <Icone trait>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </Icone>
  ),
  lien: (
    <Icone trait>
      <path d="M10 13.5a4.5 4.5 0 0 0 6.36 0l3-3a4.5 4.5 0 0 0-6.36-6.36l-1.25 1.25" />
      <path d="M14 10.5a4.5 4.5 0 0 0-6.36 0l-3 3a4.5 4.5 0 0 0 6.36 6.36l1.25-1.25" />
    </Icone>
  ),
  ok: (
    <Icone trait>
      <path d="M5 12.5 10 17.5 19 7" />
    </Icone>
  ),
};

export function Partage({ url, titre, sens = "colonne", taille = "md" }: Props) {
  const [copie, setCopie] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titre);
  const reseaux = [
    { nom: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icone: ICONES.linkedin },
    { nom: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icone: ICONES.x },
    { nom: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icone: ICONES.facebook },
    { nom: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${titre} ${url}`)}`, icone: ICONES.whatsapp },
  ];

  async function copier() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const zone = document.createElement("textarea");
      zone.value = url;
      document.body.appendChild(zone);
      zone.select();
      document.execCommand("copy");
      zone.remove();
    }
    setCopie(true);
    window.setTimeout(() => setCopie(false), 2200);
  }

  const bouton =
    "relative inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#0b0b0f] transition-colors hover:border-brand-500/50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 " +
    (taille === "sm" ? "h-9 w-9" : "h-11 w-11");

  return (
    <div className={sens === "colonne" ? "flex flex-col items-center gap-2.5" : "flex flex-wrap items-center gap-2"}>
      {reseaux.map((r) => (
        <a key={r.nom} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`Partager sur ${r.nom}`} title={`Partager sur ${r.nom}`} className={bouton}>
          {r.icone}
        </a>
      ))}
      <a href={`mailto:?subject=${t}&body=${encodeURIComponent(`${titre}\n\n${url}`)}`} aria-label="Partager par e-mail" title="Partager par e-mail" className={bouton}>
        {ICONES.email}
      </a>
      <button type="button" onClick={copier} aria-label="Copier le lien" title="Copier le lien" className={`${bouton} ${copie ? "!border-brand-600 !text-brand-700" : ""}`}>
        {copie ? ICONES.ok : ICONES.lien}
        <span
          role="status"
          className={`pointer-events-none absolute whitespace-nowrap rounded-lg bg-[#0b0b0f] px-2 py-1 text-xs font-medium text-white transition-opacity ${
            sens === "colonne" ? "left-full ml-3" : "bottom-full mb-2"
          } ${copie ? "opacity-100" : "opacity-0"}`}
        >
          {copie ? "Lien copié" : ""}
        </span>
      </button>
    </div>
  );
}
