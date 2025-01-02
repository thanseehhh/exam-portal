const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password hasn't changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
