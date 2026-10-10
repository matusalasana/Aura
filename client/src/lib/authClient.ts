import { createAuthClient } from "better-auth/react";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : import.meta.env.VITE_AUTH_API_URL;

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});