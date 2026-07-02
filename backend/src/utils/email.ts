import { transporter } from "../config/email";
import nodemailer from "nodemailer";
import { Env } from "../config/env";

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
    from: Env.EMAIL_FROM,
    to,
    subject,
    html: template,
  });
  
  console.log("Message sent:", info.messageId);
}