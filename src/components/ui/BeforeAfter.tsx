import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * Comparateur avant / après : deux calques superposés, une poignée qu'on
 * fait glisser (souris, doigt ou flèches du clavier) pour révéler l'un ou
 * l'autre. Le calque « avant » est dessiné en CSS (ChaosMock), le calque
 * « après » est une vraie capture d'application.
 */
export function BeforeAfter({
  after,
  afterAlt,
  className,
}: {
  after: string;
  afterAlt: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_40px_80px_-40px_rgba(30,20,60,0.45)] touch-pan-y ${className ?? ""}`}
      style={{ containerType: "inline-size" }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* Après (dessous) */}
      <div className="absolute inset-0 bg-[#f6f5fb] p-[2.2%]">
        <BrowserFrame>
          <img
            src={after}
            alt={afterAlt}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-left-top"
            draggable={false}
          />
        </BrowserFrame>
      </div>

      {/* Avant (dessus, rogné par la poignée) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ChaosMock />
      </div>

      {/* Étiquettes */}
      <span className="pointer-events-none absolute left-[2.5%] top-[3.5%] rounded-lg bg-white/90 px-[1.6cqw] py-[0.6cqw] font-display text-[1.7cqw] font-semibold text-[#0b0b0f] shadow-sm">
        Avant
      </span>
      <span className="pointer-events-none absolute right-[2.5%] top-[3.5%] rounded-lg bg-[#0b0b0f] px-[1.6cqw] py-[0.6cqw] font-display text-[1.7cqw] font-semibold text-white shadow-sm">
        Après
      </span>

      {/* Poignée */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-semibold text-[#0b0b0f] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14">
          ‹›
        </div>
      </div>

      {/* Contrôle accessible (clavier / lecteur d'écran) */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparer avant et après"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/**
 * Aperçu non interactif (ex. dans une carte cliquable) : la poignée glisse
 * toute seule d'un côté à l'autre, en boucle.
 */
export function BeforeAfterPreview({ after, afterAlt, className }: { after: string; afterAlt: string; className?: string }) {
  const reduce = useReducedMotion();
  const pos = useMotionValue(62);
  useEffect(() => {
    if (reduce) return;
    const controls = animate(pos, [62, 18, 85, 62], {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.6,
    });
    return () => controls.stop();
  }, [pos, reduce]);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);

  return (
    <div
      className={`pointer-events-none relative aspect-[16/9] w-full select-none overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_48px_-24px_rgba(30,20,60,0.45)] ${className ?? ""}`}
      style={{ containerType: "inline-size" }}
      aria-label={`Avant / après : ${afterAlt}`}
      role="img"
    >
      <div className="absolute inset-0 bg-[#f6f5fb] p-[2.2%]">
        <BrowserFrame>
          <img src={after} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top" draggable={false} />
        </BrowserFrame>
      </div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <ChaosMock />
      </motion.div>
      <span className="absolute left-[2.5%] top-[3.5%] rounded-md bg-white/90 px-[1.6cqw] py-[0.5cqw] font-display text-[2.4cqw] font-semibold text-[#0b0b0f] shadow-sm">
        Avant
      </span>
      <span className="absolute right-[2.5%] top-[3.5%] rounded-md bg-[#0b0b0f] px-[1.6cqw] py-[0.5cqw] font-display text-[2.4cqw] font-semibold text-white shadow-sm">
        Après
      </span>
      <motion.div className="absolute inset-y-0" style={{ left }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        <div className="absolute top-1/2 flex h-[7cqw] w-[7cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[2.8cqw] font-semibold text-[#0b0b0f] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]">
          ‹›
        </div>
      </motion.div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.4cqw] border border-black/10 bg-white shadow-[0_20px_50px_-20px_rgba(30,20,60,0.35)]">
      <div className="flex shrink-0 items-center gap-[0.6cqw] border-b border-black/5 bg-[#f3f2f7] px-[1.2cqw] py-[0.9cqw]">
        <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#ff5f57]" />
        <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#febc2e]" />
        <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#28c840]" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  « Avant » : agenda, page Notion et Excel bricolés pour suivre les    */
/*  chantiers et les devis (données fictives, inspirées de Muller).      */
/* ------------------------------------------------------------------ */

const DAYS = ["LUN.", "MAR.", "MER.", "JEU."];
const DATES = ["14", "15", "16", "17"];
// [jour, début (h depuis 8h), durée (h), couleur, libellé]
const EVENTS: [number, number, number, string, string][] = [
  [0, 0, 1.6, "bg-[#e67c22]", "Pose pergola – Payerne"],
  [0, 1.7, 1, "bg-[#7a6cd9]", "Métré store – Morges"],
  [1, 0, 1.2, "bg-[#3f7fe0]", "Devis Gibus ?? rappeler"],
  [1, 1.3, 1.5, "bg-[#e67c22]", "Chantier Lausanne"],
  [2, 0, 2.6, "bg-[#e6a822]", "Équipe Didier – Vevey"],
  [2, 0.5, 1, "bg-[#e67c22]", "Livraison lames"],
  [3, 0, 1, "bg-[#3f7fe0]", "Visite client Nyon"],
  [3, 1.1, 1.6, "bg-[#e67c22]", "Pose LED – Payerne"],
  [3, 0.6, 0.9, "bg-[#7a6cd9]", "SAV moteur"],
];

const XLS: { c: string[]; tone?: string; strike?: boolean }[] = [
  { c: ["01/09", "Payerne", "Boutique optique", "Pergola + LED", "Muller C.", "18 450", "envoyé"] },
  { c: ["02/09", "Morges", "M. Favre", "Store banne 4m", "MYEXT", "2 450", ""], tone: "bg-[#fff59d]" },
  { c: ["03/09", "Lausanne", "Résidence Lac", "Lames orient.", "Muller C.", "31 200", "relancer"], tone: "bg-[#f8b4b4]" },
  { c: ["04/09", "Vevey", "Mme Rochat", "Click Zip", "MYINT", "#REF!", "?"] },
  { c: ["05/09", "Nyon", "Garage Central", "Pergola bioclim.", "Muller C.", "24 900", "accepté"], tone: "bg-[#c8e6c9]" },
  { c: ["08/09", "Rolle", "M. Perret", "ANNULÉ", "", "0", ""], strike: true },
  { c: ["09/09", "Payerne", "Boutique optique", "Avenant LED", "Muller C.", "1 120", "envoyé"], tone: "bg-[#f8b4b4]" },
  { c: ["10/09", "Morges", "M. Favre", "Motorisation", "MYEXT", "640", ""], tone: "bg-[#ffd59e]" },
  { c: ["11/09", "Lausanne", "Résidence Lac", "Main d'œuvre 16h", "Muller C.", "1 200", ""] },
  { c: ["12/09", "Vevey", "Mme Rochat", "Éclairage LED", "MYINT", "??", ""], tone: "bg-[#fff59d]" },
  { c: ["15/09", "Nyon", "Garage Central", "Déplacement", "", "", "à facturer ?"], tone: "bg-[#c8e6c9]" },
  { c: ["16/09", "Payerne", "Boutique optique", "Store latéral", "MYEXT", "3 980", ""] },
];

const NOTION_ROWS = [
  ["Payerne", "01/09", "Pergola + LED", "acompte", "relancer solde"],
  ["Morges", "02/09", "Store banne", "non", "devis pas envoyé ?"],
  ["Lausanne", "03/09", "Lames orient.", "NON", "voir Excel pour le montant"],
  ["Vevey", "04/09", "Click Zip", "oui ?", "heures Didier ??"],
];

function Dots() {
  return (
    <span className="flex gap-[0.45cqw]">
      <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#ff5f57]" />
      <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#febc2e]" />
      <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#28c840]" />
    </span>
  );
}

function ChaosMock() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#4b3fb5] via-[#3a3fa8] to-[#1f6fb2] font-sans">
      {/* Fenêtre en arrière-plan */}
      <div className="absolute left-[30%] top-[-1%] h-[8%] w-[42%] rounded-t-[0.8cqw] bg-[#e9e7ef] px-[1cqw] pt-[0.6cqw] text-[0.9cqw] text-[#888] shadow-lg">
        <span className="flex items-center gap-[0.8cqw]">
          <Dots /> Planning_chantiers_semaine_14-20_sept_(copie).docx
        </span>
      </div>

      {/* Google Agenda : planning des chantiers */}
      <div className="absolute left-[3.5%] top-[4%] w-[78%] overflow-hidden rounded-[0.9cqw] shadow-[0_2cqw_4cqw_-1.5cqw_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-[1cqw] bg-[#e7e1f5] px-[1.2cqw] py-[0.7cqw] text-[0.95cqw] text-[#333]">
          <Dots />
          <span className="rounded-t-[0.5cqw] bg-white px-[1cqw] py-[0.3cqw]">Muller – Agenda – Semaine</span>
        </div>
        <div className="flex items-center gap-[1cqw] bg-white px-[1.2cqw] py-[0.6cqw] text-[0.95cqw] text-[#444]">
          <span className="text-[#999]">← →</span>
          <span className="rounded-full bg-[#f1f1f4] px-[1cqw] py-[0.25cqw]">calendar.google.com/calendar/u/0/r/week</span>
        </div>
        <div className="flex bg-[#1f1f1f] text-[#e8e8e8]">
          <div className="w-[22%] p-[1.1cqw] text-[0.95cqw]">
            <p className="text-[1.5cqw]">
              <span className="rounded-[0.4cqw] bg-[#4285f4] px-[0.5cqw] text-white">20</span> Agenda
            </p>
            <p className="mt-[1.2cqw] w-fit rounded-[1cqw] bg-[#2f2f2f] px-[1cqw] py-[0.6cqw]">+ Créer</p>
            <p className="mt-[1.2cqw]">Septembre 2026</p>
            <div className="mt-[0.6cqw] grid grid-cols-7 gap-[0.3cqw] text-[0.75cqw] text-[#aaa]">
              {Array.from({ length: 28 }, (_, i) => (
                <span key={i} className={i === 19 ? "rounded-full bg-[#8ab4f8] text-center text-[#1f1f1f]" : "text-center"}>
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 border-l border-white/10">
            <div className="grid grid-cols-4 py-[0.6cqw] text-center">
              {DAYS.map((d, i) => (
                <div key={d}>
                  <p className="text-[0.8cqw] text-[#aaa]">{d}</p>
                  <p className="text-[1.8cqw]">{DATES[i]}</p>
                </div>
              ))}
            </div>
            <div className="relative grid h-[13cqw] grid-cols-4 border-t border-white/10">
              {DAYS.map((d) => (
                <div key={d} className="border-r border-white/5" />
              ))}
              {EVENTS.map(([day, start, dur, color, label], i) => (
                <div
                  key={i}
                  className={`absolute overflow-hidden rounded-[0.4cqw] border border-[#1f1f1f] px-[0.4cqw] py-[0.2cqw] text-[0.8cqw] leading-tight text-[#1a1a1a] ${color}`}
                  style={{
                    left: `calc(${day * 25}% + ${(i % 2) * 6}%)`,
                    width: "18%",
                    top: `${start * 4}cqw`,
                    height: `${dur * 4}cqw`,
                  }}
                >
                  {label}
                  <br />
                  <span className="opacity-70">De {9 + Math.floor(start)}:00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notion : suivi des chantiers */}
      <div className="absolute bottom-[1.5%] left-[1%] w-[50%] overflow-hidden rounded-[0.9cqw] bg-white shadow-[0_2cqw_4cqw_-1.5cqw_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-[1cqw] border-b border-black/5 bg-[#f7f7f5] px-[1.1cqw] py-[0.6cqw] text-[0.85cqw] text-[#777]">
          <Dots />
          <span>Devis en attente</span>
          <span>Projet interne</span>
          <span className="rounded-[0.3cqw] bg-white px-[0.6cqw] text-[#333]">Muller – Chantiers & suivi</span>
        </div>
        <div className="px-[3cqw] pb-[1.5cqw] pt-[1.4cqw] text-[#37352f]">
          <p className="text-[2.2cqw] font-bold leading-tight">Muller – Chantiers & suivi (NE PAS SUPPRIMER)</p>
          <p className="mt-[1cqw] rounded-[0.5cqw] bg-[#fbe4e4] px-[1cqw] py-[0.7cqw] text-[0.95cqw]">
            ⚠️ Vérifier aussi l'Excel ET le planning Word avant de valider un devis !! (on a eu des doublons)
          </p>
          <p className="mt-[1.1cqw] text-[1.3cqw] font-semibold">Chantiers septembre (en cours)</p>
          <table className="mt-[0.6cqw] w-full border-collapse text-[0.9cqw]">
            <thead>
              <tr className="text-left text-[#777]">
                {["Chantier", "Date", "Prestation", "Payé ?", "Note"].map((h) => (
                  <th key={h} className="border border-black/10 px-[0.6cqw] py-[0.35cqw] font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NOTION_ROWS.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={`border border-black/10 px-[0.6cqw] py-[0.35cqw] ${c === "NON" ? "font-bold" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LibreOffice : suivi des devis */}
      <div className="absolute right-[-1%] top-[24%] w-[52%] overflow-hidden rounded-[0.9cqw] bg-white shadow-[0_2cqw_4cqw_-1.5cqw_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-[1cqw] bg-[#ececec] px-[1.1cqw] py-[0.6cqw] text-[0.95cqw] font-semibold text-[#333]">
          <Dots /> <span className="text-[#1d6f42]">▦</span> MULLER_devis_chantiers_2026_VFINALE_v3.xlsx
        </div>
        <div className="flex items-center gap-[0.8cqw] border-b border-black/10 bg-[#f6f6f6] px-[1cqw] py-[0.4cqw] text-[0.85cqw] text-[#555]">
          <span className="border border-black/15 bg-white px-[0.6cqw]">Calibri</span>
          <span className="border border-black/15 bg-white px-[0.4cqw]">11 pt</span>
          <span className="font-bold">B</span>
          <span className="italic">I</span>
          <span className="underline">U</span>
          <span className="ml-[0.6cqw] flex-1 truncate border border-black/15 bg-white px-[0.6cqw]">
            SUIVI DEVIS MULLER – SEPTEMBRE 2026 (mettre à jour CHAQUE SOIR svp !!!)
          </span>
        </div>
        <div className="flex items-center gap-[0.8cqw] bg-[#d9ecfb] px-[1cqw] py-[0.35cqw] text-[0.85cqw] text-[#1a4f7a]">
          ℹ Support the development of LibreOffice.
        </div>
        <table className="w-full border-collapse text-[0.8cqw] leading-tight text-[#222]">
          <tbody>
            <tr>
              <td colSpan={7} className="border border-black/10 px-[0.5cqw] py-[0.3cqw] font-bold text-[#c62828]">
                SUIVI DEVIS MULLER – SEPTEMBRE 2026 (mettre à jour CHAQUE SOIR svp !!!)
              </td>
            </tr>
            <tr>
              <td colSpan={7} className="border border-black/10 px-[0.5cqw] py-[0.3cqw] italic text-[#777]">
                dernière màj : Didier le 17/09 ?? (ou Karim)
              </td>
            </tr>
            <tr className="bg-[#5b2a86] font-semibold text-white">
              {["Date", "Lieu", "Client", "Prestation", "Marque", "Montant HT", "Statut"].map((h) => (
                <td key={h} className="border border-black/10 px-[0.5cqw] py-[0.3cqw]">
                  {h}
                </td>
              ))}
            </tr>
            {XLS.map((r, i) => (
              <tr key={i} className={`${r.tone ?? ""} ${r.strike ? "text-[#999] line-through" : ""}`}>
                {r.c.map((c, j) => (
                  <td key={j} className={`border border-black/10 px-[0.5cqw] py-[0.3cqw] ${c.startsWith("#") ? "text-[#c62828]" : ""}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="border border-black/10" />
              <td className="border border-black/10 px-[0.5cqw] py-[0.3cqw] font-bold">TOTAL</td>
              <td className="border border-black/10 bg-[#fff200] px-[0.5cqw] py-[0.3cqw] font-bold">84 580</td>
              <td className="border border-black/10 px-[0.5cqw] py-[0.3cqw] italic text-[#c62828]">total réel ≈ 92 000 ?</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-[1.2cqw] border-t border-black/10 bg-[#f6f6f6] px-[1cqw] py-[0.4cqw] text-[0.8cqw] text-[#555]">
          <span className="font-semibold text-[#222]">Devis SEPT</span>
          <span>Devis AOÛT</span>
          <span>Heures ouvriers</span>
          <span>Prix fournisseurs (NE PAS TOUCHER)</span>
        </div>
      </div>
    </div>
  );
}
