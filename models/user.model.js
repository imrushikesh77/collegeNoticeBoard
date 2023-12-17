const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    requied: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    requied: true,
  },
  department: {
    enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
    type: String,
    trim: true,
    requied: true,
  },
  role: {
    enum: ["user", "admin", "HOD", "faculty"],
    default: "user",
    type: String,
    trim: true,
    requied: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, 
{timestamps: true});
const User = mongoose.model("User", userSchema);

module.exports = User;
