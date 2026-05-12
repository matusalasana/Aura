import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../../profile/hooks/useGetMe";

const ProtectRoutes = () => {
  const { data: user, isLoading, isError } = useGetMe();

  // Handle error first (more predictable)
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="text-2xl">
        Loading...
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