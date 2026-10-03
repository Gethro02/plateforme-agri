import { create } from "zustand";
import { persist } from "zustand/middleware";
import { acteurs as acteursInitiaux } from "../data";

export const useActeursStore = create(
  persist(
    (set, get) => ({
      acteurs: acteursInitiaux,

      // Ajouter un acteur
      ajouterActeur: (acteur) => {
        const nouveau = {
          ...acteur,
          id: Date.now(),
          verifie: false,
          actif: true,
          dateInscription: new Date().toISOString(),
        };
        set({ acteurs: [nouveau, ...get().acteurs] });
        return nouveau;
      },

      // Mettre à jour un acteur
      modifierActeur: (id, modifications) => {
        set({
          acteurs: get().acteurs.map((a) =>
            a.id === id ? { ...a, ...modifications } : a
          ),
        });
      },

      // Vérifier un acteur (admin)
      verifierActeur: (id) => {
        set({
          acteurs: get().acteurs.map((a) =>
            a.id === id ? { ...a, verifie: true } : a
          ),
        });
      },

      // Désactiver un acteur
      desactiverActeur: (id) => {
        set({
          acteurs: get().acteurs.map((a) =>
            a.id === id ? { ...a, actif: false } : a
          ),
        });
      },

      // Réinitialiser
      reinitialiser: () => {
        set({ acteurs: acteursInitiaux });
      },
    }),
    {
      name: "plateforme-agri-acteurs",
    }
  )
);