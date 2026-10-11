import { useNavigate } from "react-router-dom";
import { LogOut, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSignout } from "@/features/auth/hooks/useSignout";

const SignoutButton = () => {
  const navigate = useNavigate();
  const { mutate: signoutUser, isPending } = useSignout();

  const handleSignout = () => {
    signoutUser(undefined, {
      onSuccess: () => navigate("/sign-in"),
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={handleSignout}
      aria-busy={isPending}
      className="w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
    >
      {isPending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          Singing out...
        </>
      ) : (
        <>
          <LogOut className="size-4" />
          Signout
        </>
      )}
    </Button>
  );
};

export default SignoutButton;