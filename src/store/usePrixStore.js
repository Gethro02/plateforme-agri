import { create } from "zustand";
import { persist } from "zustand/middleware";
import { prix as prixInitiaux } from "../data";

export const usePrixStore = create(
  persist(
    (set, get) => ({
      prix: prixInitiaux,

      // Ajouter un relevé de prix
      ajouterPrix: (releve) => {
        const nouveau = {
          ...releve,
          id: Date.now(),
          estVerifie: false,
          dateReleve: releve.dateReleve || new Date().toISOString().split("T")[0],
        };
        set({ prix: [nouveau, ...get().prix] });
        return nouveau;
      },

      // Marquer un prix comme vérifié
      verifierPrix: (id) => {
        set({
          prix: get().prix.map((p) =>
            p.id === id ? { ...p, estVerifie: true } : p
          ),
        });
      },

      // Supprimer un prix
      supprimerPrix: (id) => {
        set({ prix: get().prix.filter((p) => p.id !== id) });
      },

      // Réinitialiser (utile pour les tests)
      reinitialiser: () => {
        set({ prix: prixInitiaux });
      },
    }),
    {
      name: "plateforme-agri-prix",
    }
  )
);