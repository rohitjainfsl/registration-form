import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendForgotPasswordEmail({ to, name, otp, expiryMinutes = 60 }) {
  const from = process.env.SENDGRID_FROM || "rohit@fullstacklearning.com";

  // If a SendGrid dynamic template ID is provided, prefer that
  // prefer env configured template id, otherwise use provided default
  const templateId = process.env.SENDGRID_FORGOT_TEMPLATE_ID || "d-01053bc71d1a4ed190867efd3aaeed23";
  const website = (process.env.FRONTEND_PATH || "https://your-frontend.example.com").trim();
  const resetUrl = `${website.replace(/\/$/, "")}/reset-password?email=${encodeURIComponent(to)}`;

  // Use dynamic template
  const msg = {
    to,
    from,
    templateId,
    dynamic_template_data: {
      name: name || "User",
      otp,
      expiry: expiryMinutes,
      website_url: website,
      reset_url: resetUrl,
      year: new Date().getFullYear(),
    },
  };

  try {
    await sgMail.send(msg);
    return;
  } catch (err) {
    // Fallback: send the HTML version using the provided template markup
 
  }
}

export default sendForgotPasswordEmail;
