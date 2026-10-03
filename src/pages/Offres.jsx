import { useState } from "react";
import { produits, regions } from "../data";
import { useOffresStore } from "../store/useOffresStore";
import OffreCarte from "../components/metier/OffreCarte";
import FormulaireOffre from "../components/metier/FormulaireOffre";

const types = [
  { value: "toutes", label: "Toutes" },
  { value: "VEN", label: "Ventes" },
  { value: "ACHETE", label: "Demandes" },
];

const tris = [
  { value: "recent", label: "Plus récentes" },
  { value: "ancien", label: "Plus anciennes" },
  { value: "prix_asc", label: "Prix croissant" },
  { value: "prix_desc", label: "Prix décroissant" },
  { value: "quantite_desc", label: "Plus grandes quantités" },
];

export default function Offres() {
  const { offres, ajouterOffre, marquerPourvue } = useOffresStore();
  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [typeActif, setTypeActif] = useState("toutes");
  const [produitActif, setProduitActif] = useState("tous");
  const [regionActive, setRegionActive] = useState("toutes");
  const [tri, setTri] = useState("recent");
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  // Filtrage
  let offresFiltrees = offres
    .filter((o) => o.statut === "active")
    .filter((o) => typeActif === "toutes" || o.type === typeActif)
    .filter(
      (o) => produitActif === "tous" || o.produitId === Number(produitActif)
    )
    .filter(
      (o) => regionActive === "toutes" || o.regionId === Number(regionActive)
    )
    .filter((o) => {
      if (prixMin && o.prixDemande < Number(prixMin)) return false;
      if (prixMax && o.prixDemande > Number(prixMax)) return false;
      return true;
    });

  // Tri
  offresFiltrees = [...offresFiltrees].sort((a, b) => {
    switch (tri) {
      case "recent":
        return new Date(b.datePublication) - new Date(a.datePublication);
      case "ancien":
        return new Date(a.datePublication) - new Date(b.datePublication);
      case "prix_asc":
        return a.prixDemande - b.prixDemande;
      case "prix_desc":
        return b.prixDemande - a.prixDemande;
      case "quantite_desc":
        return b.quantite - a.quantite;
      default:
        return 0;
    }
  });

  const handlePublier = (offre) => {
    ajouterOffre(offre);
    setFormulaireOuvert(false);
  };

  const reinitialiserFiltres = () => {
    setTypeActif("toutes");
    setProduitActif("tous");
    setRegionActive("toutes");
    setTri("recent");
    setPrixMin("");
    setPrixMax("");
  };

  const filtreActif =
    typeActif !== "toutes" ||
    produitActif !== "tous" ||
    regionActive !== "toutes" ||
    prixMin ||
    prixMax ||
    tri !== "recent";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            📢 Offres actives
          </h1>
          <p className="text-gray-600">
            {offresFiltrees.length} offre
            {offresFiltrees.length > 1 ? "s" : ""} affichée
            {offresFiltrees.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setFormulaireOuvert(!formulaireOuvert)}
          className="bg-green-700 hover:bg-green-800 text-white font-medium px-4 py-2 rounded transition"
        >
          {formulaireOuvert ? "Fermer" : "+ Publier"}
        </button>
      </header>

      {formulaireOuvert && (
        <FormulaireOffre
          onPublier={handlePublier}
          onAnnuler={() => setFormulaireOuvert(false)}
        />
      )}

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        {/* Type */}
        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setTypeActif(t.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                typeActif === t.value
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Produit + région + tri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <select
            value={produitActif}
            onChange={(e) => setProduitActif(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="tous">Tous les produits</option>
            {produits.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} {p.variete}
              </option>
            ))}
          </select>

          <select
            value={regionActive}
            onChange={(e) => setRegionActive(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="toutes">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nom}
              </option>
            ))}
          </select>

          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {tris.map((t) => (
              <option key={t.value} value={t.value}>
                Tri : {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fourchette de prix + reset */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Prix minimum (FCFA)
            </label>
            <input
              type="number"
              min="0"
              value={prixMin}
              onChange={(e) => setPrixMin(e.target.value)}
              placeholder="Ex : 10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Prix maximum (FCFA)
            </label>
            <input
              type="number"
              min="0"
              value={prixMax}
              onChange={(e) => setPrixMax(e.target.value)}
              placeholder="Ex : 200000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          {filtreActif && (
            <button
              onClick={reinitialiserFiltres}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition"
            >
              ✕ Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {/* Grille d'offres */}
      {offresFiltrees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offresFiltrees.map((offre) => (
            <OffreCarte
              key={offre.id}
              offre={offre}
              onMarquerPourvue={marquerPourvue}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucune offre ne correspond à ces critères.
          {filtreActif && (
            <button
              onClick={reinitialiserFiltres}
              className="block mx-auto mt-4 text-green-700 hover:underline font-medium"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}