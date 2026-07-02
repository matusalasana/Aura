import { Outlet } from "react-router-dom";
import Navbar from "../components/admin/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}