import { useState, useEffect, type ReactNode } from "react"
import { getAccessToken } from "@/utils/token";
import { useRefresh } from "../features/auth/hooks/useRefresh";

export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const { mutateAsync: refresh } = useRefresh();

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!getAccessToken()) {
        try {
          await refresh();
        } catch {
          // Refresh failed
        }
      }
  
      setInitialized(true);
    };
  
    init();
  }, [refresh]);

  if (!initialized) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
            Aura
          </h1>

          <p className="mt-2 text-sm tracking-[0.3em] uppercase text-base-content/50">
            Elevate Your Aura
          </p>
        </div>

        {/* Spinner */}
        <div className="flex items-center gap-3">
          <span className="loading loading-spinner loading-md text-primary" />
          <span className="text-sm text-base-content/60">
            Securing your session...
          </span>
        </div>
      </div>
    </div>
  );
}

  return children;
}