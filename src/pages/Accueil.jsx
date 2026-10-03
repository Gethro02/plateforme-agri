import { useState } from "react";
import PrixCard from "../components/metier/PrixCard";
import SelecteurMarche from "../components/metier/SelecteurMarche";
import { produits, marches } from "../data";
import { getPrixParUnite } from "../utils/dataHelpers";
import { usePrixStore } from "../store/usePrixStore";

export default function Accueil() {
  const { prix } = usePrixStore();
  const [marcheId, setMarcheId] = useState(2); // Marché B par défaut

  const marche = marches.find((m) => m.id === marcheId);
  const produitsAffiches = produits;

  // Nombre de relevés pour ce marché
  const relevesDuMarche = prix.filter((p) => p.marcheId === marcheId);

  // Produits ayant au moins un prix sur ce marché
  const produitsAvecPrix = produitsAffiches.filter((produit) => {
    const prixParUnite = getPrixParUnite(prix, produit.id, marcheId);
    return prixParUnite.some((p) => p.releves.length > 0);
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🌾 Prix du marché
        </h1>
        <p className="text-gray-600">
          {marche.nom} · {marche.frequence}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {relevesDuMarche.length} relevé
          {relevesDuMarche.length > 1 ? "s" : ""} pour ce marché ·{" "}
          {produitsAvecPrix.length} produit
          {produitsAvecPrix.length > 1 ? "s" : ""} avec prix
        </p>
      </header>

      <SelecteurMarche marcheId={marcheId} onChange={setMarcheId} />

      {produitsAvecPrix.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {produitsAvecPrix.map((produit) => {
            const prixParUnite = getPrixParUnite(prix, produit.id, marcheId);
            const dernierReleve = prixParUnite
              .flatMap((p) => p.releves)
              .sort(
                (a, b) =>
                  new Date(b.dateReleve) - new Date(a.dateReleve)
              )[0];

            return (
              <PrixCard
                key={produit.id}
                produit={produit}
                prixParUnite={prixParUnite}
                marche={marche}
                dateReleve={dernierReleve ? dernierReleve.dateReleve : null}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucun prix relevé pour ce marché. Va sur{" "}
          <span className="font-medium text-green-700">Saisie prix</span> pour
          en ajouter.
        </div>
      )}
    </div>
  );
}