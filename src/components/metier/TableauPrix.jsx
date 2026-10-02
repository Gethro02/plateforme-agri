import { produits, unites, marches } from "../../data";

export default function TableauPrix({ prix, onVerifier, onSupprimer }) {
  if (!prix.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        Aucun relevé pour le moment.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-4 py-2">Produit</th>
            <th className="text-left px-4 py-2">Unité</th>
            <th className="text-right px-4 py-2">Prix</th>
            <th className="text-right px-4 py-2">Prix/kg</th>
            <th className="text-left px-4 py-2">Marché</th>
            <th className="text-left px-4 py-2">Source</th>
            <th className="text-left px-4 py-2">Date</th>
            <th className="text-center px-4 py-2">Statut</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prix.map((p) => {
            const produit = produits.find((pr) => pr.id === p.produitId);
            const unite = unites.find((u) => u.id === p.uniteId);
            const marche = marches.find((m) => m.id === p.marcheId);

            return (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {produit ? `${produit.nom} ${produit.variete}` : "—"}
                </td>
                <td className="px-4 py-2">1 {unite ? unite.symbole : "—"}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {new Intl.NumberFormat("fr-FR").format(p.prixParUnite)} FCFA
                </td>
                <td className="px-4 py-2 text-right text-gray-500">
                  {p.prixParKg
                    ? `${new Intl.NumberFormat("fr-FR").format(p.prixParKg)} FCFA`
                    : "—"}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {marche ? marche.nom : "—"}
                </td>
                <td className="px-4 py-2 text-gray-600">{p.source}</td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(p.dateReleve).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-2 text-center">
                  {p.estVerifie ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ✓ Vérifié
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      En attente
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex gap-1 justify-center">
                    {!p.estVerifie && onVerifier && (
                      <button
                        onClick={() => onVerifier(p.id)}
                        className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
                        title="Marquer comme vérifié"
                      >
                        ✓
                      </button>
                    )}
                    {onSupprimer && (
                      <button
                        onClick={() => onSupprimer(p.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                        title="Supprimer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}