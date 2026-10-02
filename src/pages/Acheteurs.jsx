import { useState } from "react";
import { acteurs, regions } from "../data";
import ActeurCarte from "../components/metier/ActeurCarte";

export default function Acheteurs() {
  const [recherche, setRecherche] = useState("");
  const [regionActive, setRegionActive] = useState("toutes");

  const regionsDisponibles = regions.filter((r) =>
    acteurs.some((a) => a.regionId === r.id)
  );

  const acheteursFiltres = acteurs
    .filter((a) => a.actif && (a.role === "acheteur" || a.role === "transformateur"))
    .filter((a) => {
      if (regionActive !== "toutes" && a.regionId !== Number(regionActive))
        return false;
      if (recherche) {
        const r = recherche.toLowerCase();
        return (
          a.nom.toLowerCase().includes(r) ||
          a.ville.toLowerCase().includes(r)
        );
      }
      return true;
    });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🛒 Acheteurs et transformateurs
        </h1>
        <p className="text-gray-600">
          {acheteursFiltres.length} acheteur
          {acheteursFiltres.length > 1 ? "s" : ""} potentiel
          {acheteursFiltres.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou ville..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setRegionActive("toutes")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            regionActive === "toutes"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Toutes les régions
        </button>
        {regionsDisponibles.map((r) => (
          <button
            key={r.id}
            onClick={() => setRegionActive(r.id.toString())}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              regionActive === r.id.toString()
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {r.nom}
          </button>
        ))}
      </div>

      {acheteursFiltres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acheteursFiltres.map((acteur) => (
            <ActeurCarte key={acteur.id} acteur={acteur} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucun acheteur ne correspond à ces critères.
        </div>
      )}
    </div>
  );
}