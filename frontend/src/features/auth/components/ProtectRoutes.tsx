import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";

const ProtectRoutes = () => {
  const { data: user, isLoading, isError } = useGetMe();

  if (isLoading) {
    return (
      <div className="p-8 text-2xl font-medium">
        Loading user profile...
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
