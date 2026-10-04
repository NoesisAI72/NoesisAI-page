import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "./ui/cn";
import { ICLOSED_URL, MAIN_MENU, SERVICES_MENU, WHATSAPP_URL } from "../data/content";

const linkCls =
  "rounded-lg px-3 py-2 font-display text-[0.95rem] font-medium uppercase tracking-tight transition-colors";

/** Bouton noir à bordure pointillée, façon clickway. */
function CtaButton({ className }: { className?: string }) {
  return (
    <a
      href={ICLOSED_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b0f] px-5 py-3 font-display text-sm font-semibold uppercase tracking-[-0.02em] text-white outline-dashed outline-2 -outline-offset-[5px] outline-white/40 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5",
        className
      )}
    >
      Parler de votre projet <span aria-hidden>↗</span>
    </a>
  );
}

function WhatsAppButton() {
  if (!WHATSAPP_URL) return null;
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_0_0_6px_rgba(37,211,102,0.15)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.4 3.6C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.3z" />
      </svg>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const closeTimer = useRef<number>();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme les menus à chaque changement de page.
  useEffect(() => {
    setOpen(false);
    setServices(false);
  }, [pathname]);

  const inServices = SERVICES_MENU.some((s) => pathname.startsWith(s.to));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6">
        <nav
          className={cn(
            "mt-3 flex items-center justify-between gap-3 rounded-2xl border border-black/5 py-2.5 pl-4 pr-2.5 backdrop-blur-md transition-all duration-300 sm:pl-5",
            scrolled
              ? "bg-white/90 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)]"
              : "bg-white/60 shadow-[0_8px_24px_-14px_rgba(76,29,149,0.2)]"
          )}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src="/logos/noesis-mark.png" alt="NOESIS.AI" className="h-9 w-9" />
            <span className="font-display text-xl font-semibold tracking-[-0.04em] text-[#0b0b0f]">
              Noesis<span className="text-brand-600">AI</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            <li
              className="relative"
              onMouseEnter={() => {
                window.clearTimeout(closeTimer.current);
                setServices(true);
              }}
              onMouseLeave={() => {
                closeTimer.current = window.setTimeout(() => setServices(false), 150);
              }}
            >
              <button
                type="button"
                aria-expanded={services}
                onClick={() => setServices((v) => !v)}
                className={cn(linkCls, "flex items-center gap-1", inServices || services ? "text-[#0b0b0f]" : "text-[#0b0b0f]")}
              >
                Services
                <span className={cn("text-xs transition-transform", services && "rotate-180")} aria-hidden>
                  ▾
                </span>
              </button>
              <AnimatePresence>
                {services && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full w-[22rem] pt-3"
                  >
                    <ul className="rounded-2xl border border-black/5 bg-white p-2 shadow-[0_24px_48px_-16px_rgba(30,20,60,0.35)]">
                      {SERVICES_MENU.map((s) => (
                        <li key={s.to}>
                          <NavLink
                            to={s.to}
                            className={({ isActive }) =>
                              cn("block rounded-xl px-4 py-3 transition-colors hover:bg-[#f7f6fb]", isActive && "bg-[#f7f6fb]")
                            }
                          >
                            <span className="block font-display text-sm font-semibold text-[#0b0b0f]">{s.label}</span>
                            <span className="mt-0.5 block text-xs text-slate-500">{s.text}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {MAIN_MENU.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => cn(linkCls, isActive ? "text-[#0b0b0f]" : "text-slate-500 hover:text-[#0b0b0f]")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <CtaButton className="hidden sm:inline-flex" />
            <WhatsAppButton />
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-[#0b0b0f] lg:hidden"
            >
              <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        {open && (
          <div className="mt-2 max-h-[80vh] overflow-y-auto rounded-3xl border border-black/5 bg-white/95 p-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md lg:hidden">
            <p className="px-4 pb-1 pt-2 font-display text-xs font-semibold uppercase tracking-wider text-slate-400">
              Services
            </p>
            <ul className="flex flex-col">
              {SERVICES_MENU.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="block rounded-2xl px-4 py-3 font-display text-sm font-medium text-slate-800 hover:bg-black/5">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 border-t border-black/5" />
            <ul className="flex flex-col">
              {MAIN_MENU.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block rounded-2xl px-4 py-3 font-display text-sm font-medium uppercase text-slate-800 hover:bg-black/5">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <CtaButton className="mt-2 w-full" />
          </div>
        )}
      </div>
    </header>
  );
}
