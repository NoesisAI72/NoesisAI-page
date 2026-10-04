import { cn } from "./cn";

export function Badge({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur",
        tone === "light"
          ? "border-black/5 bg-white font-display text-slate-700"
          : "border-white/10 bg-white/5 text-slate-300",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {children}
    </span>
  );
}
