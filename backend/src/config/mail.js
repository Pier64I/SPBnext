import nodemailer from "nodemailer";

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

export const mailer = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  : null;

export async function sendMail({ to, subject, text, html }) {
  if (!mailer) {
    console.info("[mail disabled]", { to, subject });
    return;
  }

  await mailer.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html
  });
}
