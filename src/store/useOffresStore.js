import { create } from "zustand";
import { persist } from "zustand/middleware";

// Offres initiales (mockées)
const offresInitiales = [
  {
    id: 1,
    type: "VEN",
    acteurId: 1,
    produitId: 9,
    uniteId: 2,
    quantite: 10,
    prixDemande: 150000,
    regionId: 1,
    statut: "active",
    source: "terrain",
    datePublication: "2026-10-01T08:00:00",
    notes: "Curcuma séché de qualité, disponible immédiatement.",
  },
  {
    id: 2,
    type: "VEN",
    acteurId: 5,
    produitId: 10,
    uniteId: 8,
    quantite: 50,
    prixDemande: 1000,
    regionId: 1,
    statut: "active",
    source: "terrain",
    datePublication: "2026-10-01T09:30:00",
    notes: "Huile de palme artisanale, production hebdomadaire.",
  },
  {
    id: 3,
    type: "ACHETE",
    acteurId: 4,
    produitId: 3,
    uniteId: 3,
    quantite: 100,
    prixDemande: 15000,
    regionId: 1,
    statut: "active",
    source: "terrain",
    datePublication: "2026-10-01T10:15:00",
    notes: "Recherche haricot rouge en gros, paiement comptant.",
  },
];

export const useOffresStore = create(
  persist(
    (set, get) => ({
      offres: offresInitiales,

      // Ajouter une offre
      ajouterOffre: (offre) => {
        const nouvelleOffre = {
          ...offre,
          id: Date.now(),
          statut: "active",
          source: "app",
          datePublication: new Date().toISOString(),
        };
        set({ offres: [nouvelleOffre, ...get().offres] });
        return nouvelleOffre;
      },

      // Marquer une offre comme pourvue
      marquerPourvue: (id) => {
        set({
          offres: get().offres.map((o) =>
            o.id === id ? { ...o, statut: "pourvue" } : o
          ),
        });
      },

      // Supprimer une offre
      supprimerOffre: (id) => {
        set({ offres: get().offres.filter((o) => o.id !== id) });
      },
    }),
    {
      name: "plateforme-agri-offres", // clé localStorage
    }
  )
);