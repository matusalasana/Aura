import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { loggerMiddleware } from './middleware/logger.middleware';
import routes from "./routes/index";
// import {
//   CLIENT_ORIGIN,
//   SERVER_ORIGIN
// } from "./config/env";

export const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const allowedOrigins = [
  "http://localhost:5173",
  "localhost:3000",
];

// Security & Base Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, mobile apps, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(loggerMiddleware);

// Rate Limiter
app.use('/api/v1', limiter);

// API Routes
app.use("/api/v1", routes)
