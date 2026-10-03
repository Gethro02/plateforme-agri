import { formatFraicheur } from "../../utils/formatFraicheur";

export default function BadgeFraicheur({ date, afficherDate = false }) {
  const { texte, couleur } = formatFraicheur(date);

  return (
    <span className="inline-flex items-center gap-1 text-xs">
      <span className={`px-2 py-0.5 rounded font-medium ${couleur}`}>
        {texte}
      </span>
      {afficherDate && date && (
        <span className="text-gray-400">
          ({new Date(date).toLocaleDateString("fr-FR")})
        </span>
      )}
    </span>
  );
}