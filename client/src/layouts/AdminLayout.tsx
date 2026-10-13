import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/admin/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/utils/ScrollToTop";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
      <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}