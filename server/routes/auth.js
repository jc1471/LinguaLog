const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Read JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// 'REGISTER' ROUTE
// Flow: 
// 1. User inputs username, email and password. We check if email already exists in system. 
// 2. We create new user, password is hashed inside User model. 
// 3. We generate the JWT token.
// 4. We return user info + token, but never retun password 

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // 2. Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // 3. Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

        // 4. Return user info + token (never return password)
        res.status(201).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// 'LOGIN' ROUTE
// Flow:
// 1. Find user by email
// 2. Compare password using method inside User model
// 3. Generate JWT token
// 4. Return user info + token

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // 2. Compare password using method on User model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // 3. Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        // 4. Return user info + token
        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;