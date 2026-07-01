import nodemailer from "nodemailer";
import { Env } from "./env";

const isProduction = Env.NODE_ENV === "production";

export const transporter = nodemailer.createTransport({
  host: isProduction
    ? "smtp-relay.brevo.com"
    : "smtp.gmail.com",

  port: isProduction ? 587 : 465,

  secure: isProduction ? false : true,

  auth: {
    user: isProduction
      ? Env.SMTP_USER
      : Env.TEST_USER,

    pass: isProduction
      ? Env.SMTP_PASS
      : Env.TEST_PASS,
  },
});