// routes/contact.js - Handles contact form messages and auto-replies

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// 🔐 Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📩 POST /send-mail
router.post('/send-mail', async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const mailOptions = {
    from: `"NyteHawk Contact" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thanks for contacting NyteHawk!',
    html: `
<div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <div style="background: linear-gradient(135deg, #0284c7, #3b82f6); padding: 30px; text-align: center;">
    <h1 style="margin: 0; color: #ffffff; font-size: 26px; letter-spacing: 1px;">Message Received! 🚀</h1>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Hi ${name},</p>
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Thanks for reaching out to NyteHawk. We have successfully received your message:</p>
    
    <div style="background: rgba(255, 255, 255, 0.03); border-left: 4px solid #38bdf8; padding: 15px 20px; margin: 25px 0; border-radius: 4px; font-style: italic; color: #94a3b8;">
      "${message}"
    </div>
    
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Our team is reviewing your request and will get back to you as soon as possible.</p>
    
    <p style="font-size: 16px; color: #cbd5e1; margin-top: 30px; margin-bottom: 0;"><strong>– Team NyteHawk</strong></p>
  </div>
  <div style="background-color: #0b1120; padding: 20px; text-align: center;">
    <a href="https://github.com/krishrami09" style="text-decoration: none; margin: 0 10px; color: #38bdf8; font-weight: bold;">🐙 GitHub</a>
    <a href="https://instagram.com/krish_zinzuvadiya09" style="text-decoration: none; margin: 0 10px; color: #ec4899; font-weight: bold;">📸 Instagram</a>
  </div>
</div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('❌ Contact Email Error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
