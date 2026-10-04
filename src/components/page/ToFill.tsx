/**
 * Emplacement « à compléter » : visible uniquement en développement
 * (npm run dev), jamais sur le site en ligne. Sert à repérer ce qu'il
 * reste à rédiger sans publier de bloc vide.
 */
export function ToFill({ label, className }: { label: string; className?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div
      className={`rounded-3xl border-2 border-dashed border-amber-400 bg-amber-50 p-6 text-center font-display text-sm text-amber-800 ${className ?? ""}`}
    >
      À compléter : {label}
    </div>
  );
}

/** Vrai si la valeur est renseignée (texte non vide ou liste non vide). */
export function filled<T>(v: T | undefined | null): v is T {
  if (v == null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}
