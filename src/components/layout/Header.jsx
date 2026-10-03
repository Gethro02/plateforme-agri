import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BoutonTheme from "../ui/BoutonTheme";
import BoutonInstallation from "../ui/BoutonInstallation";

const liens = [
  { to: "/", label: "Accueil" },
  { to: "/statistiques", label: "Statistiques" },
  { to: "/produits", label: "Produits" },
  { to: "/comparateur", label: "Comparateur" },
  { to: "/producteurs", label: "Producteurs" },
  { to: "/acheteurs", label: "Acheteurs" },
  { to: "/offres", label: "Offres" },
  { to: "/saisie-prix", label: "Saisie prix" },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const location = useLocation();

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMenuOuvert(false);
  }, [location.pathname]);

  return (
    <header className="bg-green-700 dark:bg-gray-900 text-white shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-lg sm:text-xl font-bold">
          🌾 <span className="hidden sm:inline">Plateforme Agricole</span>
        </NavLink>

        {/* Menu desktop */}
        <nav className="hidden lg:flex gap-6">
          {liens.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-green-100 dark:text-gray-300 hover:text-white"
                }`
              }
            >
              {lien.label}
            </NavLink>
          ))}
        </nav>

        {/* Boutons à droite */}
        <div className="flex items-center gap-1">
          {/* Bouton d'installation PWA (masqué sur mobile) */}
          <div className="hidden sm:block">
            <BoutonInstallation />
          </div>

          {/* Bouton de thème clair/sombre */}
          <BoutonTheme />

          {/* Bouton hamburger (mobile) */}
          <button
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="lg:hidden p-2 rounded hover:bg-green-800 dark:hover:bg-gray-800 transition"
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOuvert ? (
              // Icône X
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Icône hamburger
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOuvert && (
        <nav className="lg:hidden bg-green-800 dark:bg-gray-800 border-t border-green-600 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
            {liens.map((lien) => (
              <NavLink
                key={lien.to}
                to={lien.to}
                className={({ isActive }) =>
                  `py-2 px-3 rounded text-sm font-medium transition ${
                    isActive
                      ? "bg-green-700 dark:bg-gray-700 text-white"
                      : "text-green-100 dark:text-gray-300 hover:bg-green-700 dark:hover:bg-gray-700"
                  }`
                }
              >
                {lien.label}
              </NavLink>
            ))}

            {/* Bouton d'installation dans le menu mobile */}
            <div className="sm:hidden pt-2 border-t border-green-600 dark:border-gray-700">
              <BoutonInstallation />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}