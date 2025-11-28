const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role: { type: String },
  createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

// Middleware hashes password before saving
userSchema.pre('save', async function () {
  
    if (!this.isModified('password')) return; // Only hash if password is new or updated

    const saltRounds = 10; // Strength of hashing
    this.password = await bcrypt.hash(this.password, saltRounds);
  });

// Method to compare plain text password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', userSchema);