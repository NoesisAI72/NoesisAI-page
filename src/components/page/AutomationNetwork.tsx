import { useReducedMotion } from "framer-motion";

/**
 * Illustration « automatisation » : des applications métier en tuiles 3D,
 * reliées à un hub central par des lignes où circulent des données.
 * Tout est dimensionné en unités de conteneur (cqw) pour garder les
 * proportions entre le SVG (lignes) et les tuiles (HTML) à toutes les tailles.
 */

// Repère commun : viewBox 1000 x 560. Les applications sont dispersées
// et reliées entre elles (pas de hub central), comme un réseau de workflows.
const W = 1000;
const H = 560;

const APPS = [
  { id: "gmail", name: "Gmail", logo: "/apps/gmail.svg", x: 105, y: 150, size: 8.5 },
  { id: "notion", name: "Notion", logo: "/apps/notion.svg", x: 345, y: 95, size: 7.5 },
  { id: "excel", name: "Excel", logo: "/apps/microsoft-excel.svg", x: 235, y: 390, size: 8.5 },
  { id: "hubspot", name: "HubSpot", logo: "/apps/hubspot.svg", x: 505, y: 265, size: 9.5 },
  { id: "slack", name: "Slack", logo: "/apps/slack.svg", x: 430, y: 475, size: 7.5 },
  { id: "agenda", name: "Google Agenda", logo: "/apps/google-calendar.svg", x: 660, y: 95, size: 8 },
  { id: "pennylane", name: "Pennylane", logo: "/apps/pennylane.svg", x: 700, y: 420, size: 9 },
  { id: "whatsapp", name: "WhatsApp", logo: "/apps/whatsapp-icon.svg", x: 895, y: 205, size: 8 },
  { id: "drive", name: "Google Drive", logo: "/apps/google-drive.svg", x: 900, y: 470, size: 7.5 },
] as const;

type AppId = (typeof APPS)[number]["id"];

// Connexions entre applications (chaque ligne = un flux automatisé).
const EDGES: [AppId, AppId][] = [
  ["gmail", "notion"],
  ["gmail", "excel"],
  ["gmail", "hubspot"],
  ["notion", "hubspot"],
  ["excel", "hubspot"],
  ["excel", "slack"],
  ["slack", "hubspot"],
  ["hubspot", "agenda"],
  ["hubspot", "pennylane"],
  ["agenda", "whatsapp"],
  ["pennylane", "whatsapp"],
  ["pennylane", "drive"],
  ["slack", "pennylane"],
];

const PULSE_COLORS = ["#8b5cf6", "#3b82f6", "#c026d3", "#6366f1"];
const byId = Object.fromEntries(APPS.map((a) => [a.id, a])) as Record<AppId, (typeof APPS)[number]>;

/** Ligne légèrement courbée entre deux applications. */
function edgePath(a: AppId, b: AppId, i: number) {
  const p = byId[a];
  const q = byId[b];
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  // décalage perpendiculaire, alterné pour un rendu organique
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = (i % 2 === 0 ? 1 : -1) * Math.min(40, len * 0.12);
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M${p.x},${p.y} Q${cx},${cy} ${q.x},${q.y}`;
}

function Tile({ name, logo, size = 9.5, label = true }: { name: string; logo: string; size?: number; label?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[0.8cqw]">
      <div
        className="flex items-center justify-center rounded-[24%] border border-white bg-[linear-gradient(160deg,#ffffff_0%,#f3f2f9_100%)]"
        style={{
          width: `${size}cqw`,
          height: `${size}cqw`,
          boxShadow:
            "inset 0 0.25cqw 0 #fff, inset 0 -0.6cqw 1.2cqw rgba(30,20,60,0.07), 0 0.25cqw 0 rgba(30,20,60,0.06), 0 1.6cqw 2.6cqw -1cqw rgba(30,20,60,0.38)",
        }}
      >
        <img src={logo} alt="" className="h-[52%] w-[52%] object-contain drop-shadow-[0_0.2cqw_0.3cqw_rgba(0,0,0,0.12)]" draggable={false} />
      </div>
      {label && (
        <span
          className="whitespace-nowrap rounded-full bg-white/80 px-[0.9cqw] py-[0.2cqw] font-display font-medium text-slate-600 shadow-sm"
          style={{ fontSize: "max(1.25cqw, 0.66rem)" }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

export function AutomationNetwork({ labels = true }: { labels?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-5xl select-none"
      style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}
      role="img"
      aria-label="Gmail, Excel, Notion, HubSpot, Slack, Google Agenda, Pennylane, WhatsApp et Google Drive reliés entre eux par des automatisations"
    >
      {/* Lignes fines et données en transit */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="auto-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {EDGES.map(([a, b], i) => {
          const d = edgePath(a, b, i);
          const color = PULSE_COLORS[i % PULSE_COLORS.length];
          const dur = `${3 + (i % 5) * 0.45}s`;
          const begin = `-${((i * 0.73) % 3).toFixed(2)}s`;
          const keyPoints = i % 3 === 0 ? "1;0" : "0;1";
          return (
            <g key={`${a}-${b}`}>
              <path d={d} fill="none" stroke="#d9d2f5" strokeWidth={1.25} />
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeOpacity={0.55}
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeDasharray="3 9"
                className={reduce ? "" : "auto-flow"}
                style={{ animationDuration: `${1.8 + (i % 3) * 0.5}s` }}
              />
              {!reduce && (
                <>
                  <circle r={7} fill={color} opacity={0.35} filter="url(#auto-glow)">
                    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={d} keyPoints={keyPoints} keyTimes="0;1" calcMode="linear" />
                  </circle>
                  <circle r={3.2} fill={color}>
                    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={d} keyPoints={keyPoints} keyTimes="0;1" calcMode="linear" />
                  </circle>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tuiles d'applications */}
      {APPS.map((a, i) => (
        <div
          key={a.id}
          className="absolute -translate-x-1/2"
          style={{ left: `${(a.x / W) * 100}%`, top: `${(a.y / H) * 100}%`, marginTop: `-${a.size / 2}cqw` }}
        >
          <div className={reduce ? "" : "auto-float"} style={{ animationDelay: `${-i * 0.55}s` }}>
            <Tile name={a.name} logo={a.logo} size={a.size} label={labels} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini-réseau pour les couvertures de projets : 3 à 5 applications    */
/*  reliées entre elles. `seed` varie la disposition d'un projet à       */
/*  l'autre (miroir horizontal / vertical).                             */
/* ------------------------------------------------------------------ */

const MW = 1000;
const MH = 625;

const LAYOUTS: Record<number, { pts: [number, number][]; edges: [number, number][] }> = {
  3: { pts: [[210, 430], [500, 185], [790, 430]], edges: [[0, 1], [1, 2], [0, 2]] },
  4: { pts: [[180, 210], [410, 450], [640, 185], [840, 430]], edges: [[0, 1], [0, 2], [1, 2], [2, 3], [1, 3]] },
  5: {
    pts: [[150, 330], [365, 150], [515, 450], [690, 175], [860, 400]],
    edges: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [3, 4], [2, 4]],
  },
};

export function MiniNetwork({ logos, seed = 0 }: { logos: string[]; seed?: number }) {
  const reduce = useReducedMotion();
  const n = Math.max(3, Math.min(5, logos.length));
  const layout = LAYOUTS[n];
  const flipX = seed % 2 === 1;
  const flipY = seed % 4 >= 2;
  const pts = layout.pts.map(([x, y]) => [flipX ? MW - x : x, flipY ? MH - y : y] as [number, number]);

  const path = (a: number, b: number, i: number) => {
    const [px, py] = pts[a];
    const [qx, qy] = pts[b];
    const dx = qx - px;
    const dy = qy - py;
    const len = Math.hypot(dx, dy) || 1;
    const bend = (i % 2 === 0 ? 1 : -1) * Math.min(45, len * 0.14);
    const cx = (px + qx) / 2 + (-dy / len) * bend;
    const cy = (py + qy) / 2 + (dx / len) * bend;
    return `M${px},${py} Q${cx},${cy} ${qx},${qy}`;
  };

  return (
    <div className="relative h-full w-full" style={{ containerType: "inline-size" }} aria-hidden>
      <svg viewBox={`0 0 ${MW} ${MH}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {layout.edges.map(([a, b], i) => {
          const d = path(a, b, i);
          const color = PULSE_COLORS[(i + seed) % PULSE_COLORS.length];
          const dur = `${2.6 + ((i + seed) % 4) * 0.4}s`;
          const begin = `-${(((i + seed) * 0.7) % 2.6).toFixed(2)}s`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#d9d2f5" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeDasharray="4 10"
                vectorEffect="non-scaling-stroke"
                className={reduce ? "" : "auto-flow"}
              />
              {!reduce && (
                <circle r={9} fill={color}>
                  <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={d} keyPoints={i % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
      {logos.slice(0, n).map((logo, i) => (
        <div
          key={logo + i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(pts[i][0] / MW) * 100}%`, top: `${(pts[i][1] / MH) * 100}%` }}
        >
          <div className={reduce ? "" : "auto-float"} style={{ animationDelay: `${-(i + seed) * 0.7}s` }}>
            <Tile name="" logo={logo} size={n === 5 ? 13 : 15} label={false} />
          </div>
        </div>
      ))}
    </div>
  );
}
