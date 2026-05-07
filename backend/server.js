import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', chatRoutes);

// SMTP Transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// SMTP Check
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error);
  } else {
    console.log("✅ SMTP Ready");
  }
});

// 🔒 HARD LOCKED RECEIVER EMAIL
const ADMIN_EMAIL = "info@immigrationlaw.org.uk";

// Route
app.post('/api/assessment', async (req, res) => {
  const { fullName, email, phone, visaCategory, message, canPay } = req.body;

  if (!fullName || !email || !visaCategory) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userEmail = email?.trim().toLowerCase();

    console.log("📩 Fixed Admin Email:", ADMIN_EMAIL);
    console.log("📩 User Email:", userEmail);

    // -------------------------
    // ADMIN LEAD EMAIL (LOCKED)
    // -------------------------
    const leadMail = {
      from: `"Lead System" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, // 🔒 ONLY THIS EMAIL
      replyTo: userEmail,
      subject: `New Lead: ${fullName} - ${visaCategory}`,
      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${userEmail}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Visa:</b> ${visaCategory}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
        <p><b>Can Pay:</b> ${canPay || "N/A"}</p>
      `
    };

    // -------------------------
    // USER CONFIRMATION EMAIL
    // -------------------------
    const userMail = {
  from: `"immigrationlaw.org.uk" <${process.env.SMTP_USER}>`,
  to: userEmail,
  subject: "Inquiry Received",
  html: `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 500px; margin: auto; border: 1px solid #eee;">

      <!-- Top Header -->
      <div style="background-color: #3663EB; padding: 20px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">Thank You, ${fullName}</h2>
      </div>

      <div style="padding: 20px; text-align: center;">

        <!-- SVG Icon -->
        <div style="margin-bottom: 15px;">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#3663EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18"></path>
            <path d="M5 7h14"></path>
            <path d="M5 17h14"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>

        <p style="margin: 0 0 8px;">
          Your inquiry for <strong>${visaCategory}</strong> has been received.
        </p>

        <p style="margin: 0 0 20px; color: #555;">
          Our team will contact you within 24 hours.
        </p>

        <p style="font-size: 14px; color: #888; margin: 0;">
          Best Regards<br>Immigrationlaw
        </p>

      </div>
    </div>
  `
};

    // SEND EMAILS
    const leadResult = await transporter.sendMail(leadMail);
    console.log("✅ Lead Email Sent:", leadResult.messageId);

    const userResult = await transporter.sendMail(userMail);
    console.log("✅ User Email Sent:", userResult.messageId);

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully"
    });

  } catch (error) {
    console.error("❌ Email System Error:", error);
    return res.status(500).json({
      success: false,
      error: "Email sending failed"
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});