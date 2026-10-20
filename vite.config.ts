import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type {} from "vite-react-ssg";

export default defineConfig({
  plugins: [react()],
  // Pré-rendu statique (vite-react-ssg build) : un fichier HTML par route.
  ssgOptions: {
    entry: "src/main.tsx",
    // /automatisation -> dist/automatisation/index.html, servi tel quel par Vercel
    dirStyle: "nested",
    // /agents-vocaux est redirigé par Vercel (vercel.json) : rien à pré-rendre.
    // /404 rend la route « * » : Vercel la sert pour toute adresse inconnue.
    includedRoutes: (paths) => [...paths.filter((p) => p !== "/agents-vocaux"), "/404"],
  },
});
