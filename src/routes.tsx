import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { RouteRecord } from "vite-react-ssg";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { MentionsLegales } from "./pages/MentionsLegales";
import { Confidentialite } from "./pages/Confidentialite";
import { Cgu } from "./pages/Cgu";
import { NotFound } from "./pages/NotFound";
import { DiagnosticIA } from "./pages/DiagnosticIA";
import { GuideAutomatisation } from "./pages/GuideAutomatisation";
import { LogicielMetier } from "./pages/services/LogicielMetier";
import { Automatisation } from "./pages/services/Automatisation";
import { Formation } from "./pages/services/Formation";
import { ProjetsPage } from "./pages/ProjetsPage";
import { TemoignagesPage } from "./pages/TemoignagesPage";

/** Remonte en haut à chaque changement de route (sauf ancres #). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Racine commune à toutes les routes. */
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

/** Chrome public du site : barre de navigation + pied de page.
    Le titre et la description servent de repli aux pages qui ne
    déclarent pas leur propre <Helmet> (projets, témoignages, légal…). */
function SiteLayout() {
  return (
    <>
      <Helmet>
        <title>NoesisAI – Agence d'automatisation IA sur-mesure</title>
        <meta name="description" content="NoesisAI conçoit des agents IA, automatisations n8n/Make et logiciels métier sur-mesure pour PME. Audit gratuit, premier échange offert." />
      </Helmet>
      <Navbar />
      <div className="bg-white text-[#0b0b0f]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

/** Routes au format « data router » : vite-react-ssg pré-rend en HTML
    chaque chemin statique de ce tableau au moment du build. */
export const routes: RouteRecord[] = [
  {
    element: <RootLayout />,
    children: [
      // Ressources cloisonnées : hors du layout public, donc sans
      // aucun lien de navigation vers ou depuis le reste du site.
      // Accessibles uniquement via leur URL directe.
      { path: "/diagnostic-ia", element: <DiagnosticIA /> },
      { path: "/guide-automatisation", element: <GuideAutomatisation /> },
      {
        element: <SiteLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/logiciel-metier", element: <LogicielMetier /> },
          // Ancienne page : les agents vocaux font désormais partie de l'automatisation.
          { path: "/agents-vocaux", element: <Navigate to="/automatisation" replace /> },
          { path: "/automatisation", element: <Automatisation /> },
          { path: "/formation-ia", element: <Formation /> },
          { path: "/projets", element: <ProjetsPage /> },
          { path: "/temoignages", element: <TemoignagesPage /> },
          { path: "/mentions-legales", element: <MentionsLegales /> },
          { path: "/confidentialite", element: <Confidentialite /> },
          { path: "/cgu", element: <Cgu /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];
