import "./instrument.js";

import * as Sentry from "@sentry/node";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
  
import { loggerMiddleware } from './middleware/logger.js';
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { authHandler } from "@/modules/auth/auth.routes.js";
import { Env } from "@/config/env.js";
import { sendEmail } from "@/utils/email.js";
import { welcomeTemplate } from "@/templates/welcome.js"


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
app.use('/api', limiter);

// API Routes
app.all("/api/auth/{*any}", authHandler);
app.use("/api/v1", routes);
app.get("/email", async(req, res) => {
  await sendEmail({
    to: "matusalasana@gmail.com",
    subject: "Test",
    template: welcomeTemplate({
      name: "Sana",
      dashboardLink: "gghh"
    })
  })
})

// Error handlers
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler)