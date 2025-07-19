import express from "express";
import {
  sendOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/otp.controller.js";
import {
  validate,
  otpValidation,
  verifyOtpValidation,
  resetPasswordValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/send", validate(otpValidation), sendOTP);
router.post("/verify", validate(verifyOtpValidation), verifyOTP);
router.post(
  "/reset-password",
  validate(resetPasswordValidation),
  resetPassword
);

export default router;
