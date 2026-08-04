require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded" : "Missing");
// ---------------------- MONGODB CONNECTION ----------------------
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");

        // Start server ONLY after DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ MongoDB Error:", err);
    });



// ---------------------- IMPORT ROUTES ----------------------
// Make sure these files exist in /routes folder
app.use(require('./routes/Subscribe'));
app.use(require('./routes/Medicine'));
app.use(require('./routes/Transaction'));
app.use(require('./routes/app'));


// ---------------------- USER SCHEMA ----------------------
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    dob: String,
    password: String,
    pincode: String,
    house: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    relative1Name: String,
    relative1Phone: String,
    relative2Name: String,
    relative2Phone: String
}, { timestamps: true });

const User = mongoose.model("SignupDetails", UserSchema);


// ---------------------- AUTH ROUTES ----------------------

// ⭐ Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const exists = await User.findOne({ email: req.body.email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: "Signup successful" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, message: "Signup error" });
    }
});


// ⭐ Login Route
app.post('/api/login', async (req, res) => {
    try {
        // Find user by email only
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Verify password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token (using a dummy secret if not in env)
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_production';
        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });

        // Exclude password from the returned user object
        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.json({ success: true, message: "Login successful", user: userResponse, token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Login error" });
    }
});


// ⭐ Update Route
app.put('/api/update', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.body.email },
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated", user: updatedUser });

    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Update failed" });
    }
});


// ---------------------- TEST ROUTE ----------------------
app.get('/', (req, res) => res.status(200).send("NyteHawk Backend Status: Online ✅"));
app.get('/api/test', (req, res) => res.send("API is working!"));

// ---------------------- SERVER LISTEN ----------------------
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Export the app for Vercel serverless deployment
module.exports = app;
