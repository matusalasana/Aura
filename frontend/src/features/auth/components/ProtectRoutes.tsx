import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";

const ProtectRoutes = () => {
  const { data: user, isLoading, isError } = useGetMe();

  // Handle error first (more predictable)
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden">
        {/* soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 blur-3xl" />

        <div className="z-10 flex flex-col items-center gap-6 text-center">
          {/* Spinner */}
          <span className="loading loading-spinner loading-lg text-primary"></span>

          {/* Brand */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
              Aura
            </h1>
              <p className="text-[11px] text-base-content opacity-50 tracking-widest">
              Wear It. Live It. Own Your Aura.
          </p>
          </div>

        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;