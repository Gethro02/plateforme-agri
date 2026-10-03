/**
 * Renvoie un texte court décrivant l'ancienneté d'une date
 * et une classe Tailwind de couleur associée.
 *
 * @param {string} dateISO - Date au format "2026-10-01" ou ISO complète
 * @returns {{ texte: string, couleur: string, niveau: string }}
 */
export function formatFraicheur(dateISO) {
  if (!dateISO) {
    return { texte: "Date inconnue", couleur: "text-gray-400", niveau: "inconnu" };
  }

  const date = new Date(dateISO);
  const maintenant = new Date();

  // Différence en jours entiers
  const diffMs = maintenant - date;
  const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let texte;
  let couleur;
  let niveau;

  if (diffJours <= 0) {
    texte = "Aujourd'hui";
    couleur = "text-green-700 bg-green-100";
    niveau = "frais";
  } else if (diffJours === 1) {
    texte = "Hier";
    couleur = "text-green-700 bg-green-100";
    niveau = "frais";
  } else if (diffJours < 7) {
    texte = `Il y a ${diffJours} jours`;
    couleur = "text-green-700 bg-green-100";
    niveau = "frais";
  } else if (diffJours < 14) {
    const semaines = Math.floor(diffJours / 7);
    texte = `Il y a ${semaines} semaine${semaines > 1 ? "s" : ""}`;
    couleur = "text-orange-700 bg-orange-100";
    niveau = "moyen";
  } else if (diffJours < 30) {
    const semaines = Math.floor(diffJours / 7);
    texte = `Il y a ${semaines} semaines`;
    couleur = "text-orange-700 bg-orange-100";
    niveau = "moyen";
  } else if (diffJours < 365) {
    const mois = Math.floor(diffJours / 30);
    texte = `Il y a ${mois} mois`;
    couleur = "text-red-700 bg-red-100";
    niveau = "obsolete";
  } else {
    const annees = Math.floor(diffJours / 365);
    texte = `Il y a ${annees} an${annees > 1 ? "s" : ""}`;
    couleur = "text-red-700 bg-red-100";
    niveau = "obsolete";
  }

  return { texte, couleur, niveau };
}

/**
 * Renvoie la date du relevé le plus récent dans une liste
 */
export function dernierReleve(releves) {
  if (!releves || releves.length === 0) return null;
  return releves.sort(
    (a, b) => new Date(b.dateReleve) - new Date(a.dateReleve)
  )[0];
}