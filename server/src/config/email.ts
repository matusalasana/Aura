
import nodemailer from "nodemailer";
import { Env } from "./env.js";
import logger from "@/utils/logger.js";

const isProduction = Env.NODE_ENV === "production";

export const transporter = nodemailer.createTransport(
  isProduction
    ? {
        host: Env.SMTP_HOST,
        port: Env.SMTP_PORT,
        secure: false, // STARTTLS on port 587
        auth: {
          user: Env.SMTP_USER,
          pass: Env.SMTP_PASS,
        },
      }
    : {
        host: Env.LOCAL_SMTP_HOST,
        port: Env.LOCAL_SMTP_PORT,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
);

try {
  await transporter.verify();
  logger.info(
    isProduction
      ? "Gmail SMTP connection successful"
      : "Local SMTP connection successful",
  );
} catch (error) {
  logger.error("SMTP connection failed:", error);
}
