import { useEffect, useRef, useState } from "react";
import { HOME } from "../../data/content";

/**
 * Film de présentation : il démarre tout seul, sans le son (seule lecture automatique permise par les navigateurs),
 * en boucle et seulement quand il est à l'écran. « Activer le son » le relance depuis le début avec le son ; à la fin
 * de cette écoute, il repart en boucle muette.
 */
export function VideoPresentation() {
  const { src, poster, label, soundOn, soundOff, playLabel } = HOME.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [son, setSon] = useState(false);
  // lecture automatique refusée par le navigateur (mode économie d'énergie, réglages) : on affiche un bouton lecture
  const [bloque, setBloque] = useState(false);
  const reduit = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // lecture seulement quand le film est visible (économise la bande passante, repart quand on revient dessus)
  useEffect(() => {
    const v = ref.current;
    if (!v || reduit) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().then(() => setBloque(false)).catch(() => v.paused && setBloque(true));
        else v.pause();
      },
      { threshold: 0.35 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [reduit]);

  const activerSon = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play().catch(() => {});
    setSon(true);
    setBloque(false);
  };
  const couperSon = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    setSon(false);
  };
  const fin = () => {
    // fin de l'écoute avec le son : retour à la boucle muette
    const v = ref.current;
    if (!v) return;
    couperSon();
    if (!reduit) v.play().catch(() => {});
  };

  return (
    <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-black/10 bg-[#f7f6fb] shadow-[0_30px_60px_-24px_rgba(30,20,60,0.45)]">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!reduit}
        preload="metadata"
        aria-label={label}
        onEnded={fin}
      >
        <source src={src} type="video/mp4" />
      </video>
      {(bloque || reduit) && !son && (
        <button
          type="button"
          onClick={activerSon}
          className="absolute bottom-[14%] left-1/2 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#0b0b0f] px-5 py-2.5 font-display text-sm font-semibold text-white shadow-[0_14px_36px_-10px_rgba(20,10,40,0.6)] transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:px-6 sm:py-3 sm:text-[16px]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
          {playLabel}
        </button>
      )}
      {!((bloque || reduit) && !son) && <button
        type="button"
        onClick={son ? couperSon : activerSon}
        aria-pressed={son}
        className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-display text-sm font-semibold text-[#0b0b0f] shadow-[0_10px_28px_-8px_rgba(20,10,40,0.55)] ring-1 ring-black/10 backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:bottom-5 sm:left-5 sm:px-5 sm:py-2.5 sm:text-[16px]"
      >
        {son ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a10 10 0 0 1 0 14" />
          </svg>
        )}
        {son ? soundOff : soundOn}
      </button>}
    </div>
  );
}
