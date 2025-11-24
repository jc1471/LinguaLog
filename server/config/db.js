// Exports to server.js the function that connects to the database

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log(err.message);
        process.exit(1); // Stop the app if DB fails
    }
};

module.exports = connectDB;