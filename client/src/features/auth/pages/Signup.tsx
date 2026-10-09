import { Navigate } from "react-router-dom";
import SignupForm from '@/features/auth/components/SignupForm';
import OTPCard from '@/features/auth/components/OTPCard';
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useSignupFlow } from "@/features/auth/hooks/useSignupFlow";

const Signup = () => {
  const { data: user, isLoading } = useCurrentUser();
  
  const { 
    step,
    setStep,
    data,
    startSignup,
    verifySignupOTP,
    sending,
    verifying,} = useSignupFlow();
  
    if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      {step === "form" && (
        <SignupForm
          onClickSubmit={(formData) => startSignup(formData)}
          isPending={sending}
        />
      )}

      {step === "otp" && (
        <OTPCard
          email={data.email}
          open={step === "otp"}
          onOpenChange={() => setStep("form")}
          isPending={verifying}
          onClickVerify={verifySignupOTP}
        />
      )}
    </main>
  )
}

export default Signup