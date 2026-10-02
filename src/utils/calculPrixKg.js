export function calculerPrixKg(prixParUnite, equivalenceKg) {
  if (!equivalenceKg || equivalenceKg === 0) return null;
  return Math.round(prixParUnite / equivalenceKg);
}