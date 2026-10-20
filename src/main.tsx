import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// vite-react-ssg crée le routeur et enveloppe l'application dans un
// HelmetProvider : les <Helmet> des pages sont donc écrits dans le HTML
// pré-rendu au build, puis repris par React côté navigateur.
export const createRoot = ViteReactSSG({ routes, basename: "/" });
