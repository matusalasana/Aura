export function verifyEmailTemplate(
  name: string,
  otp: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); margin: 20px; padding: 40px 30px;">
        <tr>
          <td style="text-align: center;">
            <!-- Header -->
            <h2 style="color: #1a1a2e; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">
              Hi ${name} 👋
            </h2>
            <p style="color: #5a5a7a; font-size: 16px; margin: 0 0 30px 0;">
              Thanks for signing up! Please verify your email address.
            </p>

            <!-- OTP Box -->
            <div style="background-color: #f0f4ff; border-radius: 10px; padding: 24px; margin: 0 0 30px 0; border: 1px solid #e0e8f5;">
              <p style="color: #5a5a7a; font-size: 14px; margin: 0 0 12px 0; letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500;">
                Your Verification Code
              </p>
              <h1 style="color: #2d2d5e; font-size: 42px; font-weight: 700; margin: 0; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </h1>
            </div>

            <!-- Expiry & Help -->
            <p style="color: #8a8aaa; font-size: 14px; margin: 0 0 6px 0;">
              ⏱️ This code expires in <strong style="color: #2d2d5e;">10 minutes</strong>
            </p>
            <p style="color: #8a8aaa; font-size: 13px; margin: 0 0 30px 0;">
              If you didn't request this, you can safely ignore this email.
            </p>

            <!-- Divider -->
            <hr style="border: none; border-top: 1px solid #e8ecf4; margin: 0 0 20px 0;">

            <!-- Footer -->
            <p style="color: #b0b0ca; font-size: 12px; margin: 0;">
              — Securely yours,<br>
              <strong style="color: #5a5a7a;">Aura</strong>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}