import { cn } from "./cn";

/**
 * Présentation homogène d'une capture d'application : fenêtre de navigateur
 * posée sur un fond dégradé clair, décalée en haut à gauche et qui déborde
 * en bas à droite (la capture est toujours lue depuis son coin haut-gauche).
 * Au survol du parent `.group`, la fenêtre glisse légèrement.
 */
export function ScreenshotFrame({
  src,
  alt,
  className,
  tone = "violet",
  inset = "md",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  tone?: "violet" | "bleu";
  /** Marge autour de la fenêtre. */
  inset?: "sm" | "md" | "lg";
  eager?: boolean;
}) {
  const pad = { sm: "pl-5 pt-5", md: "pl-7 pt-7 sm:pl-9 sm:pt-9", lg: "pl-8 pt-8 sm:pl-12 sm:pt-12" }[inset];
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        tone === "violet"
          ? "bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#e0e7ff]"
          : "bg-gradient-to-br from-[#e0f2fe] via-[#f5f3ff] to-[#ede9fe]",
        pad,
        className
      )}
    >
      {/* halo décoratif */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/60 blur-3xl" />
      <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-tl-2xl border-l border-t border-black/10 bg-white shadow-[0_30px_60px_-24px_rgba(30,20,60,0.45)]">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-black/5 bg-[#f6f5fa] px-3.5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <img
              src={src}
              alt={alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
