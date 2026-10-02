import PrixCard from "../components/metier/PrixCard";
import { produits, marches } from "../data";
import { getPrixParUnite } from "../utils/dataHelpers";
import { usePrixStore } from "../store/usePrixStore";

export default function Accueil() {
  const { prix } = usePrixStore();
  const marche = marches.find((m) => m.id === 2);
  const produitsAffiches = produits;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🌾 Prix du marché — Banganté
        </h1>
        <p className="text-gray-600">
          {marche.nom} · {marche.frequence}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {prix.length} relevé{prix.length > 1 ? "s" : ""} dans la base
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {produitsAffiches.map((produit) => {
          const prixParUnite = getPrixParUnite(prix, produit.id, marche.id);
          const aDesPrix = prixParUnite.some((p) => p.releves.length > 0);

          if (!aDesPrix) return null;

          return (
            <PrixCard
              key={produit.id}
              produit={produit}
              prixParUnite={prixParUnite}
              marche={marche}
              dateReleve="2026-10-01"
            />
          );
        })}
      </div>
    </div>
  );
}