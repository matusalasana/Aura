import dotenv from "dotenv";
dotenv.config();

// Basic
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// REDIS
const REDIS_URL = process.env.REDIS_URL;

// ORIGINS
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const SERVER_ORIGIN = process.env.SERVER_ORIGIN ||  "http://localhost:3000";

// Token secret 
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Token expiration 
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';

// Cookie expiration (refresh)
const REFRESH_COOKIE_MAX_AGE = Number(process.env.REFRESH_COOKIE_MAX_AGE) || 1000*60*60*24*7;
const ACCESS_COOKIE_MAX_AGE = Number(process.env.ACCESS_COOKIE_MAX_AGE) || 1000*60*15;

// Salt rounds
const SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS) || 12;

// Cloudinary image management
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const Env = {
  DATABASE_URL,
  NODE_ENV,
  PORT,
  
  REDIS_URL,
  
  CLIENT_ORIGIN,
  SERVER_ORIGIN,
  
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  
  REFRESH_COOKIE_MAX_AGE,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  
  SALT_ROUNDS,
  
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  
};