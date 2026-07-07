
export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  avatar?: string | null;
  role: "customer" | "vendor" | "admin" | "support";
  created_at: string;
  updated_at: string;
}