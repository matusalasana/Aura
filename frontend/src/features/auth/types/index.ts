
export type UserRole =
  | "customer"
  | "vendor"
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  avatar?: string | null;
  role: UserRole,
  created_at: string;
  updated_at: string;
}

export interface RegisterCustomerInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterVendorInput {
  name: string;
  email: string;
  password: string;

  store_name: string;
  description?: string;

  logo?: File;
  banner?: File;
  license?: File;
}


export interface LoginInput {
  email: string;
  password: string;
}

/* ========================= VERIFY EMAIL ========================= */

export interface VerifyEmailInput {
  email: string;
  otp: string;
}

/* ========================= FORGOT PASSWORD ========================= */

export interface ForgotPasswordInput {
  email: string;
}

/* ========================= RESET PASSWORD ========================= */

export interface ResetPasswordInput {
  email: string;
  otp: string;
  password: string;
}

/* ========================= RESEND OTP ========================= */

export interface ResendOTPInput {
  email: string;
}

/* ========================= RESPONSES ========================= */

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse extends AuthResponse {
  accessToken: string;
  user: User;
}

export interface VerifyEmailResponse extends AuthResponse {
  accessToken: string;
  user: User;
}

export interface GetMeResponse {
  success: boolean;
  user: User;
}