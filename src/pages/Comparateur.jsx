import { useState } from "react";
import { Link } from "react-router-dom";
import { produits, marches } from "../data";
import { getPrixParUnite, formatPrix } from "../utils/dataHelpers";
import { usePrixStore } from "../store/usePrixStore";
import BadgeFraicheur from "../components/ui/BadgeFraicheur";

export default function Comparateur() {
  const { prix } = usePrixStore();
  const [produitId, setProduitId] = useState(produits[0].id);
  const [mode, setMode] = useState("vendeur"); // "vendeur" | "acheteur"

  const produit = produits.find((p) => p.id === Number(produitId));
  const unitesDuProduit = getPrixParUnite(prix, produit.id).filter(
    (item) => item.releves.length > 0
  );

  const lignes = marches.map((marche) => {
    const prixParUnite = getPrixParUnite(prix, produit.id, marche.id);
    const aDesPrix = prixParUnite.some((p) => p.releves.length > 0);
    return { marche, prixParUnite, aDesPrix };
  });

  const marchesAvecPrix = lignes.filter((l) => l.aDesPrix);
  const uniteParDefaut = unitesDuProduit.find((u) => u.unite.uniteParDefaut);

  // Trouver le meilleur marché selon le mode
  let meilleurMarche = null;
  let prixReference = null;

  if (uniteParDefaut) {
    marchesAvecPrix.forEach((ligne) => {
      const item = ligne.prixParUnite.find(
        (p) => p.unite.id === uniteParDefaut.unite.id
      );
      if (!item || item.prixMin == null) return;

      // Mode vendeur : on regarde le prix le plus élevé (prixMax)
      // Mode acheteur : on regarde le prix le plus bas (prixMin)
      const valeur =
        mode === "vendeur" ? item.prixMax : item.prixMin;

      if (
        prixReference === null ||
        (mode === "vendeur" && valeur > prixReference) ||
        (mode === "acheteur" && valeur < prixReference)
      ) {
        prixReference = valeur;
        meilleurMarche = ligne.marche;
      }
    });
  }

  // Couleur de la recommandation selon le mode
  const couleurReco =
    mode === "vendeur"
      ? { fond: "bg-blue-50", bord: "border-blue-600", texte: "text-blue-900", accent: "text-blue-800" }
      : { fond: "bg-green-50", bord: "border-green-600", texte: "text-green-900", accent: "text-green-800" };

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

      {/* Sélection du produit + mode */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choisir un produit
            </label>
            <select
              value={produitId}
              onChange={(e) => setProduitId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {produits.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom} {p.variete}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Je suis…
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("vendeur")}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  mode === "vendeur"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
              >
                🌱 Je vends
              </button>
              <button
                onClick={() => setMode("acheteur")}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  mode === "acheteur"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-50"
                }`}
              >
                🛒 J'achète
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommandation */}
      {meilleurMarche && prixReference && uniteParDefaut && (
        <div
          className={`${couleurReco.fond} border-l-4 ${couleurReco.bord} rounded p-4 mb-6`}
        >
          <p className={`text-sm font-medium ${couleurReco.accent} mb-1`}>
            {mode === "vendeur"
              ? "💡 Marché le plus intéressant pour vendre"
              : "💡 Marché le plus intéressant pour acheter"}
          </p>
          <p className={couleurReco.texte}>
            <strong>{meilleurMarche.nom}</strong> — prix{" "}
            {mode === "vendeur" ? "le plus élevé" : "le plus bas"} constaté à{" "}
            <strong>{formatPrix(prixReference)}</strong> /{" "}
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
                  <th key={item.unite.id} className="text-right px-4 py-3">
                    {item.unite.uniteParDefaut && "★ "}1 {item.unite.symbole}
                  </th>
                ))}
                <th className="text-center px-4 py-3">Fraîcheur</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne) => {
                if (!ligne.aDesPrix) return null;

                const tousReleves = ligne.prixParUnite.flatMap(
                  (p) => p.releves
                );
                const plusRecent = tousReleves.sort(
                  (a, b) =>
                    new Date(b.dateReleve) - new Date(a.dateReleve)
                )[0];

                const estMeilleur =
                  meilleurMarche && ligne.marche.id === meilleurMarche.id;
                const fondMeilleur =
                  mode === "vendeur" ? "bg-blue-50" : "bg-green-50";
                const couleurEtoile =
                  mode === "vendeur" ? "text-blue-700" : "text-green-700";

                return (
                  <tr
                    key={ligne.marche.id}
                    className={`border-t ${
                      estMeilleur ? fondMeilleur : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {estMeilleur && (
                          <span className={`font-bold ${couleurEtoile}`}>★</span>
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