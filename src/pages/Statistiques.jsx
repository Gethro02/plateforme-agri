import { Link } from "react-router-dom";
import { produits, marches, regions } from "../data";
import { usePrixStore } from "../store/usePrixStore";
import { useOffresStore } from "../store/useOffresStore";
import { useActeursStore } from "../store/useActeursStore";

export default function Statistiques() {
  const { prix } = usePrixStore();
  const { offres } = useOffresStore();
  const { acteurs } = useActeursStore();

  // Statistiques prix
  const prixVerifies = prix.filter((p) => p.estVerifie).length;
  const prixEnAttente = prix.length - prixVerifies;
  const prixRecents = prix.filter((p) => {
    const diff =
      (new Date() - new Date(p.dateReleve)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  // Statistiques offres
  const offresActives = offres.filter((o) => o.statut === "active").length;
  const offresVente = offres.filter(
    (o) => o.statut === "active" && o.type === "VEN"
  ).length;
  const offresAchat = offres.filter(
    (o) => o.statut === "active" && o.type === "ACHETE"
  ).length;

  // Statistiques acteurs
  const acteursActifs = acteurs.filter((a) => a.actif).length;
  const acteursVerifies = acteurs.filter(
    (a) => a.actif && a.verifie
  ).length;
  const producteurs = acteurs.filter(
    (a) => a.actif && a.role === "producteur"
  ).length;
  const acheteurs = acteurs.filter(
    (a) => a.actif && (a.role === "acheteur" || a.role === "transformateur")
  ).length;

  // Répartition des prix par marché
  const prixParMarche = marches.map((m) => ({
    marche: m,
    nombre: prix.filter((p) => p.marcheId === m.id).length,
  }));

  // Répartition des prix par catégorie
  const categories = [...new Set(produits.map((p) => p.categorie))];
  const prixParCategorie = categories.map((cat) => {
    const produitsCat = produits
      .filter((p) => p.categorie === cat)
      .map((p) => p.id);
    return {
      categorie: cat,
      nombre: prix.filter((p) => produitsCat.includes(p.produitId)).length,
    };
  });

  const totalPrix = prix.length || 1;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          📊 Tableau de bord
        </h1>
        <p className="text-gray-600">
          Vue d'ensemble de la plateforme — Phase pilote Banganté
        </p>
      </header>

      {/* Cartes principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
          <p className="text-xs text-gray-500 mb-1">Relevés de prix</p>
          <p className="text-3xl font-bold text-gray-800">{prix.length}</p>
          <p className="text-xs text-gray-500 mt-1">
            {prixRecents} récent{prixRecents > 1 ? "s" : ""} (≤ 7 jours)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
          <p className="text-xs text-gray-500 mb-1">Offres actives</p>
          <p className="text-3xl font-bold text-gray-800">{offresActives}</p>
          <p className="text-xs text-gray-500 mt-1">
            {offresVente} ventes · {offresAchat} demandes
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600">
          <p className="text-xs text-gray-500 mb-1">Acteurs actifs</p>
          <p className="text-3xl font-bold text-gray-800">{acteursActifs}</p>
          <p className="text-xs text-gray-500 mt-1">
            {acteursVerifies} vérifié{acteursVerifies > 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-600">
          <p className="text-xs text-gray-500 mb-1">Produits</p>
          <p className="text-3xl font-bold text-gray-800">
            {produits.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {categories.length} catégories
          </p>
        </div>
      </div>

      {/* Deux colonnes */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Prix par marché */}
        <section className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Prix par marché
          </h2>
          <div className="space-y-3">
            {prixParMarche.map(({ marche, nombre }) => {
              const pourcentage = Math.round((nombre / totalPrix) * 100);
              return (
                <div key={marche.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{marche.nom}</span>
                    <span className="text-gray-500 font-medium">
                      {nombre} ({pourcentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${pourcentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Prix par catégorie */}
        <section className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Prix par catégorie
          </h2>
          <div className="space-y-3">
            {prixParCategorie.map(({ categorie, nombre }) => {
              const pourcentage = Math.round((nombre / totalPrix) * 100);
              return (
                <div key={categorie}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{categorie}</span>
                    <span className="text-gray-500 font-medium">
                      {nombre} ({pourcentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${pourcentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Répartition des rôles */}
      <section className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Répartition des acteurs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded">
            <p className="text-2xl font-bold text-green-700">
              {producteurs}
            </p>
            <p className="text-xs text-gray-600 mt-1">Producteurs</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded">
            <p className="text-2xl font-bold text-blue-700">{acheteurs}</p>
            <p className="text-xs text-gray-600 mt-1">Acheteurs</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded">
            <p className="text-2xl font-bold text-yellow-700">
              {prixEnAttente}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Prix en attente
            </p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded">
            <p className="text-2xl font-bold text-purple-700">
              {prixVerifies}
            </p>
            <p className="text-xs text-gray-600 mt-1">Prix vérifiés</p>
          </div>
        </div>
      </section>

      {/* Actions rapides */}
      <section className="grid md:grid-cols-3 gap-4">
        <Link
          to="/saisie-prix"
          className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-blue-600"
        >
          <p className="font-medium text-gray-800">📝 Saisir un prix</p>
          <p className="text-xs text-gray-500 mt-1">
            Ajouter un relevé terrain
          </p>
        </Link>
        <Link
          to="/offres"
          className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-green-600"
        >
          <p className="font-medium text-gray-800">📢 Publier une offre</p>
          <p className="text-xs text-gray-500 mt-1">
            Vendre ou acheter un produit
          </p>
        </Link>
        <Link
          to="/comparateur"
          className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-purple-600"
        >
          <p className="font-medium text-gray-800">⚖️ Comparer les marchés</p>
          <p className="text-xs text-gray-500 mt-1">
            Trouver le meilleur prix
          </p>
        </Link>
      </section>
    </div>
  );
}