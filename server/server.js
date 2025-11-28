// Import packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/auth');


const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS so React can make requests from front end to back end
const allowedOrigins = [
    'http://localhost:5173', // local dev
    'https://lingualog-frontend.onrender.com' // deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // Allows requests with no origin
        if (!origin) return callback(null, true);

        // allow only origins in our allowed list
        if (allowedOrigins.includes(origin)) return callback(null, true);

        // block everything else
        return callback(new Error('CORS policy blocked this origin'));
    },
    credentials: true
}));

// Reference API Routes
app.use('/api/items', itemRoutes);

// Reference authentication routes
app.use('/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is talking :)' });
});



// Connect to mongodb
connectDB();
// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
});