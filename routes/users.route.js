import express from "express";
import {
  getUserDetails,
  getAllUsers,
  updateUserDetails,
} from "../controllers/user.controller.js";
import {
  auth,
  validate,
  userUpdateValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/get-details/:userId", auth, getUserDetails);
router.get("/get-all-details", auth, getAllUsers);
router.put(
  "/update-details/:userId",
  auth,
  validate(userUpdateValidation),
  updateUserDetails
);

export default router;
