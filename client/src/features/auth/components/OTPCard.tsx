import { useState } from "react";
import { RefreshCwIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function OTPCard({
  open,
  email,
  onClickVerify,
  isPending,
  onOpenChange,
}: OTPCardProps) {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    onClickVerify(otp);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md relative">
        <DialogHeader>
          <DialogTitle>Verify your login</DialogTitle>

          <DialogDescription>
            Enter the verification code we sent to your email address:
            <span className="ml-1 font-medium">
              {email.slice(0,2)}***@example.com
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogClose 
          className="absolute top-1 right-1"
          render={ 
            <Button variant="ghost">
              <XIcon className="size-4"/>
            </Button>
          } 
        />

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
          </div>

          <InputOTP
            maxLength={6}
            id="otp-verification"
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />

            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>

          </InputOTP>

          <FieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>

        <Field>
          <Button
            disabled={isPending || otp.length !== 6}
            onClick={handleVerify}
            type="button"
            className="w-full"
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>

          <Button
            disabled={isPending || otp.length !== 6}
            variant="outline" 
            size="xs"
          >
              <RefreshCwIcon />
              Resend Code
            </Button>

          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </DialogContent>
    </Dialog>
  );
}