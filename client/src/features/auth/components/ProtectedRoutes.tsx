import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface ProtectedRoutesProps {
  roles: string[];
}

const ProtectedRoutes = ({ roles }: ProtectedRoutesProps) => {
  const { user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <LoaderCircle className="size-7 animate-spin text-primary" />
          </div>

          <div className="space-y-1 text-center">
            <p className="text-lg font-bold tracking-tight">Aura</p>
            <p className="text-sm text-muted-foreground">
              Securing your page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/" replace />;
  }

  if (!roles.length || !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;