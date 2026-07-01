import { transporter } from "@/config/mail";
import { Env } from "@/config/env";

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  await transporter.sendMail({
    from: Env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}