import { createAuthClient } from "better-auth/react";

// better-auth requires an absolute URL; a relative "/api/auth" throws "Invalid base URL".
// In production, requests go to the same origin and are proxied by vercel.json rewrites.
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/auth"
  : `${window.location.origin}/api/auth`;

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});