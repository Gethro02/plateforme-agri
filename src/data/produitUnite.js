// Définit quelles unités s'appliquent à quel produit
export const produitUnite = [
  // Maïs Blanc
  { produitId: 1, uniteId: 1, uniteParDefaut: false },
  { produitId: 1, uniteId: 2, uniteParDefaut: true },  // sac par défaut
  { produitId: 1, uniteId: 3, uniteParDefaut: false },
  // Maïs Jaune
  { produitId: 2, uniteId: 1, uniteParDefaut: false },
  { produitId: 2, uniteId: 2, uniteParDefaut: true },
  // Haricot Rouge
  { produitId: 3, uniteId: 1, uniteParDefaut: false },
  { produitId: 3, uniteId: 3, uniteParDefaut: true },  // seau par défaut
  { produitId: 3, uniteId: 5, uniteParDefaut: false },
  // Haricot Blanc
  { produitId: 4, uniteId: 1, uniteParDefaut: false },
  { produitId: 4, uniteId: 3, uniteParDefaut: true },
  // Arachide en coque
  { produitId: 5, uniteId: 2, uniteParDefaut: true },
  { produitId: 5, uniteId: 5, uniteParDefaut: false },
  { produitId: 5, uniteId: 6, uniteParDefaut: false },
  // Arachide décortiquée
  { produitId: 6, uniteId: 1, uniteParDefaut: true },
  { produitId: 6, uniteId: 5, uniteParDefaut: false },
  // Gingembre frais
  { produitId: 7, uniteId: 7, uniteParDefaut: true },
  { produitId: 7, uniteId: 1, uniteParDefaut: false },
  // Riz local
  { produitId: 8, uniteId: 2, uniteParDefaut: true },
  { produitId: 8, uniteId: 3, uniteParDefaut: false },
  // Curcuma séché
  { produitId: 9, uniteId: 2, uniteParDefaut: true },
  { produitId: 9, uniteId: 7, uniteParDefaut: false },
  // Huile de palme
  { produitId: 10, uniteId: 8, uniteParDefaut: true },  // litre par défaut
  { produitId: 10, uniteId: 9, uniteParDefaut: false },
];