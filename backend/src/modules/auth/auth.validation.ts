import { z } from 'zod';


const RoleEnum = z.enum([
  "customer", "vendor", "admin", "support"
]);

const TypeEnum = z.enum([
  "verify_email", "reset_password"
]);




export const registerCustomerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});


export const userPayloadSchema = z.object({
  userId: z.string().uuid().min(1),
  sessionId: z.string().uuid().min(1),
  role: RoleEnum,
});

export const resetPasswordSchema = z.object({
  email: z.string().email().trim(),
  otp: z.string().min(6),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const resendOTPSchema = z.object({
  email: z.string().email().trim(),
  type: TypeEnum,
});




export type RegisterCustomerDBInput = {
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  role: Role;
};

export type OTPType = z.infer<typeof TypeEnum>;

export type Role = z.infer<typeof RoleEnum>;

export type UserPayload = z.infer<typeof userPayloadSchema>;

export type RegisterCustomerInput = z.infer<typeof registerCustomerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type ResendOTPInput = z.infer<typeof resendOTPSchema>;