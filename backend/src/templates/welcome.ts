export function welcomeTemplate(
  name: string,
  dashboardLink: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); margin: 20px; padding: 40px 30px 30px;">
        <tr>
          <td style="text-align: center;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #2d2d5e 0%, #4a4a8a 100%); border-radius: 10px; padding: 30px 20px; margin: 0 0 24px 0;">
              <div style="font-size: 48px; margin-bottom: 8px;">🎉</div>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 4px 0;">
                Welcome aboard, ${name}!
              </h1>
              <p style="color: #c8c8e8; font-size: 15px; margin: 0; font-weight: 400;">
                We're thrilled to have you with us
              </p>
            </div>

            <!-- Message -->
            <p style="color: #5a5a7a; font-size: 15px; line-height: 1.7; margin: 0 0 6px 0; text-align: left;">
              Thanks for joining <strong style="color: #2d2d5e;">Your App</strong>! We've built this platform to help you <strong style="color: #2d2d5e;">achieve more</strong>, and we can't wait to see what you'll accomplish.
            </p>

            <!-- Quick Start -->
            <div style="background-color: #f0f4ff; border-radius: 10px; padding: 20px; margin: 24px 0; text-align: left;">
              <p style="color: #2d2d5e; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">
                🚀 Quick Start Guide
              </p>
              <div style="display: table; width: 100%;">
                <div style="display: table-row;">
                  <span style="display: table-cell; width: 28px; color: #4a4a8a; font-weight: 600;">1.</span>
                  <span style="display: table-cell; color: #5a5a7a; font-size: 14px; padding-bottom: 8px;">Complete your profile</span>
                </div>
                <div style="display: table-row;">
                  <span style="display: table-cell; width: 28px; color: #4a4a8a; font-weight: 600;">2.</span>
                  <span style="display: table-cell; color: #5a5a7a; font-size: 14px; padding-bottom: 8px;">Explore the dashboard</span>
                </div>
                <div style="display: table-row;">
                  <span style="display: table-cell; width: 28px; color: #4a4a8a; font-weight: 600;">3.</span>
                  <span style="display: table-cell; color: #5a5a7a; font-size: 14px;">Join our community</span>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            <a href="${dashboardLink}" style="display: inline-block; background-color: #2d2d5e; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 48px; border-radius: 8px; margin: 0 0 24px 0; box-shadow: 0 2px 8px rgba(45, 45, 94, 0.25);">
              Go to Dashboard →
            </a>

            <!-- Social Links (optional) -->
            <div style="margin: 0 0 24px 0;">
              <p style="color: #b0b0ca; font-size: 13px; margin: 0 0 10px 0;">
                Stay connected
              </p>
              <div style="display: flex; justify-content: center; gap: 12px; font-size: 20px;">
                <a href="#" style="display: inline-block; color: #5a5a7a; text-decoration: none; width: 36px; height: 36px; line-height: 36px; background-color: #f0f4ff; border-radius: 50%;">🛒</a>
                <a href="#" style="display: inline-block; color: #5a5a7a; text-decoration: none; width: 36px; height: 36px; line-height: 36px; background-color: #f0f4ff; border-radius: 50%;">🛍️</a>
                <a href="#" style="display: inline-block; color: #5a5a7a; text-decoration: none; width: 36px; height: 36px; line-height: 36px; background-color: #f0f4ff; border-radius: 50%;">📱</a>
              </div>
            </div>

            <!-- Divider -->
            <hr style="border: none; border-top: 1px solid #e8ecf4; margin: 0 0 18px 0;">

            <!-- Footer -->
            <p style="color: #b0b0ca; font-size: 12px; margin: 0; line-height: 1.6;">
              Need help? Check our <a href="#" style="color: #2d2d5e; text-decoration: none;">FAQ</a> or <a href="#" style="color: #2d2d5e; text-decoration: none;">contact support</a>.<br>
              <strong style="color: #5a5a7a;">Aura Team</strong> ❤️
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}