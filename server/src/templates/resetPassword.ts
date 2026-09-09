export function resetPasswordTemplate({
  name,
  resetLink
}: {
  name: string,
  resetLink: string
}) {
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
            <div style="margin-bottom: 6px; font-size: 40px;">🔐</div>
            <h2 style="color: #1a1a2e; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">
              Password Reset
            </h2>
            <p style="color: #5a5a7a; font-size: 16px; margin: 0 0 6px 0;">
              Hi ${name},
            </p>
            <p style="color: #5a5a7a; font-size: 15px; margin: 0 0 28px 0; line-height: 1.6;">
              We received a request to reset your password. Click the button below to create a new one.
            </p>

            <!-- Reset Button -->
            <a href="${resetLink}" style="display: inline-block; background-color: #2d2d5e; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 8px; margin: 0 0 28px 0; box-shadow: 0 2px 8px rgba(45, 45, 94, 0.25);">
              Reset Password
            </a>

            <!-- Fallback Link -->
            <div style="background-color: #f8f9fc; border-radius: 8px; padding: 16px; margin: 0 0 28px 0; border: 1px dashed #d0d5e0;">
              <p style="color: #5a5a7a; font-size: 13px; margin: 0 0 6px 0;">
                Or copy this link into your browser:
              </p>
              <p style="color: #2d2d5e; font-size: 13px; margin: 0; word-break: break-all; font-family: 'Courier New', monospace; background-color: #ffffff; padding: 8px 12px; border-radius: 4px; border: 1px solid #e8ecf4;">
                ${resetLink}
              </p>
            </div>

            <!-- Security Notice -->
            <div style="background-color: #fff8f0; border-left: 3px solid #f5a623; padding: 12px 16px; margin: 0 0 30px 0; text-align: left; border-radius: 4px;">
              <p style="color: #8a7a5a; font-size: 13px; margin: 0; line-height: 1.5;">
                ⚠️ This link expires in <strong>1 hour</strong>. If you didn't request this, please ignore this email or <a href="#" style="color: #2d2d5e;">contact support</a>.
              </p>
            </div>

            <!-- Divider -->
            <hr style="border: none; border-top: 1px solid #e8ecf4; margin: 0 0 20px 0;">

            <!-- Footer -->
            <p style="color: #b0b0ca; font-size: 12px; margin: 0;">
              For security, never share this link with anyone.<br>
              <strong style="color: #5a5a7a;">Your App Team</strong>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}