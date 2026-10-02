export function formatPrix(valeur) {
  if (valeur == null) return "—";
  return new Intl.NumberFormat("fr-FR").format(valeur) + " FCFA";
}

export function formatPrixKg(valeur) {
  if (valeur == null) return "—";
  return new Intl.NumberFormat("fr-FR").format(valeur) + " FCFA/kg";
}