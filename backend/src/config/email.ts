import nodemailer from "nodemailer";
import { Env } from "./env";


export const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST,
  port: Env.SMTP_PORT,
  secure: false,
  tls: {
    // Prevent nodemailer from failing on missing or self-signed certs
    rejectUnauthorized: false
  }
});