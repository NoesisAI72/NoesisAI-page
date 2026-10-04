import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { cn } from "./cn";

/** Conteneur de section avec id d'ancre + padding vertical homogène. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 sm:py-20", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** En-tête de section centré : badge pilule + titre display + sous-titre. */
export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  tone = "dark",
  accent,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  /** "light" : section sur fond clair (texte noir, accent violet). */
  tone?: "dark" | "light";
  /** Fin de titre mise en avant (violet sur fond clair). */
  accent?: string;
}) {
  const light = tone === "light";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && <Badge tone={tone}>{badge}</Badge>}
      <h2
        className={cn(
          "text-3xl leading-[1.1] sm:text-4xl md:text-[2.75rem]",
          light ? "font-semibold tracking-[-0.04em] text-[#0b0b0f]" : "font-extrabold text-white"
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={light ? "text-brand-600" : "text-gradient"}>{accent}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={cn("text-base leading-relaxed sm:text-lg", light ? "text-slate-600" : "text-slate-300")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/** Wrapper d'apparition au scroll, réutilisable. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
