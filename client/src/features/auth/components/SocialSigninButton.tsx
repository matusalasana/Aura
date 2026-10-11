import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSocialSignin } from "@/features/auth/hooks/useSocialSignin";

const SocialSigninButton = () => {
  const { mutate: signinWithSocial, isPending } = useSocialSignin();

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-3 rounded-xl"
      disabled={isPending}
      onClick={() => signinWithSocial("google")}
      aria-busy={isPending}
    >
      {isPending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <img
          src="/images/google.svg"
          alt=""
          aria-hidden="true"
          className="size-5 object-contain"
        />
      )}

      <span>
        {isPending
          ? "Continuing with Google..."
          : "Continue with Google"}
      </span>
    </Button>
  );
};

export default SocialSigninButton;