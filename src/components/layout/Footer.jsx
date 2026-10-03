import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-black text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold mb-3">
            🌾 Plateforme Agricole
          </h3>
          <p className="text-sm">
            Mise en relation entre producteurs et acheteurs au Cameroun, avec
            des prix en unités locales et un comparateur de marchés.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Phase pilote — Banganté, région de l'Ouest
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/produits" className="hover:text-white transition">
                Produits
              </Link>
            </li>
            <li>
              <Link to="/comparateur" className="hover:text-white transition">
                Comparateur de marchés
              </Link>
            </li>
            <li>
              <Link to="/offres" className="hover:text-white transition">
                Offres
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3">Informations</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/a-propos" className="hover:text-white transition">
                À propos du projet
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:contact@plateforme-agri.cm"
                className="hover:text-white transition"
              >
                contact@plateforme-agri.cm
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Plateforme Agricole Cameroun. Tous
            droits réservés.
          </p>
          <p className="mt-2 md:mt-0">
            Fait avec 🌱 pour les producteurs camerounais
          </p>
        </div>
      </div>
    </footer>
  );
}