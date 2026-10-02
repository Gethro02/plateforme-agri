import { useState } from "react";
import { produits, unites, regions, produitUnite } from "../../data";

export default function FormulaireOffre({ onPublier, onAnnuler }) {
  const [type, setType] = useState("VEN");
  const [produitId, setProduitId] = useState(produits[0].id);
  const [uniteId, setUniteId] = useState(null);
  const [quantite, setQuantite] = useState("");
  const [prixDemande, setPrixDemande] = useState("");
  const [regionId, setRegionId] = useState(regions[0].id);
  const [notes, setNotes] = useState("");

  // Unités disponibles pour le produit sélectionné
  const unitesDisponibles = produitUnite
    .filter((pu) => pu.produitId === Number(produitId))
    .map((pu) => ({
      ...unites.find((u) => u.id === pu.uniteId),
      uniteParDefaut: pu.uniteParDefaut,
    }));

  // Initialiser l'unité par défaut quand le produit change
  const uniteEffective =
    uniteId ||
    unitesDisponibles.find((u) => u.uniteParDefaut)?.id ||
    unitesDisponibles[0]?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantite || !prixDemande) return;

    onPublier({
      type,
      acteurId: 1, // provisoirement : Maman Curcuma (plus tard : utilisateur connecté)
      produitId: Number(produitId),
      uniteId: Number(uniteEffective),
      quantite: Number(quantite),
      prixDemande: Number(prixDemande),
      regionId: Number(regionId),
      notes,
    });

    // Réinitialiser
    setQuantite("");
    setPrixDemande("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-600"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Publier une offre
      </h2>

      {/* Type : VEN ou ACHETE */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setType("VEN")}
          className={`flex-1 py-2 rounded font-medium transition ${
            type === "VEN"
              ? "bg-green-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Je vends
        </button>
        <button
          type="button"
          onClick={() => setType("ACHETE")}
          className={`flex-1 py-2 rounded font-medium transition ${
            type === "ACHETE"
              ? "bg-blue-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Je cherche à acheter
        </button>
      </div>

      {/* Produit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Produit
        </label>
        <select
          value={produitId}
          onChange={(e) => {
            setProduitId(e.target.value);
            setUniteId(null); // reset l'unité
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {produits.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.variete}
            </option>
          ))}
        </select>
      </div>

      {/* Unité */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unité
        </label>
        <div className="flex flex-wrap gap-2">
          {unitesDisponibles.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUniteId(u.id)}
              className={`px-3 py-1 rounded text-sm transition ${
                uniteEffective === u.id
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {u.uniteParDefaut && "★ "}
              {u.symbole}
            </button>
          ))}
        </div>
      </div>

      {/* Quantité + prix */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantité
          </label>
          <input
            type="number"
            min="1"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            placeholder="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix demandé (FCFA)
          </label>
          <input
            type="number"
            min="0"
            value={prixDemande}
            onChange={(e) => setPrixDemande(e.target.value)}
            placeholder="15000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      {/* Région */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Région
        </label>
        <select
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nom} — {r.chefLieu}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optionnel)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Qualité, disponibilité, conditions de paiement..."
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded transition"
        >
          Publier l'offre
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