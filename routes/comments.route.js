import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import {
  auth,
  validate,
  commentValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/:postId", auth, getComments);
router.post("/:postId", auth, validate(commentValidation), createComment);
router.put("/:commentId", auth, validate(commentValidation), updateComment);
router.delete("/:commentId", auth, deleteComment);

export default router;
