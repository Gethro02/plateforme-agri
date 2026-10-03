import { produits, unites, marches, regions } from "../data";

/**
 * Convertit un tableau d'objets en CSV et déclenche le téléchargement.
 */
export function exporterPrixEnCsv(prix, nomFichier = "prix.csv") {
  // En-têtes
  const entetes = [
    "ID",
    "Produit",
    "Variété",
    "Catégorie",
    "Unité",
    "Équivalence kg",
    "Prix par unité (FCFA)",
    "Prix par kg (FCFA)",
    "Type",
    "Marché",
    "Ville",
    "Région",
    "Source",
    "Date du relevé",
    "Vérifié",
    "Notes",
  ];

  // Lignes
  const lignes = prix.map((p) => {
    const produit = produits.find((pr) => pr.id === p.produitId);
    const unite = unites.find((u) => u.id === p.uniteId);
    const marche = marches.find((m) => m.id === p.marcheId);
    const region = regions.find((r) => r.id === p.regionId);

    return [
      p.id,
      produit ? produit.nom : "",
      produit ? produit.variete : "",
      produit ? produit.categorie : "",
      unite ? unite.symbole : "",
      unite && unite.equivalenceKg ? unite.equivalenceKg : "",
      p.prixParUnite,
      p.prixParKg != null ? p.prixParKg : "",
      p.type,
      marche ? marche.nom : "",
      marche ? marche.ville : "",
      region ? region.nom : "",
      p.source,
      p.dateReleve,
      p.estVerifie ? "Oui" : "Non",
      p.notes ? p.notes.replace(/\n/g, " ") : "",
    ];
  });

  // Construction du CSV
  const echapper = (valeur) => {
    if (valeur == null) return "";
    const texte = String(valeur);
    if (texte.includes(",") || texte.includes('"') || texte.includes("\n")) {
      return `"${texte.replace(/"/g, '""')}"`;
    }
    return texte;
  };

  const contenu = [
    entetes.map(echapper).join(","),
    ...lignes.map((ligne) => ligne.map(echapper).join(",")),
  ].join("\n");

  // Ajout du BOM UTF-8 pour Excel
  const blob = new Blob(["\uFEFF" + contenu], {
    type: "text/csv;charset=utf-8;",
  });

  // Téléchargement
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(url);
}