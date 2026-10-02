import { useState } from "react";
import {
  produits,
  unites,
  marches,
  regions,
  produitUnite,
} from "../../data";
import { calculerPrixKg } from "../../utils/calculPrixKg";

const sources = [
  { value: "Relevé terrain", label: "Relevé terrain" },
  { value: "Ministère", label: "Ministère du Commerce" },
  { value: "Importation", label: "Importation" },
  { value: "Autre", label: "Autre" },
];

const typesPrix = [
  { value: "detail", label: "Détail" },
  { value: "gros", label: "Gros" },
  { value: "bord_champ", label: "Bord champ" },
];

export default function FormulairePrix({ onAjouter }) {
  const [produitId, setProduitId] = useState(produits[0].id);
  const [uniteId, setUniteId] = useState(null);
  const [marcheId, setMarcheId] = useState(marches[1].id);
  const [prixParUnite, setPrixParUnite] = useState("");
  const [type, setType] = useState("detail");
  const [source, setSource] = useState("Relevé terrain");
  const [notes, setNotes] = useState("");

  // Unités valides pour le produit sélectionné
  const unitesDisponibles = produitUnite
    .filter((pu) => pu.produitId === Number(produitId))
    .map((pu) => ({
      ...unites.find((u) => u.id === pu.uniteId),
      uniteParDefaut: pu.uniteParDefaut,
    }));

  // Unité effective (celle choisie, ou celle par défaut, ou la première)
  const uniteEffective =
    uniteId ||
    unitesDisponibles.find((u) => u.uniteParDefaut)?.id ||
    unitesDisponibles[0]?.id;

  // Calcul automatique du prix au kg
  const uniteChoisie = unites.find((u) => u.id === uniteEffective);
  const prixKg =
    prixParUnite && uniteChoisie
      ? calculerPrixKg(Number(prixParUnite), uniteChoisie.equivalenceKg)
      : null;

  // Région automatique selon le marché
  const marcheChoisi = marches.find((m) => m.id === Number(marcheId));
  const regionId = marcheChoisi ? marcheChoisi.regionId : regions[0].id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prixParUnite) return;

    onAjouter({
      produitId: Number(produitId),
      uniteId: Number(uniteEffective),
      marcheId: Number(marcheId),
      regionId,
      prixParUnite: Number(prixParUnite),
      prixParKg: prixKg,
      type,
      source,
      notes,
    });

    // Réinitialiser
    setPrixParUnite("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-600"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        📝 Nouveau relevé de prix
      </h2>

      {/* Produit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Produit
        </label>
        <select
          value={produitId}
          onChange={(e) => {
            setProduitId(e.target.value);
            setUniteId(null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          Unité vendue
        </label>
        <div className="flex flex-wrap gap-2">
          {unitesDisponibles.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUniteId(u.id)}
              className={`px-3 py-1 rounded text-sm transition ${
                uniteEffective === u.id
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {u.uniteParDefaut && "★ "}
              {u.symbole}
              {u.equivalenceKg && (
                <span className="text-xs ml-1 opacity-75">
                  (≈{u.equivalenceKg}kg)
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Marché */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Marché
        </label>
        <select
          value={marcheId}
          onChange={(e) => setMarcheId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {marches.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>
      </div>

      {/* Prix + type */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix demandé (FCFA)
          </label>
          <input
            type="number"
            min="0"
            value={prixParUnite}
            onChange={(e) => setPrixParUnite(e.target.value)}
            placeholder="18000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {prixKg && (
            <p className="text-xs text-blue-700 mt-1">
              ≈ {new Intl.NumberFormat("fr-FR").format(prixKg)} FCFA/kg
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de prix
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {typesPrix.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Source */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source
        </label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sources.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
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
          placeholder="Qualité, conditions, remarques du vendeur..."
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded transition"
      >
        Enregistrer le relevé
      </button>
    </form>
  );
}