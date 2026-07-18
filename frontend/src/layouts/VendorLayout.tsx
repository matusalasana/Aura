import { Outlet } from "react-router-dom";
import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorTopbar from "@/components/layout/VendorTopbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/utils/ScrollToTop";

const VendorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-zinc-900">
      <VendorTopbar />
      <VendorSidebar />

      <main className="flex-1">
      <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default VendorLayout