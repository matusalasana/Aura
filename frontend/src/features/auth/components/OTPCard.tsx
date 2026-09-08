import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";

interface OTPProps {
  onComplete?: (code: string) => void;
  email: string;
  type: string;
  onResend?: (email: string, type: string) => void;
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
  const isResendDisabled = resending || countdown > 0;

  const handleResend = () => {
    if (isResendDisabled) return;

    onResend(email, type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="card w-full max-w-sm space-y-6 p-8 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="heading text-2xl">
            Verify your email
          </h2>

          <p className="subheading text-sm">
            Enter the 6-digit code sent to your email{" "}
            <span className="font-medium text-content">
              {email.slice(0,2)}******@gmail.com
            </span>
          </p>
        </div>

        {/* OTP */}
        <div className="flex-center">
          <OTPInput
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={onComplete}
            containerClassName="otp-container"
            render={({ slots }) => (
              <div className="flex gap-2">
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`
                      flex h-11 w-11 items-center justify-center
                      rounded-lg border
                      bg-background
                      text-lg font-semibold
                      transition-all duration-200

                      ${
                        slot.isActive
                          ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                          : "border-border text-content"
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

        {/* Resend */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="muted">
            Didn't receive a code?
          </p>

          <button
            type="button"
            disabled={isResendDisabled}
            onClick={handleResend}
            className="link font-semibold disabled:pointer-events-none disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend"}
          </button>

          {countdown > 0 && (
            <span className="text-secondary tabular-nums">
              ({countdown}s)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPCard;