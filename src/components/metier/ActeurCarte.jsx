import { produits, regions } from "../../data";

const couleurParRole = {
  producteur: "border-green-600 bg-green-50",
  acheteur: "border-blue-600 bg-blue-50",
  transformateur: "border-purple-600 bg-purple-50",
  transporteur: "border-orange-600 bg-orange-50",
};

const labelParRole = {
  producteur: "🌱 Producteur",
  acheteur: "🛒 Acheteur",
  transformateur: "🏭 Transformateur",
  transporteur: "🚚 Transporteur",
};

export default function ActeurCarte({ acteur }) {
  const region = regions.find((r) => r.id === acteur.regionId);
  const produitsInteret = acteur.produitsInteret
    .map((id) => produits.find((p) => p.id === id))
    .filter(Boolean);

  const couleur = couleurParRole[acteur.role] || "border-gray-400 bg-gray-50";
  const label = labelParRole[acteur.role] || acteur.role;

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${couleur}`}>
      {/* En-tête */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{acteur.nom}</h3>
          <p className="text-sm text-gray-500">
            {acteur.ville} · {region ? region.nom : "—"}
          </p>
        </div>
        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded">
          {label}
        </span>
      </div>

      {/* Vérification */}
      {acteur.verifie && (
        <p className="text-xs text-green-700 font-medium mb-2">
          ✓ Vérifié par la plateforme
        </p>
      )}

      {/* Produits d'intérêt */}
      {produitsInteret.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">
            {acteur.role === "producteur" ? "Produit" : "Produits recherchés"} :
          </p>
          <div className="flex flex-wrap gap-1">
            {produitsInteret.map((p) => (
              <span
                key={p.id}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {p.nom} {p.variete}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <a
        href={`tel:${acteur.telephone}`}
        className="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded transition"
      >
        📞 {acteur.telephone}
      </a>
    </div>
  );
}