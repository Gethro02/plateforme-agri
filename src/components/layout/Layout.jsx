import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pb-12">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-300 text-sm text-center py-4">
        Plateforme Agricole Cameroun — Phase pilote Banganté · {new Date().getFullYear()}
      </footer>
    </div>
  );
}