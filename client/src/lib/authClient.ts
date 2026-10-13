import { createAuthClient } from "better-auth/react";

const BASE_URL = import.meta.env.DEV
    ? "http://localhost:3000/api/auth"
    : "/api/auth";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});