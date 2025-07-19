import { body, param, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

// 🛡️ Authentication Middleware
export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Authentication required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error("User not found");

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// ✅ Generic Validation Handler Middleware
export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// 📝 User Sign-Up Validations
export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),
];

// 🔐 Sign-In Validation
export const signinValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// 👤 User Profile Update Validation
export const userUpdateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),
];

// 📝 Post Validation
export const postValidation = [
  body("content").trim().notEmpty().withMessage("Content is required"),
];

// 💬 Comment Validation
export const commentValidation = [
  body("content").trim().notEmpty().withMessage("Content is required"),
];

// 👍 Like Validation
export const likeValidation = [
  body("targetType")
    .isIn(["Post", "Comment"])
    .withMessage("Invalid target type"),
];

// 👥 Friend Request Validation
export const friendValidation = [
  param("friendId").isMongoId().withMessage("Invalid friend ID"),
];

// 👥 Friend Response Validation
export const friendResponseValidation = [
  body("status").isIn(["accepted", "rejected"]).withMessage("Invalid status"),
];

// 🔐 Forgot Password - OTP Send
export const otpValidation = [
  body("email").isEmail().withMessage("Invalid email"),
];

// 🔐 OTP Verification
export const verifyOtpValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
];

// 🔐 Reset Password
export const resetPasswordValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
