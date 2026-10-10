
export type UserRole = "admin" | "customer" | "vendor";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};