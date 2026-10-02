import { useState } from "react";
import { acteurs, regions } from "../data";
import ActeurCarte from "../components/metier/ActeurCarte";

const roles = [
  { value: "tous", label: "Tous" },
  { value: "producteur", label: "Producteurs" },
  { value: "transformateur", label: "Transformateurs" },
  { value: "acheteur", label: "Acheteurs" },
];

export default function Producteurs() {
  const [recherche, setRecherche] = useState("");
  const [roleActif, setRoleActif] = useState("tous");
  const [regionActive, setRegionActive] = useState("toutes");

  // Liste des régions présentes dans les acteurs
  const regionsDisponibles = regions.filter((r) =>
    acteurs.some((a) => a.regionId === r.id)
  );

  // Filtrage
  const acteursFiltres = acteurs
    .filter((a) => a.actif)
    .filter((a) => {
      if (roleActif !== "tous" && a.role !== roleActif) return false;

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
          👥 Annuaire des acteurs
        </h1>
        <p className="text-gray-600">
          {acteursFiltres.length} acteur
          {acteursFiltres.length > 1 ? "s" : ""} trouvé
          {acteursFiltres.length > 1 ? "s" : ""}
        </p>
      </header>

      {/* Recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou ville..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Filtres par rôle */}
      <div className="flex flex-wrap gap-2 mb-4">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => setRoleActif(role.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              roleActif === role.value
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Filtres par région */}
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

      {/* Grille d'acteurs */}
      {acteursFiltres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acteursFiltres.map((acteur) => (
            <ActeurCarte key={acteur.id} acteur={acteur} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucun acteur ne correspond à ces critères.
        </div>
      )}
    </div>
  );
}