import { Link } from "react-router-dom";
import { getPrixParUnite, formatFourchette } from "../../utils/dataHelpers";
import { usePrixStore } from "../../store/usePrixStore";

export default function ProduitCarte({ produit }) {
  const { prix } = usePrixStore();
  const prixParUnite = getPrixParUnite(prix, produit.id);
  const uniteParDefaut = prixParUnite.find((p) => p.unite.uniteParDefaut);
  const aDesPrix = uniteParDefaut && uniteParDefaut.releves.length > 0;

  return (
    <Link
      to={`/produits/${produit.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 border-l-4 border-green-600"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {produit.nom}{" "}
            {produit.variete && (
              <span className="text-green-700">— {produit.variete}</span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{produit.categorie}</p>
        </div>
      </div>

      {aDesPrix ? (
        <div className="bg-green-50 rounded p-3">
          <p className="text-xs text-gray-600 mb-1">
            Prix indicatif (1 {uniteParDefaut.unite.symbole})
          </p>
          <p className="font-bold text-green-700">
            {formatFourchette(uniteParDefaut.prixMin, uniteParDefaut.prixMax)}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">Aucun prix relevé</p>
      )}

      <p className="text-xs text-green-700 mt-3 font-medium">
        Voir les détails →
      </p>
    </Link>
  );
}