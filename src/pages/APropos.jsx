import { Link } from "react-router-dom";

export default function APropos() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          À propos du projet
        </h1>
        <p className="text-gray-600">
          Plateforme Agricole Cameroun — Phase pilote Banganté
        </p>
      </header>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          🎯 Le problème
        </h2>
        <p className="text-gray-700 mb-3">
          Au Cameroun, les petits producteurs agricoles ne trouvent pas
          d'acheteurs et ne connaissent pas les vrais prix de leurs produits.
          Une productrice de curcuma à Banganté peut avoir une récolte prête
          sans savoir à qui la vendre, ni à quel prix.
        </p>
        <p className="text-gray-700">
          Les intermédiaires profitent de cette asymétrie d'information pour
          acheter à bas prix et revendre avec une marge importante.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          💡 Notre solution
        </h2>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>
            Un <strong>annuaire bidirectionnel</strong> de producteurs et
            d'acheteurs, avec contact direct par téléphone.
          </li>
          <li>
            Des <strong>prix en unités locales</strong> (sac, seau, bol) —
            pas seulement en kilos, parce que c'est ainsi que le marché
            fonctionne réellement.
          </li>
          <li>
            Un <strong>comparateur de marchés</strong> pour identifier où
            vendre au meilleur prix, ou où acheter au meilleur prix.
          </li>
          <li>
            Un <strong>indicateur de fraîcheur</strong> sur chaque prix pour
            éviter les données obsolètes.
          </li>
          <li>
            À terme, un <strong>accès par SMS</strong> pour les producteurs
            sans smartphone ni connexion internet stable.
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          🗺️ Stratégie géographique
        </h2>
        <p className="text-gray-700 mb-3">
          Le projet démarre à <strong>Banganté</strong>, dans la région de
          l'Ouest (zone des hauts plateaux), où plusieurs produits clés sont
          cultivés : maïs, haricot, curcuma.
        </p>
        <p className="text-gray-700">
          L'extension est prévue progressivement vers le{" "}
          <strong>Nord-Ouest</strong> (haricot, maïs), le{" "}
          <strong>Littoral</strong> (huile de palme, gingembre) et l'
          <strong>Adamaoua</strong> (maïs).
        </p>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          👤 L'auteur
        </h2>
        <p className="text-gray-700">
          Ce projet est développé par un étudiant camerounais en génie
          logiciel (L3), dans le cadre de ses études et avec l'ambition d'en
          faire un outil utile pour les producteurs de sa région.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          📬 Nous contacter
        </h2>
        <p className="text-gray-700 mb-4">
          Une suggestion, un bug, une idée d'amélioration ?
        </p>
        <Link
          to="/contact"
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Aller au formulaire de contact →
        </Link>
      </section>
    </div>
  );
}