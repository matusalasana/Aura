import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000"
    : window.location.origin,
});