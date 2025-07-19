import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  expiresAt: {
    type: Date,
    required: [true, "Expiration time is required"],
  },
});

export const OTP = mongoose.model("OTP", otpSchema);
