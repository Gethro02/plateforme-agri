import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import Producteurs from "./pages/Producteurs";
import Acheteurs from "./pages/Acheteurs";
import Offres from "./pages/Offres";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/producteurs" element={<Producteurs />} />
          <Route path="/acheteurs" element={<Acheteurs />} />
          <Route path="/offres" element={<Offres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;