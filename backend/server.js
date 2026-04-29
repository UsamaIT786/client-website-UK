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
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error) => {
  if (error) console.error('❌ SMTP Error:', error);
  else console.log('✅ SMTP Ready to send');
});

// Route: POST /api/assessment
app.post('/api/assessment', async (req, res) => {
  const { fullName, email, phone, visaCategory, message, canPay } = req.body;

  if (!fullName || !email || !visaCategory) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // -------------------------------------------------------------------------
    // RECIPIENT SETTING (PULLS FROM .ENV)
    // -------------------------------------------------------------------------
    const adminRecipient = process.env.RECEIVER_EMAIL; 
    const userRecipient = String(email).trim().toLowerCase();

    if (!adminRecipient) {
      console.error('❌ ERROR: RECEIVER_EMAIL is not defined in .env');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log(`[ROUTING] Inquiry detected. Sending Lead strictly to: ${adminRecipient}`);

    // 1. LEAD NOTIFICATION (Admin Only)
    const leadMailOptions = {
      from: `"Lead Alert System" <${process.env.SMTP_USER}>`,
      to: adminRecipient,
      replyTo: userRecipient,
      subject: `[NEW LEAD] ${fullName} - ${visaCategory}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #2563eb; border-radius: 10px;">
          <h2 style="color: #2563eb; margin-top: 0;">New Assessment Lead</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${userRecipient}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Visa Category:</strong> ${visaCategory}</p>
          <p><strong>Can Pay:</strong> ${canPay || 'Not specified'}</p>
          <p><strong>Message:</strong><br>${message || 'No message'}</p>
          <hr>
          <p style="font-size: 10px; color: #999;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    // 2. USER CONFIRMATION (User Only)
    const confirmationMailOptions = {
      from: `"Immigration Law Experts" <${process.env.SMTP_USER}>`,
      to: userRecipient,
      subject: `Confirmation: We Received Your Inquiry`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #2563eb; font-size: 20px;">IMMIGRATION LAW EXPERTS</h1>
          <p>Dear ${fullName},</p>
          <p>Thank you for your inquiry regarding <strong>${visaCategory}</strong>.</p>
          <p>Our senior legal consultants will review your details and contact you within 24 business hours.</p>
          <br>
          <p>Best Regards,<br>The Assessment Team</p>
        </div>
      `
    };

    // 3. EXECUTE SENDING WITH DELAY
    console.log(`[1/2] Sending Lead Alert to ${adminRecipient}...`);
    await transporter.sendMail(leadMailOptions);
    
    // 2 second delay to prevent Gmail threading/spam flags
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`[2/2] Sending Confirmation to ${userRecipient}...`);
    await transporter.sendMail(confirmationMailOptions);

    console.log('✅ All emails sent successfully');
    res.status(200).json({ message: 'Inquiry processed successfully' });

  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: 'System error processing inquiry' });
  }
});

app.get('/health', (req, res) => res.status(200).send('OK'));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

export default app;