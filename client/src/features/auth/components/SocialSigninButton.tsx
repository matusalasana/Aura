import { useSocialSignin } from "@/features/auth/hooks/useSocialSignin"

const SocialSigninButton = () => {
  const { mutate: signinWithSocial, isPending } = useSocialSignin();
  
  return (
    <div>
      <button
          onClick={() => signinWithSocial("google")}
          disabled={isPending}
          className="btn btn-secondary w-full space-x-2"
          type="button"
        >
         <img 
           src="images/google.svg" 
           alt="google logo"
           className="w-5 h-5 rounded"
          /> 
          <p className="text-accent">
            {isPending 
              ? "Continuing with Google ..." 
              : "Continue with Google " }
          </p>
        </button>
    </div>
  )
}

export default SocialSigninButton