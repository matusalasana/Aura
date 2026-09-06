

export interface UserPayload {
  storeId: string;
  role: "admin" | "customer" | "support";
  userId: string
}