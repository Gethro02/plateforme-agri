import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.jsx";

// Enregistrement du Service Worker (PWA)
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("Nouvelle version disponible — rechargez la page");
  },
  onOfflineReady() {
    console.log("App prête à fonctionner hors ligne");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);