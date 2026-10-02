import { useState } from "react";
import { produits } from "../data";
import ProduitCarte from "../components/metier/ProduitCarte";

const categories = ["Toutes", "Céréale", "Légumineuse", "Oléagineux", "Épice"];

export default function Produits() {
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("Toutes");

  // Filtrage
  const produitsFiltres = produits.filter((p) => {
    const correspondRecherche =
      p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      p.variete.toLowerCase().includes(recherche.toLowerCase());

    const correspondCategorie =
      categorieActive === "Toutes" || p.categorie === categorieActive;

    return correspondRecherche && correspondCategorie;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🌽 Catalogue des produits
        </h1>
        <p className="text-gray-600">
          {produitsFiltres.length} produit
          {produitsFiltres.length > 1 ? "s" : ""} trouvé
          {produitsFiltres.length > 1 ? "s" : ""}
        </p>
      </header>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un produit (ex: maïs, haricot...)"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategorieActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              categorieActive === cat
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille de produits */}
      {produitsFiltres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produitsFiltres.map((produit) => (
            <ProduitCarte key={produit.id} produit={produit} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucun produit ne correspond à ta recherche.
        </div>
      )}
    </div>
  );
}