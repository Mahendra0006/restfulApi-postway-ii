import express from "express";
import {
  getFriends,
  getPendingRequests,
  toggleFriendship,
  respondToRequest,
} from "../controllers/friend.controller.js";
import {
  auth,
  validate,
  friendValidation,
  friendResponseValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/get-friends/:userId", auth, getFriends);
router.get("/get-pending-requests", auth, getPendingRequests);
router.post(
  "/toggle-friendship/:friendId",
  auth,
  validate(friendValidation),
  toggleFriendship
);
router.post(
  "/response-to-request/:friendId",
  auth,
  validate(friendResponseValidation),
  respondToRequest
);

export default router;
