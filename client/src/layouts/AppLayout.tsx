import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/app/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "../utils/ScrollToTop";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-foreground">
      <Navbar />

      <main className="flex-1">
      <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}