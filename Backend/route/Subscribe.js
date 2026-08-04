// backend/subscribe.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ Subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema, 'Subscribers');

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ✅ POST /api/subscribe
router.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (!existing) {
      await Subscriber.create({ email });
    }

    // Send welcome email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thanks for subscribing to NyteHawk!',
      html: `
<div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <div style="background: linear-gradient(135deg, #4f46e5, #9333ea); padding: 30px; text-align: center;">
    <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 1px;">Welcome to NyteHawk! 🦉</h1>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Hello Night Owl,</p>
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Thank you for subscribing to <strong>NyteHawk</strong>. We are thrilled to have you! You'll now be the first to know about our latest features, city expansions, and updates.</p>
    
    <div style="background: rgba(255, 255, 255, 0.05); border-left: 4px solid #a855f7; padding: 15px 20px; margin: 25px 0; border-radius: 4px;">
      <h3 style="margin-top: 0; color: #f8fafc; font-size: 18px;">✨ What We Provide:</h3>
      <ul style="color: #94a3b8; line-height: 1.8; margin-bottom: 0; padding-left: 20px;">
        <li>🏥 <strong>Best Hospitals & Pharmacies</strong> when you need them.</li>
        <li>🍽️ <strong>Late Night Food & Cafes</strong> to kill the hunger.</li>
        <li>🏧 <strong>ATMs & Fuel Stations</strong> for your midnight runs.</li>
      </ul>
    </div>
    
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6;">Stay safe and enjoy the night!</p>
    <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 0;"><strong>– Team NyteHawk</strong></p>
  </div>
  <div style="background-color: #0b1120; padding: 20px; text-align: center;">
    <a href="https://github.com/krishrami09" style="text-decoration: none; margin: 0 10px; color: #9333ea; font-weight: bold;">🐙 GitHub</a>
    <a href="https://instagram.com/krish_zinzuvadiya09" style="text-decoration: none; margin: 0 10px; color: #ec4899; font-weight: bold;">📸 Instagram</a>
  </div>
</div>
`
    });

    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (err) {
    console.error('❌ Subscription Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
