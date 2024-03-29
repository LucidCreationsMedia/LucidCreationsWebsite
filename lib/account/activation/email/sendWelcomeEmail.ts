import nodemailer from "nodemailer";

// TODO: Theme the message and add the LCM and Potty Chart logo to the email.

const sendWelcomeEmail = (userEmail: string, name = "User"): void => {
  // Environment
  const environment = process.env.NODE_ENV || "development";

  const port: 465 | 587 = environment === "production" ? 465 : 587;

  const server = {
    host: process.env.SMTP_SERVER_HOST,
    port: port,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(server);

  const message = {
    from: `"Lucid Creations Media no-reply" <${process.env.EMAIL_FROM}>`,
    to: `${userEmail}`,
    subject: `Hello ${name}, welcome to the new LCM Website.`,
    html: `
    <div>
      <p>Hello ${name},</p>
      <p>You are receiving this email as a confirmation of your account activation and setup.</p>
    </div>
    `
  };

  transporter.sendMail(message);
};

export default sendWelcomeEmail;
