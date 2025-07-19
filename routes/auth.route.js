import express from "express";
import {
  signup,
  signin,
  logout,
  logoutAllDevices,
} from "../controllers/auth.controller.js";
import {
  auth,
  validate,
  signupValidation,
  signinValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupValidation), signup);
router.post("/signin", validate(signinValidation), signin);
router.post("/logout", auth, logout);
router.post("/logout-all-devices", auth, logoutAllDevices);

export default router;
