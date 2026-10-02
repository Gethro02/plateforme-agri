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

export default function Offres() {
  const { offres, ajouterOffre, marquerPourvue } = useOffresStore();
  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [typeActif, setTypeActif] = useState("toutes");
  const [produitActif, setProduitActif] = useState("tous");
  const [regionActive, setRegionActive] = useState("toutes");

  const offresFiltrees = offres
    .filter((o) => o.statut === "active")
    .filter((o) => typeActif === "toutes" || o.type === typeActif)
    .filter(
      (o) => produitActif === "tous" || o.produitId === Number(produitActif)
    )
    .filter(
      (o) => regionActive === "toutes" || o.regionId === Number(regionActive)
    );

  const handlePublier = (offre) => {
    ajouterOffre(offre);
    setFormulaireOuvert(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            📢 Offres actives
          </h1>
          <p className="text-gray-600">
            {offresFiltrees.length} offre
            {offresFiltrees.length > 1 ? "s" : ""} active
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
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => setTypeActif(t.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              typeActif === t.value
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
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
          Aucune offre active ne correspond à ces critères.
        </div>
      )}
    </div>
  );
}