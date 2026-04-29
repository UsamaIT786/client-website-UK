import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

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
      from: `"Company Team" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: "We received your inquiry",
      html: `
        <h2>Thank you ${fullName}</h2>
        <p>We received your request for <b>${visaCategory}</b>.</p>
        <p>Our team will contact you within 24 hours.</p>
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