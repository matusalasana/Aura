import { createAuthClient } from "better-auth/react";

// Check if we are physically running in a browser
const isClient = typeof window !== "undefined";

const BASE_URL = import.meta.env.DEV
    ? "http://localhost:3000/api/auth"
    : isClient 
      ? `${window.location.origin}/api/auth` // 🌟 Forces an absolute string (https://...)
      : "https://aura-marketplace-v1-vercel.app"; // Hardcoded safety fallback for build engines

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});
v