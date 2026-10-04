import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center pt-32 pb-20">
      <div className="container-page max-w-lg text-center">
        <p className="font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-[#0b0b0f]">Page non trouvée</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été
          déplacée ou n'existe plus.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="dark">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </main>
  );
}
