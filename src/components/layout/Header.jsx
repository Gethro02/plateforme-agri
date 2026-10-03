import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BoutonTheme from "../ui/BoutonTheme";

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

  useEffect(() => {
    setMenuOuvert(false);
  }, [location.pathname]);

  return (
    <header className="bg-green-700 dark:bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-lg sm:text-xl font-bold">
          🌾 <span className="hidden sm:inline">Plateforme Agricole</span>
        </NavLink>

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

        <div className="flex items-center gap-1">
          <BoutonTheme />
          <button
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="lg:hidden p-2 rounded hover:bg-green-800 transition"
            aria-label="Ouvrir le menu"
          >
            {menuOuvert ? (
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
          </div>
        </nav>
      )}
    </header>
  );
}