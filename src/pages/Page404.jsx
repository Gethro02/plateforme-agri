import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center py-20">
      <p className="text-7xl font-bold text-green-700 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Page introuvable
      </h1>
      <p className="text-gray-600 mb-8">
        La page que tu cherches n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
      >
        ← Retour à l'accueil
      </Link>
    </div>
  );
}