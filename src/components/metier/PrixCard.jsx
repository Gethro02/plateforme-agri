import { formatFourchette } from "../../utils/dataHelpers";

export default function PrixCard({ produit, prixParUnite, marche, dateReleve }) {
  if (!produit) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-600">
      {/* En-tête : nom du produit */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {produit.nom}{" "}
            {produit.variete && (
              <span className="text-green-700">— {produit.variete}</span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{produit.categorie}</p>
        </div>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          {marche ? marche.ville : "—"}
        </span>
      </div>

      {/* Liste des prix par unité */}
      <div className="space-y-3">
        {prixParUnite.map((item) => {
          const { unite, prixMin, prixMax, releves } = item;
          const estParDefaut = unite.uniteParDefaut;

          if (!releves.length) return null;

          return (
            <div
              key={unite.id}
              className={`flex items-center justify-between p-3 rounded ${
                estParDefaut
                  ? "bg-green-50 border border-green-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {estParDefaut && "★ "}1 {unite.symbole}
                  {unite.equivalenceKg && (
                    <span className="text-xs text-gray-500 ml-1">
                      (≈ {unite.equivalenceKg} kg)
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  {releves.length} relevé{releves.length > 1 ? "s" : ""}
                </span>
              </div>
              <span className="font-bold text-green-700">
                {formatFourchette(prixMin, prixMax)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pied de carte : date du relevé */}
      {dateReleve && (
        <p className="text-xs text-gray-400 mt-4">
          Dernier relevé : {new Date(dateReleve).toLocaleDateString("fr-FR")}
        </p>
      )}
    </div>
  );
}