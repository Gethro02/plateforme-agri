import {
  produits,
  unites,
  regions,
  acteurs,
} from "../../data";
import BadgeFraicheur from "../ui/BadgeFraicheur";
import { Link } from "react-router-dom";

const labelParType = {
  VEN: { texte: "VEN", couleur: "bg-green-100 text-green-800" },
  ACHETE: { texte: "ACHETE", couleur: "bg-blue-100 text-blue-800" },
};

export default function OffreCarte({ offre, onMarquerPourvue }) {
  const produit = produits.find((p) => p.id === offre.produitId);
  const unite = unites.find((u) => u.id === offre.uniteId);
  const region = regions.find((r) => r.id === offre.regionId);
  const acteur = acteurs.find((a) => a.id === offre.acteurId);

  if (!produit || !unite || !acteur) return null;

  const label = labelParType[offre.type] || labelParType.VEN;
  const estPourvue = offre.statut === "pourvue";

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${
        offre.type === "VEN" ? "border-green-600" : "border-blue-600"
      } ${estPourvue ? "opacity-60" : ""}`}
    >
      {/* En-tête : type + statut */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-2 py-1 rounded ${label.couleur}`}>
          {label.texte}
        </span>
        {estPourvue && (
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
            Pourvue
          </span>
        )}
      </div>

      {/* Produit et quantité */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {produit.nom} {produit.variete}
      </h3>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">{offre.quantite}</span> {unite.symbole}
        {offre.quantite > 1 ? "s" : ""} à{" "}
        <span className="font-semibold">
          {new Intl.NumberFormat("fr-FR").format(offre.prixDemande)} FCFA
        </span>{" "}
        / {unite.symbole}
      </p>

      {offre.notes && (
        <p className="text-sm text-gray-500 italic mb-3">{offre.notes}</p>
      )}

      {/* Localisation + contact */}
      <div className="text-sm text-gray-600 mb-4">
        <p>
          📍 {region ? region.nom : "—"} · {acteur.ville}
        </p>
        <p>
  👤{" "}
  <Link
    to={`/acteurs/${acteur.id}`}
    className="text-green-700 hover:underline font-medium"
  >
    {acteur.nom}
  </Link>
</p>
        <div className="mt-1">
            <BadgeFraicheur date={offre.datePublication} />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-2">
        <a
          href={`tel:${acteur.telephone}`}
          className="flex-1 text-center bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded transition"
        >
          📞 Contacter
        </a>
        {!estPourvue && onMarquerPourvue && (
          <button
            onClick={() => onMarquerPourvue(offre.id)}
            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
            title="Marquer comme pourvue"
          >
            ✓
          </button>
        )}
      </div>
    </div>
  );
}