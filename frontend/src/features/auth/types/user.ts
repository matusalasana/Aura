
export interface User {
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  avatar: boolean;
  role: "customer" | "vendor" | "admin" | "support";
  created_at: string;
  updated_at: string;
}