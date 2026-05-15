import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  try {
    // If no credentials, log to console (Dev mode)
    if (!process.env.EMAIL_SERVER_USER) {
      console.log('--- MOCK EMAIL SEND ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log('-----------------------');
      return { success: true, mock: true };
    }

    const info = await transporter.sendMail({
      from: `"HiAn Luxury Agent" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Send Email error:', error);
    throw error;
  }
};
