import { useState } from "react";

export default function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pour l'instant, pas de backend — on simule l'envoi
    // Plus tard : appel API ou service comme Formspree
    console.log({ nom, email, sujet, message });

    setEnvoye(true);
    setNom("");
    setEmail("");
    setSujet("");
    setMessage("");

    // Retirer le message de succès après 5 secondes
    setTimeout(() => setEnvoye(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          📬 Contact
        </h1>
        <p className="text-gray-600">
          Une question, une suggestion, un bug à signaler ?
        </p>
      </header>

      {envoye && (
        <div className="bg-green-50 border-l-4 border-green-600 text-green-800 p-4 rounded mb-6">
          ✓ Merci, ton message a bien été pris en compte. On te répondra
          rapidement.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ton nom
          </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex : Jean Mbarga"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ton email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sujet
          </label>
          <select
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Choisir un sujet…</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug">Signaler un bug</option>
            <option value="partenariat">Partenariat</option>
            <option value="donnees">Contribuer des données de prix</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ton message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décris ta demande…"
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-lg transition"
        >
          Envoyer le message
        </button>
      </form>

      <section className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Autres moyens de contact
        </h2>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>
            📧 Email :{" "}
            <a
              href="mailto:contact@plateforme-agri.cm"
              className="text-green-700 hover:underline"
            >
              contact@plateforme-agri.cm
            </a>
          </li>
          <li>
            📞 Téléphone :{" "}
            <a
              href="tel:+237677000000"
              className="text-green-700 hover:underline"
            >
              +237 677 00 00 00
            </a>
          </li>
          <li>📍 Banganté, région de l'Ouest, Cameroun</li>
        </ul>
      </section>
    </div>
  );
}