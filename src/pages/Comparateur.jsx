import { useState } from "react";
import { Link } from "react-router-dom";
import { produits, marches, unites } from "../data";
import { getPrixParUnite, formatPrix } from "../utils/dataHelpers";
import { usePrixStore } from "../store/usePrixStore";
import BadgeFraicheur from "../components/ui/BadgeFraicheur";

export default function Comparateur() {
  const { prix } = usePrixStore();
  const [produitId, setProduitId] = useState(produits[0].id);

  const produit = produits.find((p) => p.id === Number(produitId));
  const unitesDuProduit = getPrixParUnite(prix, produit.id).filter(
    (item) => item.releves.length > 0
  );

  // Construction du tableau : une ligne par marché
  const lignes = marches.map((marche) => {
    const prixParUnite = getPrixParUnite(prix, produit.id, marche.id);
    const aDesPrix = prixParUnite.some((p) => p.releves.length > 0);

    return { marche, prixParUnite, aDesPrix };
  });

  const marchesAvecPrix = lignes.filter((l) => l.aDesPrix);

  // Trouver le marché avec l'unité par défaut la moins chère
  const uniteParDefaut = unitesDuProduit.find((u) => u.unite.uniteParDefaut);
  let meilleurMarche = null;
  let prixMinGlobal = null;

  if (uniteParDefaut) {
    marchesAvecPrix.forEach((ligne) => {
      const item = ligne.prixParUnite.find(
        (p) => p.unite.id === uniteParDefaut.unite.id
      );
      if (item && item.prixMin != null) {
        if (prixMinGlobal === null || item.prixMin < prixMinGlobal) {
          prixMinGlobal = item.prixMin;
          meilleurMarche = ligne.marche;
        }
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          ⚖️ Comparateur de marchés
        </h1>
        <p className="text-gray-600">
          Compare les prix d'un produit sur tous les marchés
        </p>
      </header>

      {/* Sélection du produit */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choisir un produit
        </label>
        <select
          value={produitId}
          onChange={(e) => setProduitId(e.target.value)}
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {produits.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.variete}
            </option>
          ))}
        </select>
      </div>

      {/* Recommandation */}
      {meilleurMarche && prixMinGlobal && uniteParDefaut && (
        <div className="bg-green-50 border-l-4 border-green-600 rounded p-4 mb-6">
          <p className="text-sm font-medium text-green-800 mb-1">
            💡 Meilleur marché pour vendre
          </p>
          <p className="text-green-900">
            <strong>{meilleurMarche.nom}</strong> — prix le plus bas constaté à{" "}
            <strong>{formatPrix(prixMinGlobal)}</strong> /{" "}
            {uniteParDefaut.unite.symbole}
          </p>
        </div>
      )}

      {/* Tableau comparatif */}
      {marchesAvecPrix.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Aucun prix relevé pour ce produit sur les marchés actuels.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Marché</th>
                {unitesDuProduit.map((item) => (
                  <th
                    key={item.unite.id}
                    className="text-right px-4 py-3"
                  >
                    {item.unite.uniteParDefaut && "★ "}1 {item.unite.symbole}
                  </th>
                ))}
                <th className="text-center px-4 py-3">Fraîcheur</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne) => {
                if (!ligne.aDesPrix) return null;

                // Relevé le plus récent pour ce marché
                const tousReleves = ligne.prixParUnite.flatMap(
                  (p) => p.releves
                );
                const plusRecent = tousReleves.sort(
                  (a, b) =>
                    new Date(b.dateReleve) - new Date(a.dateReleve)
                )[0];

                const estMeilleur =
                  meilleurMarche && ligne.marche.id === meilleurMarche.id;

                return (
                  <tr
                    key={ligne.marche.id}
                    className={`border-t ${
                      estMeilleur ? "bg-green-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {estMeilleur && (
                          <span className="text-green-700 font-bold">★</span>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {ligne.marche.nom}
                          </p>
                          <p className="text-xs text-gray-500">
                            {ligne.marche.frequence}
                          </p>
                        </div>
                      </div>
                    </td>
                    {unitesDuProduit.map((item) => {
                      const cellule = ligne.prixParUnite.find(
                        (p) => p.unite.id === item.unite.id
                      );
                      const aPrix =
                        cellule && cellule.releves.length > 0;
                      return (
                        <td
                          key={item.unite.id}
                          className="px-4 py-3 text-right"
                        >
                          {aPrix ? (
                            <span className="font-medium text-gray-800">
                              {formatPrix(cellule.prixMin)}
                              {cellule.prixMin !== cellule.prixMax && (
                                <span className="text-xs text-gray-500 block">
                                  jusqu'à {formatPrix(cellule.prixMax)}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <BadgeFraicheur date={plusRecent.dateReleve} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Lien vers le détail */}
      <div className="mt-6 text-center">
        <Link
          to={`/produits/${produit.id}`}
          className="text-green-700 hover:underline font-medium"
        >
          Voir le détail complet de {produit.nom} {produit.variete} →
        </Link>
      </div>
    </div>
  );
}