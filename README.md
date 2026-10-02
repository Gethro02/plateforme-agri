# 🌾 Plateforme Agricole Cameroun

Plateforme de mise en relation entre producteurs agricoles et acheteurs au Cameroun, avec transparence des prix en unités locales (sac, seau, bol).

## 🎯 Problème

Les producteurs agricoles camerounais ne trouvent pas d'acheteurs et ne connaissent pas les vrais prix de leurs produits. Exemple : une productrice de curcuma à Banganté ne sait pas à qui vendre, ni à quel prix.

## 💡 Solution

Une plateforme qui :
- Répertorie les producteurs et les acheteurs par région et par produit
- Affiche les prix **en unités locales** (sac pour le maïs, seau pour le haricot, bol pour l'arachide)
- Compare les prix entre marchés et régions
- Fonctionne par SMS pour les zones sans internet

## 🗺️ Stratégie géographique

- **Phase pilote** : Banganté (région Ouest, zone des hauts plateaux)
- **Extension** : Nord-Ouest, Littoral, Adamaoua

## 🌽 Produits couverts (MVP)

| Produit | Variétés | Unité principale |
|---|---|---|
| Maïs | Blanc, Jaune | Sac |
| Haricot | Rouge, Blanc | Seau 15L |
| Arachide | En coque, Décortiquée | Bol |
| Gingembre | Frais | Tas |
| Riz | Local | Sac 50kg |
| Curcuma | Séché | Sac |
| Huile de palme | Artisanale | Litre |

## 🛠️ Stack technique

- **React.js** (Vite)
- **Tailwind CSS**
- **React Router** (navigation)
- **Zustand** (état global)
- **TanStack Query** (cache API)
- **Axios** (requêtes HTTP)
- **React Hook Form** (formulaires)

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/Gethro02/plateforme-agri.git
cd plateforme-agri

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev