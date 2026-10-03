import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import DetailProduit from "./pages/DetailProduit";
import Producteurs from "./pages/Producteurs";
import Acheteurs from "./pages/Acheteurs";
import Offres from "./pages/Offres";
import SaisiePrix from "./pages/SaisiePrix";
import Comparateur from "./pages/Comparateur";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import ProfilActeur from "./pages/ProfilActeur";
import Statistiques from "./pages/Statistiques";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/produits/:id" element={<DetailProduit />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/producteurs" element={<Producteurs />} />
          <Route path="/acheteurs" element={<Acheteurs />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/saisie-prix" element={<SaisiePrix />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/acteurs/:id" element={<ProfilActeur />} />
          <Route path="/statistiques" element={<Statistiques />} />
          {/* Route 404 : doit rester en dernière position */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;