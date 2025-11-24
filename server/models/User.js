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
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or updated

  try {
    const saltRounds = 10; // Strength of hashing
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare plain text password with hashed password
userSchema.methods.comparePassword = async function (candidatePasswod) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', userSchema);