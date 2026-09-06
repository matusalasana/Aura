import "./instrument";

import * as Sentry from "@sentry/node";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
  
import { loggerMiddleware } from './middleware/logger';
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes/index";
import { resolveTenant } from "./middleware/resolveTenant"
import { Env } from "@/config/env";



export const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const allowedOrigins = [
  Env.CLIENT_ORIGIN,
  Env.SERVER_ORIGIN,
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
app.use("/api/v1", resolveTenant, routes)

// Error handlers
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler)