import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar/Topbar";
import Footer from "../ui/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}