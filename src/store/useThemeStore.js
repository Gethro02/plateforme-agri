import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "clair", // "clair" | "sombre"

      toggleTheme: () => {
        const nouveau = get().theme === "clair" ? "sombre" : "clair";
        set({ theme: nouveau });
        appliquerTheme(nouveau);
      },

      setTheme: (theme) => {
        set({ theme });
        appliquerTheme(theme);
      },

      initialiser: () => {
        const theme = get().theme;
        appliquerTheme(theme);
      },
    }),
    {
      name: "plateforme-agri-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          appliquerTheme(state.theme);
        }
      },
    }
  )
);

function appliquerTheme(theme) {
  if (typeof document === "undefined") return;
  const racine = document.documentElement;
  if (theme === "sombre") {
    racine.classList.add("dark");
  } else {
    racine.classList.remove("dark");
  }
}