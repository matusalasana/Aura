import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface ProtectedRoutesProps {
  role: string[];
}

const ProtectedRoutes = ({ role }: ProtectedRoutesProps) => {
  const { data: user, isLoading, isError } = useCurrentUser();

  // Handle error first
  if (isError) {
    return <Navigate to="/" replace />;
  }

  // Stylish, responsive loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-amber-500 border-gray-200 dark:border-gray-700"></div>
          <p className="mt-4 text-amber-600 dark:text-amber-400 font-semibold text-lg">
            Aura
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated or unauthorized
  if (!user || !role.length || !role.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
