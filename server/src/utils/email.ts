import { transporter } from "@/config/email.js";
import nodemailer from "nodemailer";
import { Env } from "@/config/env.js";

export const sendEmail = async ({
  to,
  subject,
  template
}: {
  to: string,
  subject: string,
  template: string
}) => {
  const info = await transporter.sendMail({
    from: Env.NODE_ENV === "production" ? Env.SMTP_FROM : Env.LOCAL_EMAIL_SENDER,
    to,
    subject,
    html: template,
  });
  
  console.log("Message sent:", info.messageId);
}