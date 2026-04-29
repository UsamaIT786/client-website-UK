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
  secure: true, // Use true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Route: POST /api/assessment
app.post('/api/assessment', async (req, res) => {
  const { fullName, email, phone, visaCategory, message, canPay } = req.body;

  // Basic validation
  if (!fullName || !email || !visaCategory) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Send Internal Lead Email to Admin
    const internalMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL.trim(),
      replyTo: email,
      subject: `New Lead Assessment: ${fullName}`,
      text: `New Lead Details:\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nVisa Category: ${visaCategory}\nCan Pay: ${canPay || 'Not specified'}\nMessage: ${message || 'No additional message.'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; color: #333;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 10px;">New Assessment Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9; width: 30%;">Full Name</td>
              <td style="padding: 10px; border: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9;">Email</td>
              <td style="padding: 10px; border: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9;">Phone</td>
              <td style="padding: 10px; border: 1px solid #eee;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9;">Visa Category</td>
              <td style="padding: 10px; border: 1px solid #eee;">${visaCategory}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9;">Can Pay for Advice</td>
              <td style="padding: 10px; border: 1px solid #eee;">${canPay || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #f9f9f9;">Message</td>
              <td style="padding: 10px; border: 1px solid #eee;">${message || 'No additional message.'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This lead was generated from the website assessment form.</p>
        </div>
      `,
    };

    // 2. Send Auto-Response Email to User
    const autoResponseOptions = {
      from: `"Immigration Law Experts" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmation: Your Immigration Assessment Inquiry`,
      text: `Dear ${fullName},\n\nThank you for choosing Immigration Law Experts. We have successfully received your inquiry regarding a ${visaCategory}. Our team will contact you within 24 business hours.\n\nBest Regards,\nThe Assessment Team`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; color: #0f172a; line-height: 1.6;">
          <div style="background: #2563eb; padding: 40px 30px; text-align: center; color: white; border-radius: 16px 16px 0 0;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase;">IMMIGRATION LAW EXPERTS</h1>
            <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9; letter-spacing: 1px;">PREMIUM LEGAL SERVICES UK</p>
          </div>
          
          <div style="padding: 40px 30px; background: #ffffff; border: 1px solid #f1f5f9; border-top: none; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <p style="font-size: 18px; font-weight: 700; color: #2563eb; margin-bottom: 20px;">Dear ${fullName},</p>
            <p>Thank you for choosing <strong>Immigration Law Experts</strong>. We have successfully received your inquiry regarding a <strong>${visaCategory}</strong>.</p>
            
            <p>Our senior legal consultants are currently reviewing your details to provide a comprehensive and strategic assessment tailored to your specific case.</p>
            
            <div style="margin: 30px 0; padding: 25px; border-left: 4px solid #2563eb; background: #f8fafc; border-radius: 4px;">
              <p style="margin: 0; font-style: italic; color: #475569;">"Our mission is to navigate the complexities of UK immigration law with precision, ensuring a seamless and successful transition for our clients."</p>
            </div>

            <p><strong>Next Steps:</strong> One Of The Legally Qualified Person Will Contact Via Email Or Phone Within 24 business hours To Discuss Your Query And The Path Forward.</p>
            
            <p style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
              Best Regards,<br>
              <span style="color: #2563eb; font-weight: 800; font-size: 16px;">The Assessment Team</span><br>
              <span style="color: #64748b; font-size: 13px;">Immigration Law Experts | London, UK</span>
            </p>
          </div>

          <div style="padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin-bottom: 10px;">&copy; 2026 Immigration Law Experts. All rights reserved.</p>
            <p style="line-height: 1.4;"><strong>Confidentiality & Disclaimer:</strong> This email and any attachments are confidential and intended solely for the addressee. If you are not the intended recipient, any disclosure or copying is prohibited. This communication does not constitute formal legal advice until a formal engagement is established.</p>
          </div>
        </div>
      `,
    };

    // Send emails sequentially to ensure both are attempted and we can catch specific errors
    console.log(`Sending lead to receiver: ${process.env.RECEIVER_EMAIL.trim()}`);
    await transporter.sendMail(internalMailOptions);
    
    console.log(`Sending confirmation to user: ${email}`);
    await transporter.sendMail(autoResponseOptions);

    res.status(200).json({ message: 'Assessment inquiry sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      error: 'Failed to process assessment inquiry', 
      details: error.message 
    });
  }
});

// Health check route
app.get('/health', (req, res) => res.status(200).send('OK'));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
