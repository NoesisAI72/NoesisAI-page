import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
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

/** Chrome public du site : barre de navigation + pied de page. */
function SiteLayout() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-[#0b0b0f]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Ressource cloisonnée : hors du layout public, donc sans
            aucun lien de navigation vers ou depuis le reste du site.
            Accessible uniquement via son URL directe. */}
        <Route path="/diagnostic-ia" element={<DiagnosticIA />} />
        <Route path="/guide-automatisation" element={<GuideAutomatisation />} />

        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/logiciel-metier" element={<LogicielMetier />} />
          {/* Ancienne page : les agents vocaux font désormais partie de l'automatisation. */}
          <Route path="/agents-vocaux" element={<Navigate to="/automatisation" replace />} />
          <Route path="/automatisation" element={<Automatisation />} />
          <Route path="/formation-ia" element={<Formation />} />
          <Route path="/projets" element={<ProjetsPage />} />
          <Route path="/temoignages" element={<TemoignagesPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgu" element={<Cgu />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
