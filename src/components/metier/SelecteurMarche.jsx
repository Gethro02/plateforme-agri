import { marches } from "../../data";

export default function SelecteurMarche({ marcheId, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Choisir un marché
      </p>
      <div className="flex flex-wrap gap-2">
        {marches.map((marche) => (
          <button
            key={marche.id}
            onClick={() => onChange(marche.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              marcheId === marche.id
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-50 border border-gray-200"
            }`}
          >
            {marche.ville} — {marche.nom.replace("Marché ", "").replace(" de " + marche.ville, "")}
          </button>
        ))}
      </div>
    </div>
  );
}