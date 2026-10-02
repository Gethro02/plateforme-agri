import {
  produits,
  unites,
  produitUnite,
  prix,
  marches,
  regions,
  acteurs,
} from "../data";

// Trouver un produit par son id
export function getProduit(produitId) {
  return produits.find((p) => p.id === produitId);
}

// Trouver une unité par son id
export function getUnite(uniteId) {
  return unites.find((u) => u.id === uniteId);
}

// Trouver un marché par son id
export function getMarche(marcheId) {
  return marches.find((m) => m.id === marcheId);
}

// Trouver une région par son id
export function getRegion(regionId) {
  return regions.find((r) => r.id === regionId);
}

// Trouver un acteur par son id
export function getActeur(acteurId) {
  return acteurs.find((a) => a.id === acteurId);
}

// Obtenir toutes les unités d'un produit, triées (par défaut en premier)
export function getUnitesDuProduit(produitId) {
  const liens = produitUnite.filter((pu) => pu.produitId === produitId);
  return liens
    .map((lien) => ({
      ...getUnite(lien.uniteId),
      uniteParDefaut: lien.uniteParDefaut,
    }))
    .sort((a, b) => (b.uniteParDefaut ? 1 : 0) - (a.uniteParDefaut ? 1 : 0));
}

// Obtenir tous les prix d'un produit pour un marché donné
// `listePrix` est passé en paramètre (au lieu d'être importé)
export function getPrixDuProduit(listePrix, produitId, marcheId = null) {
  return listePrix.filter(
    (p) =>
      p.produitId === produitId &&
      (marcheId ? p.marcheId === marcheId : true)
  );
}

// Obtenir les prix d'un produit groupés par unité
export function getPrixParUnite(listePrix, produitId, marcheId = null) {
  const prixProduit = getPrixDuProduit(listePrix, produitId, marcheId);
  const unitesProduit = getUnitesDuProduit(produitId);

  return unitesProduit.map((unite) => {
    const releves = prixProduit.filter((p) => p.uniteId === unite.id);
    return {
      unite,
      releves,
      prixMin: releves.length
        ? Math.min(...releves.map((r) => r.prixParUnite))
        : null,
      prixMax: releves.length
        ? Math.max(...releves.map((r) => r.prixParUnite))
        : null,
    };
  });
}

// Formater un prix en FCFA
export function formatPrix(valeur) {
  if (valeur == null) return "—";
  return new Intl.NumberFormat("fr-FR").format(valeur) + " FCFA";
}

// Formater une fourchette de prix
export function formatFourchette(min, max) {
  if (min == null || max == null) return "—";
  if (min === max) return formatPrix(min);
  return `${formatPrix(min)} – ${formatPrix(max)}`;
}