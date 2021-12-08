import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { emailTemplate } from "../mailTemplates/templates.js";

dotenv.config({ path: "./backend/config/.env" });

const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAILER_HOST,
  port: process.env.NODE_MAILER_PORT,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_USER_PASSWORD,
  },
});

const sendEmail = async (recipientEmail, subject, payload, template) => {
  const htmlTemplate = emailTemplate(template, payload);
  try {
    const mailSent = await transporter.sendMail({
      from: `"${process.env.WEBSITE_NAME}" <${process.env.NODE_MAILER_USER}>`,
      to: recipientEmail,
      subject: `${process.env.WEBSITE_NAME} ${subject}`,
      html: htmlTemplate,
    });

    console.log(`mail sent, messageID: ${mailSent.messageId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// sendEmail(
//   "earlbalageo@gmail.com",
//   "Password Reset",
//   "www.facebook.com",
//   "passwordReset"
// ).then(console.log("sent"));

export default sendEmail;
