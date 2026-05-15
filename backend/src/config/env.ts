import dotenv from "dotenv";
dotenv.config();

// Basic
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const REDIS_URL = process.env.REDIS_URL;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
export const SERVER_ORIGIN = process.env.SERVER_ORIGIN ||  "http://localhost:3000";

// Token secret 
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Token expiration 
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';

// Cookie expiration (refresh)
export const REFRESH_COOKIE_MAX_AGE = Number(process.env.REFRESH_COOKIE_MAX_AGE) || 1000*60*60*24*7;
export const ACCESS_COOKIE_MAX_AGE = Number(process.env.ACCESS_COOKIE_MAX_AGE) || 1000*60*15;

// Salt rounds
export const SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS) || 12;