import { useState } from "react";
import { usePrixStore } from "../store/usePrixStore";
import FormulairePrix from "../components/metier/FormulairePrix";
import TableauPrix from "../components/metier/TableauPrix";

export default function SaisiePrix() {
  const { prix, ajouterPrix, verifierPrix, supprimerPrix } = usePrixStore();
  const [filtreSource, setFiltreSource] = useState("toutes");

  const sourcesUniques = [...new Set(prix.map((p) => p.source))];

  const prixFiltres =
    filtreSource === "toutes"
      ? prix
      : prix.filter((p) => p.source === filtreSource);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          📊 Saisie des prix
        </h1>
        <p className="text-gray-600">
          Outil de relevé terrain — {prix.length} relevé
          {prix.length > 1 ? "s" : ""} au total
        </p>
      </header>

      <FormulairePrix onAjouter={ajouterPrix} />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Derniers relevés
          </h2>
          <select
            value={filtreSource}
            onChange={(e) => setFiltreSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="toutes">Toutes les sources</option>
            {sourcesUniques.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <TableauPrix
          prix={prixFiltres}
          onVerifier={verifierPrix}
          onSupprimer={supprimerPrix}
        />
      </section>
    </div>
  );
}