import { Link } from "react-router-dom";
import { FOOTER, MAIN_MENU, SERVICES_MENU, SOCIALS } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#f7f6fb] text-[#0b0b0f]">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logos/noesis-mark.png" alt="NOESIS.AI" className="h-9 w-9" />
              <span className="font-display text-lg font-semibold tracking-[-0.04em] text-[#0b0b0f]">
                Noesis<span className="text-brand-600">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">{FOOTER.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 transition-colors hover:border-black/20 hover:text-[#0b0b0f]"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">{FOOTER.navTitle}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {[...SERVICES_MENU, ...MAIN_MENU].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition-colors hover:text-[#0b0b0f]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">{FOOTER.legalTitle}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER.legal.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-slate-600 transition-colors hover:text-[#0b0b0f]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NOESIS AI — Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500">Automatisations IA · n8n · Make · agents vocaux</p>
        </div>
      </div>
    </footer>
  );
}
