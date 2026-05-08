import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";

const ProtectRoutes = () => {
  const { data: user, isLoading, isError } = useGetMe();

  // ERROR → redirect
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  // LOADING UI
  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-white to-purple-200/20 blur-3xl dark:from-blue-900/20 dark:via-gray-950 dark:to-purple-900/20" />

        <div className="z-10 flex flex-col items-center gap-6 text-center">
          
          {/* Spinner (Tailwind only) */}
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>

          {/* Brand */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Aura
            </h1>

            <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400">
              Wear It. Live It. Own Your Aura.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // NOT AUTHENTICATED
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;