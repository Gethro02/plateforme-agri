import { useParams, Link } from "react-router-dom";
import {
  produits,
  regions,
  marches,
} from "../data";
import { useActeursStore } from "../store/useActeursStore";
import { useOffresStore } from "../store/useOffresStore";
import { usePrixStore } from "../store/usePrixStore";
import {
  getPrixParUnite,
  formatFourchette,
  formatPrix,
} from "../utils/dataHelpers";
import BadgeFraicheur from "../components/ui/BadgeFraicheur";

const labelParRole = {
  producteur: "🌱 Producteur",
  acheteur: "🛒 Acheteur",
  transformateur: "🏭 Transformateur",
  transporteur: "🚚 Transporteur",
};

const couleurParRole = {
  producteur: "border-green-600 bg-green-50",
  acheteur: "border-blue-600 bg-blue-50",
  transformateur: "border-purple-600 bg-purple-50",
  transporteur: "border-orange-600 bg-orange-50",
};

export default function ProfilActeur() {
  const { id } = useParams();
  const { acteurs } = useActeursStore();
  const { offres } = useOffresStore();
  const { prix } = usePrixStore();

  const acteur = acteurs.find((a) => a.id === Number(id));

  if (!acteur) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600 mb-4">Acteur introuvable.</p>
        <Link to="/producteurs" className="text-green-700 underline">
          ← Retour à l'annuaire
        </Link>
      </div>
    );
  }

  const region = regions.find((r) => r.id === acteur.regionId);
  const produitsInteret = acteur.produitsInteret
    .map((pid) => produits.find((p) => p.id === pid))
    .filter(Boolean);

  // Ses offres actives
  const sesOffres = offres.filter(
    (o) => o.acteurId === acteur.id && o.statut === "active"
  );

  // Ses prix relevés (si c'est un producteur qui a saisi des prix)
  // Pour le MVP, on ne l'affiche pas, car les prix ne sont pas liés à un acteur.
  // On garde cette section commentée pour plus tard.

  const couleur =
    couleurParRole[acteur.role] || "border-gray-400 bg-gray-50";
  const labelRole = labelParRole[acteur.role] || acteur.role;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/producteurs"
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Retour à l'annuaire
      </Link>

      {/* En-tête */}
      <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${couleur} mb-6`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {acteur.nom}
            </h1>
            <p className="text-gray-600">
              📍 {acteur.ville} · {region ? region.nom : "—"}
            </p>
            {acteur.dateInscription && (
              <p className="text-xs text-gray-400 mt-1">
                Inscrit le{" "}
                {new Date(acteur.dateInscription).toLocaleDateString("fr-FR")}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="inline-block text-sm bg-white border border-gray-200 px-3 py-1 rounded">
              {labelRole}
            </span>
            {acteur.verifie && (
              <p className="text-xs text-green-700 font-medium mt-2">
                ✓ Vérifié
              </p>
            )}
          </div>
        </div>

        {/* Contact */}
        <a
          href={`tel:${acteur.telephone}`}
          className="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg transition"
        >
          📞 {acteur.telephone}
        </a>
      </div>

      {/* Produits d'intérêt */}
      {produitsInteret.length > 0 && (
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {acteur.role === "producteur"
              ? "Produits proposés"
              : "Produits recherchés"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {produitsInteret.map((p) => (
              <Link
                key={p.id}
                to={`/produits/${p.id}`}
                className="text-sm bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 px-3 py-1 rounded-full transition"
              >
                {p.nom} {p.variete}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ses offres actives */}
      {sesOffres.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ses offres actives ({sesOffres.length})
          </h2>
          <div className="space-y-3">
            {sesOffres.map((offre) => {
              const produit = produits.find(
                (p) => p.id === offre.produitId
              );
              const prixUnite = offre.prixDemande;
              return (
                <Link
                  key={offre.id}
                  to="/offres"
                  className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded mr-2 ${
                          offre.type === "VEN"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {offre.type}
                      </span>
                      <span className="font-medium text-gray-800">
                        {produit ? `${produit.nom} ${produit.variete}` : "—"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-700">
                      {formatPrix(prixUnite)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Quantité : {offre.quantite} · Publiée le{" "}
                    {new Date(offre.datePublication).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Aucune offre */}
      {sesOffres.length === 0 && (
        <section className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Aucune offre active pour le moment.
        </section>
      )}
    </div>
  );
}