import {
  REFRESH_COOKIE_MAX_AGE,
  NODE_ENV
} from "./env";

export const refreshCookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax' as const,
  maxAge: Number(REFRESH_COOKIE_MAX_AGE),
};