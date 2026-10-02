import { useParams, Link } from "react-router-dom";
import { produits, marches } from "../data";
import { getPrixParUnite, formatFourchette } from "../utils/dataHelpers";
import { usePrixStore } from "../store/usePrixStore";

export default function DetailProduit() {
  const { id } = useParams();
  const { prix } = usePrixStore();
  const produit = produits.find((p) => p.id === Number(id));

  if (!produit) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600">Produit introuvable.</p>
        <Link to="/produits" className="text-green-700 underline">
          ← Retour aux produits
        </Link>
      </div>
    );
  }

  const prixParUnite = getPrixParUnite(prix, produit.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/produits"
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Retour aux produits
      </Link>

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-1">
          {produit.nom} {produit.variete && `— ${produit.variete}`}
        </h1>
        <p className="text-gray-600">{produit.categorie}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Prix par unité (tous marchés confondus)
        </h2>

        {prixParUnite.length === 0 ? (
          <p className="text-gray-500 italic">
            Aucun prix relevé pour ce produit.
          </p>
        ) : (
          <div className="bg-white rounded-lg shadow divide-y">
            {prixParUnite.map((item) => {
              const { unite, prixMin, prixMax, releves } = item;

              return (
                <div
                  key={unite.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {unite.uniteParDefaut && "★ "}1 {unite.symbole}
                      {unite.equivalenceKg && (
                        <span className="text-xs text-gray-500 ml-2">
                          (≈ {unite.equivalenceKg} kg)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {releves.length} relevé{releves.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <p className="font-bold text-green-700">
                    {releves.length > 0
                      ? formatFourchette(prixMin, prixMax)
                      : "—"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Détail des relevés
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Marché</th>
                <th className="text-left px-4 py-2">Unité</th>
                <th className="text-right px-4 py-2">Prix</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-center px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {prixParUnite.flatMap((item) =>
                item.releves.map((releve) => {
                  const marche = marches.find((m) => m.id === releve.marcheId);
                  return (
                    <tr key={releve.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {marche ? marche.nom : "—"}
                      </td>
                      <td className="px-4 py-2">1 {item.unite.symbole}</td>
                      <td className="px-4 py-2 text-right font-medium">
                        {new Intl.NumberFormat("fr-FR").format(
                          releve.prixParUnite
                        )}{" "}
                        FCFA
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {new Date(releve.dateReleve).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {releve.estVerifie ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            ✓
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            …
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}