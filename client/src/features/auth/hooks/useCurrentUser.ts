import { authClient } from "@/lib/authClient";
import type { User } from "@/types/auth";

export const useCurrentUser = () => {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    user: (session?.user as User | undefined) ?? null,
    isLoading: isPending,
    error,
  };
};