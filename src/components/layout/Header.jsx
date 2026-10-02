import { NavLink } from "react-router-dom";

const liens = [
  { to: "/", label: "Accueil" },
  { to: "/produits", label: "Produits" },
  { to: "/producteurs", label: "Producteurs" },
  { to: "/acheteurs", label: "Acheteurs" },
  { to: "/offres", label: "Offres" },
  { to: "/saisie-prix", label: "Saisie prix" },
];

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          🌾 Plateforme Agricole
        </NavLink>

        <nav className="flex gap-6">
          {liens.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-green-100 hover:text-white"
                }`
              }
            >
              {lien.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}