// Import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS so React can make requests from front end to back end
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Reference API Routes
app.use('/api/items', itemRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error", err));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is talking :)' });
});

// Start server
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});