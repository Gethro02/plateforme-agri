import { useState } from "react";
import { produits, regions } from "../../data";

const roles = [
  { value: "producteur", label: "🌱 Producteur" },
  { value: "acheteur", label: "🛒 Acheteur" },
  { value: "transformateur", label: "🏭 Transformateur" },
  { value: "transporteur", label: "🚚 Transporteur" },
];

export default function FormulaireActeur({ onAjouter, onAnnuler }) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("+237");
  const [role, setRole] = useState("producteur");
  const [regionId, setRegionId] = useState(regions[0].id);
  const [ville, setVille] = useState("");
  const [produitsInteret, setProduitsInteret] = useState([]);

  const toggleProduit = (id) => {
    setProduitsInteret((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom || !telephone || !ville || produitsInteret.length === 0) return;

    onAjouter({
      nom,
      telephone,
      role,
      regionId: Number(regionId),
      ville,
      produitsInteret,
    });

    // Réinitialiser
    setNom("");
    setTelephone("+237");
    setVille("");
    setProduitsInteret([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-600"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        📝 Créer un nouveau profil
      </h2>

      {/* Nom */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom ou raison sociale
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Ex : Coopérative de Banganté"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Téléphone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone
        </label>
        <input
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="+237 6XX XX XX XX"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Rôle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rôle
        </label>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={`py-2 rounded text-sm font-medium transition ${
                role === r.value
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Région + ville */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Région
          </label>
          <select
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <input
            type="text"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            placeholder="Ex : Banganté"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
      </div>

      {/* Produits d'intérêt */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {role === "producteur"
            ? "Produits que vous vendez"
            : "Produits qui vous intéressent"}{" "}
          <span className="text-gray-400 font-normal">
            ({produitsInteret.length} sélectionné
            {produitsInteret.length > 1 ? "s" : ""})
          </span>
        </label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-3">
          {produits.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleProduit(p.id)}
              className={`px-3 py-1 rounded-full text-xs transition ${
                produitsInteret.includes(p.id)
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50"
              }`}
            >
              {p.nom} {p.variete}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 rounded transition"
        >
          Créer le profil
        </button>
        {onAnnuler && (
          <button
            type="button"
            onClick={onAnnuler}
            className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded transition"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}