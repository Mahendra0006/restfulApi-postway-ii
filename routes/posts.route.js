import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import {
  auth,
  validate,
  postValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/all", auth, getAllPosts);
router.get("/:postId", auth, getPost);
router.get("/user/:userId", auth, getUserPosts);
router.post("/", auth, validate(postValidation), createPost);
router.put("/:postId", auth, validate(postValidation), updatePost);
router.delete("/:postId", auth, deletePost);

export default router;
