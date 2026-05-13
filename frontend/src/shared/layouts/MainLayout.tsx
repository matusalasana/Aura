import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar/Topbar";
import Footer from "../ui/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-zinc-900 dark:text-zinc-200">
      <Topbar />

      <main className="flex-grow pt-18">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}