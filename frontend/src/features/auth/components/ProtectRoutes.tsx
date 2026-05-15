import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";

const ProtectRoutes = () => {
  const { data: user, isLoading } = useGetMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;