import express from "express";
import { getLikes, toggleLike } from "../controllers/like.controller.js";
import {
  auth,
  validate,
  likeValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/:id", auth, getLikes);
router.post("/toggle/:id", auth, validate(likeValidation), toggleLike);

export default router;
