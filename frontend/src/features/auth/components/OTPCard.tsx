import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";

interface OTPProps {
  onComplete: (code: string) => void;
  email: string;
  type: string;
  onResend: (email: string, type: string) => void
  resending: boolean;
  countdown: number;
}


const OTPCard = ({
  onComplete, 
  email, 
  type, 
  onResend, 
  resending,
  countdown,
}: OTPProps) => {
  
  const canResend = resending;
  
  const handleResend = () => {
    onResend(email, type);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Enter the 6-digit code sent to your email {email}
          </p>
        </div>

        <div className="flex justify-center mb-6">
        
          <OTPInput
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={onComplete} 
            containerClassName="otp-container"
            render={({ slots }) => (
              <div style={{ display: "flex", gap: "8px" }}>
                {slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex h-11 w-11 items-center justify-center rounded-lg
                      border text-lg font-semibold transition-all
                      ${
                        slot.isActive
                          ? "border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-500/20 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-300"
                          : "border-zinc-300 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      }
                    `}
                  >
                    {slot.char}
                  </div>
                ))}
              </div>
            )}
          />
          
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="text-zinc-500 dark:text-zinc-400">
            Didn't receive a code?
          </p>
          <button
            disabled={canResend}
            onClick={handleResend}
            className="font-semibold text-amber-600 hover:text-amber-700 disabled:text-amber-300 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Resend
          </button>
          <span className="text-zinc-400 dark:text-zinc-600 ml-1">
            {
              countdown > 0 ? countdown : ""
            }</span>
        </div>
      </div>
    </div>
  );
};

export default OTPCard;
