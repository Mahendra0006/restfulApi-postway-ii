import { OTP } from "../models/OTP.model.js";
import { User } from "../models/User.model.js";
import { sendEmail } from "../utils/email.js";

export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It expires in 10 minutes.`
    );

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new Error("Invalid or expired OTP");
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new Error("Invalid or expired OTP");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    user.password = newPassword;
    await user.save();
    await OTP.deleteOne({ email });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
