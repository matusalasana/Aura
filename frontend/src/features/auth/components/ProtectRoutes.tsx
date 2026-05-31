import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";
import { Loader2 } from "lucide-react"; // Imported for visual consistency

const ProtectRoutes = () => {
  const { data: user, isLoading, isError } = useGetMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
        </div>
      </div>
    );
  }

  // Redirect to login if request threw an error or user data came back empty
  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
