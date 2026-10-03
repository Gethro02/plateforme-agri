import { useState, useEffect } from "react";

export default function BoutonInstallation() {
  const [promptInstall, setPromptInstall] = useState(null);
  const [installe, setInstalle] = useState(false);

  useEffect(() => {
    // Détecter si déjà installée
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalle(true);
      return;
    }

    // Capturer l'événement beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalle(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstaller = async () => {
    if (!promptInstall) return;
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === "accepted") {
      setInstalle(true);
    }
    setPromptInstall(null);
  };

  // Ne rien afficher si déjà installée ou si le navigateur ne propose pas l'installation
  if (installe || !promptInstall) return null;

  return (
    <button
      onClick={handleInstaller}
      className="bg-white text-green-800 hover:bg-green-50 font-medium px-3 py-1 rounded text-xs transition shadow"
      title="Installer l'application sur votre appareil"
    >
      ⬇ Installer l'app
    </button>
  );
}